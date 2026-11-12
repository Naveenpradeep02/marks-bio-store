import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-18.css";

export default function EventEighteenDetail() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  const youtubeVideoId = "ZcW-Osi1yBs";
  const youtubeRedirectUrl = "https://youtu.be/ZcW-Osi1yBs?si=1fZ1_FmTc_ZHJSeT";

  const galleryImages = [
    {
      src: "/assets/imgs/event18.1.webp",
      alt: "B&B Dental Implant Company Booth at AEEDC Dubai",
    },
    {
      src: "/assets/imgs/event18.2.webp",
      alt: "Marks Biotech Team at Made in Italy Excellence Booth",
    },
    {
      src: "/assets/imgs/E1-2.webp",
      alt: "Claronav Dental Navident & MicronMapper Exhibition Unit",
    },
    {
      src: "/assets/imgs/event18.5.webp",
      alt: "AEEDC Dubai Scientific Conference Main Auditorium",
    },
    {
      src: "/assets/imgs/event18.6.webp",
      alt: "AEEDC Global Keynote Scientific Speaker",
    },
    {
      src: "/assets/imgs/event18.7.webp",
      alt: "AEEDC Dubai International Panel Discussion",
    },
    {
      src: "/assets/imgs/event18.3.webp",
      alt: "Navident Evo and MicronMapper AEEDC Exhibition Feature",
    },
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Live Dynamic Surgical Navigation Hands-on Demo",
    },
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 260;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="event18-page-main">
      <div className="event18-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event18-back-wrap">
          <Link to="/events" className="event18-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event18-hero-grid">
          <div>
            <span className="event18-eyebrow">CONFERENCE</span>
            <h1 className="event18-title">
              AEEDC Dubai 2026: A Legacy of Dental Excellence Built in Dubai,
              Recognized Worldwide
            </h1>
            <div className="event18-subtitle">
              30 Years of Inspiration, Progress &amp; Global Impact
            </div>
            <p className="event18-desc">
              <strong>What began in 1996</strong> as a regional dental gathering
              has evolved into one of the largest annual scientific dental
              conferences and exhibitions in the world.
            </p>
            <p className="event18-desc">
              AEEDC Dubai 2026 connects global innovators, clinicians,
              educators, investors, and suppliers under one roof.
            </p>
          </div>

          {/* Right Banner Image */}
          <div className="event18-banner-frame">
            <img
              src="/assets/event/20.webp"
              alt="AEEDC Dubai 2026 - 30 Years of Legacy"
              className="event18-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery & Video Showcase */}
        <section className="event18-gallery-section">
          <h2 className="event18-section-heading">Event Gallery</h2>

          {/* Video Player Frame */}
          <div className="event18-video-wrapper">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="AEEDC Dubai Video Showcase"
                className="event18-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="event18-video-cover"
                style={{
                  backgroundImage: `url('https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg'), url('/assets/imgs/E1-2.webp')`,
                }}
                onClick={() => setIsPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Play AEEDC Dubai video showcase"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsPlaying(true);
                }}
              >
                <div className="event18-video-overlay"></div>
                <div className="event18-play-btn" aria-label="Play video">
                  <div className="event18-play-icon"></div>
                </div>
                <div className="event18-video-badge">AEEDC Dubai</div>
              </div>
            )}
          </div>

          {/* Video Actions & YouTube Direct Redirect */}
          <div className="event18-video-actions">
            <a
              href={youtubeRedirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="event18-yt-redirect-btn"
            >
              <i className="fa-brands fa-youtube event18-yt-icon"></i>
              Watch on YouTube <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "12px" }}></i>
            </a>
          </div>

          {/* Gallery Carousel Slider */}
          <div className="event18-carousel-container">
            <button
              type="button"
              className="event18-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event18-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event18-thumb-card ${
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
                    className="event18-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event18-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event18-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event18-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event18-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event18-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
