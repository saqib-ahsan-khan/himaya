const ALLOWED_TAGS = new Set([
  "p",
  "br",
  "strong",
  "em",
  "b",
  "i",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
  "hr",
]);

export function isArticleHtml(content: string): boolean {
  return /<(?:p|br|strong|em|h[23]|ul|ol|li|blockquote)\b/i.test(content.trim());
}

/** TipTap sometimes saves one sentence as many short <p> blocks — merge when only the last ends a sentence. */
export function normalizeFragmentedHtml(html: string): string {
  if (!/<p>/i.test(html)) return html;

  const paragraphContents: string[] = [];
  const regex = /<p>([\s\S]*?)<\/p>/gi;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    paragraphContents.push(match[1].trim());
  }

  if (paragraphContents.length <= 1) return html;

  const allFragments = paragraphContents.every((text, i) => {
    if (i === paragraphContents.length - 1) return true;
    return !/[.!?]["']?\s*$/.test(text);
  });

  if (!allFragments) return html;

  const merged = paragraphContents.join(" ").replace(/\s+/g, " ");
  return `<p>${merged}</p>`;
}

export function sanitizeArticleHtml(html: string): string {
  let out = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\s+on\w+="[^"]*"/gi, "")
    .replace(/\s+on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");

  out = out.replace(/<\/?([a-z0-9]+)(?:\s[^>]*)?\/?>/gi, (full, tag) => {
    const t = String(tag).toLowerCase();
    if (!ALLOWED_TAGS.has(t)) return "";
    if (full.startsWith("</")) return `</${t}>`;
    if (t === "br" || t === "hr") return `<${t}>`;
    return `<${t}>`;
  });

  return out;
}

export function prepareArticleHtml(content: string): string {
  const trimmed = content.trim();
  if (!trimmed) return "";
  if (!isArticleHtml(trimmed)) return trimmed;
  return sanitizeArticleHtml(normalizeFragmentedHtml(trimmed));
}
