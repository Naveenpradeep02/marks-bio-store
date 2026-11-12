import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-19.css";

export default function EventNineteenDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Navident Live Discussion and Demonstration at NIDACON Nagpur",
    },
    {
      src: "/assets/imgs/EI-4.webp",
      alt: "Dignitaries and Clinical Leaders at NIDACON Nagpur",
    },
    {
      src: "/assets/imgs/EI-5.webp",
      alt: "Hands-on Navident Phantom Head Demonstration with Smart Glasses",
    },
    {
      src: "/assets/imgs/EI-3.webp",
      alt: "B&B Dental 34 Years of Clinical Success Exhibition Showcase",
    },
    {
      src: "/assets/imgs/EI-1.webp",
      alt: "Marks Biotech and B&B Dental Team at NIDACON",
    },
    {
      src: "/assets/event/pastevent3/1.webp",
      alt: "Live Robotic Dynamic Navigation Training Unit",
    },
    {
      src: "/assets/event/pastevent3/12.webp",
      alt: "Clinical Practice Mastery Session at NIDACON",
    },
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="event19-page-main">
      <div className="event19-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event19-back-wrap">
          <Link to="/events" className="event19-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event19-hero-grid">
          <div>
            <span className="event19-eyebrow">CONFERENCE</span>
            <h1 className="event19-title">NIDACON Nagpur</h1>
            <div className="event19-subtitle">
              Unity in Profession. Excellence in Practice.
            </div>
            <p className="event19-desc">
              A cornerstone event of the Nagpur dental community, NIDACON
              advances the science and art of dentistry through collaboration,
              outreach, and continuing education.
            </p>
            <div className="event19-booth-info">
              <span>Booth Number DF, Date,</span>
              <span>IDD World Conference Mumbai</span>
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="event19-banner-frame">
            <img
              src="/assets/event/21.webp"
              alt="NIDACON Nagpur - A cornerstone event of the Nagpur dental community"
              className="event19-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event19-gallery-section">
          <h2 className="event19-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event19-carousel-container">
            <button
              type="button"
              className="event19-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event19-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event19-thumb-card ${
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
                    className="event19-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event19-carousel-btn"
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
          className="event19-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event19-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event19-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event19-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
