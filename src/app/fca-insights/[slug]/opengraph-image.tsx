import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/articles-server";

export const runtime = "nodejs";
export const alt = "FCA Regulatory Insight — HIMAYA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;

  let title = "FCA Regulatory Insights";
  let firmName = "";

  try {
    const article = await getArticleBySlug(slug);
    if (article) {
      title = article.title;
      firmName = article.firmName ?? "";
    }
  } catch {
    /* fallback to generic */
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#071827",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "4px",
            background: "#D4A017",
            marginBottom: "32px",
          }}
        />
        <div
          style={{
            fontSize: "24px",
            color: "#D4A017",
            letterSpacing: "0.12em",
            marginBottom: "20px",
            fontWeight: 700,
          }}
        >
          FCA INSIGHTS · HIMAYA
        </div>
        {firmName ? (
          <div
            style={{
              fontSize: "22px",
              color: "rgba(255,253,247,0.55)",
              marginBottom: "16px",
            }}
          >
            {firmName}
          </div>
        ) : null}
        <div
          style={{
            fontSize: firmName ? "44px" : "52px",
            color: "#FFFDF7",
            lineHeight: 1.15,
            maxWidth: "1000px",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "18px",
            color: "rgba(255,253,247,0.35)",
            letterSpacing: "0.1em",
          }}
        >
          himaya.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
