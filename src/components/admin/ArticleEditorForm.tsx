"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { APPROVED_CATEGORIES, type SerializedFcaArticle } from "@/lib/articles";
import type { ArticleFormPayload } from "@/lib/article-api";
import { generateReadTime, slugify } from "@/lib/slugify";
import { BulletListEditor } from "@/components/admin/BulletListEditor";
import { TipTapEditor } from "@/components/admin/TipTapEditor";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ");
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

const defaultBullets = ["", "", ""];

type ArticleEditorFormProps = {
  articleId?: string;
  initial?: SerializedFcaArticle | null;
};

export function ArticleEditorForm({ articleId, initial }: ArticleEditorFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugEditable, setSlugEditable] = useState(false);
  const [firmName, setFirmName] = useState(initial?.firmName ?? "");
  const [fineAmount, setFineAmount] = useState(initial?.fineAmount ?? "");
  const [source, setSource] = useState(initial?.source ?? "FCA Press Release");
  const [sourceUrl, setSourceUrl] = useState(initial?.sourceUrl ?? "");
  const [publishedDate, setPublishedDate] = useState(
    initial?.publishedDate ? initial.publishedDate.slice(0, 10) : todayIsoDate()
  );
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [whatHappened, setWhatHappened] = useState(initial?.whatHappened ?? "");
  const [whyItMatters, setWhyItMatters] = useState(initial?.whyItMatters ?? "");
  const [whatWentWrong, setWhatWentWrong] = useState(
    initial?.whatWentWrong?.length ? initial.whatWentWrong : [...defaultBullets]
  );
  const [lessonsForSMEs, setLessonsForSMEs] = useState(
    initial?.lessonsForSMEs?.length ? initial.lessonsForSMEs : [...defaultBullets]
  );
  const [whatShouldHaveDone, setWhatShouldHaveDone] = useState(
    initial?.whatShouldHaveDone?.length ? initial.whatShouldHaveDone : [...defaultBullets]
  );
  const [howHIMAYAHelps, setHowHIMAYAHelps] = useState(initial?.howHIMAYAHelps ?? "");
  const [categories, setCategories] = useState<string[]>(initial?.categories ?? []);
  const [status, setStatus] = useState<"draft" | "published">(initial?.status ?? "draft");
  const [featured, setFeatured] = useState(initial?.featured ?? false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveLabel, setSaveLabel] = useState("Not saved yet");
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [error, setError] = useState("");
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const readTime = useMemo(
    () =>
      generateReadTime(
        title,
        summary,
        stripHtml(whatHappened),
        stripHtml(whyItMatters),
        whatWentWrong.join(" "),
        lessonsForSMEs.join(" "),
        whatShouldHaveDone.join(" "),
        stripHtml(howHIMAYAHelps)
      ),
    [title, summary, whatHappened, whyItMatters, whatWentWrong, lessonsForSMEs, whatShouldHaveDone, howHIMAYAHelps]
  );

  useEffect(() => {
    if (!slugEditable && title) {
      setSlug(slugify(title));
    }
  }, [title, slugEditable]);

  const buildPayload = useCallback(
    (nextStatus: "draft" | "published"): ArticleFormPayload => ({
      title,
      slug: slugify(slug || title),
      publishedDate: publishedDate || todayIsoDate(),
      status: nextStatus,
      categories,
      summary,
      source,
      sourceUrl,
      firmName: firmName || undefined,
      fineAmount: fineAmount || undefined,
      whatHappened,
      whyItMatters,
      whatWentWrong: whatWentWrong.filter(Boolean),
      lessonsForSMEs: lessonsForSMEs.filter(Boolean),
      whatShouldHaveDone: whatShouldHaveDone.filter(Boolean),
      howHIMAYAHelps,
      featured,
      readTimeMinutes: readTime,
    }),
    [
      title,
      slug,
      publishedDate,
      categories,
      summary,
      source,
      sourceUrl,
      firmName,
      fineAmount,
      whatHappened,
      whyItMatters,
      whatWentWrong,
      lessonsForSMEs,
      whatShouldHaveDone,
      howHIMAYAHelps,
      featured,
      readTime,
    ]
  );

  const save = useCallback(
    async (nextStatus: "draft" | "published", silent = false) => {
      if (!title.trim()) {
        if (!silent) setError("Title is required.");
        return false;
      }
      if (categories.length === 0) {
        if (!silent) setError("Select at least one category.");
        return false;
      }
      if (!silent) setSaving(true);
      setError("");

      const payload = buildPayload(nextStatus);
      try {
        if (articleId) {
          const res = await fetch(`/api/admin/articles/${articleId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            if (!silent) setError("Failed to save article.");
            return false;
          }
        } else {
          const res = await fetch("/api/admin/articles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) {
            if (!silent) setError("Failed to save article.");
            return false;
          }
          const json = await res.json();
          if (json.id) {
            router.replace(`/admin/articles/${json.id}/edit`);
            return true;
          }
        }
        setStatus(nextStatus);
        setLastSaved(new Date());
        setSaveLabel("Saved just now");
        return true;
      } catch {
        if (!silent) setError("Failed to save article.");
        return false;
      } finally {
        if (!silent) setSaving(false);
      }
    },
    [articleId, buildPayload, categories.length, router, title]
  );

  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      if (title.trim()) void save("draft", true);
    }, 60000);
    return () => {
      if (autoSaveRef.current) clearInterval(autoSaveRef.current);
    };
  }, [save, title]);

  useEffect(() => {
    if (!lastSaved) return;
    const t = setInterval(() => {
      const secs = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
      setSaveLabel(secs < 5 ? "Saved just now" : `Saved ${secs} seconds ago`);
    }, 5000);
    return () => clearInterval(t);
  }, [lastSaved]);

  const toggleCategory = (cat: string) => {
    setCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const seoTitle = title.slice(0, 60);
  const seoDesc = summary.slice(0, 160);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <div className="rounded-xl border border-deepNavy/7 bg-white p-6">
          <h2 className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-metallicGold">Basic Info</h2>
          <label className="mb-1 block text-sm font-semibold text-deepNavy">Article Title *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="FCA fines firm for..."
            className="mb-4 w-full rounded-md border border-deepNavy/12 px-3 py-2 font-heading text-[1.3rem] focus:border-metallicGold focus:outline-none"
          />

          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm font-semibold text-deepNavy">URL Slug</label>
              <button type="button" onClick={() => setSlugEditable((v) => !v)} className="text-metallicGold">
                <Pencil size={14} />
              </button>
            </div>
            <input
              value={slug}
              readOnly={!slugEditable}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full rounded-md bg-deepNavy/[0.03] px-3 py-2 font-mono text-[0.82rem] focus:border-metallicGold focus:outline-none"
            />
            <p className="mt-1 font-mono text-[0.72rem] text-mutedText">/fca-insights/{slugify(slug || title) || "..."}</p>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-deepNavy">Firm Name (optional)</label>
              <input value={firmName} onChange={(e) => setFirmName(e.target.value)} placeholder="Starling Bank" className="w-full rounded-md border border-deepNavy/12 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-deepNavy">Fine Amount (optional)</label>
              <input value={fineAmount} onChange={(e) => setFineAmount(e.target.value)} placeholder="£28.96m" className="w-full rounded-md border border-deepNavy/12 px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-deepNavy">Source</label>
              <input value={source} onChange={(e) => setSource(e.target.value)} className="w-full rounded-md border border-deepNavy/12 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-deepNavy">Source URL</label>
              <input value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} className="w-full rounded-md border border-deepNavy/12 px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold text-deepNavy">Published Date</label>
            <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="rounded-md border border-deepNavy/12 px-3 py-2 text-sm" />
          </div>

          <label className="mb-1 block text-sm font-semibold text-deepNavy">Summary (2-3 sentences) *</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value.slice(0, 400))}
            rows={5}
            placeholder="The FCA fined..."
            className="w-full rounded-md border border-deepNavy/12 px-3 py-2 text-sm leading-relaxed"
          />
          <p className="mt-1 text-right font-mono text-[0.62rem] text-mutedText">{summary.length}/400 · ~{readTime} min read</p>
        </div>

        <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
          <h3 className="mb-3 border-l-4 border-metallicGold pl-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-metallicGold">What Happened *</h3>
          <TipTapEditor content={whatHappened} onChange={setWhatHappened} placeholder="Describe what happened..." />
        </div>

        <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
          <h3 className="mb-3 border-l-4 border-metallicGold pl-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-metallicGold">Why It Matters *</h3>
          <TipTapEditor content={whyItMatters} onChange={setWhyItMatters} placeholder="Explain why this matters for regulated SMEs..." />
        </div>

        <BulletListEditor label="What Went Wrong" items={whatWentWrong} onChange={setWhatWentWrong} placeholder="Weak governance oversight..." minItems={3} />
        <BulletListEditor label="Lessons for Regulated SMEs" items={lessonsForSMEs} onChange={setLessonsForSMEs} placeholder="Controls must be monitored..." minItems={3} />
        <BulletListEditor label="What Should Have Been Done" items={whatShouldHaveDone} onChange={setWhatShouldHaveDone} placeholder="Assign a named control owner..." minItems={3} />

        <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
          <h3 className="mb-3 border-l-4 border-metallicGold pl-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-metallicGold">How HIMAYA Helps *</h3>
          <TipTapEditor content={howHIMAYAHelps} onChange={setHowHIMAYAHelps} placeholder="HIMAYA helps regulated SMEs..." />
        </div>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-deepNavy">Status:</span>
            <button
              type="button"
              onClick={() => setStatus((s) => (s === "draft" ? "published" : "draft"))}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${status === "published" ? "bg-successGreen/15 text-successGreen" : "bg-deepNavy/10 text-slateText"}`}
            >
              {status === "published" ? "Published" : "Draft"}
            </button>
          </div>

          <label className="mb-4 flex items-center gap-2 text-sm text-slateText">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="accent-metallicGold" />
            Featured Article
          </label>

          {error && <p className="mb-3 text-sm text-dangerRed">{error}</p>}

          <button
            type="button"
            disabled={saving}
            onClick={() => void save("draft")}
            className="mb-2 w-full rounded-md border border-deepNavy/20 py-2.5 text-sm font-semibold text-deepNavy"
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => setShowPublishConfirm(true)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br from-metallicGold to-luminousGold py-2.5 text-sm font-bold text-deepNavy"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            Publish Article
          </button>
          <p className="mt-3 text-center font-mono text-[0.65rem] text-mutedText">{saveLabel}</p>
        </div>

        <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-deepNavy">Select Categories *</h3>
          <div className="grid grid-cols-2 gap-2">
            {APPROVED_CATEGORIES.map((cat) => (
              <label key={cat} className="flex cursor-pointer items-center gap-2 text-xs text-slateText">
                <input type="checkbox" checked={categories.includes(cat)} onChange={() => toggleCategory(cat)} className="accent-metallicGold" />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-deepNavy/7 bg-white p-5">
          <h3 className="mb-3 text-sm font-semibold text-deepNavy">Search Preview</h3>
          <p className="text-base text-[#1a0dab]">{seoTitle || "Article title"}</p>
          <p className="font-mono text-xs text-[#006621]">himaya.uk/fca-insights/{slugify(slug || title)}</p>
          <p className="mt-1 text-sm text-slateText">{seoDesc || "Summary preview..."}</p>
        </div>

        {articleId && (
          <Link href={`/fca-insights/${slugify(slug || title)}`} target="_blank" className="block text-center text-sm text-metallicGold hover:underline">
            Preview on site →
          </Link>
        )}
      </aside>

      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deepNavy/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="font-heading text-lg font-bold text-deepNavy">Publish this article?</h3>
            <p className="mt-2 text-sm text-slateText">It will be live immediately on the website.</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setShowPublishConfirm(false)} className="flex-1 rounded-md border py-2 text-sm">
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  setShowPublishConfirm(false);
                  const ok = await save("published");
                  if (ok) router.push("/admin/articles");
                }}
                className="flex-1 rounded-md bg-metallicGold py-2 text-sm font-bold text-deepNavy"
              >
                Yes, Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
