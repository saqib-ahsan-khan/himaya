"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Link2, ShieldCheck } from "lucide-react";
import { BookDemoTrigger } from "@/components/BookDemoTrigger";
import { GoldCheck, LinkIcon, RedX, WarnIcon } from "@/components/ui/Icons";
import { formatArticleDate, type SerializedFcaArticle } from "@/lib/articles";
import { ArticleAnalytics, trackFcaSourceClick } from "@/components/fca-insights/ArticleAnalytics";
import { FcaInsightsBottomCTA } from "@/components/fca-insights/FcaInsightsBottomCTA";
import { MinimalArticleCard } from "@/components/fca-insights/MinimalArticleCard";
import { RichText } from "@/components/fca-insights/RichText";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "what-happened", label: "What Happened" },
  { id: "why-it-matters", label: "Why It Matters" },
  { id: "what-went-wrong", label: "What Went Wrong" },
  { id: "lessons", label: "Lessons" },
  { id: "how-himaya-helps", label: "How HIMAYA Helps" },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-metallicGold">{children}</p>
  );
}

function BulletList({
  items,
  icon,
  rowClass = "",
}: {
  items: string[];
  icon: React.ReactNode;
  rowClass?: string;
}) {
  return (
    <ul className="space-y-0">
      {items.map((item) => (
        <li key={item} className={`flex gap-3 border-b border-deepNavy/[0.05] py-2.5 last:border-0 ${rowClass}`}>
          <span className="mt-0.5 shrink-0">{icon}</span>
          <span className="text-[0.9rem] leading-relaxed text-slateText">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ArticleDetailView({
  article,
  relatedArticles,
}: {
  article: SerializedFcaArticle;
  relatedArticles: SerializedFcaArticle[];
}) {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [copied, setCopied] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    if (viewedRef.current) return;
    viewedRef.current = true;
    fetch(`/api/articles/${article.id}/views`, { method: "POST" }).catch(() => undefined);
  }, [article.id]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const linkedInShare = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  const fcaSourceLabel = article.firmName || article.source;

  return (
    <>
      <ArticleAnalytics title={article.title} firmName={article.firmName} />
      <article className="bg-ivoryWhite pb-16 pt-8">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-6 lg:grid-cols-[minmax(0,760px)_280px]">
          <div>
            <nav className="mb-8 font-mono text-[0.7rem] text-mutedText">
              <Link href="/fca-insights" className="transition hover:text-metallicGold">
                FCA Insights
              </Link>
              <span className="mx-2">/</span>
              <span className="text-slateText">{article.title}</span>
            </nav>

            <header className="mb-10">
              <div className="mb-4 flex flex-wrap gap-2">
                {article.categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded bg-deepNavy/[0.06] px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-[0.12em] text-slateText"
                  >
                    {cat}
                  </span>
                ))}
                {article.fineAmount && (
                  <span className="rounded border border-dangerRed/20 bg-dangerRed/[0.08] px-2 py-0.5 font-mono text-[0.55rem] text-dangerRed">
                    {article.fineAmount}
                  </span>
                )}
              </div>

              <h1 className="font-heading text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight text-deepNavy">{article.title}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.65rem] text-mutedText">
                {article.sourceUrl ? (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-metallicGold hover:underline"
                    onClick={() => trackFcaSourceClick(fcaSourceLabel)}
                  >
                    {article.source}
                    <ExternalLink size={12} className="ml-1" aria-hidden />
                  </a>
                ) : (
                  <span>{article.source}</span>
                )}
                <span>·</span>
                <span>{formatArticleDate(article.publishedDate)}</span>
                <span>·</span>
                <span>{article.readTimeMinutes} min read</span>
                <span>·</span>
                <span>{article.views} views</span>
              </div>

              <div className="mt-6 border-l-4 border-warningAmber bg-warningAmber/[0.04] px-5 py-4">
                <p className="text-[0.82rem] italic leading-relaxed text-slateText">
                  This article is based on publicly available FCA sources and is provided for educational purposes only. It does not constitute legal
                  or regulatory advice.
                </p>
              </div>
            </header>

            <section id="overview" className="mb-12 scroll-mt-28">
              <SectionLabel>Overview</SectionLabel>
              <p className="text-[1.05rem] leading-[1.9] text-slateText">{article.summary}</p>
              {article.firmName && article.fineAmount && (
                <div className="mt-6 rounded-[10px] border border-metallicGold/25 bg-deepNavy p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="font-heading text-[1.1rem] text-ivoryWhite">{article.firmName}</p>
                    <p className="font-heading text-[2rem] text-dangerRed">{article.fineAmount}</p>
                  </div>
                  {article.sourceUrl && (
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-sm text-metallicGold hover:underline"
                      onClick={() => trackFcaSourceClick(fcaSourceLabel)}
                    >
                      View FCA source
                      <LinkIcon size={12} />
                    </a>
                  )}
                </div>
              )}
            </section>

            <section id="what-happened" className="mb-12 scroll-mt-28">
              <SectionLabel>What Happened</SectionLabel>
              <RichText content={article.whatHappened} className="text-[0.95rem] leading-[1.9] text-slateText" />
            </section>

            <section id="why-it-matters" className="mb-12 scroll-mt-28">
              <SectionLabel>Why It Matters For Your Firm</SectionLabel>
              <div className="rounded-r-lg border-l-4 border-metallicGold bg-metallicGold/[0.04] px-6 py-5">
                <RichText content={article.whyItMatters} className="text-[0.95rem] leading-[1.9] text-slateText" />
              </div>
            </section>

            <section id="what-went-wrong" className="mb-12 scroll-mt-28">
              <SectionLabel>What Went Wrong</SectionLabel>
              <BulletList items={article.whatWentWrong} icon={<RedX size={16} />} />
            </section>

            <section id="lessons" className="mb-12 scroll-mt-28">
              <SectionLabel>Lessons For Regulated SMEs</SectionLabel>
              <BulletList items={article.lessonsForSMEs} icon={<WarnIcon size={16} />} />
            </section>

            <section id="what-should-have-done" className="mb-12 scroll-mt-28">
              <SectionLabel>What Should Have Happened</SectionLabel>
              <BulletList items={article.whatShouldHaveDone} icon={<GoldCheck size={16} />} rowClass="bg-metallicGold/[0.03] px-2" />
            </section>

            <section id="how-himaya-helps" className="mb-12 scroll-mt-28">
              <SectionLabel>How HIMAYA Helps</SectionLabel>
              <div className="rounded-xl border border-metallicGold/20 bg-deepNavy p-8">
                <ShieldCheck size={24} className="text-metallicGold" aria-hidden />
                <RichText content={article.howHIMAYAHelps} className="mt-4 text-[0.92rem] leading-relaxed text-[rgba(255,253,247,0.75)]" />
                <div className="mt-6 flex flex-wrap gap-3">
                  <BookDemoTrigger className="rounded-md bg-gradient-to-br from-metallicGold to-luminousGold px-6 py-2.5 text-sm font-bold text-deepNavy">
                    Book a Readiness Call
                  </BookDemoTrigger>
                  <Link
                    href="/atlas"
                    className="rounded-md border border-metallicGold/35 px-6 py-2.5 text-sm font-semibold text-ivoryWhite transition hover:bg-metallicGold/10"
                  >
                    See How ATLAS Detects Control Drift
                  </Link>
                  <Link
                    href="/#packages"
                    className="rounded-md border border-metallicGold/35 px-6 py-2.5 text-sm font-semibold text-ivoryWhite transition hover:bg-metallicGold/10"
                  >
                    View HIMAYA Service Packages
                  </Link>
                  <Link
                    href="/#control-drift-checklist"
                    className="rounded-md border border-metallicGold/35 px-6 py-2.5 text-sm font-semibold text-ivoryWhite transition hover:bg-metallicGold/10"
                  >
                    Download Control Drift Checklist
                  </Link>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <SectionLabel>Source</SectionLabel>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View official FCA source document"
                className="inline-flex items-center text-[0.8rem] text-metallicGold hover:underline"
              >
                {article.sourceUrl}
                <ExternalLink size={14} className="ml-1" aria-hidden />
              </a>
              <p className="mt-2 text-sm text-slateText">This analysis is based on publicly available FCA enforcement information.</p>
            </section>

            <div className="flex flex-wrap items-center gap-4 border-t border-deepNavy/10 pt-8">
              <span className="text-sm font-semibold text-deepNavy">Share this insight:</span>
              <button
                type="button"
                onClick={linkedInShare}
                className="rounded-md border border-deepNavy/15 px-4 py-2 text-sm text-slateText transition hover:border-metallicGold hover:text-metallicGold"
              >
                LinkedIn
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-1.5 rounded-md border border-deepNavy/15 px-4 py-2 text-sm text-slateText transition hover:border-metallicGold hover:text-metallicGold"
              >
                <Link2 size={14} aria-hidden />
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-[90px] space-y-6">
              <nav className="rounded-xl border border-deepNavy/10 bg-white p-5 shadow-sm">
                <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-metallicGold">In This Article</p>
                <ul className="space-y-2 text-sm">
                  {SECTIONS.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(id)}
                        className={`cursor-pointer text-left transition ${
                          activeSection === id ? "font-semibold text-metallicGold" : "text-slateText hover:text-deepNavy"
                        }`}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="rounded-xl border border-metallicGold/25 bg-deepNavy p-5">
                <p className="font-heading text-base font-bold text-ivoryWhite">Is your firm ready for a similar scrutiny?</p>
                <BookDemoTrigger className="mt-4 w-full rounded-md bg-metallicGold px-4 py-2.5 text-sm font-bold text-deepNavy">
                  Book a 15-Min Call
                </BookDemoTrigger>
              </div>

              {relatedArticles.length > 0 && (
                <div>
                  <p className="mb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-metallicGold">Related Insights</p>
                  <div className="space-y-3">
                    {relatedArticles.map((a) => (
                      <MinimalArticleCard key={a.id} article={a} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {relatedArticles.length > 0 && (
          <div className="mx-auto mt-16 max-w-[1200px] border-t border-deepNavy/10 px-6 pt-12">
            <h2 className="mb-6 font-heading text-2xl font-bold text-deepNavy">Related Insights</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((a) => (
                <MinimalArticleCard key={`bottom-${a.id}`} article={a} />
              ))}
            </div>
          </div>
        )}
      </article>

      <FcaInsightsBottomCTA />
    </>
  );
}
