import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-5.css";

export default function EventFiveDetail() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Digital Philosophy - Full-Arch Management With a Fully Digital Workflow | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Digital Philosophy - Full-Arch Management With a Fully Digital Workflow | Marks Biotech";

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
    <main className="event5-page-main">
      <div className="event5-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event5-back-wrap">
          <Link to="/events" className="event5-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event5-hero-grid">
          <div>
            <span className="event5-badge-pill">WORKSHOP</span>
            <h1 className="event5-title">
              Digital Philosophy - Full-Arch Management With a Fully Digital Workflow
            </h1>
            <div className="event5-subtitle">
              Theory + Practical Course with Live Surgery | 2026
            </div>
            <div className="event5-meta-chips">
              <span className="event5-meta-chip">
                <i className="fa-solid fa-location-dot"></i>
                Location: B&amp;B Dental Academy, Argelato (BO), Italy
              </span>
              <span className="event5-meta-chip">
                <i className="fa-regular fa-calendar-days"></i>
                18–19 September 2026
              </span>
              <span className="event5-meta-chip">
                <i className="fa-solid fa-user-doctor"></i>
                Dual Track: Dentists &amp; Technicians
              </span>
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event5-banner-frame"
            onClick={() => setLightboxOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxOpen(true);
            }}
          >
            <img
              src="/assets/event/5.webp"
              alt="Digital Philosophy - Full-Arch Management With a Fully Digital Workflow"
              className="event5-banner-img"
              loading="eager"
            />
            <div className="event5-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event5-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event5-sidebar">
            <div className="event5-sidebar-block">
              <div className="event5-sidebar-title">TAGS</div>
              <div className="event5-tags-list">
                <div className="event5-tag-item">
                  <Link to="/events" className="event5-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event5-tag-item">
                  <Link to="/events" className="event5-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event5-tag-item">
                  <Link to="/events" className="event5-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event5-sidebar-block">
              <div className="event5-sidebar-title">Share</div>
              <div className="event5-share-icons">
                <button
                  type="button"
                  className="event5-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event5-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event5-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event5-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Course Snapshot */}
            <div className="event5-quick-facts">
              <div className="event5-fact-row">
                <span className="event5-fact-label">Format:</span>
                <span className="event5-fact-val">Theory + Practical + Live Surgery</span>
              </div>
              <div className="event5-fact-row">
                <span className="event5-fact-label">Dates:</span>
                <span className="event5-fact-val">18–19 September 2026</span>
              </div>
              <div className="event5-fact-row">
                <span className="event5-fact-label">Location:</span>
                <span className="event5-fact-val">Argelato (BO), Italy</span>
              </div>
              <div className="event5-fact-row">
                <span className="event5-fact-label">Special Tracks:</span>
                <span className="event5-fact-val">Dentists &amp; Dental Technicians</span>
              </div>
              <div className="event5-fact-row">
                <span className="event5-fact-label">Certification:</span>
                <span className="event5-fact-val">Attendance Certificate Included</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Course Content */}
          <div className="event5-main-column">
            {/* Section 1: Course Overview */}
            <section className="event5-block-card">
              <h2 className="event5-section-heading">Course Overview</h2>
              <p className="event5-lead-p">
                This course focuses on full-arch rehabilitation using a fully digital workflow.
              </p>
              <p className="event5-lead-p">
                Participants will explore the complete digital workflow used in modern implant dentistry, starting from diagnosis and treatment planning to surgery and prosthetic restoration.
              </p>
              <p className="event5-lead-p">
                The course analyses various clinical cases of immediate loading full-arch rehabilitation, demonstrating how digital technologies can improve precision, predictability and efficiency in implant treatment.
              </p>
              <p className="event5-lead-p">
                The program includes live surgery, prosthesis delivery, and hands-on training with digital design software.
              </p>
              <div className="event5-guidance-callout">
                <i className="fa-solid fa-circle-check"></i>
                <div>
                  <strong>Live Surgery &amp; Guidance:</strong> B&amp;B Dental live surgeries and clinical guidance are integrated throughout the program.
                </div>
              </div>
            </section>

            {/* Section 2: Course Structure */}
            <section className="event5-block-card">
              <h2 className="event5-section-heading">Course Structure</h2>

              <div className="event5-structure-grid">
                {/* Day 1 */}
                <div className="event5-day-card">
                  <div className="event5-day-header">
                    <h3 className="event5-day-title">Day 1</h3>
                    <span className="event5-day-pill">Joint Core Program</span>
                  </div>

                  <div className="event5-timeline-slots">
                    {/* Morning Session */}
                    <div className="event5-slot">
                      <div className="event5-slot-time">
                        <i className="fa-regular fa-clock"></i> 09:00 AM - 01:00 PM
                      </div>
                      <ul className="event5-slot-list">
                        <li>Welcome and greetings</li>
                        <li>Company tour and overview of B&amp;B Dental production process</li>
                        <li>Patient anatomy and surgical considerations</li>
                        <li>Implant loading protocols</li>
                        <li>Digital workflow in full-arch implant rehabilitation</li>
                      </ul>
                    </div>

                    {/* Lunch Break */}
                    <div className="event5-meal-slot">
                      <div className="event5-meal-icon">
                        <i className="fa-solid fa-utensils"></i>
                      </div>
                      <div>
                        <div className="event5-meal-text">Lunch offered by B&amp;B Dental</div>
                        <div className="event5-meal-time">01:00 PM - 02:00 PM</div>
                      </div>
                    </div>

                    {/* Afternoon Session */}
                    <div className="event5-slot">
                      <div className="event5-slot-time">
                        <i className="fa-regular fa-clock"></i> 02:00 PM - 04:30 PM
                      </div>
                      <ul className="event5-slot-list">
                        <li>B&amp;B Dental digital design software</li>
                        <li>Surgical protocol in digital implantology</li>
                        <li>Prosthetic protocol for full-arch rehabilitation</li>
                        <li>Digital prosthetic components and workflow</li>
                      </ul>
                    </div>

                    {/* Evening Dinner */}
                    <div className="event5-meal-slot">
                      <div className="event5-meal-icon">
                        <i className="fa-solid fa-champagne-glasses"></i>
                      </div>
                      <div>
                        <div className="event5-meal-text">Dinner offered by B&amp;B Dental in Bologna city center</div>
                        <div className="event5-meal-time">Evening Social &amp; Networking</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Day 2 - Dentists */}
                <div className="event5-day-card">
                  <div className="event5-day-header">
                    <h3 className="event5-day-title">Day 2 - Dentists</h3>
                    <span className="event5-day-pill">Clinical &amp; Surgical Track</span>
                  </div>

                  <div className="event5-timeline-slots">
                    {/* Morning Session */}
                    <div className="event5-slot">
                      <div className="event5-slot-time">
                        <i className="fa-regular fa-clock"></i> 09:00 AM - 01:00 PM
                      </div>
                      <ul className="event5-slot-list">
                        <li>Live surgery session</li>
                        <li>Demonstration of surgical kits and digital workflow during surgery</li>
                      </ul>
                    </div>

                    {/* Lunch Break */}
                    <div className="event5-meal-slot">
                      <div className="event5-meal-icon">
                        <i className="fa-solid fa-utensils"></i>
                      </div>
                      <div>
                        <div className="event5-meal-text">Lunch offered by B&amp;B Dental</div>
                        <div className="event5-meal-time">01:00 PM - 02:00 PM</div>
                      </div>
                    </div>

                    {/* Afternoon Session */}
                    <div className="event5-slot">
                      <div className="event5-slot-time">
                        <i className="fa-regular fa-clock"></i> 02:00 PM - 04:30 PM
                      </div>
                      <ul className="event5-slot-list">
                        <li>Hands-on training on models</li>
                        <li>Discussion of surgical and prosthetic workflow</li>
                        <li>Final conclusions and discussion</li>
                        <li>Delivery of attendance certificate</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Day 2 - Dental Technicians */}
                <div className="event5-day-card">
                  <div className="event5-day-header">
                    <h3 className="event5-day-title">Day 2 - Dental Technicians</h3>
                    <span className="event5-day-pill technician">Lab &amp; CAD/CAM Track</span>
                  </div>

                  <div className="event5-timeline-slots">
                    {/* Morning Session */}
                    <div className="event5-slot">
                      <div className="event5-slot-time">
                        <i className="fa-regular fa-clock"></i> 09:00 AM - 01:00 PM
                      </div>
                      <ul className="event5-slot-list">
                        <li>Live surgery observation</li>
                      </ul>
                    </div>

                    {/* Lunch Break */}
                    <div className="event5-meal-slot">
                      <div className="event5-meal-icon">
                        <i className="fa-solid fa-utensils"></i>
                      </div>
                      <div>
                        <div className="event5-meal-text">Lunch offered by B&amp;B Dental</div>
                        <div className="event5-meal-time">01:00 PM - 02:00 PM</div>
                      </div>
                    </div>

                    {/* Afternoon Session */}
                    <div className="event5-slot">
                      <div className="event5-slot-time">
                        <i className="fa-regular fa-clock"></i> 02:00 PM - 04:30 PM
                      </div>
                      <ul className="event5-slot-list">
                        <li>Prosthetic design using Exocad software</li>
                        <li>Digital planning for immediate full-arch loading</li>
                        <li>Use of facial scans and intraoral scans in prosthetic design</li>
                        <li>Final conclusions and certificate delivery</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Course Instructors */}
            <section className="event5-block-card">
              <h2 className="event5-section-heading">Course Instructors</h2>
              <div className="event5-instructors-grid">
                <div className="event5-instructor-card">
                  <div className="event5-instructor-avatar">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <div>
                    <h3 className="event5-instructor-name">Dr. Fabio Scarano Catanzaro</h3>
                    <span className="event5-instructor-tag">Digital Implantology Specialist</span>
                  </div>
                </div>

                <div className="event5-instructor-card">
                  <div className="event5-instructor-avatar">
                    <i className="fa-solid fa-tooth"></i>
                  </div>
                  <div>
                    <h3 className="event5-instructor-name">Dt. Filippo Squicciarini</h3>
                    <span className="event5-instructor-tag">Master Dental Technician &amp; CAD/CAM Specialist</span>
                  </div>
                </div>
              </div>
              <p className="event5-instructors-desc">
                Both instructors are experts in digital implantology and prosthetic rehabilitation workflows.
              </p>
            </section>

            {/* Section 4: Venue */}
            <section className="event5-block-card">
              <h2 className="event5-section-heading">Venue</h2>
              <div className="event5-venue-card">
                <div className="event5-venue-info">
                  <div className="event5-venue-icon">
                    <i className="fa-solid fa-building-columns"></i>
                  </div>
                  <div>
                    <h3 className="event5-venue-name">B&amp;B Dental Training Center</h3>
                    <div className="event5-venue-sub">B&amp;B Dental Academy</div>
                    <p className="event5-venue-addr">
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
                  className="event5-venue-btn"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square"></i> Open in Maps
                </a>
              </div>
            </section>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event5-cta-box">
              <h3 className="event5-cta-title">Interested in Attending This Workshop?</h3>
              <p className="event5-cta-desc">
                Contact our coordinators for registration details, travel assistance to Italy, and course confirmation.
              </p>
              <div className="event5-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20the%20Digital%20Philosophy%20Full-Arch%20Management%20Workshop%20in%20Italy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event5-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event5-btn-secondary">
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
          className="event5-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event5-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event5-lightbox-close"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src="/assets/event/5.webp"
              alt="Digital Philosophy - Full-Arch Management Flyer"
              className="event5-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
