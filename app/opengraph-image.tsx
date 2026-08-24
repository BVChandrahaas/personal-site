import { ImageResponse } from "next/og";

export const alt = "B.V. Chandrahaas - AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: "24px", color: "#888780" }}>
          chandrahaas.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 700,
              color: "#171717",
              letterSpacing: "-0.02em",
            }}
          >
            B.V. Chandrahaas
          </div>
          <div style={{ display: "flex", fontSize: "28px", color: "#5f5e5a" }}>
            AI/ML Engineer building production LLM systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: "20px",
            color: "#0c447c",
          }}
        >
          <div style={{ display: "flex" }}>LLM Systems</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>RAG</div>
          <div style={{ display: "flex" }}>·</div>
          <div style={{ display: "flex" }}>Multi-Agent Systems</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
