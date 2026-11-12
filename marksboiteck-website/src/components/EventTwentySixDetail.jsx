import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-26.css";

export default function EventTwentySixDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    document.title =
      "Full Arch Dental Implants Prosthetic Workshop | Marks Biotech";
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/April-26-event/1.webp",
      alt: "Full Arch Dental Implants Prosthetic Workshop - Group Photograph",
    },
    {
      src: "/assets/event/April-26-event/2.webp",
      alt: "Faculty Dr. R. Hariharan with organizers and delegates",
    },
    {
      src: "/assets/event/April-26-event/3.webp",
      alt: "Audience and delegates seated during the prosthetic workshop",
    },
    {
      src: "/assets/event/April-26-event/4.webp",
      alt: "Stage presentation and memento ceremony at Hotel Capa Cobana",
    },
    {
      src: "/assets/event/April-26-event/5.webp",
      alt: "Clinical discussion and full arch case presentations",
    },
    {
      src: "/assets/event/April-26-event/6.webp",
      alt: "Interactive workshop lecture session",
    },
    {
      src: "/assets/event/April-26-event/7.webp",
      alt: "Faculty Felicitation and interactive Q&A session",
    },
    {
      src: "/assets/event/April-26-event/DSC_1019.webp",
      alt: "Hands-on prosthetic demonstration and clinical protocols",
    },
    {
      src: "/assets/event/April-26-event/DSC_1021.webp",
      alt: "Delegates reviewing digital prosthetic workflow",
    },
    {
      src: "/assets/event/April-26-event/DSC_1028.webp",
      alt: "Dr. R. Hariharan presenting implant rehabilitation concepts",
    },
    {
      src: "/assets/event/April-26-event/DSC_1031.webp",
      alt: "Prosthetic protocol demonstration and attendee interaction",
    },
    {
      src: "/assets/event/April-26-event/DSC_1034.webp",
      alt: "Workshop attendees engaged during technical presentation",
    },
    {
      src: "/assets/event/April-26-event/DSC_1035.webp",
      alt: "Keynote presentation on full arch prosthetic solutions",
    },
    {
      src: "/assets/event/April-26-event/DSC_1038.webp",
      alt: "Demonstration of precision implant components",
    },
    {
      src: "/assets/event/April-26-event/DSC_1044.webp",
      alt: "Delegates examining full arch prosthetic models",
    },
    {
      src: "/assets/event/April-26-event/DSC_1045.webp",
      alt: "Hands-on prosthetic session and mentor guidance",
    },
    {
      src: "/assets/event/April-26-event/DSC_1049.webp",
      alt: "Detailed explanation of multi-unit abutments and prosthetic workflow",
    },
    {
      src: "/assets/event/April-26-event/DSC_1050.webp",
      alt: "Interactive delegate queries answered by Dr. R. Hariharan",
    },
    {
      src: "/assets/event/April-26-event/DSC_1055.webp",
      alt: "Clinical slides discussion and prosthetic considerations",
    },
    {
      src: "/assets/event/April-26-event/DSC_1060.webp",
      alt: "Workshop participants networking and technical discussion",
    },
    {
      src: "/assets/event/April-26-event/DSC_1062.webp",
      alt: "Overview of prosthetic workshop sessions and attendees",
    },
    {
      src: "/assets/event/April-26-event/DSC_1064.webp",
      alt: "Memento and certificate distribution ceremony",
    },
    {
      src: "/assets/event/April-26-event/DSC_1066.webp",
      alt: "Concluding group photograph of delegates and mentors",
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
      "Full Arch Dental Implants Prosthetic Workshop | Marks Biotech";

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
    <main className="event26-page-main">
      <div className="event26-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event26-back-wrap">
          <Link to="/events" className="event26-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event26-hero-grid">
          <div>
            <span className="event26-badge-pill">Workshop</span>
            <h1 className="event26-title">
              Full Arch Dental Implants <br />
              Prosthetic Workshop
            </h1>
            <div className="event26-subtitle">
              with - Dr. R. Hariharan
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div className="event26-banner-frame">
            <img
              src="/assets/event/April-26-event/event-26-banner.webp"
              alt="Full Arch Dental Implants Prosthetic Workshop with - Dr. R. Hariharan"
              className="event26-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event26-gallery-section">
          <h2 className="event26-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event26-carousel-container">
            <button
              type="button"
              className="event26-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>

            <div className="event26-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event26-thumb-card ${
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
                    className="event26-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event26-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </section>

        {/*
        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event26-content-layout">
          Left Column: Tags & Share
          <aside className="event26-sidebar">
            <div className="event26-sidebar-block">
              <div className="event26-sidebar-title">TAGS</div>
              <div className="event26-tags-list">
                <span className="event26-tag-item">
                  <Link to="/events" className="event26-tag-link">
                    EVENTS
                  </Link>
                </span>
                <span className="event26-tag-item">
                  <Link to="/events" className="event26-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </span>
                <span className="event26-tag-item">
                  <Link to="/events" className="event26-tag-link">
                    PAST EVENTS
                  </Link>
                </span>
              </div>
            </div>

            <div className="event26-sidebar-block">
              <div className="event26-sidebar-title">Share</div>
              <div className="event26-share-icons">
                <button
                  type="button"
                  className="event26-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event26-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event26-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event26-share-icon-btn"
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
          <div className="event26-main-column">
            <div className="event26-info-card">
              <div className="event26-info-row">
                <span className="event26-info-label">Event:</span>
                <span className="event26-info-val">
                  Full Arch Dental Implants Prosthetic Workshop
                </span>
              </div>
              <div className="event26-info-row">
                <span className="event26-info-label">Speaker / Mentor:</span>
                <span className="event26-info-val">
                  Dr. R. Hariharan
                </span>
              </div>
              <div className="event26-info-row">
                <span className="event26-info-label">Date:</span>
                <span className="event26-info-val">
                  19th April 2026
                </span>
              </div>
              <div className="event26-info-row">
                <span className="event26-info-label">Venue:</span>
                <span className="event26-info-val">
                  Hotel Capa Cobana, Pune, Maharashtra
                </span>
              </div>
              <div className="event26-info-row">
                <span className="event26-info-label">Category:</span>
                <span className="event26-info-val">
                  Workshop
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
          className="event26-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event26-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event26-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged workshop session preview"
              className="event26-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
