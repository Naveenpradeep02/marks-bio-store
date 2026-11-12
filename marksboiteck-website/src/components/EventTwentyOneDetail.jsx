import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-21.css";

export default function EventTwentyOneDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    document.title =
      "Digital Full Mouth Implant Lab Workshop | Marks Biotech";
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/training/1.webp",
      alt: "A Training Session @ Dental Care Dental Lab Muvattupuzha - Overview",
    },
    {
      src: "/assets/event/training/2.webp",
      alt: "A Training Session @ Dental Care Dental Lab Muvattupuzha - Hands-on Session",
    },
    {
      src: "/assets/event/training/3.webp",
      alt: "A Training Session @ Dental Care Dental Lab Muvattupuzha - Photogrammetry Training",
    },
    {
      src: "/assets/event/training/4.webp",
      alt: "A Training Session @ Dental Care Dental Lab Muvattupuzha - Clinical Protocol",
    },
    {
      src: "/assets/event/training/5.webp",
      alt: "A Training Session @ Dental Care Dental Lab Muvattupuzha - Team Exchange",
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
      "Digital Full Mouth Implant Lab Workshop | Marks Biotech";

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
    <main className="event21-page-main">
      <div className="event21-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event21-back-wrap">
          <Link to="/events" className="event21-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event21-hero-grid">
          <div>
            <span className="event21-badge-pill">CONFERENCE</span>
            <h1 className="event21-title">
              Digital Full Mouth <br />
              Implant Lab Workshop
            </h1>
            <div className="event21-subtitle">
              MicroMapper Photogrammetry system for Full Mouth <br />
              Implant Rehabilitation
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div className="event21-banner-frame">
            <img
              src="/assets/event/19.webp"
              alt="Digital Workshop Lab Protocol - MicroMapper Photogrammetry System"
              className="event21-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event21-gallery-section">
          <h2 className="event21-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event21-carousel-container">
            <button
              type="button"
              className="event21-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <div className="event21-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event21-thumb-card ${
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
                    className="event21-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event21-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </section>

        {/*
        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event21-content-layout">
          Left Column: Tags & Share
          <aside className="event21-sidebar">
            <div className="event21-sidebar-block">
              <div className="event21-sidebar-title">TAGS</div>
              <div className="event21-tags-list">
                <span className="event21-tag-item">
                  <Link to="/events" className="event21-tag-link">
                    EVENTS
                  </Link>
                </span>
                <span className="event21-tag-item">
                  <Link to="/events" className="event21-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </span>
                <span className="event21-tag-item">
                  <Link to="/events" className="event21-tag-link">
                    PAST EVENTS
                  </Link>
                </span>
              </div>
            </div>

            <div className="event21-sidebar-block">
              <div className="event21-sidebar-title">Share</div>
              <div className="event21-share-icons">
                <button
                  type="button"
                  className="event21-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event21-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event21-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event21-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>
          </aside>

          Right Main Column: Key Details
          <div className="event21-main-column">
            <div className="event21-info-card">
              <div className="event21-info-row">
                <span className="event21-info-label">Event:</span>
                <span className="event21-info-val">
                  Digital Full Mouth Implant Lab Workshop
                </span>
              </div>
              <div className="event21-info-row">
                <span className="event21-info-label">Topic:</span>
                <span className="event21-info-val">
                  MicroMapper Photogrammetry system for Full Mouth Implant Rehabilitation
                </span>
              </div>
              <div className="event21-info-row">
                <span className="event21-info-label">Date:</span>
                <span className="event21-info-val">
                  February 17, 2026 (FEB - 17 - 2026)
                </span>
              </div>
              <div className="event21-info-row">
                <span className="event21-info-label">Venue:</span>
                <span className="event21-info-val">
                  Dentcare Dental Lab, Muvattupuzha, Kerala, India
                </span>
              </div>
              <div className="event21-info-row">
                <span className="event21-info-label">Focus:</span>
                <span className="event21-info-val">
                  Digital Workshop Lab Protocol &amp; Precision Photogrammetry
                </span>
              </div>
            </div>
          </div>
        </section>
        */}
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event21-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event21-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event21-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged workshop session preview"
              className="event21-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
