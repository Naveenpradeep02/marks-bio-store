import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-17.css";

export default function EventSeventeenDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/imgs/event17.3.webp",
      alt: "IDDC 2026 Official Delegation and Attendee Gathering",
    },
    {
      src: "/assets/imgs/event17.5.webp",
      alt: "Clinical Leaders & Dignitaries at International Digital Dentistry Congress",
    },
    {
      src: "/assets/imgs/event18.2.webp",
      alt: "Marks Biotech & B&B Dental Clinical Showcase Team",
    },
    {
      src: "/assets/imgs/event17.4.webp",
      alt: "Auditorium Main Stage Surgical Lecture & Postoperative Recovery Presentation",
    },
    {
      src: "/assets/imgs/event17.6.webp",
      alt: "Exhibition Registration Floor & Trade Delegate Exchange",
    },
    {
      src: "/assets/imgs/event17.1.webp",
      alt: "Haleon Digital Innovation Exhibition Pavilion",
    },
    {
      src: "/assets/imgs/event17.2.webp",
      alt: "Illusion Aligners & Clinical Innovation Booth",
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
      "Join India's Largest International Digital Dentistry Congress 2026 | Marks Biotech";

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
    <main className="event17-page-main">
      <div className="event17-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event17-back-wrap">
          <Link to="/events" className="event17-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event17-hero-grid">
          <div>
            <span className="event17-eyebrow">CONFERENCE</span>
            <h1 className="event17-title">
              Join India's Largest International Digital Dentistry Congress 2026
            </h1>
            <div className="event17-subtitle">
              Jio World Convention Centre, Mumbai | 2 Days | 80+ Speakers |
              4000+ Attendees | 100+ Exhibitors | 4th Edition
            </div>
            <p className="event17-desc">
              IDDC 2026 brings clinicians, educators, innovators, and technology
              leaders together for a practical look at the next phase of digital
              dentistry.
            </p>
          </div>

          {/* Right Banner Image */}
          <div className="event17-banner-frame">
            <img
              src="/assets/event/18.webp"
              alt="International Digital Dentistry Congress 2026 Poster"
              className="event17-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event17-gallery-section">
          <h2 className="event17-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event17-carousel-container">
            <button
              type="button"
              className="event17-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event17-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event17-thumb-card ${
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
                    className="event17-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event17-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event17-content-layout">
          {/* Left Column: Tags & Share */}
          <aside className="event17-sidebar">
            <div className="event17-sidebar-block">
              <div className="event17-sidebar-title">TAGS</div>
              <div className="event17-tags-list">
                <span className="event17-tag-item">DIGITAL DENTISTRY</span>
                <span className="event17-tag-item">CONGRESS</span>
                <span className="event17-tag-item">2026</span>
              </div>
            </div>

            <div className="event17-sidebar-block">
              <div className="event17-sidebar-title">Share</div>
              <div className="event17-share-icons">
                <button
                  type="button"
                  className="event17-share-icon-btn"
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
                  className="event17-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event17-share-icon-btn"
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
                  className="event17-share-icon-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Content */}
          <div className="event17-main-column">
            {/* About IDDC 2026 */}
            <h2 className="event17-article-title">About IDDC 2026</h2>
            <p>
              The International Digital Dentistry Congress 2026, presented by
              the Digital Dentistry Society International and the Indian Dental
              Association, is designed for clinicians who want practical
              direction on the future of digital dentistry.
            </p>

            {/* Fast Facts Card */}
            <div className="event17-facts-card">
              <div className="event17-fact-row">
                <span className="event17-fact-label">Date:</span>
                <span>27-28 June 2026</span>
              </div>
              <div className="event17-fact-row">
                <span className="event17-fact-label">Location:</span>
                <span>Mumbai, India</span>
              </div>
              <div className="event17-fact-row">
                <span className="event17-fact-label">Focus:</span>
                <span>
                  Faster workflows, better accuracy, less invasive treatment,
                  and more predictable outcomes
                </span>
              </div>
            </div>

            <p>
              The congress shows how digital systems can improve workflow
              efficiency, reduce uncertainty before treatment, and help
              practitioners spend more time on patient care with stronger
              planning confidence.
            </p>

            {/* Why This Congress Matters */}
            <h3 className="event17-subhead-red">Why This Congress Matters</h3>
            <ul className="event17-bullet-list">
              <li>
                Explore real-world digital workflows that reduce treatment time
                and chairside effort
              </li>
              <li>
                Learn how planning tools support clearer diagnostic and better
                treatment decisions
              </li>
              <li>
                See how predictable digital systems reduce surprises before
                treatment begins
              </li>
              <li>
                Understand how digital adoption can reshape day-to-day practice
                performance
              </li>
            </ul>

            {/* Scope of Digital Dentistry */}
            <h3 className="event17-subhead-red">Scope of Digital Dentistry</h3>
            <p>
              Digital dentistry includes any dental system, device, or workflow
              that uses digital tools or computer-controlled technology across
              diagnosis, planning, treatment delivery, re-evaluation, and
              long-term oral healthcare.
            </p>
            <ul className="event17-bullet-list">
              <li>
                Digital diagnostics and imaging for sharper case assessment
              </li>
              <li>
                Computer-assisted planning and more confident decision-making
              </li>
              <li>Guided treatment execution for surgery and restoration</li>
              <li>
                Re-evaluation and follow-up supported by reliable digital records
              </li>
              <li>
                Long-term patient care enhanced by repeatable, data-backed
                workflows
              </li>
            </ul>

            {/* IDA at a Glance */}
            <h3 className="event17-subhead-red">IDA at a Glance</h3>
            <ul className="event17-bullet-list">
              <li>
                Established in 1946 as one of India's premier dental
                professional organizations
              </li>
              <li>
                Supports members, students, public awareness, and national oral
                health initiatives
              </li>
              <li>
                Works with government bodies, institutions, and industry partners
                on oral care strategy
              </li>
              <li>
                Operates through a nationwide network with more than 75,000
                professionals and students
              </li>
              <li>
                Promotes prevention-led dentistry, continuing education, and
                service quality improvement
              </li>
            </ul>
            <p>
              IDA continues to create a strong platform for policy support,
              professional growth, public education, and improved standards of
              care across the country.
            </p>

            {/* DDS Mission */}
            <h3 className="event17-subhead-red">DDS Mission</h3>
            <p>
              The Digital Dentistry Society exists to support the profession as
              dentistry moves from manual systems to faster, smarter, and more
              predictable digital workflows.
            </p>
            <ul className="event17-bullet-list">
              <li>
                Promote awareness of digital tools in everyday clinical
                practice
              </li>
              <li>
                Encourage education, collaboration, and professional exchange
              </li>
              <li>
                Support adoption of scanners, CBCT, CAD/CAM, milling, and 3D
                printing workflows
              </li>
              <li>
                Advance more efficient, accurate, and patient-friendly treatment
                models
              </li>
            </ul>
            <p>
              IDDC 2026 is positioned as a high-value learning platform for
              clinicians who want to understand where digital dentistry is
              heading and how to apply it meaningfully in modern practice.
            </p>
          </div>
        </section>
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event17-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event17-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event17-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event17-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
