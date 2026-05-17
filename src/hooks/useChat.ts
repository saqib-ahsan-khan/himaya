"use client";

import { useCallback, useRef, useState } from "react";
import type { ChatLead, ChatMessage, ChatState } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [state, setState] = useState<ChatState>("idle");
  const [lead, setLead] = useState<ChatLead>({
    name: "",
    company: "",
    email: "",
    concern: "",
    collected: false,
  });
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (state === "streaming" || !content.trim()) return;

      const userMsg: ChatMessage = {
        id: `${Date.now()}-user`,
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      const assistantId = `${Date.now()}-assistant`;
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setState("streaming");

      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        abortRef.current = new AbortController();

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: abortRef.current.signal,
        });

        if (res.status === 429) {
          const err = await res.json().catch(() => ({}));
          throw new Error((err as { error?: string }).error ?? "Rate limit exceeded");
        }

        if (!res.ok) throw new Error("API error");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = "";

        if (!reader) throw new Error("No reader");

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data) as { text?: string };
              if (parsed.text) {
                fullText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) => (m.id === assistantId ? { ...m, content: fullText, isStreaming: true } : m))
                );
              }
            } catch {
              /* partial JSON */
            }
          }
        }

        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, isStreaming: false } : m)));
        setState("idle");
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          setState("idle");
          return;
        }

        const fallback =
          error instanceof Error && error.message.includes("limit")
            ? error.message
            : "I'm having trouble connecting right now. Please email hello@himaya.uk or use the Book a Demo button above.";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: fallback, isStreaming: false } : m
          )
        );
        setState("error");
        setTimeout(() => setState("idle"), 3000);
      }
    },
    [messages, state]
  );

  const saveLead = useCallback(async (leadData: Omit<ChatLead, "collected">) => {
    try {
      await fetch("/api/chat/save-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });
      setLead({ ...leadData, collected: true });
    } catch {
      /* silent */
    }
  }, []);

  const clearChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setState("idle");
    setLead({ name: "", company: "", email: "", concern: "", collected: false });
  }, []);

  return {
    messages,
    state,
    lead,
    sendMessage,
    saveLead,
    clearChat,
  };
}
