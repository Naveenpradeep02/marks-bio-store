import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-33.css";

export default function EventThirtyThreeDetail() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isBannerLightbox, setIsBannerLightbox] = useState(false);

  useEffect(() => {
    document.title =
      "Advanced Live Surgical & Prosthetic Workshop | ClaroNav Dental | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.28 PM (2).jpeg",
      alt: "Faculty, Dignitaries and Delegates on Stage at Manipal College of Dental Sciences",
      caption:
        "Faculty, Dignitaries and Delegates on Stage at Manipal College of Dental Sciences",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.29 PM.jpeg",
      alt: "Navident Robotic Dynamic Navigation Tracking Unit on Stage Demonstrating Live CT Alignment",
      caption:
        "Navident Robotic Dynamic Navigation Tracking Unit on Stage Demonstrating Live CT Alignment",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.29 PM (2).jpeg",
      alt: "Felicitation Ceremony and Dignitaries on Stage at Dr. T.M.A Pai Auditorium",
      caption:
        "Felicitation Ceremony and Dignitaries on Stage at Dr. T.M.A Pai Auditorium",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.30 PM.jpeg",
      alt: "Live Surgical Demonstration on Giant Screen Showing Precision Handpiece Instrumentation",
      caption:
        "Live Surgical Demonstration on Giant Screen Showing Precision Handpiece Instrumentation",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.31 PM (2).jpeg",
      alt: "Keynote Lecture by Dr. Homa H. Zadeh on Dynamic Navigation, Digital Workflow & VISTA",
      caption:
        "Keynote Lecture by Dr. Homa H. Zadeh on Dynamic Navigation, Digital Workflow & VISTA",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.31 PM.jpeg",
      alt: "CBCT Digital Cross-Sectional Diagnostic Planning and Dynamic Implant Angulation",
      caption:
        "CBCT Digital Cross-Sectional Diagnostic Planning and Dynamic Implant Angulation",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.32 PM (2).jpeg",
      alt: "Auditorium Audience of Clinicians, Postgraduates and Academic Faculty Engaged in Workshop",
      caption:
        "Auditorium Audience of Clinicians, Postgraduates and Academic Faculty Engaged in Workshop",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.32 PM (1).jpeg",
      alt: "Real-time Multi-Angle Live Surgical Feed Broadcast to Delegates",
      caption:
        "Real-time Multi-Angle Live Surgical Feed Broadcast to Delegates",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.32 PM.jpeg",
      alt: "Navident - VISTA Inaugural Stage Session and Dignitaries Panel",
      caption:
        "Navident - VISTA Inaugural Stage Session and Dignitaries Panel",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.33 PM.jpeg",
      alt: "Memento and Felicitation Honors Presented to Keynote Clinical Masters",
      caption:
        "Memento and Felicitation Honors Presented to Keynote Clinical Masters",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.33 PM (1).jpeg",
      alt: "Panel Discussion on Advanced Complex Surgery and Clinical Protocols",
      caption:
        "Panel Discussion on Advanced Complex Surgery and Clinical Protocols",
    },
    {
      src: "/assets/event/event33/WhatsApp Image 2026-09-02 at 5.36.34 PM (1).jpeg",
      alt: "Split-Screen Display Showing Dynamic Real-Time Drill Guidance and 3D Trajectory",
      caption:
        "Split-Screen Display Showing Dynamic Real-Time Drill Guidance and 3D Trajectory",
    },
  ];

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Advanced Live Surgical & Prosthetic Workshop | ClaroNav Dental | Marks Biotech";

    if (platform === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (platform === "instagram") {
      window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
    } else if (platform === "youtube") {
      window.open("https://www.youtube.com", "_blank", "noopener,noreferrer");
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  return (
    <main className="event33-page-main">
      <div className="event33-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event33-back-wrap">
          <Link to="/events" className="event33-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section (Image 1 Content) */}
        <section className="event33-hero-grid">
          <div>
            {/*
            <div className="event33-brand-row">
              <span className="event33-badge-brand">
                <i className="fa-solid fa-circle-dot"></i> CLARONAV DENTAL
              </span>
              <span className="event33-badge-tag">LIVE WORKSHOP</span>
            </div>
            */}

            <h1 className="event33-title">
              ADVANCED <br />
              <span>LIVE SURGICAL</span> <br />
              &amp; PROSTHETIC WORKSHOP
            </h1>

            {/*
            <div className="event33-subtitle">
              Dynamic Navigation, Digital Workflow &amp; VISTA Techniques to Optimize Implant Outcomes
            </div>

            <div className="event33-meta-chips">
              <span className="event33-meta-chip">
                <i className="fa-solid fa-building-columns"></i>
                MAHE, Manipal, Karnataka, India
              </span>
              <span className="event33-meta-chip">
                <i className="fa-regular fa-calendar-days"></i>
                8th August 2026 | 9:00 AM to 4:00 PM
              </span>
              <span className="event33-meta-chip">
                <i className="fa-solid fa-microchip"></i>
                Robotic Dynamic Navigation (Navident)
              </span>
            </div>
            */}
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event33-banner-frame"
            onClick={() => setIsBannerLightbox(true)}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge workshop banner"
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsBannerLightbox(true);
            }}
          >
            <img
              src="/assets/event/33.png"
              alt="Advanced Live Surgical &amp; Prosthetic Workshop - Manipal &amp; ClaroNav Dental"
              className="event33-banner-img"
              loading="eager"
            />
            {/*
            <div className="event33-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Enlarge Banner
            </div>
            */}
          </div>
        </section>

        {/*
        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event33-content-layout">
          Left Sidebar
          <aside className="event33-sidebar">
            <div className="event33-sidebar-block">
              <div className="event33-sidebar-title">TAGS</div>
              <div className="event33-tags-list">
                <div className="event33-tag-item">
                  <Link to="/events" className="event33-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event33-tag-item">
                  <Link to="/events" className="event33-tag-link">
                    WORKSHOPS
                  </Link>
                </div>
                <div className="event33-tag-item">
                  <Link to="/events" className="event33-tag-link">
                    LIVE SURGICAL
                  </Link>
                </div>
                <div className="event33-tag-item">
                  <Link to="/events" className="event33-tag-link">
                    ROBOTIC NAVIGATION
                  </Link>
                </div>
              </div>
            </div>

            <div className="event33-sidebar-block">
              <div className="event33-sidebar-title">Share</div>
              <div className="event33-share-icons">
                <button
                  type="button"
                  className="event33-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event33-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event33-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event33-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            Quick Facts Snapshot
            <div className="event33-quick-facts">
              <div className="event33-fact-row">
                <span className="event33-fact-label">Programme:</span>
                <span className="event33-fact-val">CDE Programme &ldquo;Navident-VISTA&rdquo;</span>
              </div>
              <div className="event33-fact-row">
                <span className="event33-fact-label">Organized By:</span>
                <span className="event33-fact-val">Manipal College of Dental Sciences &amp; ClaroNav</span>
              </div>
              <div className="event33-fact-row">
                <span className="event33-fact-label">Faculty:</span>
                <span className="event33-fact-val">Dr. Homa H. Zadeh DDS, PhD</span>
              </div>
              <div className="event33-fact-row">
                <span className="event33-fact-label">Core Technology:</span>
                <span className="event33-fact-val">Navident Dynamic Navigation + CBCT &amp; IOS</span>
              </div>
            </div>
          </aside>

          Right Main Column
          <div className="event33-main-column">
            Clinical Overview &amp; Capability Matrix
            <section className="event33-block-card">
              <h2 className="event33-section-heading">
                Workshop Scope &amp; <span>Clinical Mastery</span>
              </h2>
              <p className="event33-lead-p">
                The <strong>Advanced Live Surgical &amp; Prosthetic Workshop</strong> brings together next-generation robotic dynamic navigation, real-time optical tracking, and minimally invasive surgical protocols. Designed for clinicians, postgraduates, and oral surgeons, this intensive program bridges the gap between advanced diagnostics and chairside precision.
              </p>

              Three Pillared Technology Matrix
              <div className="event33-capabilities-grid">
                Pillar 1: Complex Surgery Simplified
                <div className="event33-cap-card">
                  <div className="event33-cap-icon">
                    <i className="fa-solid fa-brain"></i>
                  </div>
                  <h3 className="event33-cap-title">Complex Surgery Simplified</h3>
                  <ul className="event33-cap-items">
                    <li><i className="fa-solid fa-check"></i> Zygoma Implants</li>
                    <li><i className="fa-solid fa-check"></i> Pterygoid Implants</li>
                    <li><i className="fa-solid fa-check"></i> BSSO Protocols</li>
                    <li><i className="fa-solid fa-check"></i> Orthognathic Surgery</li>
                  </ul>
                </div>

                Pillar 2: Treatment Plan - CBCT &amp; IOS
                <div className="event33-cap-card">
                  <div className="event33-cap-icon">
                    <i className="fa-solid fa-cube"></i>
                  </div>
                  <h3 className="event33-cap-title">Treatment Plan – CBCT &amp; IOS</h3>
                  <ul className="event33-cap-items">
                    <li><i className="fa-solid fa-check"></i> 3D Patient CBCT Merging</li>
                    <li><i className="fa-solid fa-check"></i> Guided Implant Placement</li>
                    <li><i className="fa-solid fa-check"></i> Predictable Osseointegration</li>
                    <li><i className="fa-solid fa-check"></i> Live Optical Stereo Tracking</li>
                  </ul>
                </div>

                Pillar 3: Prosthetic Excellence
                <div className="event33-cap-card">
                  <div className="event33-cap-icon">
                    <i className="fa-solid fa-tooth"></i>
                  </div>
                  <h3 className="event33-cap-title">Dental Implant Prosthetics</h3>
                  <ul className="event33-cap-items">
                    <li><i className="fa-solid fa-check"></i> Monolithic &amp; Zirconia Crown</li>
                    <li><i className="fa-solid fa-check"></i> Custom Multi-Unit Abutment</li>
                    <li><i className="fa-solid fa-check"></i> Biocompatible Fixtures</li>
                    <li><i className="fa-solid fa-check"></i> Full-Arch Passivity</li>
                  </ul>
                </div>
              </div>
            </section>

            Keynote Faculty &amp; Resource Person
            <section className="event33-block-card">
              <h2 className="event33-section-heading">
                Resource Person &amp; <span>Keynote Innovator</span>
              </h2>

              <div className="event33-faculty-card">
                <div className="event33-faculty-avatar" style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#1a222d", color: "#ce2017", fontSize: "36px" }}>
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div>
                  <h3 className="event33-faculty-name">Dr. Homa H. Zadeh DDS, PhD</h3>
                  <div className="event33-faculty-role">
                    Director of VISTA Institute for Therapeutic Innovations | Innovator of the VISTA Technique
                  </div>
                  <ul className="event33-faculty-creds">
                    <li>Past President, Western Society of Periodontology (2017)</li>
                    <li>Former Director, Post-doctoral Periodontology Program, University of Southern California (USC)</li>
                    <li>International Key Opinion Leader: Lectured in 40+ countries with 100+ peer-reviewed scientific publications</li>
                  </ul>
                </div>
              </div>
            </section>

            Venue &amp; Location
            <section className="event33-block-card">
              <h2 className="event33-section-heading">Venue</h2>
              <div className="event33-venue-card">
                <div className="event33-venue-info">
                  <div className="event33-venue-icon">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div>
                    <h3 className="event33-venue-name">Dr. T.M.A Pai Auditorium</h3>
                    <div className="event33-venue-sub">3rd Floor, Old Library Building | Manipal Academy of Higher Education</div>
                    <p className="event33-venue-addr">
                      Department of Periodontology, Manipal College of Dental Sciences<br />
                      Manipal, Karnataka, India
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Manipal+College+of+Dental+Sciences+Manipal+Karnataka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event33-venue-btn"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Open in Maps
                </a>
              </div>
            </section>
          </div>
        </section>
        */}

        {/* LIVE EVENT GALLERY (Image 2 Content) */}
        <section className="event33-gallery-section">
          <div className="event33-gallery-header">
            <h2 className="event33-gallery-title">
              LIVE <span>EVENT GALLERY</span>
            </h2>
            {/*
            <p className="event33-gallery-sub">
              Moments of precision, robotic navigation &amp; clinical mastery captured during the live surgical workshop.
            </p>
            */}
          </div>

          {/* 12-Image Live Workshop Grid */}
          <div className="event33-gallery-grid">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="event33-gallery-item"
                onClick={() => setLightboxIndex(idx)}
                role="button"
                tabIndex={0}
                aria-label={`View photo ${idx + 1}: ${image.caption}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setLightboxIndex(idx);
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="event33-gallery-img"
                  loading="lazy"
                />
                <div className="event33-gallery-overlay">
                  <div className="event33-overlay-icon">
                    <i className="fa-solid fa-expand"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/*
          CTA Box - Hidden per user request
          <div className="event33-cta-box">
            <h3 className="event33-cta-title">
              Experience the Future of Dynamic Navigation
            </h3>
            <p className="event33-cta-desc">
              Interested in organizing or participating in hands-on Navident surgical workshops? Connect with Marks Biotech specialists today.
            </p>
            <div className="event33-cta-actions">
              <a
                href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20the%20Navident%20Advanced%20Live%20Surgical%20Workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="event33-btn-primary"
              >
                <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
              </a>
              <Link to="/events" className="event33-btn-secondary">
                <i className="fa-solid fa-list-check"></i> Explore All Events
              </Link>
            </div>
          </div>
          */}
        </section>
      </div>

      {/* Lightbox Modal for Gallery Images */}
      {lightboxIndex !== null && (
        <div
          className="event33-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event33-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event33-lightbox-close"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>

            <button
              type="button"
              className="event33-lightbox-nav event33-lightbox-prev"
              onClick={prevImage}
              aria-label="Previous photo"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="event33-lightbox-img"
            />

            <div className="event33-lightbox-caption">
              {galleryImages[lightboxIndex].caption}
            </div>

            <button
              type="button"
              className="event33-lightbox-nav event33-lightbox-next"
              onClick={nextImage}
              aria-label="Next photo"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Banner */}
      {isBannerLightbox && (
        <div
          className="event33-lightbox"
          onClick={() => setIsBannerLightbox(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event33-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event33-lightbox-close"
              onClick={() => setIsBannerLightbox(false)}
              aria-label="Close banner preview"
            >
              &times;
            </button>
            <img
              src="/assets/event/33.png"
              alt="Advanced Live Surgical &amp; Prosthetic Workshop"
              className="event33-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
