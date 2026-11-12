import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-32.css";

export default function EventThirtyTwoDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/event/32.webp",
      alt: "B&B Dental International Meeting 2026 Silverstone London UK Official Poster",
    },
    {
      src: "/assets/imgs/EI-3.webp",
      alt: "B&B Dental Exhibition Showcase - 34 Years of Clinical Success in Implantology",
    },
    {
      src: "/assets/imgs/event18.2.webp",
      alt: "Marks Biotech & B&B Dental Clinical Navigation Technology Team",
    },
    {
      src: "/assets/imgs/EI-1.webp",
      alt: "Marks Biotech and B&B Dental Clinical Collaboration and Support Team",
    },
    {
      src: "/assets/imgs/EI-4.webp",
      alt: "International Clinical Dignitaries and Key Opinion Leaders at Symposium",
    },
    {
      src: "/assets/imgs/EI-5.webp",
      alt: "Hands-on Phantom Head Surgical Demonstration with Smart Glasses",
    },
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Navident Dynamic 3D Surgical Navigation Live Discussion & Clinical Demonstration",
    },
    {
      src: "/assets/imgs/event17.4.webp",
      alt: "Auditorium Clinical Presentation on High-Performance Surgical Precision",
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
      "B&B Dental International Meeting 2026 | Silver Stone London - UK | Marks Biotech";

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
    <main className="event32-page-main">
      <div className="event32-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event32-back-wrap">
          <Link to="/events" className="event32-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event32-hero-grid">
          <div>
            <span className="event32-eyebrow">Conference</span>
            <h1 className="event32-title">
              B&amp;B Dental
              <br />
              International Meeting
            </h1>
            <div className="event32-location-text">
              Silver Stone London - UK
            </div>

            {/*
            Date & Track Badges
            <div className="event32-badge-strip">
              <div className="event32-badge-date">
                <i className="fa-regular fa-calendar-days"></i>
                <span>3 October 2026</span>
              </div>
              <div className="event32-badge-track">
                <i className="fa-solid fa-flag-checkered"></i>
                <span>Silverstone Circuit, London – UK</span>
              </div>
            </div>

            <p className="event32-hero-desc">
              Experience where motorsport precision converges with modern
              implant dentistry. Join leading clinicians and innovators from
              the UK and Italy for an exclusive educational summit celebrating
              engineering mastery, continuous innovation, and high-performance
              surgical protocols.
            </p>
            */}
          </div>

          {/* Right Banner Image */}
          <div className="event32-banner-frame">
            <img
              src="/assets/event/32.webp"
              alt="B&B Dental International Meeting 2026 - 3 October Silver Stone London - UK"
              className="event32-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/*
        Event Gallery - Hidden per user request
        <section className="event32-gallery-section">
          <h2 className="event32-section-heading">Event Gallery</h2>

          Gallery Carousel Slider
          <div className="event32-carousel-container">
            <button
              type="button"
              className="event32-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event32-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event32-thumb-card ${
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
                    className="event32-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event32-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>
        */}

        {/* Two-Column Editorial Details Layout */}
        <section className="event32-content-layout">
          {/*
          Left Column: Tags & Share - Hidden per user request
          <aside className="event32-sidebar">
            <div className="event32-sidebar-block">
              <div className="event32-sidebar-title">TAGS</div>
              <div className="event32-tags-list">
                <span className="event32-tag-item">B&amp;B DENTAL</span>
                <span className="event32-tag-item">SILVERSTONE</span>
                <span className="event32-tag-item">LONDON UK</span>
                <span className="event32-tag-item">IMPLANTOLOGY</span>
                <span className="event32-tag-item">OCT 2026</span>
              </div>
            </div>

            <div className="event32-sidebar-block">
              <div className="event32-sidebar-title">Share</div>
              <div className="event32-share-icons">
                <button
                  type="button"
                  className="event32-share-icon-btn"
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
                  className="event32-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event32-share-icon-btn"
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
                  className="event32-share-icon-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </aside>
          */}

          {/* Right Column: Main Content */}
          <div className="event32-main-column">
            {/* Header matching user image */}
            <h2 className="event32-section-red">INTERNATIONAL MEETING 2026</h2>
            <p>
              Silverstone is synonymous with precision, performance, engineering
              excellence, and teamwork — values that also define modern implant
              dentistry. This exclusive international implantology event brings
              together leading clinicians, innovators, and opinion leaders from
              the UK and Italy for a unique educational experience set in one
              of the world’s most iconic motorsport destinations.
            </p>
            <p>
              Designed for ambitious dental professionals who are passionate
              about surgical precision, digital innovation, and clinical
              excellence, the event will explore both everyday implant dentistry
              and advanced rehabilitative solutions through lectures, clinical
              discussions, and real-world protocols.
            </p>
            <p>
              Inspired by the spirit of racing, the event celebrates precision
              under pressure, continuous innovation, and the pursuit of
              excellence — creating an environment where education, networking,
              and high-performance dentistry come together.
            </p>

            {/* Fast Facts Card */}
            <div className="event32-facts-card">
              <div className="event32-fact-row">
                <span className="event32-fact-label">Date:</span>
                <span>3rd OCTOBER 2026</span>
              </div>
              <div className="event32-fact-row">
                <span className="event32-fact-label">Location:</span>
                <span>Silver Stone London - UK</span>
              </div>
              {/*
              <div className="event32-fact-row">
                <span className="event32-fact-label">Organizer:</span>
                <span>
                  B&amp;B Dental Implant Company (Italy) in partnership with
                  Marks Biotech
                </span>
              </div>
              <div className="event32-fact-row">
                <span className="event32-fact-label">Theme:</span>
                <span>
                  High-Performance Implant Dentistry: Engineering Mastery &amp;
                  Surgical Precision
                </span>
              </div>
              */}
            </div>

            {/*
            Engineering Excellence & Biomechanical Precision
            <h3 className="event32-subhead-red">
              Engineering Excellence &amp; Biomechanical Precision
            </h3>
            <p>
              Just as Formula 1 racing demands microscopic engineering tolerances
              and faultless teamwork, modern oral implantology relies on
              biocompatible surface science, optimal crestal bone load
              distribution, and uncompromising execution. Clinicians will
              discover how B&amp;B Dental's Italian engineering provides
              predictability even across complex anatomic challenges.
            </p>

            Scientific Agenda & Key Highlights
            <h3 className="event32-subhead-red">Scientific Agenda &amp; Focus</h3>
            <ul className="event32-bullet-list">
              <li>
                <strong>Immediate Loading in Soft Bone:</strong> Biomechanical
                thread design and progressive condensation principles to achieve
                high initial insertion torque.
              </li>
              <li>
                <strong>Dynamic 3D Navigation Integration:</strong> Integrating
                Navident real-time computer assistance with B&amp;B Dental implant
                systems for guided accuracy without static stenting.
              </li>
              <li>
                <strong>Full-Arch Restorative Protocols:</strong> Streamlined
                all-on-four / all-on-six digital conversions with stress-free
                photogrammetric passive fit.
              </li>
              <li>
                <strong>Soft &amp; Hard Tissue Biology:</strong> Regeneration
                protocols, autologous growth factors, and long-term crestal bone
                stability around tapered implants.
              </li>
              <li>
                <strong>UK &amp; Italian Faculty Roundtable:</strong> Interactive
                case presentations and complication management strategies.
              </li>
            </ul>

            About B&B Dental
            <h3 className="event32-subhead-red">
              About B&amp;B Dental Implant Company
            </h3>
            <p>
              Established in 1992 in Bologna, Italy, B&amp;B Dental is a pioneer
              in dental implantology and bone regeneration materials. Driven by
              passion, engineering excellence, and rigorous clinical research,
              B&amp;B Dental products are certified to the highest European
              quality standards and utilized by surgeons across more than 60
              countries.
            </p>
            */}
          </div>
        </section>
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event32-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event32-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event32-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event32-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
