import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "ACE Education USA";
    const category = searchParams.get("category") || "1-on-1 Academic Tutoring & Test Prep";
    const subtitle = searchParams.get("subtitle") || "Nationwide K-12 & College Admissions";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#0A192F",
            backgroundImage: "radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 40%)",
            color: "#FFFFFF",
            fontFamily: "sans-serif",
            padding: "60px 80px",
            boxSizing: "border-box",
          }}
        >
          {/* Top Bar / Logo */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: "#D4AF37",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0A192F",
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                A
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#D4AF37", fontWeight: "800", fontSize: "22px", letterSpacing: "1px" }}>
                  ACE EDUCATION USA
                </span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                  https://aceeducation.us
                </span>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(212, 175, 55, 0.15)",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                color: "#D4AF37",
                padding: "8px 20px",
                borderRadius: "20px",
                fontSize: "14px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {category}
            </div>
          </div>

          {/* Center Main Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
            <h1
              style={{
                fontSize: title.length > 50 ? "46px" : "56px",
                fontWeight: "900",
                color: "#FFFFFF",
                lineHeight: "1.2",
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "rgba(255, 255, 255, 0.8)",
                margin: 0,
                lineHeight: "1.4",
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Footer Specs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255, 255, 255, 0.15)",
              paddingTop: "24px",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "16px",
            }}
          >
            <div style={{ display: "flex", gap: "24px" }}>
              <span>✓ Top 1% Vetted Tutors</span>
              <span>✓ All 50 US States</span>
              <span>✓ Guaranteed Diagnostic Growth</span>
            </div>
            <div style={{ color: "#D4AF37", fontWeight: "700" }}>
              ACE EDUCATION USA
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate OpenGraph image: ${e.message}`, {
      status: 500,
    });
  }
}
