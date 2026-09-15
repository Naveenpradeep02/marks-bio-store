import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/events.css";

export default function EventDetail() {
  const { id } = useParams();
  const [selectedImg, setSelectedImg] = useState(null);

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
          EVENT #{id} - <span style={{ color: "#c81616" }}>MARKS BIOTECH</span>
        </h1>
        <p style={{ color: "#aaa", fontSize: "18px" }}>
          Excellence in Dental Implantology, Navigation &amp; Clinical Mastery
        </p>
      </div>

      {/* Main Poster / Hero image */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <img
          src={`/assets/event/${id}.webp`}
          onError={(e) => {
            e.currentTarget.src = "/assets/imgs/hero.webp";
          }}
          alt={`Event ${id}`}
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
          href="https://forms.gle/gaHuNfEUe9TzGB8s5"
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
