import React from "react";

export default function VisualBlocksRenderer({ blocks = [] }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="visual-blocks-container" style={{ width: "100%", background: "#ffffff" }}>
      {blocks.map((b) => {
        if (!b) return null;

        // 1. HERO WIDGET
        if (b.type === "hero") {
          return (
            <section
              key={b.id}
              style={{
                background: b.bg || "#11141c",
                color: "#ffffff",
                padding: "4rem 1.5rem 3.5rem",
                position: "relative",
              }}
            >
              <div style={{ maxWidth: "880px", margin: "0 auto" }}>
                {b.badge && (
                  <span
                    style={{
                      background: "#ce2017",
                      color: "#fff",
                      padding: "4px 12px",
                      borderRadius: "4px",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      display: "inline-block",
                      marginBottom: "1rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {b.badge}
                  </span>
                )}
                <h1
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 2.9rem)",
                    fontWeight: 800,
                    lineHeight: 1.25,
                    margin: "0 0 1.2rem",
                    color: "#ffffff",
                  }}
                >
                  {b.title}
                </h1>
                {b.subtitle && (
                  <p
                    style={{
                      fontSize: "1.15rem",
                      color: "#cbd5e1",
                      lineHeight: 1.65,
                      margin: "0 0 1.8rem",
                    }}
                  >
                    {b.subtitle}
                  </p>
                )}
                {(b.date || b.location) && (
                  <div
                    style={{
                      display: "flex",
                      gap: "2rem",
                      flexWrap: "wrap",
                      color: "#94a3b8",
                      fontSize: "0.95rem",
                      borderTop: "1px solid rgba(255,255,255,0.12)",
                      paddingTop: "1.2rem",
                    }}
                  >
                    {b.date && (
                      <div>
                        🗓️ <strong style={{ color: "#ffffff" }}>{b.date}</strong>
                      </div>
                    )}
                    {b.location && (
                      <div>
                        📍 <strong style={{ color: "#ffffff" }}>{b.location}</strong>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
          );
        }

        // 2. HEADING WIDGET
        if (b.type === "heading") {
          const Tag = b.level || "h2";
          const fontSize = b.level === "h1" ? "2.3rem" : b.level === "h3" ? "1.4rem" : "1.85rem";
          return (
            <div key={b.id} style={{ padding: "1.75rem 1.5rem 0.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <Tag style={{ fontSize, fontWeight: 800, color: "#1a1f2b", margin: 0, lineHeight: 1.3 }}>
                {b.text}
              </Tag>
            </div>
          );
        }

        // 3. TEXT WIDGET
        if (b.type === "text") {
          return (
            <div key={b.id} style={{ padding: "1rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.85,
                  color: "#334155",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {b.text}
              </p>
            </div>
          );
        }

        // 4. IMAGE WIDGET
        if (b.type === "image") {
          return (
            <div key={b.id} style={{ padding: "1.5rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                }}
              >
                <img
                  src={b.url}
                  alt={b.alt || ""}
                  style={{ width: "100%", maxHeight: "500px", objectFit: "cover", display: "block" }}
                />
              </div>
              {b.caption && (
                <div style={{ fontSize: "0.85rem", color: "#64748b", textAlign: "center", marginTop: "8px" }}>
                  {b.caption}
                </div>
              )}
            </div>
          );
        }

        // 5. BUTTON WIDGET
        if (b.type === "button") {
          return (
            <div key={b.id} style={{ padding: "2rem 1.5rem", textAlign: b.align || "center", maxWidth: "880px", margin: "0 auto" }}>
              <a
                href={b.link || "#"}
                target={b.link?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "14px 38px",
                  background: "#ce2017",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  borderRadius: "8px",
                  boxShadow: "0 4px 14px rgba(206, 32, 23, 0.35)",
                }}
              >
                {b.text}
              </a>
            </div>
          );
        }

        // 6. FEATURES WIDGET
        if (b.type === "features") {
          return (
            <div key={b.id} style={{ padding: "1.5rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "2rem",
                }}
              >
                {b.title && (
                  <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1a1f2b", margin: "0 0 1.25rem 0" }}>
                    {b.title}
                  </h3>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  {(b.items || []).map((item, idx) => (
                    <li key={idx} style={{ color: "#334155", fontSize: "1rem", display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span style={{ color: "#059669", fontWeight: 800, fontSize: "1.1rem" }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        // 7. SPEAKER CARD WIDGET
        if (b.type === "speaker_card") {
          return (
            <div key={b.id} style={{ padding: "1.5rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 16px rgba(16, 24, 40, 0.06)",
                  borderRadius: "12px",
                  padding: "1.75rem",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={b.avatar || "/assets/imgs/logo.webp"}
                  alt={b.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #ce2017",
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: "1 1 240px" }}>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1f2b" }}>
                    {b.name}
                  </div>
                  {b.title && (
                    <div style={{ fontSize: "0.9rem", color: "#ce2017", fontWeight: 600, marginTop: "2px" }}>
                      {b.title}
                    </div>
                  )}
                  {b.bio && (
                    <p style={{ fontSize: "0.92rem", color: "#64748b", margin: "8px 0 0", lineHeight: 1.5 }}>
                      {b.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        }

        // 8. AGENDA TABLE WIDGET
        if (b.type === "agenda_table") {
          return (
            <div key={b.id} style={{ padding: "1.5rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              {b.title && (
                <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1a1f2b", marginBottom: "1rem" }}>
                  {b.title}
                </h3>
              )}
              <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden", background: "#ffffff" }}>
                {(b.rows || []).map((row, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem",
                      borderBottom: "1px solid #edf2f7",
                      background: idx % 2 === 0 ? "#f8fafc" : "#ffffff",
                      fontSize: "0.92rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <strong style={{ color: "#ce2017", width: "200px" }}>{row.time}</strong>
                    <span style={{ color: "#1a1f2b", flex: 1, fontWeight: 600 }}>{row.session}</span>
                    <span style={{ color: "#64748b" }}>{row.speaker}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // 9. CTA BOX WIDGET
        if (b.type === "cta_box") {
          return (
            <div key={b.id} style={{ padding: "2.5rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%)",
                  border: "1px solid #fecaca",
                  borderRadius: "14px",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  boxShadow: "0 6px 20px rgba(206, 32, 23, 0.08)",
                }}
              >
                {b.title && (
                  <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1a1f2b", margin: "0 0 0.5rem" }}>
                    {b.title}
                  </h3>
                )}
                {b.price && (
                  <div style={{ fontSize: "2.4rem", fontWeight: 800, color: "#ce2017", marginBottom: "0.4rem" }}>
                    {b.price}
                  </div>
                )}
                {b.seatsText && (
                  <div style={{ fontSize: "0.92rem", color: "#059669", fontWeight: 600, marginBottom: "1.5rem" }}>
                    {b.seatsText}
                  </div>
                )}
                <a
                  href={b.buttonLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "14px 40px",
                    background: "#ce2017",
                    color: "#ffffff",
                    borderRadius: "30px",
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "1.05rem",
                    boxShadow: "0 4px 15px rgba(206,32,23,0.35)",
                  }}
                >
                  {b.buttonText || "Register Now"}
                </a>
              </div>
            </div>
          );
        }

        // 10. QUOTE BOX WIDGET
        if (b.type === "quote_box") {
          return (
            <div key={b.id} style={{ padding: "1.5rem 1.5rem", maxWidth: "880px", margin: "0 auto" }}>
              <blockquote
                style={{
                  margin: 0,
                  padding: "1.5rem 2rem",
                  background: "#f8fafc",
                  borderLeft: "4px solid #ce2017",
                  borderRadius: "0 10px 10px 0",
                  boxShadow: "0 2px 8px rgba(16, 24, 40, 0.04)",
                }}
              >
                <p style={{ color: "#1a1f2b", fontSize: "1.15rem", fontStyle: "italic", margin: "0 0 0.5rem", lineHeight: 1.65 }}>
                  "{b.quote}"
                </p>
                {b.author && (
                  <cite style={{ color: "#64748b", fontSize: "0.9rem", fontWeight: 600, display: "block" }}>
                    — {b.author}
                  </cite>
                )}
              </blockquote>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
