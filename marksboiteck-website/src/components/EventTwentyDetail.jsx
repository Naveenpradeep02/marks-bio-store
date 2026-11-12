import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-20.css";

export default function EventTwentyDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/event/31.webp",
      alt: "2nd Global Implant Summit 2026 Trivandrum Official Poster",
    },
    {
      src: "/assets/imgs/EI-5.webp",
      alt: "Navident Phantom Head Navigation Demonstration with Smart Glasses",
    },
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Dynamic 3D Surgical Navigation Live Discussion and Demonstration",
    },
    {
      src: "/assets/imgs/event18.2.webp",
      alt: "Marks Biotech & B&B Dental Clinical Navigation Technology Team",
    },
    {
      src: "/assets/imgs/EI-4.webp",
      alt: "Key Opinion Leaders and Dignitaries at IAOI Scientific Gathering",
    },
    {
      src: "/assets/imgs/EI-3.webp",
      alt: "B&B Dental 34 Years of Clinical Success Exhibition Showcase",
    },
    {
      src: "/assets/imgs/EI-1.webp",
      alt: "Marks Biotech Technical and Clinical Support Team",
    },
    {
      src: "/assets/imgs/event17.4.webp",
      alt: "Auditorium Main Stage Surgical Presentation on Modern Implantology",
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

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title =
      "2nd Global Implant Summit 2026 - Trivandrum | Marks Biotech";

    if (platform === "copy") {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <main className="event20-page-main">
      <div className="event20-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event20-back-wrap">
          <Link to="/events" className="event20-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event20-hero-grid">
          <div>
            <span className="event20-eyebrow">CONFERENCE</span>
            <h1 className="event20-title">
              2nd Global Implant Summit 2026 - Trivandrum
            </h1>
            <div className="event20-subtitle">
              Marks Biotech at the Global Implant Summit
            </div>
            <p className="event20-desc">
              Marks Biotech is excited to participate in the 2nd Global Implant
              Summit 2026, one of the most anticipated gatherings for implant
              dentistry professionals in India.
            </p>
            <p className="event20-desc">
              The event brings together implantologists, oral surgeons,
              prosthodontists, and dental specialists to discuss advancements
              shaping the future of implantology.
            </p>
          </div>

          {/* Right Banner Image */}
          <div className="event20-banner-frame">
            <img
              src="/assets/event/31.webp"
              alt="2nd Global Implant Summit 2026 Trivandrum - Travancore International Convention Center"
              className="event20-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event20-gallery-section">
          <h2 className="event20-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event20-carousel-container">
            <button
              type="button"
              className="event20-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event20-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event20-thumb-card ${
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
                    className="event20-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event20-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event20-content-layout">
          {/* Left Column: Tags & Share */}
          <aside className="event20-sidebar">
            <div className="event20-sidebar-block">
              <div className="event20-sidebar-title">TAGS</div>
              <div className="event20-tags-list">
                <span className="event20-tag-item">IAOI</span>
                <span className="event20-tag-item">GLOBAL SUMMIT</span>
                <span className="event20-tag-item">AUG 2026</span>
              </div>
            </div>

            <div className="event20-sidebar-block">
              <div className="event20-sidebar-title">Share</div>
              <div className="event20-share-icons">
                <button
                  type="button"
                  className="event20-share-icon-btn"
                  onClick={() => handleShare("copy")}
                  title={copied ? "Link Copied!" : "Copy Link"}
                  aria-label="Copy Link"
                >
                  <i
                    className={
                      copied ? "fa-solid fa-check" : "fa-solid fa-link"
                    }
                  ></i>
                </button>
                <button
                  type="button"
                  className="event20-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event20-share-icon-btn"
                  onClick={() => handleShare("linkedin")}
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in"></i>
                </button>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event20-share-icon-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Content */}
          <div className="event20-main-column">
            {/* Marks Biotech at the Global Implant Summit */}
            <h2 className="event20-section-red">
              Marks Biotech at the Global Implant Summit
            </h2>
            <p>
              Marks Biotech is excited to participate in the 2nd Global Implant
              Summit 2026, one of the most anticipated gatherings for implant
              dentistry professionals in India. The event will bring together
              implantologists, oral surgeons, prosthodontists, and dental
              specialists from across the country to discuss the latest
              advancements shaping the future of implantology.
            </p>
            <p>
              As a company dedicated to advancing precision-driven dental
              technologies, Marks Biotech will showcase innovative solutions
              designed to enhance surgical accuracy, streamline digital
              workflows, and improve long-term restorative outcomes.
            </p>

            {/* Event Details */}
            <h3 className="event20-subhead-red">Event Details</h3>
            <div className="event20-facts-card">
              <div className="event20-fact-row">
                <span className="event20-fact-label">Event:</span>
                <span>2nd Global Implant Summit 2026</span>
              </div>
              <div className="event20-fact-row">
                <span className="event20-fact-label">Date:</span>
                <span>1 – 2 August 2026</span>
              </div>
              <div className="event20-fact-row">
                <span className="event20-fact-label">Venue:</span>
                <span>
                  Travancore International Convention Center (Greenfield
                  International Stadium Campus) Trivandrum, Kerala, India
                </span>
              </div>
            </div>

            {/* About the Global Implant Summit */}
            <h3 className="event20-subhead-red">
              About the Global Implant Summit
            </h3>
            <p>
              Organized by the Indian Association of Oral Implantologists (IAOI),
              the Global Implant Summit serves as a premier platform for dental
              professionals to explore emerging technologies, innovative
              treatment approaches, and evolving clinical protocols in implant
              dentistry.
            </p>
            <p>
              The second edition of the summit features leading clinicians, expert
              speakers, and industry innovators actively contributing to the
              advancement of modern implantology. Through scientific lectures,
              technology showcases, and interactive discussions, the event
              provides valuable insights into the future of digital and
              precision-based implant dentistry.
            </p>

            {/* Technologies and Solutions Presented by Marks Biotech */}
            <h3 className="event20-subhead-red">
              Technologies and Solutions Presented by Marks Biotech
            </h3>
            <p>
              During the summit, Marks Biotech will highlight advanced implant
              technologies and digital solutions that support predictable and
              efficient treatment outcomes.
            </p>

            {/* Navident Dynamic Navigation System */}
            <h3 className="event20-subhead-red">
              Navident Dynamic Navigation System
            </h3>
            <p>
              A real-time surgical navigation technology that enables precise
              implant placement through live 3D drill tracking. This system
              allows clinicians to visualize the drill position during surgery,
              offering greater control and flexibility compared to traditional
              static guides.
            </p>

            {/* B&B Dental Implant Systems - Italy */}
            <h3 className="event20-subhead-red">
              B&amp;B Dental Implant Systems - Italy
            </h3>
            <p>
              Marks Biotech will also showcase premium implant solutions from
              B&amp;B Dental, engineered for stability, durability, and
              versatility across a wide range of clinical indications including
              immediate loading, sinus lift procedures, and full-arch
              restorations.
            </p>

            {/* Digital Implant Workflows */}
            <h3 className="event20-subhead-red">Digital Implant Workflows</h3>
            <p>
              Visitors will gain insights into modern digital workflows designed
              to improve treatment planning, surgical accuracy, and prosthetic
              outcomes. These workflows help clinicians reduce chairside time
              while improving the predictability of procedures.
            </p>

            {/* Why Visit Marks Biotech at the Summit */}
            <h3 className="event20-subhead-red">
              Why Visit Marks Biotech at the Summit
            </h3>
            <ul className="event20-bullet-list">
              <li>
                Experience advanced implant technologies and digital solutions
              </li>
              <li>Interact with the Marks Biotech technical team</li>
              <li>
                Learn about real-time navigation workflows in implant surgery
              </li>
              <li>Explore solutions for complex implant cases</li>
              <li>
                Discuss clinical applications and treatment planning strategies
              </li>
            </ul>

            {/* Join Us in Trivandrum */}
            <h3 className="event20-subhead-red">Join Us in Trivandrum</h3>
            <p>
              Marks Biotech looks forward to connecting with dental professionals,
              clinicians, and partners at the 2nd Global Implant Summit 2026.
              Join us in Trivandrum to explore innovative implant solutions and
              learn how emerging technologies are transforming the future of
              implant dentistry.
            </p>
            <p>
              We invite you to visit our team during the event and discover how
              precision-driven implant technologies can support your clinical
              practice.
            </p>
          </div>
        </section>
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event20-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event20-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event20-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event20-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
