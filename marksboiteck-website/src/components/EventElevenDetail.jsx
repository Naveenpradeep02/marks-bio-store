import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-11.css";

export default function EventElevenDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselRef = useRef(null);

  const youtubeVideoId = "YNyuLF9QpP8";

  useEffect(() => {
    document.title =
      "One Day NAVIDENT Surgical Workshop – Mumbai 2025 | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/Manipul/manipul2.webp",
      alt: "Live dynamic navigation surgery with real-time drill tracking",
    },
    {
      src: "/assets/event/Manipul/manipul5.webp",
      alt: "Surgical team in operatory utilizing Navident navigation system",
    },
    {
      src: "/assets/event/Manipul/manipul3.webp",
      alt: "Clinicians reviewing live 3D CBCT navigation angulation and accuracy",
    },
    {
      src: "/assets/event/Manipul/manipul6.webp",
      alt: "Faculty and delegates clinical demonstration group photo",
    },
    {
      src: "/img/img-11.png",
      alt: "Live surgery operatory and delegates workshop showcase",
    },
    {
      src: "/img/pic-2.png",
      alt: "Keynote lecture and clinical surgical case presentation",
    },
    {
      src: "/img/pic-3.png",
      alt: "Hands-on navigation training session with faculty and participants",
    },
    {
      src: "/assets/event/Manipul/manipul1.webp",
      alt: "Navident dynamic navigation cart in training hall",
    },
    {
      src: "/assets/event/Manipul/manipul8.webp",
      alt: "Real-time navigation calibration and accuracy validation",
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
      "One Day NAVIDENT Surgical Workshop – Mumbai 2025 | Marks Biotech";

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
    <main className="event11-page-main">
      <div className="event11-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event11-back-wrap">
          <Link to="/events" className="event11-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event11-hero-grid">
          <div>
            <span className="event11-badge-pill">WORKSHOP</span>
            <h1 className="event11-title">
              One Day NAVIDENT Surgical Workshop
            </h1>
            <div className="event11-subtitle">
              Surgical &amp; Prosthetic Navigation Workshop
            </div>
            <p className="event11-hero-desc">
              Step into the New era of Precision Dentistry with advanced dynamic navigation, robotics-assisted workflows, and digitally guided implant solutions designed to elevate clinical accuracy and long-term success.
            </p>
            <div className="event11-quote-box">
              &ldquo;Technology will not replace clinicians, but those clinicians who use technology will replace those who do not.&rdquo;
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event11-banner-frame"
            onClick={() => setLightboxImg("/assets/event/14.webp")}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxImg("/assets/event/14.webp");
            }}
          >
            <img
              src="/assets/event/14.webp"
              alt="One Day NAVIDENT Surgical Workshop – Reliance Hospital Mumbai Flyer"
              className="event11-banner-img"
              loading="eager"
            />
            <div className="event11-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Event Gallery & Video Showcase */}
        <section className="event11-gallery-section">
          <h2 className="event11-gallery-heading">Event Gallery</h2>

          {/* Featured Video Frame */}
          <div className="event11-video-wrapper">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="One Day NAVIDENT Surgical Workshop Video Showcase"
                className="event11-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="event11-video-cover"
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Play One Day NAVIDENT Surgical Workshop video"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsVideoPlaying(true);
                }}
              >
                {/* Ambient Blurred Backdrop */}
                <img
                  src="/assets/event/event11-video-cover.jpg"
                  alt="Marks Biotech Navident Surgical Workshop Video Backdrop"
                  aria-hidden="true"
                  className="event11-video-backdrop"
                />

                {/* Center Video Cover Graphic */}
                <div className="event11-video-center-panel">
                  <img
                    src="/assets/event/event11-video-cover.jpg"
                    alt="One Day NAVIDENT Surgical Workshop Mumbai"
                    className="event11-video-center-img"
                  />
                </div>

                {/* YouTube Play Button Overlay */}
                <div className="event11-video-overlay">
                  <div className="event11-play-btn" aria-label="Play video">
                    <div className="event11-play-triangle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Carousel Slider */}
          <div className="event11-carousel-container">
            <button
              type="button"
              className="event11-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event11-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event11-thumb-card ${
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
                    className="event11-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event11-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event11-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event11-sidebar">
            <div className="event11-sidebar-block">
              <div className="event11-sidebar-title">TAGS</div>
              <div className="event11-tags-list">
                <div className="event11-tag-item">
                  <Link to="/events" className="event11-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event11-tag-item">
                  <Link to="/events" className="event11-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event11-tag-item">
                  <Link to="/events" className="event11-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event11-sidebar-block">
              <div className="event11-sidebar-title">Share</div>
              <div className="event11-share-icons">
                <button
                  type="button"
                  className="event11-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event11-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event11-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event11-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Facts Snapshot */}
            <div className="event11-quick-facts">
              <div className="event11-fact-row">
                <span className="event11-fact-label">Date:</span>
                <span className="event11-fact-val">12th October 2025</span>
              </div>
              <div className="event11-fact-row">
                <span className="event11-fact-label">Time:</span>
                <span className="event11-fact-val">10:00 AM – 3:00 PM</span>
              </div>
              <div className="event11-fact-row">
                <span className="event11-fact-label">Type:</span>
                <span className="event11-fact-val">Surgical &amp; Prosthetic Workshop</span>
              </div>
              <div className="event11-fact-row">
                <span className="event11-fact-label">Venue:</span>
                <span className="event11-fact-val">Reliance Hospital, Mumbai</span>
              </div>
              <div className="event11-fact-row">
                <span className="event11-fact-label">Collaboration:</span>
                <span className="event11-fact-val">Claronav Canada &amp; Marks Biotech</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Workshop Content */}
          <div className="event11-main-column">
            {/* Header Block */}
            <div className="event11-block-card">
              <h1 className="event11-section-heading">
                Future of Dentistry – Precision, Navigation &amp; Digital Integration
              </h1>
              <div className="event11-section-subheading">
                One Day NAVIDENT Surgical Workshop – 12th October 2025 Sir H. N. Reliance Foundation Hospital &amp; Research Centre, Mumbai
              </div>
              <p className="event11-lead-p">
                The One Day NAVIDENT Surgical Workshop was successfully conducted on 12th October 2025 at Sir H. N. Reliance Foundation Hospital &amp; Research Centre, Girgaon, Mumbai. The program brought together implantologists and surgical clinicians interested in integrating dynamic navigation technology into everyday implant practice.
              </p>
              <p className="event11-lead-p">
                Organized in collaboration with Claronav Dental Canada and Marks Biotech, the workshop focused on the practical implementation of navigation-assisted implant placement and digitally driven surgical workflows.
              </p>
              <p className="event11-lead-p" style={{ marginBottom: 0 }}>
                Designed as an intensive clinical training session (10 AM – 3 PM), the workshop delivered structured insights into real-time navigation systems and AI-supported planning concepts shaping modern implant dentistry.
              </p>
            </div>

            {/* Scientific & Clinical Focus Areas */}
            <div className="event11-block-card">
              <h2 className="event11-block-title">Scientific &amp; Clinical Focus Areas</h2>

              <div className="event11-focus-item">
                <h3 className="event11-focus-item-title">
                  <i className="fa-solid fa-compass"></i> Dynamic Navigation Fundamentals
                </h3>
                <p className="event11-focus-item-desc">
                  Participants were introduced to the principles of real-time 3D drill tracking, system calibration, workflow integration, and intraoperative flexibility using the NAVIDENT Navigation System.
                </p>
              </div>

              <div className="event11-focus-item">
                <h3 className="event11-focus-item-title">
                  <i className="fa-solid fa-laptop-code"></i> Digital &amp; AI-Supported Planning
                </h3>
                <p className="event11-focus-item-desc">
                  The program examined how digital treatment planning and intelligent software integration enhance surgical accuracy, angulation control, and restorative outcomes.
                </p>
              </div>

              <div className="event11-focus-item">
                <h3 className="event11-focus-item-title">
                  <i className="fa-solid fa-crosshairs"></i> Precision-Driven Implant Placement
                </h3>
                <p className="event11-focus-item-desc">
                  Clinical discussions highlighted how navigation-assisted systems improve control in anatomically sensitive areas, reduce deviations, and support minimally invasive implant protocols.
                </p>
              </div>

              <div className="event11-focus-item">
                <h3 className="event11-focus-item-title">
                  <i className="fa-solid fa-video"></i> Live Workflow Demonstration
                </h3>
                <p className="event11-focus-item-desc">
                  A key component of the workshop was the live navigation-assisted surgical workflow demonstration. Attendees observed:
                </p>
                <ul className="event11-bullet-list">
                  <li>Digital treatment planning protocols</li>
                  <li>System calibration and accuracy validation</li>
                  <li>Real-time 3D drill tracking</li>
                  <li>Intraoperative adjustments compared to static guides</li>
                </ul>
              </div>
            </div>

            {/* Clinical Engagement & Response */}
            <div className="event11-block-card">
              <h2 className="event11-block-title">Clinical Engagement &amp; Response</h2>
              <p className="event11-lead-p">
                The workshop saw active participation and case-based discussions among attending clinicians. Key areas of interest included:
              </p>
              <ul className="event11-bullet-list">
                <li>Comparison between static and dynamic guided surgery</li>
                <li>Accuracy validation in navigation systems</li>
                <li>Application of navigation in complex anatomical cases</li>
                <li>Integration of digital workflows in routine practice</li>
              </ul>
              <p className="event11-lead-p" style={{ marginBottom: 0 }}>
                The interaction reflected a growing shift toward precision-based, technology-enabled implantology within the clinical community.
              </p>
            </div>

            {/* Educational Impact */}
            <div className="event11-block-card">
              <h2 className="event11-block-title">Educational Impact</h2>
              <p className="event11-lead-p">
                The One Day NAVIDENT Surgical Workshop 2025 served as a focused platform for advancing understanding of navigation-assisted implant protocols. By combining theoretical foundation with real-time workflow demonstration, the program strengthened clinical confidence in adopting digitally guided surgical techniques.
              </p>
              <p className="event11-lead-p">
                We extend our appreciation to the hosting institution and participating clinicians for contributing to the success of this educational initiative.
              </p>
              <p className="event11-lead-p" style={{ marginBottom: 0 }}>
                As implant dentistry continues to evolve toward data-driven precision and minimally invasive execution, such programs play an important role in bridging innovation with everyday clinical practice.
              </p>
            </div>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event11-cta-box">
              <h3 className="event11-cta-title">Interested in Future Navident Workshops &amp; Live Training?</h3>
              <p className="event11-cta-desc">
                Connect with Marks Biotech for upcoming hands-on dynamic navigation training sessions, clinical masterclasses, and product demonstrations in Mumbai and across India.
              </p>
              <div className="event11-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20future%20One%20Day%20Navident%20Surgical%20Workshops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event11-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event11-btn-secondary">
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
          className="event11-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event11-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event11-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged view"
              className="event11-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
