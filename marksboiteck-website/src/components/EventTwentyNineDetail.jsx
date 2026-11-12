import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-29.css";

export default function EventTwentyNineDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/event/29-in.webp",
      alt: "Global Expodent Bengaluru 2026 Official Poster - BIEC Tumkur Road",
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
      alt: "Key Opinion Leaders and Dignitaries at Exhibition Pavilion",
    },
    {
      src: "/assets/imgs/EI-3.webp",
      alt: "B&B Dental Exhibition Showcase - 34 Years of Clinical Success",
    },
    {
      src: "/assets/imgs/EI-1.webp",
      alt: "Marks Biotech Technical Specialists at Conference Pavilion",
    },
    {
      src: "/assets/imgs/event17.4.webp",
      alt: "Auditorium Surgical Lecture and Digital Workflow Presentation",
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
      "Global Expodent Bangalore 2026 | BIEC Tumkur Road | Marks Biotech";

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
    <main className="event29-page-main">
      <div className="event29-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event29-back-wrap">
          <Link to="/events" className="event29-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event29-hero-grid">
          <div>
            <span className="event29-eyebrow">Conference</span>
            <h1 className="event29-title">Global Expodent Bangalore</h1>

            <div className="event29-meta-lines" style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "20px", color: "#ffffff", margin: "0 0 6px 0", fontWeight: "600" }}>
                Bengaluru International Tumkur Road,
              </p>
              <p style={{ fontSize: "20px", color: "#ffffff", margin: "0 0 10px 0", fontWeight: "600" }}>
                Bengaluru-562123
              </p>
              <p style={{ fontSize: "18px", color: "#ffffff", margin: 0, fontWeight: "600" }}>
                24,26,27 September 2026
              </p>
            </div>

            {/*
            <div className="event29-subtitle">
              Welcome to the Biggest Dental Exhibition of India – 19th Edition
            </div>

            Badges
            <div className="event29-badges-wrap">
              <div className="event29-badge event29-badge-venue">
                <i className="fa-solid fa-location-dot"></i>
                <span>BIEC, Tumkur Road, Bengaluru – 562123</span>
              </div>
              <div className="event29-badge event29-badge-date">
                <i className="fa-regular fa-calendar-days"></i>
                <span>24, 25, 26, 27 September 2026</span>
              </div>
              <div className="event29-badge event29-badge-entry">
                <i className="fa-solid fa-ticket"></i>
                <span>ENTRY FREE</span>
              </div>
              <div className="event29-badge event29-badge-metro">
                <i className="fa-solid fa-train-subway"></i>
                <span>Namma Metro Operational to BIEC</span>
              </div>
            </div>

            <p className="event29-desc">
              Join Marks Biotech at the 19th Edition of Global Expodent Bengaluru
              at the iconic Bengaluru International Exhibition Center (BIEC).
              Experience next-generation dynamic surgical navigation, robotic
              implantology workflows, and premium European implant systems at
              India's premier mega dental trade exhibition.
            </p>
            */}
          </div>

          {/* Right Banner Image */}
          <div className="event29-banner-frame">
            <img
              src="/assets/event/29-in.webp"
              onError={(e) => {
                e.currentTarget.src = "/assets/event/29.webp";
              }}
              alt="Global Expodent Bengaluru 2026 - BIEC Tumkur Road"
              className="event29-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/*
        Event Gallery - Hidden per user request
        <section className="event29-gallery-section">
          <h2 className="event29-section-heading">Event Gallery</h2>

          Gallery Carousel Slider
          <div className="event29-carousel-container">
            <button
              type="button"
              className="event29-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event29-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event29-thumb-card ${
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
                    className="event29-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event29-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event29-content-layout">
          Left Column: Tags & Share
          <aside className="event29-sidebar">
            <div className="event29-sidebar-block">
              <div className="event29-sidebar-title">TAGS</div>
              <div className="event29-tags-list">
                <span className="event29-tag-item">EXPODENT</span>
                <span className="event29-tag-item">BENGALURU 2026</span>
                <span className="event29-tag-item">ADITI</span>
                <span className="event29-tag-item">BIEC</span>
                <span className="event29-tag-item">NAVIDENT</span>
                <span className="event29-tag-item">ENTRY FREE</span>
              </div>
            </div>

            <div className="event29-sidebar-block">
              <div className="event29-sidebar-title">Share</div>
              <div className="event29-share-icons">
                <button
                  type="button"
                  className="event29-share-icon-btn"
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
                  className="event29-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event29-share-icon-btn"
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
                  className="event29-share-icon-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </aside>

          Right Column: Main Content
          <div className="event29-main-column">
            About Global Expodent
            <h2 className="event29-section-red">
              About Global Expodent Bengaluru 2026
            </h2>
            <p>
              Organized by the Association of Dental Industry and Trade of India
              (ADITI), Global Expodent Bengaluru stands as the premier dental
              trade show and exhibition across South India. Now in its milestone
              <strong> 19th Edition</strong>, the exhibition convenes thousands
              of clinicians, dental technicians, laboratory owners, educators,
              and trade leaders under one roof at the Bengaluru International
              Exhibition Center (BIEC).
            </p>
            <p>
              As the biggest dental exhibition in India, Global Expodent showcases
              the complete spectrum of oral healthcare technology, from dynamic
              surgical navigation and 3D printing to precision implant systems
              and intraoral scanning solutions.
            </p>

            Fast Facts Card
            <h3 className="event29-subhead-red">Event Details &amp; Fast Facts</h3>
            <div className="event29-facts-card">
              <div className="event29-fact-row">
                <span className="event29-fact-label">Exhibition:</span>
                <span>Global Expodent Bengaluru 2026 (19th Edition)</span>
              </div>
              <div className="event29-fact-row">
                <span className="event29-fact-label">Organizer:</span>
                <span>
                  Association of Dental Industry and Trade of India (ADITI)
                </span>
              </div>
              <div className="event29-fact-row">
                <span className="event29-fact-label">Dates:</span>
                <span>24, 25, 26, 27 September 2026</span>
              </div>
              <div className="event29-fact-row">
                <span className="event29-fact-label">Venue:</span>
                <span>
                  Bengaluru International Exhibition Center (BIEC), Tumkur Road,
                  Bengaluru – 562123
                </span>
              </div>
              <div className="event29-fact-row">
                <span className="event29-fact-label">Admission:</span>
                <span>
                  ENTRY FREE for All Dental Professionals, Students &amp; Trade
                  Visitors
                </span>
              </div>
              <div className="event29-fact-row">
                <span className="event29-fact-label">Public Transit:</span>
                <span>
                  Direct Access via Namma Metro Green Line to BIEC Station
                </span>
              </div>
            </div>

            Experience Marks Biotech
            <h3 className="event29-subhead-red">
              Explore Future Technologies with Marks Biotech
            </h3>
            <p>
              Marks Biotech warmly invites clinicians, dental specialists, and
              practice owners to visit our dedicated pavilion at Global Expodent
              Bangalore. Experience interactive demonstrations and clinical
              discussions covering:
            </p>
            <ul className="event29-bullet-list">
              <li>
                <strong>Navident Dynamic 3D Surgical Navigation:</strong> Experience
                the gold standard in computer-assisted implantology. Track drills
                in real time on 3D CBCT scans with sub-millimeter accuracy,
                bypassing the delays, costs, and surgical restrictions of static
                stents.
              </li>
              <li>
                <strong>B&amp;B Dental Implant Innovations (Italy):</strong> Discover
                renowned European implant systems engineered with advanced
                titanium micro-topography for high primary stability, immediate
                loading, and crestal bone maintenance.
              </li>
              <li>
                <strong>Full-Arch Photogrammetry &amp; Passivity:</strong> Learn
                how photogrammetric position scanning eliminates distortion in
                multi-implant cases for immediate, stress-free full-arch
                prosthetics.
              </li>
              <li>
                <strong>Phantom-Head Surgical Simulations:</strong> Get hands-on
                guidance with Navident optical handpieces, drill calibrators, and
                smart navigation glasses.
              </li>
            </ul>

            Why Attend Global Expodent
            <h3 className="event29-subhead-red">
              Why Visit Global Expodent Bangalore?
            </h3>
            <ul className="event29-bullet-list">
              <li>
                Engage with hundreds of top manufacturers, digital dentistry
                innovators, and clinical experts.
              </li>
              <li>
                Take advantage of exclusive exhibition specials, machine packages,
                and hands-on workflow upgrades.
              </li>
              <li>
                Complimentary entry for all dental surgeons, clinical postgraduates,
                and clinic staff.
              </li>
              <li>
                Fast, stress-free transit with the fully operational Namma Metro
                connecting directly to BIEC on Tumkur Road.
              </li>
            </ul>

            About ADITI
            <h3 className="event29-subhead-red">About ADITI</h3>
            <p>
              The Association of Dental Industry and Trade of India (ADITI) is
              the nationwide governing body promoting ethical trade, technological
              progress, and collaborative partnerships between manufacturers and
              dental clinicians across the subcontinent.
            </p>

            Venue & Transit
            <h3 className="event29-subhead-red">
              Venue &amp; Metro Connectivity: BIEC Bengaluru
            </h3>
            <p>
              The Bengaluru International Exhibition Center (BIEC) on Tumkur Road
              is India’s premier exhibition destination, boasting expansive
              air-conditioned halls, wide exhibition concourses, and ample
              parking. Commuters can enjoy a swift and seamless journey thanks to
              the direct Namma Metro Green Line connection to the BIEC station.
            </p>
          </div>
        </section>
        */}
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event29-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event29-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event29-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event29-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
