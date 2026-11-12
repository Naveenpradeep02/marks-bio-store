import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-8.css";

export default function EventEightDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselRef = useRef(null);

  const youtubeVideoId = "AHCVQ0rtb9c";

  useEffect(() => {
    document.title =
      "Navident Advanced Surgical & Prosthetic Workshop – Chennai 2025 | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/C0003T01.webp",
      alt: "Dynamic navigation clinician presentation and 3D CT scan review",
    },
    {
      src: "/assets/event/C0008T01.webp",
      alt: "Navident optical patient tracking headband setup",
    },
    {
      src: "/assets/event/C0010T01.webp",
      alt: "Navident high-precision optical drill tracker tool rig",
    },
    {
      src: "/assets/event/C0013T01.webp",
      alt: "Jaw models with dynamic optical fiducial tracking pins",
    },
    {
      src: "/assets/event/C0015T01.webp",
      alt: "Navident MicronMapper Precision Dentistry banner",
    },
    {
      src: "/assets/event/DSC05904.webp",
      alt: "Full workshop delegates, faculty, and clinical team group photo",
    },
    {
      src: "/assets/event/DSC05908.webp",
      alt: "Faculty and delegates certification ceremony",
    },
    {
      src: "/assets/event/C0033T01.webp",
      alt: "Hands-on calibration and dynamic tracking demonstration",
    },
    {
      src: "/assets/event/C0058T01.webp",
      alt: "Real-time drill position and surgical angulation tracking",
    },
    {
      src: "/assets/event/C0089T01.webp",
      alt: "Clinicians examining surgical accuracy metrics",
    },
    {
      src: "/assets/event/C0124T01.webp",
      alt: "Dynamic navigation calibration and clinical workflow discussion",
    },
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Navident Advanced Surgical & Prosthetic Workshop – Chennai 2025 | Marks Biotech";

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
    <main className="event8-page-main">
      <div className="event8-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event8-back-wrap">
          <Link to="/events" className="event8-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event8-hero-grid">
          <div>
            <span className="event8-badge-pill">WORKSHOP</span>
            <h1 className="event8-title">
              Navident Advanced Surgical &amp; Prosthetic Workshop – Chennai 2025
            </h1>
            <div className="event8-subtitle">
              Future of Dentistry – Robotics, AI &amp; Dynamic Navigation
            </div>
            <p className="event8-hero-desc">
              A comprehensive hands-on workshop focused on dynamic navigation,
              implantology precision, AI integration, prosthetic workflows and
              live surgical demonstrations using Navident technology.
            </p>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event8-banner-frame"
            onClick={() => setLightboxImg("/assets/event/11.webp")}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxImg("/assets/event/11.webp");
            }}
          >
            <img
              src="/assets/event/11.webp"
              alt="Navident Advanced Surgical & Prosthetic Workshop – Chennai 2025 Flyer"
              className="event8-banner-img"
              loading="eager"
            />
            <div className="event8-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Event Gallery & Video Showcase */}
        <section className="event8-gallery-section">
          <h2 className="event8-gallery-heading">Event Gallery</h2>

          {/* Featured Video Frame */}
          <div className="event8-video-wrapper">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Navident Advanced Surgical & Prosthetic Workshop – Chennai 2025 Video Showcase"
                className="event8-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="event8-video-cover"
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Play Navident Advanced Workshop video showcase"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsVideoPlaying(true);
                }}
              >
                {/* Blurred Ambient Backdrop */}
                <img
                  src="/assets/event/event8-video-cover.jpg"
                  alt="Marks Biotech Navident Workshop Video Backdrop"
                  aria-hidden="true"
                  className="event8-video-backdrop"
                />

                {/* Center Video Graphic */}
                <div className="event8-video-center-panel">
                  <img
                    src="/assets/event/event8-video-cover.jpg"
                    alt="Acharya Foundation & Marks Biotech Navident Workshop"
                    className="event8-video-center-img"
                  />
                </div>

                {/* YouTube Play Button Overlay */}
                <div className="event8-video-overlay">
                  <div className="event8-play-btn" aria-label="Play video">
                    <div className="event8-play-triangle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Carousel Slider */}
          <div className="event8-carousel-container">
            <button
              type="button"
              className="event8-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event8-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event8-thumb-card ${
                    activeImageIdx === idx ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveImageIdx(idx);
                    setLightboxImg(image.src);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo ${idx + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setActiveImageIdx(idx);
                      setLightboxImg(image.src);
                    }
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="event8-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event8-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event8-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event8-sidebar">
            <div className="event8-sidebar-block">
              <div className="event8-sidebar-title">TAGS</div>
              <div className="event8-tags-list">
                <div className="event8-tag-item">
                  <Link to="/events" className="event8-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event8-tag-item">
                  <Link to="/events" className="event8-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event8-tag-item">
                  <Link to="/events" className="event8-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event8-sidebar-block">
              <div className="event8-sidebar-title">Share</div>
              <div className="event8-share-icons">
                <button
                  type="button"
                  className="event8-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event8-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event8-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event8-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Facts Snapshot */}
            <div className="event8-quick-facts">
              <div className="event8-fact-row">
                <span className="event8-fact-label">Date:</span>
                <span className="event8-fact-val">5th June 2025</span>
              </div>
              <div className="event8-fact-row">
                <span className="event8-fact-label">Time:</span>
                <span className="event8-fact-val">9:30 AM – 6:30 PM</span>
              </div>
              <div className="event8-fact-row">
                <span className="event8-fact-label">Type:</span>
                <span className="event8-fact-val">Hands-on Surgical Workshop</span>
              </div>
              <div className="event8-fact-row">
                <span className="event8-fact-label">Venue:</span>
                <span className="event8-fact-val">Acharya Foundation, Chennai</span>
              </div>
              <div className="event8-fact-row">
                <span className="event8-fact-label">Collaboration:</span>
                <span className="event8-fact-val">Claronav Canada &amp; Marks Biotech</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Workshop Content */}
          <div className="event8-main-column">
            {/* Header Block */}
            <div className="event8-block-card">
              <h1 className="event8-section-heading">
                NAVIDENT Advanced Surgical &amp; Prosthetic Workshop 2025
              </h1>
              <div className="event8-section-subheading">
                Future of Dentistry – Precision, Navigation &amp; Digital Integration
              </div>
              <p className="event8-lead-p">
                The NAVIDENT Advanced Surgical &amp; Prosthetic Workshop was successfully conducted on 5th June 2025 at Acharya Foundation, Nungambakkam, Chennai. The program brought together implantologists, oral surgeons, prosthodontists, and restorative clinicians for an in-depth exploration of dynamic navigation and digitally guided implant workflows.
              </p>
              <p className="event8-lead-p" style={{ marginBottom: 0 }}>
                Organized in collaboration with Claronav Dental Canada and Marks Biotech, the workshop focused on bridging advanced technology with everyday clinical implant practice.
              </p>
            </div>

            {/* Event Overview */}
            <div className="event8-block-card">
              <h2 className="event8-block-title">Event Overview</h2>
              <p className="event8-lead-p">
                This full-day scientific program (9:30 AM – 6:30 PM) was designed to provide structured clinical insights into navigation-assisted implantology and prosthetic integration.
              </p>
              <p className="event8-lead-p" style={{ marginBottom: 0 }}>
                The workshop emphasized precision-driven treatment planning, real-time surgical guidance, and the integration of AI-supported digital workflows to enhance surgical accuracy and long-term restorative success.
              </p>
            </div>

            {/* Scientific & Clinical Focus Areas */}
            <div className="event8-block-card">
              <h2 className="event8-block-title">Scientific &amp; Clinical Focus Areas</h2>

              <div className="event8-focus-item">
                <h3 className="event8-focus-item-title">
                  <i className="fa-solid fa-compass"></i> Dynamic Navigation in Implant Dentistry
                </h3>
                <p className="event8-focus-item-desc">
                  Participants were introduced to the NAVIDENT Dynamic Navigation System, covering principles of real-time 3D drill tracking, calibration and accuracy protocols, surgical flexibility compared to static guides, and enhanced angulation control in anatomically sensitive zones.
                </p>
              </div>

              <div className="event8-focus-item">
                <h3 className="event8-focus-item-title">
                  <i className="fa-solid fa-teeth-open"></i> Surgical &amp; Prosthetic Workflow Integration
                </h3>
                <p className="event8-focus-item-desc">
                  The program highlighted how prosthetically driven planning improves implant positioning and long-term outcomes. Discussions included digital case planning, guided full-arch rehabilitation, managing complex implant scenarios, and precision-based decision-making in surgical procedures.
                </p>
              </div>

              <div className="event8-focus-item">
                <h3 className="event8-focus-item-title">
                  <i className="fa-solid fa-microchip"></i> AI &amp; Robotics-Assisted Concepts
                </h3>
                <p className="event8-focus-item-desc">
                  Sessions explored the evolving role of intelligent software and robotics-assisted workflows in modern dentistry, focusing on predictability, safety, and minimally invasive execution.
                </p>
              </div>
            </div>

            {/* Live Demonstrations & Practical Learning */}
            <div className="event8-block-card">
              <h2 className="event8-block-title">Live Demonstrations &amp; Practical Learning</h2>
              <p className="event8-lead-p">
                A key highlight of the workshop was the live navigation workflow demonstration, where participants observed:
              </p>
              <ul className="event8-bullet-list">
                <li>Digital treatment planning using NAVIDENT software</li>
                <li>Step-by-step surgical workflow integration</li>
                <li>Real-time drill tracking during implant placement</li>
                <li>Clinical accuracy verification protocols</li>
              </ul>
              <p className="event8-lead-p" style={{ marginBottom: 0 }}>
                The hands-on exposure provided clinicians with practical clarity on adopting navigation technology in routine practice.
              </p>
            </div>

            {/* Clinical Engagement */}
            <div className="event8-block-card">
              <h2 className="event8-block-title">Clinical Engagement</h2>
              <p className="event8-lead-p">
                The workshop saw active participation and in-depth discussions on:
              </p>
              <ul className="event8-bullet-list">
                <li>Static vs dynamic guided surgery</li>
                <li>Full-arch precision workflows</li>
                <li>Risk reduction in complex anatomical cases</li>
                <li>Digital integration in modern implant practice</li>
              </ul>
              <p className="event8-lead-p" style={{ marginBottom: 0 }}>
                The interaction reflected the growing clinical shift toward technology-driven implant dentistry in India.
              </p>
            </div>

            {/* Educational Impact */}
            <div className="event8-block-card">
              <h2 className="event8-block-title">Educational Impact</h2>
              <p className="event8-lead-p">
                The NAVIDENT Advanced Surgical &amp; Prosthetic Workshop 2025 served as a focused academic platform for clinicians seeking to elevate surgical precision and prosthetic predictability through digital navigation.
              </p>
              <p className="event8-lead-p" style={{ marginBottom: 0 }}>
                By combining theoretical foundations, live workflow demonstrations, and practical discussions, the program strengthened clinical confidence in adopting navigation-assisted implant protocols.
              </p>
            </div>

            {/* Event Details */}
            <div className="event8-block-card">
              <h2 className="event8-block-title">Event Details</h2>
              <div className="event8-details-list">
                <div className="event8-detail-row">
                  <div className="event8-detail-icon">
                    <i className="fa-regular fa-calendar-days"></i>
                  </div>
                  <div className="event8-detail-content">
                    <span className="event8-detail-label">Date</span>
                    <span className="event8-detail-val">5th June 2025</span>
                  </div>
                </div>

                <div className="event8-detail-row">
                  <div className="event8-detail-icon">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <div className="event8-detail-content">
                    <span className="event8-detail-label">Time</span>
                    <span className="event8-detail-val">9:30 AM – 6:30 PM</span>
                  </div>
                </div>

                <div className="event8-detail-row">
                  <div className="event8-detail-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="event8-detail-content">
                    <span className="event8-detail-label">Venue</span>
                    <span className="event8-detail-val">
                      Acharya Foundation, 7 Thirumurthy Nagar, 6th Street, Nungambakkam, Chennai
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event8-cta-box">
              <h3 className="event8-cta-title">Interested in Future Navident Workshops &amp; Live Training?</h3>
              <p className="event8-cta-desc">
                Connect with Marks Biotech for upcoming hands-on dynamic navigation training sessions, clinical masterclasses, and product demonstrations across India.
              </p>
              <div className="event8-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20future%20Navident%20Advanced%20Surgical%20%26%20Prosthetic%20Workshops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event8-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event8-btn-secondary">
                  <i className="fa-solid fa-list-check"></i> Explore All Events
                </Link>
              </div>
            </div>
            */}
          </div>
        </section>
      </div>

      {/* Lightbox Flyer / Image Modal */}
      {lightboxImg && (
        <div
          className="event8-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event8-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event8-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged view"
              className="event8-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
