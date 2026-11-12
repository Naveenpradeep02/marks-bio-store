import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const API_BASE = "http://127.0.0.1:5000/api";

export default function WebsitePopup() {
  const [activePopup, setActivePopup] = useState(null);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    async function checkPopups() {
      try {
        const res = await fetch(`${API_BASE}/popups/active`);
        if (!res.ok) return;
        const data = await res.json();

        if (!data.masterEnabled || !data.popups || data.popups.length === 0) {
          setActivePopup(null);
          setVisible(false);
          return;
        }

        // Find eligible popup for current route
        const currentPath = location.pathname;
        const eligible = data.popups.find((p) => {
          if (!p.is_active) return false;

          // Check frequency
          if (p.show_frequency === "once_per_session") {
            const dismissedKey = `mb_popup_dismissed_${p.id}`;
            if (sessionStorage.getItem(dismissedKey)) {
              return false;
            }
          }

          // Check target pages
          if (!p.target_pages || p.target_pages === "*" || p.target_pages.trim() === "") {
            return true;
          }
          const pages = p.target_pages.split(",").map((s) => s.trim());
          return pages.includes(currentPath);
        });

        if (eligible && isMounted) {
          setActivePopup(eligible);
          const delayMs = (eligible.delay_seconds || 2) * 1000;
          const timer = setTimeout(() => {
            if (isMounted) setVisible(true);
          }, delayMs);

          return () => clearTimeout(timer);
        }
      } catch (err) {
        // Silently ignore popup fetch error on network hiccups
      }
    }

    checkPopups();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  function handleDismiss() {
    setVisible(false);
    if (activePopup) {
      sessionStorage.setItem(`mb_popup_dismissed_${activePopup.id}`, "true");
    }
  }

  if (!activePopup || !visible) return null;

  const isEvent = activePopup.type === "event";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999999,
        background: "rgba(10, 15, 29, 0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "mbFadeIn 0.25s ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
    >
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          maxWidth: isEvent ? "540px" : "480px",
          width: "100%",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 25px rgba(206, 32, 23, 0.1)",
          position: "relative",
          color: "#1a1f2b",
          fontFamily: "inherit",
          animation: "mbScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            zIndex: 10,
            background: "rgba(0, 0, 0, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e11d48")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0, 0, 0, 0.6)")}
        >
          ×
        </button>

        {/* Image / Flyer Header */}
        {activePopup.image_url && (
          <div style={{ position: "relative", width: "100%", maxHeight: "220px", overflow: "hidden" }}>
            <img
              src={activePopup.image_url}
              alt={activePopup.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {activePopup.badge_text && (
              <span
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "14px",
                  background: isEvent ? "#e11d48" : "#2563eb",
                  color: "#fff",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {activePopup.badge_text}
              </span>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: "1.5rem 1.75rem" }}>
          {!activePopup.image_url && activePopup.badge_text && (
            <span
              style={{
                display: "inline-block",
                background: isEvent ? "#e11d48" : "#2563eb",
                color: "#fff",
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                padding: "3px 8px",
                borderRadius: "4px",
                marginBottom: "0.75rem",
              }}
            >
              {activePopup.badge_text}
            </span>
          )}

          <h3
            style={{
              margin: "0 0 0.5rem",
              fontSize: "1.35rem",
              fontWeight: 800,
              color: "#1a1f2b",
              lineHeight: 1.3,
            }}
          >
            {activePopup.title}
          </h3>

          {activePopup.subtitle && (
            <p
              style={{
                margin: "0 0 0.75rem",
                fontSize: "0.92rem",
                color: "#475569",
                fontWeight: 500,
                lineHeight: 1.4,
              }}
            >
              {activePopup.subtitle}
            </p>
          )}

          {/* Event Specific Meta */}
          {isEvent && (activePopup.event_date || activePopup.event_location) && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                margin: "0.75rem 0 1rem",
                padding: "0.6rem 0.9rem",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "0.85rem",
                color: "#cbd5e1",
              }}
            >
              {activePopup.event_date && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>📅</span>
                  <strong>{activePopup.event_date}</strong>
                </div>
              )}
              {activePopup.event_location && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>📍</span>
                  <span>{activePopup.event_location}</span>
                </div>
              )}
            </div>
          )}

          {activePopup.content && (
            <div
              style={{
                margin: "0 0 1.25rem",
                fontSize: "0.88rem",
                color: "#cbd5e1",
                lineHeight: 1.55,
              }}
            >
              {activePopup.content}
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginTop: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            {activePopup.button_text && (
              <a
                href={activePopup.button_link || "#"}
                onClick={handleDismiss}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "0.7rem 1.25rem",
                  background: isEvent
                    ? "linear-gradient(135deg, #e11d48, #be123c)"
                    : "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {activePopup.button_text}
              </a>
            )}

            {activePopup.secondary_button_text && (
              <a
                href={activePopup.secondary_button_link || "#"}
                onClick={handleDismiss}
                style={{
                  padding: "0.7rem 1.1rem",
                  background: "transparent",
                  color: "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#fff";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "#cbd5e1";
                }}
              >
                {activePopup.secondary_button_text}
              </a>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes mbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes mbScaleUp {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
