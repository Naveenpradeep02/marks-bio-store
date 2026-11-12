import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/event-28.css";

export default function EventTwentyEightDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const carouselRef = useRef(null);

  const galleryImages = [
    {
      src: "/assets/event/28.png",
      alt: "ICOI ASEAN Congress 2026 Poster - Saveetha Dental College Chennai",
    },
    {
      src: "/assets/imgs/event17.3.webp",
      alt: "International Faculty & Clinician Gathering at Oral Implantology Congress",
    },
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Navident Dynamic 3D Surgical Navigation Live Discussion & Demonstration",
    },
    {
      src: "/assets/imgs/EI-5.webp",
      alt: "Hands-on Navident Phantom Head Navigation with Smart Glasses",
    },
    {
      src: "/assets/imgs/event18.2.webp",
      alt: "Marks Biotech & B&B Dental Clinical Navigation Technology Team",
    },
    {
      src: "/assets/imgs/EI-4.webp",
      alt: "Key Opinion Leaders and Dignitaries at Congress Scientific Session",
    },
    {
      src: "/assets/imgs/event17.4.webp",
      alt: "Auditorium Main Stage Surgical Lecture on Immediate Load Protocols",
    },
    {
      src: "/assets/imgs/event17.5.webp",
      alt: "Faculty Panel and Dignitaries at ICOI Scientific Forum",
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
      "ICOI - Asean Congress 2026 | Crafting the Future: Human Artistry in a Digital Age | Marks Biotech";

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
    <main className="event28-page-main">
      <div className="event28-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event28-back-wrap">
          <Link to="/events" className="event28-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event28-hero-grid">
          <div>
            <span className="event28-eyebrow">CONFERENCE</span>
            <h1 className="event28-title">ICOI - Asean Congress</h1>
            <div className="event28-subtitle">
              Crafting the Future: Human Artistry in a Digital Age
            </div>
            <p className="event28-tagline">
              Come and visit us to Explore the Future Technology Today.
            </p>
            <div className="event28-date-badge">
              <i className="fa-regular fa-calendar-days"></i>
              <span>Date – July 24-26, 2026</span>
            </div>
            <p className="event28-desc">
              Join leading implantologists, prosthodontists, researchers, and
              dental innovators at Saveetha Dental College, Chennai for a
              transformative 3-day congress exploring human artistry amplified
              by modern digital navigation and restorative workflows.
            </p>
          </div>

          {/* Right Banner Image */}
          <div className="event28-banner-frame">
            <img
              src="/assets/event/28.png"
              alt="ICOI - Asean Congress 2026 - Crafting the Future: Human Artistry in a Digital Age"
              className="event28-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event28-gallery-section">
          <h2 className="event28-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event28-carousel-container">
            <button
              type="button"
              className="event28-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event28-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event28-thumb-card ${
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
                    className="event28-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event28-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/*
        Two-Column Editorial Details Layout
        <section className="event28-content-layout">
          Left Column: Tags & Share
          <aside className="event28-sidebar">
            <div className="event28-sidebar-block">
              <div className="event28-sidebar-title">TAGS</div>
              <div className="event28-tags-list">
                <span className="event28-tag-item">ICOI ASEAN</span>
                <span className="event28-tag-item">ORAL IMPLANTOLOGY</span>
                <span className="event28-tag-item">DIGITAL DENTISTRY</span>
                <span className="event28-tag-item">CHENNAI 2026</span>
                <span className="event28-tag-item">NAVIDENT</span>
              </div>
            </div>

            <div className="event28-sidebar-block">
              <div className="event28-sidebar-title">Share</div>
              <div className="event28-share-icons">
                <button
                  type="button"
                  className="event28-share-icon-btn"
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
                  className="event28-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event28-share-icon-btn"
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
                  className="event28-share-icon-btn"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>
          </aside>

          Right Column: Main Content
          <div className="event28-main-column">
            About ICOI ASEAN Congress
            <h2 className="event28-article-title">
              About ICOI - ASEAN Congress 2026
            </h2>
            <p>
              The International Congress of Oral Implantologists (ICOI) ASEAN
              Congress is one of the premier implantology events across Asia,
              uniting world-renowned clinical masters, academic researchers, and
              innovative medical device leaders at Saveetha Dental College &amp;
              Hospital in Chennai, India.
            </p>

            Fast Facts Card
            <div className="event28-facts-card">
              <div className="event28-fact-row">
                <span className="event28-fact-label">Event:</span>
                <span>ICOI - ASEAN Congress 2026</span>
              </div>
              <div className="event28-fact-row">
                <span className="event28-fact-label">Theme:</span>
                <span>Crafting the Future: Human Artistry in a Digital Age</span>
              </div>
              <div className="event28-fact-row">
                <span className="event28-fact-label">Date:</span>
                <span>July 24-26, 2026</span>
              </div>
              <div className="event28-fact-row">
                <span className="event28-fact-label">Venue:</span>
                <span>
                  Saveetha Dental College &amp; Hospital, Saveetha University,
                  Chennai, India
                </span>
              </div>
              <div className="event28-fact-row">
                <span className="event28-fact-label">Focus:</span>
                <span>
                  Dynamic 3D Surgical Navigation, Human Artistry &amp; Digital
                  Integration, Immediate Loading, Tissue Engineering
                </span>
              </div>
            </div>

            <p>
              Under the theme <em>"Crafting the Future: Human Artistry in a Digital Age"</em>,
              the congress explores the delicate balance between clinician skill,
              biological intuition, and state-of-the-art digital tools. Delegates
              will discover how digital workflows empower surgeons to reach
              unprecedented levels of precision without sacrificing human artistry.
            </p>

            Marks Biotech at the Congress
            <h3 className="event28-subhead-red">
              Explore Future Technology with Marks Biotech
            </h3>
            <p>
              Come and visit the Marks Biotech exhibition and experience center
              during the congress. Experience live hands-on simulations of
              computer-assisted dynamic surgical navigation, robotic guidance,
              and full-arch photogrammetry workflows:
            </p>
            <ul className="event28-bullet-list">
              <li>
                <strong>Navident Dynamic Navigation:</strong> Real-time 3D optical
                tracking allowing freehand surgery with CT-guided sub-millimeter
                accuracy and trace registration.
              </li>
              <li>
                <strong>B&amp;B Dental Implant Innovations:</strong> Premium
                implant solutions engineered for primary stability, immediate
                loading, and long-term crestal bone preservation.
              </li>
              <li>
                <strong>Full-Arch Photogrammetry &amp; Passivity:</strong> High-precision
                optical implant positioning workflows that eliminate distortion
                in multi-unit full-arch cases.
              </li>
              <li>
                <strong>Phantom-Head Surgical Drills:</strong> Hands-on trial
                stations guided by clinical product specialists.
              </li>
            </ul>

            Why This Congress Matters
            <h3 className="event28-subhead-red">Why Attend the ICOI ASEAN Congress?</h3>
            <ul className="event28-bullet-list">
              <li>
                Master clinical protocols combining cutting-edge digital diagnostics,
                virtual surgical planning, and biological tissue management.
              </li>
              <li>
                Engage in intensive scientific sessions, keynote masterclasses,
                and panel discussions led by ASEAN and global implant authorities.
              </li>
              <li>
                Observe step-by-step case presentations of complex full-arch
                rehabilitations, bone grafting, and immediate provisionalization.
              </li>
              <li>
                Network with over 1,500 delegates, researchers, and fellow
                surgeons committed to clinical excellence.
              </li>
            </ul>

            About ICOI
            <h3 className="event28-subhead-red">About ICOI</h3>
            <p>
              Founded in 1972, the International Congress of Oral Implantologists
              (ICOI) is the world's largest dental implant organization and the
              worldwide leader in continuing implant education. The ICOI is
              dedicated to providing higher education, scientific validation,
              and clinical credentials to implant practitioners worldwide.
            </p>

            About Saveetha Dental College
            <h3 className="event28-subhead-red">About the Venue: Saveetha Dental College</h3>
            <p>
              Saveetha Dental College &amp; Hospital, situated at Saveetha
              University in Chennai, is internationally celebrated as one of the
              top dental institutions globally. Equipped with ultra-modern clinical
              facilities, advanced surgical theaters, and extensive research
              infrastructure, it provides the ideal backdrop for this historic
              congress.
            </p>
          </div>
        </section>
        */}
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event28-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event28-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event28-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged conference showcase"
              className="event28-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
