import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-24.css";

export default function EventTwentyFourDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselRef = useRef(null);

  const youtubeVideoId = "I5zBrGDOF3s";

  useEffect(() => {
    document.title =
      "Manipal College of Dental Science (Mangalore) Navident at Maxillofacial Department | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/Manipul/manipul1.webp",
      alt: "Navident dynamic navigation cart in MCODS Mangalore lecture hall",
    },
    {
      src: "/assets/event/Manipul/manipul2.webp",
      alt: "Live surgery with real-time drill tracking at Maxillofacial Department",
    },
    {
      src: "/assets/event/Manipul/manipul3.webp",
      alt: "Clinicians reviewing live 3D navigation and drill tracking display",
    },
    {
      src: "/assets/event/Manipul/manipul6.webp",
      alt: "Department faculty and clinical team presentation gathering",
    },
    {
      src: "/assets/event/Manipul/manipul4.webp",
      alt: "Faculty, delegates and surgical team assembly around Navident system",
    },
    {
      src: "/assets/event/Manipul/manipul5.webp",
      alt: "Surgical team in operatory with patient and Navident cart",
    },
    {
      src: "/assets/event/Manipul/manipul7.webp",
      alt: "Clinical team assembled around Navident unit at MCODS",
    },
    {
      src: "/assets/event/Manipul/manipul8.webp",
      alt: "Department heads and clinical dignitaries at installation",
    },
  ];

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "Manipal College of Dental Science (Mangalore) Navident at Maxillofacial Department | Marks Biotech";

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
    <main className="event24-page-main">
      <div className="event24-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event24-back-wrap">
          <Link to="/events" className="event24-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event24-hero-grid">
          <div>
            <span className="event24-eyebrow">Workshop</span>
            <h1 className="event24-title">
              Manipal College of Dental Science (Mangalore) Navident at Maxillofacial Department
            </h1>
            {/*
            <div className="event24-subtitle">
              Installation Announcement &amp; Clinical Demonstration | October 2025
            </div>
            <p className="event24-hero-desc">
              Marks Biotech and ClaroNav Dental Canada proudly announce the installation and clinical integration of the Navident Evo Dynamic 3D Navigation System at the Department of Oral &amp; Maxillofacial Surgery, Manipal College of Dental Sciences (MCODS), Mangalore.
            </p>
            */}
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event24-banner-frame"
            onClick={() => setLightboxImg("/assets/event/24.webp")}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxImg("/assets/event/24.webp");
            }}
          >
            <img
              src="/assets/event/24.webp"
              alt="Manipal College of Dental Science (Mangalore) Navident at Maxillofacial Department Flyer"
              className="event24-banner-img"
              loading="eager"
            />
            {/*
            <div className="event24-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
            */}
          </div>
        </section>

        {/* Event Gallery & Video Showcase */}
        <section className="event24-gallery-section">
          <h2 className="event24-gallery-heading">Event Gallery</h2>

          {/* Featured Video Frame */}
          <div className="event24-video-wrapper">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="New Navident Evo — Installation Announcement at Manipal College of Dental Sciences"
                className="event24-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="event24-video-cover"
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Play New Navident Evo Installation Announcement video"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsVideoPlaying(true);
                }}
              >
                {/* Ambient Blurred Backdrop */}
                <img
                  src="/assets/event/event24-video-cover.jpg"
                  alt="Navident Evo Installation Video Cover Ambient Backdrop"
                  aria-hidden="true"
                  className="event24-video-backdrop"
                />

                {/* Center Video Cover Graphic */}
                <div className="event24-video-center-panel">
                  <img
                    src="/assets/event/event24-video-cover.jpg"
                    alt="New Navident Evo Installation Announcement at MCODS Mangalore"
                    className="event24-video-center-img"
                  />
                </div>

                {/* YouTube Play Button Overlay */}
                <div className="event24-video-overlay">
                  <div className="event24-play-btn" aria-label="Play video">
                    <div className="event24-play-triangle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Carousel Slider */}
          <div className="event24-carousel-container">
            <button
              type="button"
              className="event24-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event24-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event24-thumb-card ${
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
                    className="event24-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event24-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/*
        Two-Column Editorial Details Layout - Hidden per user request
        <section className="event24-content-layout">
          Left Column: Tags, Share & Quick Info
          <aside className="event24-sidebar">
            <div className="event24-sidebar-block">
              <div className="event24-sidebar-title">TAGS</div>
              <div className="event24-tags-list">
                <div className="event24-tag-item">
                  <Link to="/events" className="event24-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event24-tag-item">
                  <Link to="/events" className="event24-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event24-tag-item">
                  <Link to="/events" className="event24-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event24-sidebar-block">
              <div className="event24-sidebar-title">Share</div>
              <div className="event24-share-icons">
                <button
                  type="button"
                  className="event24-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event24-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event24-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event24-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            Quick Facts Snapshot
            <div className="event24-quick-facts">
              <div className="event24-fact-row">
                <span className="event24-fact-label">Date:</span>
                <span className="event24-fact-val">October 2025</span>
              </div>
              <div className="event24-fact-row">
                <span className="event24-fact-label">Institution:</span>
                <span className="event24-fact-val">MCODS Mangalore (MAHE)</span>
              </div>
              <div className="event24-fact-row">
                <span className="event24-fact-label">Department:</span>
                <span className="event24-fact-val">Oral &amp; Maxillofacial Surgery</span>
              </div>
              <div className="event24-fact-row">
                <span className="event24-fact-label">Technology:</span>
                <span className="event24-fact-val">Navident Evo Dynamic Navigation</span>
              </div>
              <div className="event24-fact-row">
                <span className="event24-fact-label">Partners:</span>
                <span className="event24-fact-val">ClaroNav Canada &amp; Marks Biotech</span>
              </div>
            </div>
          </aside>

          Right Main Column: Workshop Content
          <div className="event24-main-column">
            Header Block
            <div className="event24-block-card">
              <h1 className="event24-section-heading">
                Navident Dynamic Navigation at Maxillofacial Department
              </h1>
              <div className="event24-section-subheading">
                Installation Announcement &amp; Clinical Demonstration – MCODS Mangalore
              </div>
              <p className="event24-lead-p">
                Manipal College of Dental Sciences (MCODS), Mangalore — a prestigious constituent institution of Manipal Academy of Higher Education (MAHE) — has taken a landmark step into computer-assisted surgical robotics with the official installation of the Navident Evo Dynamic 3D Navigation system in its Department of Oral &amp; Maxillofacial Surgery.
              </p>
              <p className="event24-lead-p" style={{ marginBottom: 0 }}>
                Conducted in strategic collaboration with ClaroNav Dental Canada and Marks Biotech, this academic and clinical milestone brings real-time optical surgical navigation directly into the operatory for advanced maxillofacial reconstruction and dynamic dental implantology.
              </p>
            </div>

            Installation &amp; Clinical Overview
            <div className="event24-block-card">
              <h2 className="event24-block-title">Installation &amp; Clinical Overview</h2>
              <p className="event24-lead-p">
                The installation program in October 2025 brought together senior professors, maxillofacial surgical faculty, and post-graduate residents for intensive hands-on orientation, calibration protocols, and live clinical demonstrations.
              </p>
              <p className="event24-lead-p" style={{ marginBottom: 0 }}>
                Equipped with high-precision optical stereoscopic motion tracking, MicronMapper technology, and instantaneous CBCT integration, Navident Evo enables surgeons to track the surgical handpiece and drill tip in three dimensions relative to the patient&apos;s anatomical landmarks with sub-millimeter accuracy.
              </p>
            </div>

            Scientific &amp; Clinical Focus Areas
            <div className="event24-block-card">
              <h2 className="event24-block-title">Scientific &amp; Clinical Focus Areas</h2>

              <div className="event24-focus-item">
                <h3 className="event24-focus-item-title">
                  <i className="fa-solid fa-compass"></i> Dynamic Navigation in Maxillofacial Procedures
                </h3>
                <p className="event24-focus-item-desc">
                  Exploring real-time 3D drill tracking, optical fiducial registration, and intraoperative flexibility. Unlike static surgical templates, dynamic navigation allows immediate surgical adjustments, unrestricted irrigation, and clear visual monitoring of vital anatomical structures.
                </p>
              </div>

              <div className="event24-focus-item">
                <h3 className="event24-focus-item-title">
                  <i className="fa-solid fa-brain"></i> Complex Anatomical Planning &amp; AI Integration
                </h3>
                <p className="event24-focus-item-desc">
                  Precision planning in anatomically compromised scenarios, including proximity to the inferior alveolar nerve canal, maxillary sinus floor elevations, pterygoid implant placements, and full-arch immediate loading reconstructions.
                </p>
              </div>

              <div className="event24-focus-item">
                <h3 className="event24-focus-item-title">
                  <i className="fa-solid fa-shield-halved"></i> Minimally Invasive Execution &amp; Risk Reduction
                </h3>
                <p className="event24-focus-item-desc">
                  Live workflow demonstration showed how optical guidance minimizes flap reflection, enhances bone preservation, prevents deviations from prosthetically planned trajectories, and shortens patient recovery times.
                </p>
              </div>
            </div>

            Live Demonstrations &amp; Practical Learning
            <div className="event24-block-card">
              <h2 className="event24-block-title">Live Demonstrations &amp; Practical Learning</h2>
              <p className="event24-lead-p">
                A key highlight of the installation session was the live navigation workflow demonstration and hands-on phantom simulation:
              </p>
              <ul className="event24-bullet-list">
                <li>Rapid CBCT DICOM importation and prosthetically driven implant treatment planning</li>
                <li>Patient tracking headband and dynamic optical fiducial registration</li>
                <li>Handpiece calibration and real-time drill tip verification protocols</li>
                <li>Live osteotomy simulation highlighting depth, angulation, and entry-point precision</li>
              </ul>
              <p className="event24-lead-p" style={{ marginBottom: 0 }}>
                The interactive session provided faculty and postgraduates with practical clarity on integrating computer-assisted dynamic navigation into daily clinical and teaching protocols.
              </p>
            </div>

            Academic &amp; Departmental Impact
            <div className="event24-block-card">
              <h2 className="event24-block-title">Academic &amp; Departmental Impact</h2>
              <p className="event24-lead-p">
                With this state-of-the-art addition, Manipal College of Dental Sciences, Mangalore solidifies its position among premier dental education and healthcare institutions in India, offering postgraduates exposure to cutting-edge robotic and navigation dentistry.
              </p>
              <p className="event24-lead-p" style={{ marginBottom: 0 }}>
                Marks Biotech is dedicated to supporting MCODS Mangalore with comprehensive clinical backing, training modules, and continuous technical assistance to advance patient outcomes and clinical research.
              </p>
            </div>

            Event Details
            <div className="event24-block-card">
              <h2 className="event24-block-title">Event Details</h2>
              <div className="event24-details-list">
                <div className="event24-detail-row">
                  <div className="event24-detail-icon">
                    <i className="fa-regular fa-calendar-days"></i>
                  </div>
                  <div className="event24-detail-content">
                    <span className="event24-detail-label">Date</span>
                    <span className="event24-detail-val">October 2025</span>
                  </div>
                </div>

                <div className="event24-detail-row">
                  <div className="event24-detail-icon">
                    <i className="fa-solid fa-hospital"></i>
                  </div>
                  <div className="event24-detail-content">
                    <span className="event24-detail-label">Institution</span>
                    <span className="event24-detail-val">
                      Manipal College of Dental Sciences (MCODS), Mangalore (MAHE)
                    </span>
                  </div>
                </div>

                <div className="event24-detail-row">
                  <div className="event24-detail-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="event24-detail-content">
                    <span className="event24-detail-label">Department</span>
                    <span className="event24-detail-val">
                      Department of Oral &amp; Maxillofacial Surgery, Light House Hill Road, Mangalore, Karnataka
                    </span>
                  </div>
                </div>
              </div>
            </div>

            Call To Action Box
            <div className="event24-cta-box">
              <h3 className="event24-cta-title">Interested in Navident Dynamic Navigation for Your Institution?</h3>
              <p className="event24-cta-desc">
                Connect with Marks Biotech for academic installations, clinical demonstrations, and advanced surgical navigation workshops across India.
              </p>
              <div className="event24-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20Navident%20Dynamic%20Navigation%20for%20our%20department%20/%20institution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event24-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event24-btn-secondary">
                  <i className="fa-solid fa-list-check"></i> Explore All Events
                </Link>
              </div>
            </div>
          </div>
        </section>
        */}
      </div>

      {/* Lightbox Flyer / Image Modal */}
      {lightboxImg && (
        <div
          className="event24-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event24-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event24-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged view"
              className="event24-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
