import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-12.css";

export default function EventTwelveDetail() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Management of the Conometric Prosthesis | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Management of the Conometric Prosthesis | Marks Biotech";

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
    <main className="event12-page-main">
      <div className="event12-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event12-back-wrap">
          <Link to="/events" className="event12-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event12-hero-grid">
          <div>
            <span className="event12-badge-pill">WORKSHOP</span>
            <h1 className="event12-title">
              Management of the Conometric Prosthesis
            </h1>
            <div className="event12-subtitle">
              Theoretical and Practical Course | 2026
            </div>
            <div className="event12-meta-chips">
              <span className="event12-meta-chip">
                <i className="fa-solid fa-video"></i>
                Type: Online Session with Live Surgery
              </span>
              <span className="event12-meta-chip">
                <i className="fa-solid fa-play"></i>
                Mode: On-Demand Online Session
              </span>
              <span className="event12-meta-chip">
                <i className="fa-solid fa-globe"></i>
                Location: Online Training Program
              </span>
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event12-banner-frame"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxOpen(true);
            }}
          >
            <img
              src="/assets/event/8.webp"
              alt="Management of the Conometric Prosthesis - B&B Dental"
              className="event12-banner-img"
              loading="eager"
            />
            <div className="event12-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event12-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event12-sidebar">
            <div className="event12-sidebar-block">
              <div className="event12-sidebar-title">TAGS</div>
              <div className="event12-tags-list">
                <div className="event12-tag-item">
                  <Link to="/events" className="event12-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event12-tag-item">
                  <Link to="/events" className="event12-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event12-tag-item">
                  <Link to="/events" className="event12-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event12-sidebar-block">
              <div className="event12-sidebar-title">Share</div>
              <div className="event12-share-icons">
                <button
                  type="button"
                  className="event12-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event12-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event12-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event12-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Course Snapshot */}
            <div className="event12-quick-facts">
              <div className="event12-fact-row">
                <span className="event12-fact-label">Type:</span>
                <span className="event12-fact-val">Online with Live Surgery</span>
              </div>
              <div className="event12-fact-row">
                <span className="event12-fact-label">Mode:</span>
                <span className="event12-fact-val">On-Demand Online Session</span>
              </div>
              <div className="event12-fact-row">
                <span className="event12-fact-label">Location:</span>
                <span className="event12-fact-val">Online Training Program</span>
              </div>
              <div className="event12-fact-row">
                <span className="event12-fact-label">Format:</span>
                <span className="event12-fact-val">Theoretical and Practical</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Course Content */}
          <div className="event12-main-column">
            {/* Section 1: Course Overview */}
            <section className="event12-block-card">
              <h2 className="event12-section-heading">Course Overview</h2>
              <p className="event12-lead-p">
                This course is an in-depth online training session focused on conometric prostheses in implantology.
              </p>
              <p className="event12-lead-p">
                The program explains the clinical and prosthetic procedures used in conometric prosthetic systems, including their design, functionality, surgical protocols and advantages.
              </p>
              <p className="event12-lead-p">
                Participants will gain insights into how conometric prosthetic systems can be used for efficient implant-supported restorations with immediate loading techniques.
              </p>
              <p className="event12-lead-p">
                The session includes the analysis of various clinical cases and a live surgery demonstration, allowing participants to observe real clinical workflows and treatment procedures.
              </p>
              <div className="event12-guidance-callout">
                <i className="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Live Surgery &amp; Clinical Guidance:</strong> B&amp;B Dental live surgeries and clinical guidance are integrated throughout the training.
                </div>
              </div>
            </section>

            {/* Section 2: Course Structure */}
            <section className="event12-block-card">
              <h2 className="event12-section-heading">Course Structure</h2>

              <div className="event12-day-card">
                <div className="event12-slot">
                  <div className="event12-slot-time">
                    <i className="fa-regular fa-clock"></i> 09:00 AM - 01:00 PM
                  </div>
                  <ul className="event12-bullet-list">
                    <li>Clinical case description and analysis</li>
                    <li>Live surgery demonstration</li>
                    <li>Explanation of conometric prostheses and their clinical applications</li>
                    <li>Advantages of conometric prostheses with straight abutments</li>
                    <li>Advantages of conometric prostheses with angled abutments</li>
                    <li>Presentation and discussion of clinical cases</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Course Objectives */}
            <section className="event12-block-card">
              <h2 className="event12-section-heading">Course Objectives</h2>
              <p className="event12-lead-p">
                Participants will learn:
              </p>

              <div className="event12-objectives-grid">
                <div className="event12-obj-card">
                  <div className="event12-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event12-obj-text">
                    Definition and functioning of conometric prosthetic systems
                  </div>
                </div>

                <div className="event12-obj-card">
                  <div className="event12-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event12-obj-text">
                    Clinical indications for using conometric prostheses
                  </div>
                </div>

                <div className="event12-obj-card">
                  <div className="event12-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event12-obj-text">
                    Instruments and components used in the conometric technique
                  </div>
                </div>

                <div className="event12-obj-card">
                  <div className="event12-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event12-obj-text">
                    Surgical workflow and prosthetic procedures
                  </div>
                </div>

                <div className="event12-obj-card">
                  <div className="event12-obj-icon">
                    <i className="fa-solid fa-check"></i>
                  </div>
                  <div className="event12-obj-text">
                    Advantages of this technique in implant-supported rehabilitation
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Course Instructor */}
            <section className="event12-block-card">
              <h2 className="event12-section-heading">Course Instructor</h2>
              <div className="event12-instructor-card">
                <div className="event12-instructor-avatar">
                  <i className="fa-solid fa-user-doctor"></i>
                </div>
                <div>
                  <h3 className="event12-instructor-name">Dr. Andrea Massalu</h3>
                  <span className="event12-instructor-tag">Key Opinion Leader &amp; Implantology Specialist</span>
                </div>
              </div>
              <p className="event12-instructor-desc">
                He is an experienced clinician specializing in implant surgery and prosthetic rehabilitation using conometric implant systems.
              </p>
            </section>

            {/* Section 5: Additional Information */}
            <section className="event12-block-card">
              <h2 className="event12-section-heading">Additional Information</h2>
              <div className="event12-info-box">
                <div className="event12-info-item">
                  <i className="fa-solid fa-circle-info"></i>
                  <div>
                    For further details, participants are advised to contact their local B&amp;B Dental distributor.
                  </div>
                </div>
                <div className="event12-info-item">
                  <i className="fa-solid fa-laptop"></i>
                  <div>
                    The session is provided as an on-demand online training course, allowing dentists to access the program remotely.
                  </div>
                </div>
              </div>
            </section>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event12-cta-box">
              <h3 className="event12-cta-title">Interested in Accessing This Online Session?</h3>
              <p className="event12-cta-desc">
                Get immediate on-demand streaming access, clinical resources, and coordinator support via WhatsApp.
              </p>
              <div className="event12-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20the%20Management%20of%20the%20Conometric%20Prosthesis%20Online%20Course"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event12-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event12-btn-secondary">
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
          className="event12-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event12-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event12-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src="/assets/event/8.webp"
              alt="Management of the Conometric Prosthesis Flyer"
              className="event12-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
