import { isArticleHtml, prepareArticleHtml } from "@/lib/article-html";

function formatInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-deepNavy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function RichText({ content, className = "" }: { content: string; className?: string }) {
  const trimmed = content.trim();
  if (!trimmed) return null;

  if (isArticleHtml(trimmed)) {
    const html = prepareArticleHtml(trimmed);
    return (
      <div
        className={`article-rich-text ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  const paragraphs = trimmed.split(/\n\n+/).filter(Boolean);
  return (
    <div className={className}>
      {paragraphs.map((p, i) => (
        <p key={i} className="mb-4 last:mb-0">
          {formatInline(p.trim())}
        </p>
      ))}
    </div>
  );
}
