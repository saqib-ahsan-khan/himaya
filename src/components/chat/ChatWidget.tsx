"use client";

import { useBooking } from "@/context/BookingContext";
import { useChat } from "@/hooks/useChat";
import {
  getFollowUpSuggestions,
  shouldShowBookDemoShortcut,
  shouldShowLeadCaptureFromAssistant,
  shouldShowLeadCaptureFromUser,
  WELCOME_SUGGESTIONS,
} from "@/lib/chat-helpers";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageSquare, Minimize2, RotateCcw, Send, Shield, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { analytics } from "@/lib/analytics";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function StreamingDots() {
  return (
    <span className="ml-1 inline-flex gap-0.5 align-middle">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-1.5 w-1.5 rounded-full bg-metallicGold"
          style={{
            animation: "himaya-chat-bounce 0.6s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </span>
  );
}

function SuggestionPill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-deepNavy/10 bg-white px-3.5 py-1.5 text-left text-[0.75rem] text-deepNavy transition hover:border-metallicGold hover:bg-metallicGold/[0.04] hover:text-metallicGold"
    >
      {label}
    </button>
  );
}

export function ChatWidget() {
  const pathname = usePathname();
  const { openModal } = useBooking();
  const { messages, state, lead, sendMessage, saveLead, clearChat } = useChat();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: "", company: "", email: "", concern: "" });
  const [pulseActive, setPulseActive] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
      setPulseActive(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!pulseActive || isOpen) return;
    const t = setTimeout(() => setPulseActive(false), 5000);
    return () => clearTimeout(t);
  }, [pulseActive, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadCapture]);

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant" && !m.isStreaming);
  const followUps = lastAssistant && !lastAssistant.isStreaming ? getFollowUpSuggestions(lastAssistant.content) : [];

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || state === "streaming") return;
    setInputValue("");
    if (textareaRef.current) textareaRef.current.style.height = "40px";

    if (shouldShowLeadCaptureFromUser(text) && !lead.collected) {
      setShowLeadCapture(true);
    }

    void sendMessage(text);
  }, [inputValue, lead.collected, sendMessage, state]);

  useEffect(() => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    const lastAsst = [...messages].reverse().find((m) => m.role === "assistant" && !m.isStreaming);

    if (lastUser && shouldShowLeadCaptureFromUser(lastUser.content) && !lead.collected) {
      setShowLeadCapture(true);
    }
    if (lastAsst && shouldShowLeadCaptureFromAssistant(lastAsst.content) && !lead.collected) {
      setShowLeadCapture(true);
    }
  }, [messages, lead.collected]);

  const handleClear = () => {
    if (messages.length === 0 || confirm("Clear this conversation?")) {
      clearChat();
      setShowLeadCapture(false);
      setLeadSubmitted(false);
      setLeadForm({ name: "", company: "", email: "", concern: "" });
    }
  };

  useEffect(() => {
    if (isOpen) analytics.chatOpened();
  }, [isOpen]);

  const submitLead = async () => {
    if (!leadForm.name.trim() || !leadForm.email.trim()) return;
    await saveLead({
      name: leadForm.name.trim(),
      company: leadForm.company.trim(),
      email: leadForm.email.trim(),
      concern: leadForm.concern.trim(),
    });
    analytics.chatLeadCollected();
    setLeadSubmitted(true);
    setShowLeadCapture(false);
  };

  if (isAdmin) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes himaya-chat-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes himaya-chat-pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
      `}</style>

      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-[2.3rem] right-[5.5rem] z-[9000] rounded-lg bg-deepNavy px-3.5 py-2 text-[0.78rem] text-white shadow-lg after:absolute after:-right-1.5 after:top-1/2 after:h-0 after:w-0 after:-translate-y-1/2 after:border-y-[6px] after:border-l-[6px] after:border-y-transparent after:border-l-deepNavy"
          >
            Ask HIMAYA
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-[1.8rem] right-[1.8rem] z-[9000] flex h-[58px] w-[58px] items-center justify-center rounded-full transition-all duration-300 hover:scale-[1.08]"
        style={{
          background: "linear-gradient(135deg, #D4A017, #F8C955)",
          boxShadow: isOpen
            ? "0 4px 20px rgba(212,160,23,0.35)"
            : "0 4px 20px rgba(212,160,23,0.45), 0 2px 8px rgba(0,0,0,0.15)",
        }}
        aria-label={isOpen ? "Close chat" : "Open HIMAYA chat"}
      >
        {pulseActive && !isOpen && (
          <span
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-metallicGold/60"
            style={{ animation: "himaya-chat-pulse 1s ease 3 forwards" }}
          />
        )}
        <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.25 }}>
          {isOpen ? <X size={24} className="text-deepNavy" /> : <MessageSquare size={24} className="text-deepNavy" />}
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-[5.5rem] right-[1.8rem] z-[8999] flex h-[560px] w-[380px] max-[480px]:bottom-20 max-[480px]:right-4 max-[480px]:h-[75vh] max-[480px]:w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-metallicGold/20 bg-ivoryWhite shadow-[0_24px_80px_rgba(7,24,39,0.2),0_8px_32px_rgba(7,24,39,0.12)]"
          >
            <header className="flex shrink-0 items-center justify-between bg-deepNavy px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-metallicGold" />
                  <span className="font-heading text-[0.95rem] font-bold text-white">HIMAYA</span>
                </div>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-successGreen" />
                  <span className="font-mono text-[0.6rem] text-[rgba(255,253,247,0.55)]">AI Assistant · Online</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  title="Clear conversation"
                  onClick={handleClear}
                  className="text-[rgba(255,253,247,0.5)] transition hover:text-[rgba(255,253,247,0.9)]"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  title="Minimize"
                  onClick={() => setIsOpen(false)}
                  className="text-[rgba(255,253,247,0.5)] transition hover:text-[rgba(255,253,247,0.9)]"
                >
                  <Minimize2 size={16} />
                </button>
              </div>
            </header>

            <p className="shrink-0 border-b border-metallicGold/12 bg-warningAmber/[0.07] px-4 py-2 text-[0.67rem] leading-snug text-deepNavy/55">
              General information only — not legal or regulatory advice.
            </p>

            <div ref={messagesContainerRef} className="min-h-0 flex-1 overflow-y-auto p-4 [scrollbar-width:thin]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center px-2 py-6 text-center">
                  <Shield size={32} className="text-metallicGold" />
                  <h3 className="mt-3 text-[0.9rem] font-bold text-deepNavy">Hello! I&apos;m the HIMAYA Assistant.</h3>
                  <p className="mt-2 text-[0.78rem] leading-relaxed text-slateText">
                    Ask me anything about HIMAYA, control drift, ATLAS, pricing or whether HIMAYA could help your firm.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {WELCOME_SUGGESTIONS.map((q) => (
                      <SuggestionPill key={q} label={q} onClick={() => void sendMessage(q)} />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={msg.role === "user" ? "max-w-[78%]" : "max-w-[85%]"}>
                        {msg.role === "assistant" && (
                          <div className="mb-1 flex items-center gap-1">
                            <Shield size={10} className="text-metallicGold" />
                            <span className="font-mono text-[0.58rem] text-mutedText">HIMAYA</span>
                          </div>
                        )}
                        <div
                          className={
                            msg.role === "user"
                              ? "rounded-[14px_14px_4px_14px] bg-deepNavy px-3.5 py-2.5 text-[0.85rem] leading-relaxed text-[rgba(255,253,247,0.92)]"
                              : "rounded-[4px_14px_14px_14px] border border-deepNavy/[0.07] bg-white px-3.5 py-2.5 text-[0.85rem] leading-relaxed text-slateText shadow-[0_1px_4px_rgba(7,24,39,0.06)]"
                          }
                        >
                          {msg.role === "assistant" ? (
                            <div className="chat-markdown [&_p]:mb-1.5 [&_ul]:my-1.5 [&_ul]:ml-4 [&_li]:mb-0.5 [&_strong]:font-bold [&_strong]:text-deepNavy [&_a]:text-metallicGold [&_a]:underline">
                              {msg.content ? (
                                <ReactMarkdown>{msg.content}</ReactMarkdown>
                              ) : null}
                              {msg.isStreaming && <StreamingDots />}
                            </div>
                          ) : (
                            msg.content
                          )}
                        </div>
                        {msg.role === "assistant" && !msg.isStreaming && shouldShowBookDemoShortcut(msg.content) && (
                          <button
                            type="button"
                            onClick={() => openModal()}
                            className="mt-2 rounded-md border border-metallicGold/30 bg-metallicGold/[0.08] px-3 py-1 font-mono text-[0.62rem] text-metallicGold transition hover:bg-metallicGold/15"
                          >
                            📅 Book a Demo
                          </button>
                        )}
                        {msg.id === lastAssistant?.id && followUps.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {followUps.map((q) => (
                              <SuggestionPill key={q} label={q} onClick={() => void sendMessage(q)} />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {showLeadCapture && !lead.collected && !leadSubmitted && (
                    <div className="mb-3 rounded-xl border border-metallicGold/20 bg-metallicGold/[0.05] p-4">
                      <p className="text-[0.82rem] font-semibold text-deepNavy">Quick details</p>
                      <p className="mt-0.5 text-[0.72rem] text-mutedText">So we can follow up within 24 hours.</p>
                      <div className="mt-3 space-y-2">
                        <input
                          placeholder="Name *"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                          className="w-full rounded-md border border-deepNavy/10 px-2.5 py-2 text-[0.8rem] focus:border-metallicGold focus:outline-none"
                        />
                        <input
                          placeholder="Company *"
                          value={leadForm.company}
                          onChange={(e) => setLeadForm((f) => ({ ...f, company: e.target.value }))}
                          className="w-full rounded-md border border-deepNavy/10 px-2.5 py-2 text-[0.8rem] focus:border-metallicGold focus:outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Work email *"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                          className="w-full rounded-md border border-deepNavy/10 px-2.5 py-2 text-[0.8rem] focus:border-metallicGold focus:outline-none"
                        />
                        <textarea
                          placeholder="Main concern (optional)"
                          rows={2}
                          value={leadForm.concern}
                          onChange={(e) => setLeadForm((f) => ({ ...f, concern: e.target.value }))}
                          className="w-full rounded-md border border-deepNavy/10 px-2.5 py-2 text-[0.8rem] focus:border-metallicGold focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => void submitLead()}
                        className="mt-3 w-full rounded-md bg-gradient-to-br from-metallicGold to-luminousGold py-2.5 text-sm font-bold text-deepNavy"
                      >
                        Send to HIMAYA →
                      </button>
                      <button type="button" onClick={() => setShowLeadCapture(false)} className="mt-2 w-full text-center text-[0.7rem] text-mutedText hover:underline">
                        Skip
                      </button>
                    </div>
                  )}

                  {leadSubmitted && (
                    <p className="mb-3 rounded-lg border border-successGreen/20 bg-successGreen/5 px-3 py-2 text-center text-sm text-successGreen">
                      Thank you {leadForm.name || lead.name}! The team will be in touch within 24 hours.
                    </p>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            <footer className="shrink-0 border-t border-deepNavy/[0.07] bg-white px-4 py-3">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => {
                    const v = e.target.value.slice(0, 500);
                    setInputValue(v);
                    e.target.style.height = "40px";
                    e.target.style.height = `${Math.min(e.target.scrollHeight, 110)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  disabled={state === "streaming"}
                  placeholder="Ask me anything about HIMAYA..."
                  rows={1}
                  className="max-h-[110px] min-h-[40px] flex-1 resize-none rounded-[10px] border border-deepNavy/12 px-3.5 py-2.5 text-[0.85rem] text-slateText focus:border-metallicGold/50 focus:outline-none focus:ring-[3px] focus:ring-metallicGold/10 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || state === "streaming"}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-deepNavy transition hover:scale-105 hover:bg-midnightNavy disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {state === "streaming" ? (
                    <Loader2 size={16} className="animate-spin text-metallicGold" />
                  ) : (
                    <Send size={16} className="text-metallicGold" />
                  )}
                </button>
              </div>
              {inputValue.length > 300 && (
                <p className="mt-1 text-right font-mono text-[0.58rem] text-mutedText">
                  {inputValue.length} / 500
                </p>
              )}
              <p className="mt-2 text-center text-[0.62rem] text-mutedText">Not legal or regulatory advice · HIMAYA AI</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
