import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-7.css";

export default function EventSevenDetail() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Diagnosis and Treatment of Peri-Implantitis | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Diagnosis and Treatment of Peri-Implantitis | Marks Biotech";

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
    <main className="event7-page-main">
      <div className="event7-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event7-back-wrap">
          <Link to="/events" className="event7-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event7-hero-grid">
          <div>
            <span className="event7-badge-pill">WORKSHOP</span>
            <h1 className="event7-title">
              Diagnosis and Treatment of Peri-Implantitis
            </h1>
            <div className="event7-subtitle">
              Practical Course (Hands-On Model + Theory) | 2026
            </div>
            <div className="event7-meta-chips">
              <span className="event7-meta-chip">
                <i className="fa-solid fa-location-dot"></i>
                Location: B&amp;B Dental Academy, Argelato (BO), Italy
              </span>
              <span className="event7-meta-chip">
                <i className="fa-regular fa-calendar-days"></i>
                26-27 June 2026
              </span>
              <span className="event7-meta-chip">
                <i className="fa-solid fa-user-doctor"></i>
                Specialist Clinical Faculty
              </span>
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event7-banner-frame"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxOpen(true);
            }}
          >
            <img
              src="/assets/event/7.webp"
              alt="Diagnosis and Treatment of Peri-Implantitis - B&B Dental Academy"
              className="event7-banner-img"
              loading="eager"
            />
            <div className="event7-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event7-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event7-sidebar">
            <div className="event7-sidebar-block">
              <div className="event7-sidebar-title">TAGS</div>
              <div className="event7-tags-list">
                <div className="event7-tag-item">
                  <Link to="/events" className="event7-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event7-tag-item">
                  <Link to="/events" className="event7-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event7-tag-item">
                  <Link to="/events" className="event7-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event7-sidebar-block">
              <div className="event7-sidebar-title">Share</div>
              <div className="event7-share-icons">
                <button
                  type="button"
                  className="event7-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event7-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event7-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event7-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Course Snapshot */}
            <div className="event7-quick-facts">
              <div className="event7-fact-row">
                <span className="event7-fact-label">Format:</span>
                <span className="event7-fact-val">Hands-On Model + Theory</span>
              </div>
              <div className="event7-fact-row">
                <span className="event7-fact-label">Dates:</span>
                <span className="event7-fact-val">26-27 June 2026</span>
              </div>
              <div className="event7-fact-row">
                <span className="event7-fact-label">Location:</span>
                <span className="event7-fact-val">Argelato (BO), Italy</span>
              </div>
              <div className="event7-fact-row">
                <span className="event7-fact-label">Certification:</span>
                <span className="event7-fact-val">Attendance Certificate Included</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Course Content */}
          <div className="event7-main-column">
            {/* Section 1: Course Overview */}
            <section className="event7-block-card">
              <h2 className="event7-section-heading">Course Overview</h2>
              <p className="event7-lead-p">
                This course provides a comprehensive understanding of peri-implantitis, including diagnosis, treatment planning and long-term maintenance protocols.
              </p>
              <p className="event7-lead-p">
                Peri-implantitis is one of the most important complications in implant dentistry. The program focuses on identifying risk factors, prevention strategies and effective treatment methods for peri-implant diseases.
              </p>
              <p className="event7-lead-p">
                Through a combination of theoretical lectures, clinical case discussions and hands-on practical sessions, participants will develop practical skills required to diagnose and manage peri-implantitis cases effectively in daily clinical practice.
              </p>
              <p className="event7-lead-p">
                The course program is structured as an intensive two-day training experience that allows dentists to deepen their knowledge and improve their clinical decision-making.
              </p>
              <div className="event7-guidance-callout">
                <i className="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Clinical Integration:</strong> B&amp;B Dental live surgeries and clinical guidance are integrated throughout the course.
                </div>
              </div>
            </section>

            {/* Section 2: Course Structure */}
            <section className="event7-block-card">
              <h2 className="event7-section-heading">Course Structure</h2>

              <div className="event7-structure-grid">
                {/* Day 1 */}
                <div className="event7-day-card">
                  <div className="event7-day-header">
                    <h3 className="event7-day-title">Day 1</h3>
                    <span className="event7-day-pill">Foundations &amp; Diagnosis</span>
                  </div>

                  <div className="event7-timeline-slots">
                    {/* Morning Session */}
                    <div className="event7-slot">
                      <div className="event7-slot-time">
                        <i className="fa-regular fa-clock"></i> 09:00 AM - 01:00 PM
                      </div>
                      <ul className="event7-slot-list">
                        <li>Welcome and greetings</li>
                        <li>Company tour and overview of the B&amp;B Dental production process</li>
                        <li>Introduction to peri-implant diseases and patient perspective</li>
                        <li>Prevention strategies and identification of risk factors</li>
                        <li>Aetiology and pathogenesis of peri-implantitis</li>
                        <li>Clinical and radiographic diagnosis of peri-implant diseases</li>
                      </ul>
                    </div>

                    {/* Lunch Break */}
                    <div className="event7-meal-slot">
                      <div className="event7-meal-icon">
                        <i className="fa-solid fa-utensils"></i>
                      </div>
                      <div>
                        <div className="event7-meal-text">Lunch offered by B&amp;B Dental</div>
                        <div className="event7-meal-time">01:00 PM - 02:00 PM</div>
                      </div>
                    </div>

                    {/* Afternoon Session */}
                    <div className="event7-slot">
                      <div className="event7-slot-time">
                        <i className="fa-regular fa-clock"></i> 02:00 PM - 04:30 PM
                      </div>
                      <ul className="event7-slot-list">
                        <li>Decision tree for peri-implantitis diagnosis</li>
                        <li>Differential diagnosis methods</li>
                        <li>Non-surgical treatment protocols</li>
                        <li>Discussion and analysis of clinical cases</li>
                      </ul>
                    </div>

                    {/* Evening Dinner */}
                    <div className="event7-meal-slot">
                      <div className="event7-meal-icon">
                        <i className="fa-solid fa-champagne-glasses"></i>
                      </div>
                      <div>
                        <div className="event7-meal-text">Dinner offered by B&amp;B Dental in Bologna city center</div>
                        <div className="event7-meal-time">Evening Social &amp; Networking</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="event7-day-card">
                  <div className="event7-day-header">
                    <h3 className="event7-day-title">Day 2</h3>
                    <span className="event7-day-pill">Surgical &amp; Hands-On</span>
                  </div>

                  <div className="event7-timeline-slots">
                    {/* Morning Surgical Session */}
                    <div className="event7-slot">
                      <div className="event7-slot-time">
                        <i className="fa-regular fa-clock"></i> 09:00 AM - 01:00 PM
                      </div>
                      <ul className="event7-slot-list">
                        <li>Resective surgical therapy</li>
                        <li>Regenerative surgical techniques</li>
                        <li>Implant surface decontamination procedures</li>
                      </ul>
                    </div>

                    {/* Lunch Break */}
                    <div className="event7-meal-slot">
                      <div className="event7-meal-icon">
                        <i className="fa-solid fa-utensils"></i>
                      </div>
                      <div>
                        <div className="event7-meal-text">Lunch offered by B&amp;B Dental</div>
                        <div className="event7-meal-time">01:00 PM - 02:00 PM</div>
                      </div>
                    </div>

                    {/* Afternoon Session */}
                    <div className="event7-slot">
                      <div className="event7-slot-time">
                        <i className="fa-regular fa-clock"></i> 02:00 PM - 04:30 PM
                      </div>
                      <ul className="event7-slot-list">
                        <li>Implant removal procedures</li>
                        <li>Post-treatment diagnosis and maintenance therapy</li>
                        <li>Hands-on practical training session on models</li>
                        <li>Final conclusions and discussion</li>
                        <li>Delivery of attendance certificates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Course Instructors */}
            <section className="event7-block-card">
              <h2 className="event7-section-heading">Course Instructors</h2>
              <div className="event7-instructors-grid">
                <div className="event7-instructor-card">
                  <div className="event7-instructor-avatar">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <h3 className="event7-instructor-name">Dr. Matteo Serroni</h3>
                    <span className="event7-instructor-tag">Key Opinion Leader &amp; Specialist</span>
                  </div>
                </div>

                <div className="event7-instructor-card">
                  <div className="event7-instructor-avatar">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <h3 className="event7-instructor-name">Dr. Andrea Ravida</h3>
                    <span className="event7-instructor-tag">Key Opinion Leader &amp; Specialist</span>
                  </div>
                </div>
              </div>
              <p className="event7-instructors-desc">
                Both instructors are specialists in periodontology, oral surgery and implant disease management.
              </p>
            </section>

            {/* Section 4: Venue */}
            <section className="event7-block-card">
              <h2 className="event7-section-heading">Venue</h2>
              <div className="event7-venue-card">
                <div className="event7-venue-info">
                  <div className="event7-venue-icon">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div>
                    <h3 className="event7-venue-name">B&amp;B Dental Training Center</h3>
                    <div className="event7-venue-sub">B&amp;B Dental Academy</div>
                    <p className="event7-venue-addr">
                      Via Due Ponti 3<br />
                      Argelato (BO) – 40050<br />
                      Italy
                    </p>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Via+Due+Ponti+3,+Argelato+(BO)+40050,+Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event7-venue-btn"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Open in Maps
                </a>
              </div>
            </section>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event7-cta-box">
              <h3 className="event7-cta-title">Interested in Attending This Workshop?</h3>
              <p className="event7-cta-desc">
                Get in touch with our team for enrollment details, travel coordination, and registration confirmation.
              </p>
              <div className="event7-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20the%20Diagnosis%20and%20Treatment%20of%20Peri-Implantitis%20Workshop%20in%20Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event7-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event7-btn-secondary">
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
          className="event7-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event7-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event7-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src="/assets/event/7.webp"
              alt="Diagnosis and Treatment of Peri-Implantitis Flyer"
              className="event7-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
