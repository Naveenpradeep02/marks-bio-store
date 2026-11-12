import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-27.css";

export default function EventTwentySevenDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    document.title =
      "B & B Dental Education Series - IDA Latur | Marks Biotech";
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/april12/1.webp",
      alt: "Delegates seated at IDA Latur Branch Continuing Dental Education",
    },
    {
      src: "/assets/event/april12/2.webp",
      alt: "Faculty, Organizers and Clinicians on stage with IDA Latur banner",
    },
    {
      src: "/assets/event/april12/3.webp",
      alt: "Felicitation and memento presentation to Dr. Bhushan Bangar",
    },
    {
      src: "/assets/event/april12/4.webp",
      alt: "Group photograph of attendees at B & B Dental Education Series",
    },
    {
      src: "/assets/event/april12/6.webp",
      alt: "Clinical discussion and workshop presentation",
    },
    {
      src: "/assets/event/april12/7.webp",
      alt: "Hands-on demonstration and implant systems interaction",
    },
    {
      src: "/assets/event/april12/8.webp",
      alt: "Faculty felicitation and key lecture moment",
    },
    {
      src: "/assets/event/april12/9.webp",
      alt: "Interactive Q&A session with attendees",
    },
    {
      src: "/assets/event/april12/10.webp",
      alt: "Delegates interacting during CDE session",
    },
    {
      src: "/assets/event/april12/11.webp",
      alt: "Stage presentation by Dr. Bhushan Bangar",
    },
    {
      src: "/assets/event/april12/12.webp",
      alt: "Delegates group and stage felicitations",
    },
    {
      src: "/assets/event/april12/13.webp",
      alt: "Honoring the organizing committee members",
    },
    {
      src: "/assets/event/april12/14.webp",
      alt: "Faculty certificate and trophy presentation",
    },
    {
      src: "/assets/event/april12/15.webp",
      alt: "Audience view and presentation slide showcase",
    },
    {
      src: "/assets/event/april12/16.webp",
      alt: "Event group portrait and concluding session",
    },
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "B & B Dental Education Series - IDA Latur | Marks Biotech";

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
    <main className="event27-page-main">
      <div className="event27-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event27-back-wrap">
          <Link to="/events" className="event27-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event27-hero-grid">
          <div>
            <span className="event27-badge-pill">Workshop</span>
            <h1 className="event27-title">
              B &amp; B Dental Education Series. <br />
              Indian Dental Association <br />
              Latur Branch Continuing <br />
              Dental Education
            </h1>
            <div className="event27-subtitle">
              with - Dr . Bhushan Bangar
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div className="event27-banner-frame">
            <img
              src="/assets/event/27.webp"
              alt="Indian Dental Association Latur Branch Continuing Dental Education"
              className="event27-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event27-gallery-section">
          <h2 className="event27-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event27-carousel-container">
            <button
              type="button"
              className="event27-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <div className="event27-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event27-thumb-card ${
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
                    className="event27-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event27-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </section>

        {/*
        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event27-content-layout">
          Left Column: Tags & Share
          <aside className="event27-sidebar">
            <div className="event27-sidebar-block">
              <div className="event27-sidebar-title">TAGS</div>
              <div className="event27-tags-list">
                <span className="event27-tag-item">
                  <Link to="/events" className="event27-tag-link">
                    EVENTS
                  </Link>
                </span>
                <span className="event27-tag-item">
                  <Link to="/events" className="event27-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </span>
                <span className="event27-tag-item">
                  <Link to="/events" className="event27-tag-link">
                    PAST EVENTS
                  </Link>
                </span>
              </div>
            </div>

            <div className="event27-sidebar-block">
              <div className="event27-sidebar-title">Share</div>
              <div className="event27-share-icons">
                <button
                  type="button"
                  className="event27-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event27-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event27-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event27-share-icon-btn"
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
          <div className="event27-main-column">
            <div className="event27-info-card">
              <div className="event27-info-row">
                <span className="event27-info-label">Event:</span>
                <span className="event27-info-val">
                  B &amp; B Dental Education Series.
                </span>
              </div>
              <div className="event27-info-row">
                <span className="event27-info-label">Program:</span>
                <span className="event27-info-val">
                  Indian Dental Association (IDA) Latur Branch Continuing Dental Education
                </span>
              </div>
              <div className="event27-info-row">
                <span className="event27-info-label">Speaker / Mentor:</span>
                <span className="event27-info-val">
                  Dr . Bhushan Bangar
                </span>
              </div>
              <div className="event27-info-row">
                <span className="event27-info-label">Date:</span>
                <span className="event27-info-val">
                  12th April 2026
                </span>
              </div>
              <div className="event27-info-row">
                <span className="event27-info-label">Venue:</span>
                <span className="event27-info-val">
                  Latur - Maharastra
                </span>
              </div>
              <div className="event27-info-row">
                <span className="event27-info-label">Category:</span>
                <span className="event27-info-val">
                  Workshop / Continuing Dental Education
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
          className="event27-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event27-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event27-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged workshop session preview"
              className="event27-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
