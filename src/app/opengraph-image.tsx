import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HIMAYA — Continuous Regulatory Assurance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            fontSize: "28px",
            color: "#D4A017",
            letterSpacing: "0.15em",
            marginBottom: "24px",
            fontWeight: 700,
          }}
        >
          HIMAYA
        </div>
        <div
          style={{
            fontSize: "56px",
            color: "#FFFDF7",
            lineHeight: 1.1,
            maxWidth: "800px",
            fontWeight: 700,
            marginBottom: "24px",
          }}
        >
          Continuous Regulatory Assurance for Regulated SMEs
        </div>
        <div
          style={{
            fontSize: "22px",
            color: "rgba(255,253,247,0.6)",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          Control drift detection · Evidence tracking · Remediation ownership · Board reporting
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
