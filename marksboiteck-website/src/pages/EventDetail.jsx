import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import EventFiveDetail from "../components/EventFiveDetail";
import EventSevenDetail from "../components/EventSevenDetail";
import EventEightDetail from "../components/EventEightDetail";
import EventNineDetail from "../components/EventNineDetail";
import EventTenDetail from "../components/EventTenDetail";
import EventElevenDetail from "../components/EventElevenDetail";
import EventTwelveDetail from "../components/EventTwelveDetail";
import EventFourteenDetail from "../components/EventFourteenDetail";
import EventFifteenDetail from "../components/EventFifteenDetail";
import EventSeventeenDetail from "../components/EventSeventeenDetail";
import EventEighteenDetail from "../components/EventEighteenDetail";
import EventNineteenDetail from "../components/EventNineteenDetail";
import EventTwentyDetail from "../components/EventTwentyDetail";
import EventTwentyOneDetail from "../components/EventTwentyOneDetail";
import EventTwentyTwoDetail from "../components/EventTwentyTwoDetail";
import EventTwentyFourDetail from "../components/EventTwentyFourDetail";
import EventTwentyFiveDetail from "../components/EventTwentyFiveDetail";
import EventTwentySixDetail from "../components/EventTwentySixDetail";
import EventTwentySevenDetail from "../components/EventTwentySevenDetail";
import EventTwentyEightDetail from "../components/EventTwentyEightDetail";
import EventTwentyNineDetail from "../components/EventTwentyNineDetail";
import EventThirtyDetail from "../components/EventThirtyDetail";
import EventThirtyTwoDetail from "../components/EventThirtyTwoDetail";
import EventThirtyThreeDetail from "../components/EventThirtyThreeDetail";
import VisualBlocksRenderer from "../components/VisualBlocksRenderer";
import "../styles/events.css";

