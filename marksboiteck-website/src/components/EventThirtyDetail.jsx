import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-30.css";

export default function EventThirtyDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/event/30-in.webp",
      alt: "32nd National Conference of Indian Society of Oral Implantologists Hyderabad Poster",
    },
    {
      src: "/assets/imgs/EI-5.webp",
      alt: "Hands-on Navident Dynamic Navigation Demonstration with Smart Glasses",
    },
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Dynamic 3D Surgical Navigation Live Discussion & Clinical Demonstration",
    },
    {
      src: "/assets/imgs/event18.2.webp",
      alt: "Marks Biotech & B&B Dental Clinical Navigation Technology Team",
    },
    {
      src: "/assets/imgs/EI-4.webp",
      alt: "Key Opinion Leaders and Dignitaries at ISOI National Conference",
    },
    {
      src: "/assets/imgs/EI-3.webp",
      alt: "B&B Dental Exhibition Showcase - 34 Years of Clinical Success",
    },
    {
      src: "/assets/imgs/EI-1.webp",
      alt: "Marks Biotech Technical and Clinical Specialists at Conference Pavilion",
    },
    {
      src: "/assets/imgs/event17.4.webp",
      alt: "Auditorium Main Stage Surgical Lecture on Full-Arch Rehabilitation",
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
      "ISOI - September ( National Conference Of ISOI ) 2026 | Hyderabad | Marks Biotech";

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
    <main className="event30-page-main">
      <div className="event30-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event30-back-wrap">
          <Link to="/events" className="event30-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event30-hero-grid">
          <div>
            <span className="event30-eyebrow">Conference</span>
            <h1 className="event30-title">
              ISOI - September ( National Conference Of ISOI )
            </h1>

            <div className="event30-meta-lines" style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "20px", color: "#ffffff", margin: "0 0 10px 0", fontWeight: "600" }}>
                Booth Numbers C(B)13 and C(B)14
              </p>
              <p style={{ fontSize: "18px", color: "#ffffff", margin: 0, fontWeight: "600" }}>
                4th - 6th SEPTEMBER 2026 HICC, HYDERABAD, INDIA
              </p>
            </div>

            {/*
            <div className="event30-subtitle">
              32nd National Conference of Indian Society of Oral Implantologists
            </div>

            Badges for Booth and Date/Venue
            <div className="event30-badges-wrap">
              <div className="event30-booth-badge">
                <i className="fa-solid fa-location-dot"></i>
                <span>Booth Numbers C(B)13 and C(B)14</span>
              </div>
              <div className="event30-date-badge">
                <i className="fa-regular fa-calendar-days"></i>
                <span>4th – 6th SEPTEMBER 2026</span>
              </div>
              <div className="event30-date-badge">
                <i className="fa-solid fa-landmark"></i>
                <span>HICC, HYDERABAD, INDIA</span>
              </div>
            </div>

            <p className="event30-desc">
              Join Marks Biotech at the 32nd National Conference of ISOI at
              the Hyderabad International Convention Centre (HICC). Centered
              around <em>"Regenerate, Restore, Rehabilitate in Digital Era"</em>,
              this national gathering unites clinical masters, surgeons, and
              innovators advancing implantology through digital workflows.
            </p>
            */}
          </div>

          {/* Right Banner Image */}
          <div className="event30-banner-frame">
            <img
              src="/assets/event/30-in.webp"
              onError={(e) => {
                e.currentTarget.src = "/assets/event/30.webp";
              }}
              alt="32nd National Conference of Indian Society of Oral Implantologists - HICC Hyderabad"
              className="event30-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/*
        Event Gallery - Hidden per user request
        <section className="event30-gallery-section">
          <h2 className="event30-section-heading">Event Gallery</h2>

          Gallery Carousel Slider
          <div className="event30-carousel-container">
            <button
              type="button"
              className="event30-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event30-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event30-thumb-card ${
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
                    className="event30-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event30-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event30-content-layout">
          Left Column: Tags & Share
          <aside className="event30-sidebar">
            <div className="event30-sidebar-block">
              <div className="event30-sidebar-title">TAGS</div>
              <div className="event30-tags-list">
                <span className="event30-tag-item">ISOI 2026</span>
                <span className="event30-tag-item">ORAL IMPLANTOLOGY</span>
                <span className="event30-tag-item">HYDERABAD</span>
                <span className="event30-tag-item">NAVIDENT</span>
                <span className="event30-tag-item">B&amp;B DENTAL</span>
                <span className="event30-tag-item">HICC</span>
              </div>
            </div>

            <div className="event30-sidebar-block">
              <div className="event30-sidebar-title">Share</div>
              <div className="event30-share-icons">
                <button
                  type="button"
                  className="event30-share-icon-btn"
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
                  className="event30-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event30-share-icon-btn"
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
                  className="event30-share-icon-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </aside>

          Right Column: Main Content
          <div className="event30-main-column">
            About the Conference
            <h2 className="event30-section-red">
              About the 32nd ISOI National Conference 2026
            </h2>
            <p>
              The Indian Society of Oral Implantologists (ISOI) presents its
              prestigious 32nd National Conference from September 4th to 6th,
              2026, hosted at the landmark Hyderabad International Convention
              Centre (HICC) in Hyderabad, Telangana.
            </p>
            <p>
              Under the thematic banner <em>"Regenerate, Restore, Rehabilitate in Digital Era"</em>,
              this premier national event unites clinicians, academic faculty,
              postgraduates, and surgical pioneers to explore the evolution of
              implantology through dynamic navigation, biological tissue
              regeneration, and automated digital restorations.
            </p>

            Fast Facts Card
            <h3 className="event30-subhead-red">Event Details &amp; Fast Facts</h3>
            <div className="event30-facts-card">
              <div className="event30-fact-row">
                <span className="event30-fact-label">Event:</span>
                <span>
                  32nd National Conference of Indian Society of Oral
                  Implantologists (ISOI)
                </span>
              </div>
              <div className="event30-fact-row">
                <span className="event30-fact-label">Theme:</span>
                <span>Regenerate, Restore, Rehabilitate in Digital Era</span>
              </div>
              <div className="event30-fact-row">
                <span className="event30-fact-label">Date:</span>
                <span>4th – 6th September 2026</span>
              </div>
              <div className="event30-fact-row">
                <span className="event30-fact-label">Venue:</span>
                <span>
                  Hyderabad International Convention Centre (HICC), Hyderabad,
                  India
                </span>
              </div>
              <div className="event30-fact-row">
                <span className="event30-fact-label">Marks Biotech Booth:</span>
                <span>Booth Numbers C(B)13 and C(B)14</span>
              </div>
              <div className="event30-fact-row">
                <span className="event30-fact-label">Official Portal:</span>
                <span>www.isoi2026.com</span>
              </div>
            </div>

            Marks Biotech Exhibition Showcase
            <h3 className="event30-subhead-red">
              Visit Marks Biotech at Booths C(B)13 &amp; C(B)14
            </h3>
            <p>
              Marks Biotech cordially invites all attending clinicians, delegates,
              and surgical fellows to our interactive technology pavilion at
              Booths <strong>C(B)13 and C(B)14</strong>. Experience hands-on
              demonstrations and clinical consultations covering:
            </p>
            <ul className="event30-bullet-list">
              <li>
                <strong>Navident Dynamic 3D Navigation:</strong> Real-time optical
                tracking technology allowing freehand surgical placement with
                sub-millimeter precision directly verified against the patient's
                CBCT scan without physical stents.
              </li>
              <li>
                <strong>B&amp;B Dental Implant Innovations (Italy):</strong> High-performance
                Italian implant systems engineered for crestal bone preservation,
                exceptional primary stability in soft bone, and streamlined
                immediate load solutions.
              </li>
              <li>
                <strong>Photogrammetry &amp; Full-Arch Passivity:</strong> High-speed
                optical capture workflows guaranteeing stress-free passive fit
                in full-arch multi-implant frameworks.
              </li>
              <li>
                <strong>Hands-On Phantom Head Stations:</strong> Experience live
                drill calibrations, optical tracking handpieces, and phantom-head
                osteotomies guided by clinical application specialists.
              </li>
            </ul>

            Conference Core Pillars
            <h3 className="event30-subhead-red">
              Core Pillars: Regenerate, Restore, Rehabilitate
            </h3>
            <ul className="event30-bullet-list">
              <li>
                <strong>Regenerate:</strong> Advanced bone grafting techniques,
                guided bone regeneration (GBR), growth factors, autologous
                platelet matrices, and soft tissue management around implants.
              </li>
              <li>
                <strong>Restore:</strong> Digital impressioning, screw-retained
                prosthetics, CAD/CAM abutment design, and aesthetic zone
                provisionalization protocols.
              </li>
              <li>
                <strong>Rehabilitate:</strong> Complex full-arch rehabilitations,
                tilted and pterygoid implants, dynamic navigational surgery, and
                management of clinical complications.
              </li>
            </ul>

            About ISOI
            <h3 className="event30-subhead-red">
              About the Indian Society of Oral Implantologists (ISOI)
            </h3>
            <p>
              Founded in 1989, the Indian Society of Oral Implantologists (ISOI)
              is India’s premier professional body dedicated to oral implantology.
              With thousands of members nationwide, ISOI drives continuing
              implant education, surgical accreditation, and scientific research
              to elevate standards of clinical patient care across the country.
            </p>

            Venue Information
            <h3 className="event30-subhead-red">
              Venue: Hyderabad International Convention Centre (HICC)
            </h3>
            <p>
              HICC is recognized as South Asia's premier convention facility,
              situated in HITEC City, Hyderabad. With world-class plenary
              auditoriums, exhibition halls, and hospitality infrastructure, it
              offers an unforgettable venue for the 32nd ISOI National
              Conference.
            </p>
          </div>
        </section>
        */}
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event30-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event30-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event30-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event30-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
