import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-15.css";

export default function EventFifteenDetail() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Guided System Software for Dentists and Dental Technicians | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Guided System Software for Dentists and Dental Technicians | Marks Biotech";

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

  return (
    <main className="event15-page-main">
      <div className="event15-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event15-back-wrap">
          <Link to="/events" className="event15-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event15-hero-grid">
          <div>
            <span className="event15-badge-pill">WORKSHOP</span>
            <h1 className="event15-title">
              Guided System Software for Dentists and Dental Technicians
            </h1>
            <div className="event15-subtitle">
              Online Training Session | 2026
            </div>
            <div className="event15-meta-chips">
              <span className="event15-meta-chip">
                <i className="fa-solid fa-play"></i>
                Mode: On-Demand Online Course
              </span>
              <span className="event15-meta-chip">
                <i className="fa-solid fa-globe"></i>
                Location: Online Training Program
              </span>
              <span className="event15-meta-chip">
                <i className="fa-solid fa-laptop-medical"></i>
                Platform: B&amp;B Dental Guided System
              </span>
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event15-banner-frame"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxOpen(true);
            }}
          >
            <img
              src="/assets/event/9.webp"
              alt="Guided System Software for Dentists and Dental Technicians - B&B Dental"
              className="event15-banner-img"
              loading="eager"
            />
            <div className="event15-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event15-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event15-sidebar">
            <div className="event15-sidebar-block">
              <div className="event15-sidebar-title">TAGS</div>
              <div className="event15-tags-list">
                <div className="event15-tag-item">
                  <Link to="/events" className="event15-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event15-tag-item">
                  <Link to="/events" className="event15-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event15-tag-item">
                  <Link to="/events" className="event15-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event15-sidebar-block">
              <div className="event15-sidebar-title">Share</div>
              <div className="event15-share-icons">
                <button
                  type="button"
                  className="event15-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event15-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event15-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event15-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Course Snapshot */}
            <div className="event15-quick-facts">
              <div className="event15-fact-row">
                <span className="event15-fact-label">Mode:</span>
                <span className="event15-fact-val">On-Demand Online Course</span>
              </div>
              <div className="event15-fact-row">
                <span className="event15-fact-label">Location:</span>
                <span className="event15-fact-val">Online Training Program</span>
              </div>
              <div className="event15-fact-row">
                <span className="event15-fact-label">Timing:</span>
                <span className="event15-fact-val">09:00 AM - 12:00 PM</span>
              </div>
              <div className="event15-fact-row">
                <span className="event15-fact-label">Target Audience:</span>
                <span className="event15-fact-val">Dentists &amp; Dental Technicians</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Course Content */}
          <div className="event15-main-column">
            {/* Section 1: Course Overview */}
            <section className="event15-block-card">
              <h2 className="event15-section-heading">Course Overview</h2>
              <p className="event15-lead-p">
                This course provides an introduction and in-depth explanation of B&amp;B Dental&apos;s Guided System software used for guided implant surgery planning.
              </p>
              <p className="event15-lead-p">
                The program focuses on how digital software can support clinicians and dental technicians in planning implant surgeries accurately and efficiently.
              </p>
              <p className="event15-lead-p">
                Participants will learn the digital workflow involved in guided implant planning, including the use of surgical kits and software tools required to prepare implant treatments.
              </p>
              <p className="event15-lead-p">
                The session demonstrates how guided surgery technology improves precision, safety and predictability in implant procedures.
              </p>
              <div className="event15-guidance-callout">
                <i className="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Live Surgeries &amp; Clinical Guidance:</strong> B&amp;B Dental live surgeries and clinical guidance are integrated throughout the training.
                </div>
              </div>
            </section>

            {/* Section 2: Course Structure */}
            <section className="event15-block-card">
              <h2 className="event15-section-heading">Course Structure</h2>

              <div className="event15-day-card">
                <div className="event15-slot">
                  <div className="event15-slot-time">
                    <i className="fa-regular fa-clock"></i> 09:00 AM - 12:00 PM
                  </div>
                  <ul className="event15-bullet-list">
                    <li>Introduction to guided surgery software</li>
                    <li>Software planning of guided implant surgery using a demo clinical case</li>
                    <li>Step-by-step explanation of digital implant planning workflow</li>
                    <li>Description of the surgical kits used during guided surgery</li>
                    <li>Explanation of clinical phases involved in guided implant procedures</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Course Objectives */}
            <section className="event15-block-card">
              <h2 className="event15-section-heading">Course Objectives</h2>
              <p className="event15-lead-p">
                Participants will gain knowledge about:
              </p>

              <div className="event15-objectives-grid">
                <div className="event15-obj-card">
                  <div className="event15-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event15-obj-text">
                    Digital planning techniques for implant surgery
                  </div>
                </div>

                <div className="event15-obj-card">
                  <div className="event15-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event15-obj-text">
                    Workflow of guided surgery software
                  </div>
                </div>

                <div className="event15-obj-card">
                  <div className="event15-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event15-obj-text">
                    Use of digital tools for surgical planning
                  </div>
                </div>

                <div className="event15-obj-card">
                  <div className="event15-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event15-obj-text">
                    Clinical phases involved in guided implant procedures
                  </div>
                </div>

                <div className="event15-obj-card">
                  <div className="event15-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event15-obj-text">
                    Components and surgical kits used during treatment
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Course Instructors */}
            <section className="event15-block-card">
              <h2 className="event15-section-heading">Course Instructors</h2>
              <div className="event15-instructors-grid">
                <div className="event15-instructor-card">
                  <div className="event15-instructor-avatar">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <h3 className="event15-instructor-name">Dt. Giacomo Zurlo</h3>
                    <span className="event15-instructor-tag">Dental Technician &amp; Guided Surgery Specialist</span>
                  </div>
                </div>

                <div className="event15-instructor-card">
                  <div className="event15-instructor-avatar">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <h3 className="event15-instructor-name">Dt. Marco Colosimo</h3>
                    <span className="event15-instructor-tag">Dental Technician &amp; Software Specialist</span>
                  </div>
                </div>
              </div>
              <p className="event15-instructors-summary">
                Both instructors specialize in digital implant planning and dental software systems.
              </p>
            </section>

            {/* Section 5: Additional Information */}
            <section className="event15-block-card">
              <h2 className="event15-section-heading">Additional Information</h2>
              <div className="event15-info-box">
                <div className="event15-info-item">
                  <i className="fa-solid fa-laptop"></i>
                  <div>
                    The course is delivered as an on-demand online training session, allowing participants to access the program remotely and learn digital guided surgery planning techniques.
                  </div>
                </div>
                <div className="event15-info-item">
                  <i className="fa-solid fa-circle-info"></i>
                  <div>
                    For further information participants can contact their local B&amp;B Dental distributor.
                  </div>
                </div>
              </div>
            </section>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event15-cta-box">
              <h3 className="event15-cta-title">Interested in Accessing This Online Session?</h3>
              <p className="event15-cta-desc">
                Get immediate on-demand streaming access, clinical guidance, and connect directly with your regional B&amp;B Dental distributor.
              </p>
              <div className="event15-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20the%20Guided%20System%20Software%20for%20Dentists%20and%20Dental%20Technicians%20Online%20Course"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event15-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event15-btn-secondary">
                  <i className="fa-solid fa-list-check"></i> Explore All Events
                </Link>
              </div>
            </div>
            */}
          </div>
        </section>
      </div>

      {/* Lightbox Flyer Modal */}
      {lightboxOpen && (
        <div
          className="event15-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event15-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event15-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src="/assets/event/9.9.webp"
              onError={(e) => {
                e.currentTarget.src = "/assets/event/9.webp";
              }}
              alt="Guided System Software for Dentists and Dental Technicians Flyer"
              className="event15-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