export default function EventDetail() {
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(null);
  const [customEvent, setCustomEvent] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/events/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.title) {
          setCustomEvent(data);
        }
      })
      .catch(() => {});
  }, [id]);

  // If event has custom Visual Page Builder design blocks, render the live Elementor blocks!
  if (customEvent && customEvent.blocks_json) {
    try {
      const parsedBlocks =
        typeof customEvent.blocks_json === "string"
          ? JSON.parse(customEvent.blocks_json)
          : customEvent.blocks_json;
      if (Array.isArray(parsedBlocks) && parsedBlocks.length > 0) {
        return (
          <main style={{ minHeight: "80vh", background: "#ffffff" }}>
            <VisualBlocksRenderer blocks={parsedBlocks} />
          </main>
        );
      }
    } catch (e) {
      console.warn("Failed to parse event blocks_json:", e);
    }
  }

  const numId = parseInt(id, 10);
  const isExistingStaticEvent = [
    5, 7, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28,
    29, 30, 32, 33,
  ].includes(numId);

  // If newly created event not in 24 static IDs, render dynamic event template
  if (!isExistingStaticEvent && customEvent) {
    return (
      <main style={{ minHeight: "80vh", background: "#f8fafc", padding: "3rem 1.5rem" }}>
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid #e2e8f0",
          }}
        >
          <div style={{ position: "relative", height: "320px", background: "#11141c" }}>
            <img
              src={customEvent.image_url || "/assets/event/11.webp"}
              alt={customEvent.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.src = "/assets/event/11.webp";
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "24px",
                right: "24px",
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <span
                style={{
                  background: "#ce2017",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                {customEvent.badge_text || customEvent.type || "Workshop"}
              </span>
              <h1 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 800, margin: "10px 0 0" }}>
                {customEvent.title}
              </h1>
            </div>
          </div>
          <div style={{ padding: "2.5rem" }}>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid #e2e8f0",
                color: "#64748b",
                fontSize: "0.95rem",
              }}
            >
              <div>🗓️ <strong>{customEvent.date_string || "Dates TBA"}</strong></div>
              <div>📍 <strong>{customEvent.location || "Venue TBA"}</strong></div>
              <div>👨‍⚕️ <strong>{customEvent.speaker_name || "Faculty Specialist"}</strong></div>
              <div>🎟️ <strong style={{ color: "#ce2017" }}>{customEvent.price || "Free"}</strong></div>
            </div>
            <div style={{ padding: "2rem 0", fontSize: "1.1rem", lineHeight: 1.8, color: "#334155" }}>
              {customEvent.description}
            </div>
            {customEvent.registration_link && (
              <a
                href={customEvent.registration_link}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  padding: "14px 36px",
                  background: "#ce2017",
                  color: "#fff",
                  borderRadius: "8px",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Register for Event Now
              </a>
            )}
          </div>
        </div>
      </main>
    );
  }

  if (id === "5" || id === "event5" || id === "event-5") {
    return <EventFiveDetail />;
  }

  if (id === "7" || id === "event7" || id === "event-7") {
    return <EventSevenDetail />;
  }

  if (id === "8" || id === "event8" || id === "event-8") {
    return <EventEightDetail />;
  }

  if (id === "9" || id === "event9" || id === "event-9") {
    return <EventNineDetail />;
  }

  if (id === "10" || id === "event10" || id === "event-10") {
    return <EventTenDetail />;
  }

  if (id === "11" || id === "event11" || id === "event-11") {
    return <EventElevenDetail />;
  }

  if (id === "12" || id === "event12" || id === "event-12") {
    return <EventTwelveDetail />;
  }

  if (id === "14" || id === "event14" || id === "event-14") {
    return <EventFourteenDetail />;
  }

  if (id === "15" || id === "event15" || id === "event-15") {
    return <EventFifteenDetail />;
  }

  if (id === "17" || id === "event17" || id === "event-17") {
    return <EventSeventeenDetail />;
  }

  if (id === "18" || id === "event18" || id === "event-18") {
    return <EventEighteenDetail />;
  }

  if (id === "19" || id === "event19" || id === "event-19") {
    return <EventNineteenDetail />;
  }

  if (id === "20" || id === "event20" || id === "event-20") {
    return <EventTwentyDetail />;
  }

  if (id === "21" || id === "event21" || id === "event-21") {
    return <EventTwentyOneDetail />;
  }

  if (id === "22" || id === "event22" || id === "event-22") {
    return <EventTwentyTwoDetail />;
  }

  if (id === "24" || id === "event24" || id === "event-24") {
    return <EventTwentyFourDetail />;
  }

  if (id === "25" || id === "event25" || id === "event-25") {
    return <EventTwentyFiveDetail />;
  }

  if (id === "26" || id === "event26" || id === "event-26") {
    return <EventTwentySixDetail />;
  }

  if (id === "27" || id === "event27" || id === "event-27") {
    return <EventTwentySevenDetail />;
  }

  if (id === "28" || id === "event28" || id === "event-28") {
    return <EventTwentyEightDetail />;
  }

  if (id === "29" || id === "event29" || id === "event-29") {
    return <EventTwentyNineDetail />;
  }

  if (id === "30" || id === "event30" || id === "event-30") {
    return <EventThirtyDetail />;
  }

  if (id === "32" || id === "event32" || id === "event-32") {
    return <EventThirtyTwoDetail />;
  }

  if (id === "33" || id === "event33" || id === "event-33") {
    return <EventThirtyThreeDetail />;
  }

  // Gallery images if available (e.g. event 33)
  const galleryImages = [
    "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.28 PM (2).jpeg",
    "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.29 PM.jpeg",
    "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.29 PM (2).jpeg",
    "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.30 PM.jpeg",
    "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.31 PM.jpeg",
    "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.31 PM (2).jpeg",
  ];

  return (
    <main
      className="event-detail-page-main"
      style={{
        minHeight: "80vh",
        padding: "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        color: "#fff",
      }}
    >
      <div style={{ marginBottom: "30px" }}>
        <Link
          to="/events"
          style={{
            color: "#c81616",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          ← Back to All Events
        </Link>
      </div>

      <div
        className="event-detail-header"
        style={{ textAlign: "center", marginBottom: "40px" }}
      >
        <h1 style={{ fontSize: "36px", color: "#fff", marginBottom: "15px" }}>
          {customEvent ? customEvent.title : `EVENT #${id}`} - <span style={{ color: "#c81616" }}>MARKS BIOTECH</span>
        </h1>
        <p style={{ color: "#aaa", fontSize: "18px" }}>
          {customEvent?.description || "Excellence in Dental Implantology, Navigation & Clinical Mastery"}
        </p>
        {customEvent?.date_string && (
          <div style={{ color: "#e11d48", fontWeight: 700, marginTop: "8px", fontSize: "16px" }}>
            🗓️ {customEvent.date_string} &bull; 📍 {customEvent.location}
          </div>
        )}
      </div>

      {/* Main Poster / Hero image */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <img
          src={customEvent?.image_url || `/assets/event/${id}.webp`}
          onError={(e) => {
            e.currentTarget.src = "/assets/imgs/hero.webp";
          }}
          alt={customEvent?.title || `Event ${id}`}
          style={{
            maxWidth: "100%",
            maxHeight: "550px",
            borderRadius: "12px",
            border: "1px solid #333",
          }}
        />
      </div>

      {/* Event Details and Description */}
      <div
        style={{
          background: "#181818",
          padding: "30px",
          borderRadius: "12px",
          marginBottom: "40px",
          border: "1px solid #282828",
        }}
      >
        <h2 style={{ color: "#c81616", marginBottom: "20px" }}>
          Event Highlights &amp; Clinical Overview
        </h2>
        <p
          style={{
            lineHeight: "1.8",
            color: "#ddd",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          Join leading dental professionals, Key Opinion Leaders (KOLs), and
          clinical experts for an intensive, hands-on educational experience
          covering the latest protocols in guided implantology, robotic
          navigation with Navident, and bone regeneration.
        </p>
        <ul
          style={{
            lineHeight: "2",
            color: "#ccc",
            marginLeft: "20px",
            fontSize: "16px",
          }}
        >
          <li>Live Surgical Demonstrations &amp; Case Discussions</li>
          <li>Hands-on Dynamic Navigation Training with Navident</li>
          <li>Immediate Load Protocols &amp; Digital Workflow Integration</li>
          <li>Comprehensive Question &amp; Answer Session with Faculty</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <a
          href={customEvent?.registration_link || "https://forms.gle/gaHuNfEUe9TzGB8s5"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "16px 36px",
            background: "#c81616",
            color: "#fff",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: "bold",
            borderRadius: "30px",
            display: "inline-block",
            boxShadow: "0 4px 15px rgba(200, 22, 22, 0.4)",
          }}
        >
          Register for Upcoming Sessions
        </a>
      </div>

      {/* Photo Gallery if Event 33 */}
      {id === "33" && (
        <section
          className="event-gallery-section"
          style={{ marginTop: "50px" }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "28px",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            Live <span style={{ color: "#c81616" }}>Workshop Gallery</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                style={{
                  cursor: "pointer",
                  overflow: "hidden",
                  borderRadius: "10px",
                }}
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img}
                  alt={`Workshop ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Image Modal */}
      {selectedImg && (
        <div
          onClick={() => setSelectedImg(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <img
            src={selectedImg}
            alt="Enlarged gallery view"
            style={{ maxWidth: "90%", maxHeight: "90%", borderRadius: "8px" }}
          />
        </div>
      )}
    </main>
  );
}
