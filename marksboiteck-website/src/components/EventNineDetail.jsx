import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-9.css";

export default function EventNineDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    document.title =
      "NAVIDENT Advanced Surgical & Prosthetic Workshop Nov - 2025 | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/pastevent2/1 Lamp Lighting.webp",
      alt: "Inaugural lamp lighting ceremony by dignitaries and faculty",
    },
    {
      src: "/assets/event/pastevent2/2 Dr Ashwini.webp",
      alt: "Keynote address and welcome speech by Dr. Ashwini",
    },
    {
      src: "/assets/event/pastevent2/SRS02028.webp",
      alt: "Clinical presentation on dynamic navigation protocols and case studies",
    },
    {
      src: "/assets/event/pastevent2/SRS02076.webp",
      alt: "Live demonstration of real-time 3D drill tracking and navigation",
    },
    {
      src: "/assets/event/pastevent2/SRS02265.webp",
      alt: "Hands-on participant practice on phantom head with optical tracker handpiece",
    },
    {
      src: "/assets/event/pastevent2/SRS02112.webp",
      alt: "Patient registration and optical tracking calibration setup",
    },
    {
      src: "/assets/event/pastevent2/SRS01729.webp",
      alt: "Delegates and implantology clinicians attending scientific sessions",
    },
    {
      src: "/assets/event/pastevent2/SRS02290.webp",
      alt: "Dynamic navigation osteotomy accuracy verification on model",
    },
    {
      src: "/assets/event/pastevent2/SRS02300.webp",
      alt: "Interactive Q&A discussion and clinical case evaluation",
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
      "NAVIDENT Advanced Surgical & Prosthetic Workshop Nov - 2025 | Marks Biotech";

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
    <main className="event9-page-main">
      <div className="event9-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event9-back-wrap">
          <Link to="/events" className="event9-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event9-hero-grid">
          <div>
            <span className="event9-badge-pill">WORKSHOP</span>
            <h1 className="event9-title">
              NAVIDENT Advanced Surgical &amp; Prosthetic Workshop Nov - 2025
            </h1>
            <div className="event9-subtitle">
              New Era of Precision Dentistry
            </div>
            <p className="event9-hero-desc">
              A next-generation educational program focused on Dynamic Navigation, Guided Implantology, Prosthetic Precision, and Advanced Surgical Protocols. This workshop brings together global experts to deliver a hands-on, technology-driven learning experience designed for clinicians who aim to elevate their implant practice with accuracy, predictability, and minimally invasive techniques.
            </p>
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event9-banner-frame"
            onClick={() => setLightboxImg("/assets/event/12.webp")}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxImg("/assets/event/12.webp");
            }}
          >
            <img
              src="/assets/event/12.webp"
              alt="NAVIDENT Advanced Surgical & Prosthetic Workshop Nov - 2025 Flyer"
              className="event9-banner-img"
              loading="eager"
            />
            <div className="event9-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
          </div>
        </section>

        {/* Event Gallery Section */}
        <section className="event9-gallery-section">
          <h2 className="event9-gallery-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event9-carousel-container">
            <button
              type="button"
              className="event9-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event9-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event9-thumb-card ${
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
                    className="event9-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event9-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event9-content-layout">
          {/* Left Column: Tags, Share & Quick Info */}
          <aside className="event9-sidebar">
            <div className="event9-sidebar-block">
              <div className="event9-sidebar-title">TAGS</div>
              <div className="event9-tags-list">
                <div className="event9-tag-item">
                  <Link to="/events" className="event9-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event9-tag-item">
                  <Link to="/events" className="event9-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event9-tag-item">
                  <Link to="/events" className="event9-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event9-sidebar-block">
              <div className="event9-sidebar-title">Share</div>
              <div className="event9-share-icons">
                <button
                  type="button"
                  className="event9-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event9-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event9-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event9-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            {/* Quick Facts Snapshot */}
            <div className="event9-quick-facts">
              <div className="event9-fact-row">
                <span className="event9-fact-label">Date:</span>
                <span className="event9-fact-val">26th November 2025</span>
              </div>
              <div className="event9-fact-row">
                <span className="event9-fact-label">Time:</span>
                <span className="event9-fact-val">9:30 AM – 6:30 PM</span>
              </div>
              <div className="event9-fact-row">
                <span className="event9-fact-label">Type:</span>
                <span className="event9-fact-val">Comprehensive Hands-on Workshop</span>
              </div>
              <div className="event9-fact-row">
                <span className="event9-fact-label">Venue:</span>
                <span className="event9-fact-val">IDA Headquarters, Mumbai</span>
              </div>
              <div className="event9-fact-row">
                <span className="event9-fact-label">Collaboration:</span>
                <span className="event9-fact-val">Claronav Canada &amp; Marks Biotech</span>
              </div>
            </div>
          </aside>

          {/* Right Main Column: Workshop Content */}
          <div className="event9-main-column">
            {/* Header Block */}
            <div className="event9-block-card">
              <h1 className="event9-section-heading">
                New Era of Precision Dentistry
              </h1>
              <div className="event9-section-subheading">
                NAVIDENT Comprehensive Surgical &amp; Prosthetic Navigation Workshop 2025
              </div>
              <p className="event9-lead-p">
                The NAVIDENT Comprehensive Surgical &amp; Prosthetic Navigation Workshop 2025 was successfully conducted as an advanced clinical training program dedicated to the future of precision-driven implant dentistry. This intensive educational event brought together leading clinicians, implantologists, and digital dentistry experts for a technology-focused, hands-on learning experience.
              </p>
              <p className="event9-lead-p" style={{ marginBottom: 0 }}>
                Centered around dynamic navigation, guided implantology, prosthetic precision, and advanced surgical protocols, the workshop delivered practical insights and real-time exposure to next-generation digital workflows.
              </p>
            </div>

            {/* About the Workshop */}
            <div className="event9-block-card">
              <h2 className="event9-block-title">About the Workshop</h2>
              <p className="event9-lead-p">
                Powered by Navident, this comprehensive program was designed to bridge the gap between traditional implant techniques and navigation-assisted surgical precision.
              </p>
              <p className="event9-lead-p">
                With dentistry rapidly evolving through artificial intelligence, digital tracking systems, robotics, and photogrammetry, the workshop provided participants with structured, clinically relevant training in:
              </p>
              <ul className="event9-bullet-list">
                <li>Dynamic Navigation Systems</li>
                <li>Guided Implant Placement</li>
                <li>Prosthetic Workflow Optimization</li>
                <li>Complex Surgical Case Management</li>
                <li>Minimally Invasive Implant Protocols</li>
              </ul>
              <p className="event9-lead-p" style={{ marginBottom: 0 }}>
                The program combined theoretical sessions, live clinical demonstrations, and hands-on simulation training to ensure complete clinical confidence and practical implementation.
              </p>
            </div>

            {/* Workshop Highlights */}
            <div className="event9-block-card">
              <h2 className="event9-block-title">Workshop Highlights</h2>

              <div className="event9-focus-item">
                <h3 className="event9-focus-item-title">
                  <i className="fa-solid fa-compass"></i> Advanced Navigation Training
                </h3>
                <p className="event9-focus-item-desc">
                  Participants gained in-depth exposure to real-time surgical tracking, calibration protocols, accuracy validation, and integration of navigation systems into daily implant practice.
                </p>
              </div>

              <div className="event9-focus-item">
                <h3 className="event9-focus-item-title">
                  <i className="fa-solid fa-brain"></i> Comprehensive Treatment Planning
                </h3>
                <p className="event9-focus-item-desc">
                  Live demonstrations using Navident software enabled clinicians to understand 3D planning, angulation control, and precision-driven implant positioning for predictable outcomes.
                </p>
              </div>

              <div className="event9-focus-item">
                <h3 className="event9-focus-item-title">
                  <i className="fa-solid fa-tooth"></i> Guided Endodontics &amp; Micro-Surgery
                </h3>
                <p className="event9-focus-item-desc">
                  The workshop covered navigation-assisted access preparation, apicoectomy planning, and magnification-based surgical workflows for complex endodontic cases.
                </p>
              </div>

              <div className="event9-focus-item">
                <h3 className="event9-focus-item-title">
                  <i className="fa-solid fa-shield-halved"></i> Zygoma &amp; Pterygoid Implant Protocols
                </h3>
                <p className="event9-focus-item-desc">
                  Advanced full-arch rehabilitation strategies were demonstrated using minimally invasive navigation-assisted techniques to improve surgical stability and long-term prosthetic success.
                </p>
              </div>

              <div className="event9-focus-item">
                <h3 className="event9-focus-item-title">
                  <i className="fa-solid fa-camera"></i> Photogrammetry &amp; Full-Arch Accuracy
                </h3>
                <p className="event9-focus-item-desc">
                  Participants explored digital impression workflows, multi-implant scanning accuracy, occlusal precision, and chairside efficiency enhancement through technology-driven integration.
                </p>
              </div>
            </div>

            {/* Hands-On Clinical Experience */}
            <div className="event9-block-card">
              <h2 className="event9-block-title">Hands-On Clinical Experience</h2>
              <p className="event9-lead-p">
                A major highlight of the workshop was its practical orientation. Attendees participated in:
              </p>
              <ul className="event9-bullet-list">
                <li>Live surgical implant placement demonstrations</li>
                <li>Treatment planning sessions using Navident software</li>
                <li>Navigation calibration and drill tracking exercises</li>
                <li>Simulation surgeries on mannequins</li>
                <li>Full-arch case planning with integrated digital workflow</li>
              </ul>
            </div>

            {/* Clinical Impact */}
            <div className="event9-block-card">
              <h2 className="event9-block-title">Clinical Impact</h2>
              <p className="event9-lead-p">
                The workshop reinforced the growing importance of dynamic navigation in modern implant dentistry. Unlike static guides, dynamic navigation allows real-time surgical adjustments, improved angulation control, enhanced anatomical safety, and greater restorative predictability.
              </p>
              <p className="event9-lead-p">
                Participants left with a clear roadmap to:
              </p>
              <ul className="event9-bullet-list">
                <li>Integrate dynamic navigation into routine implant practice</li>
                <li>Execute complex implant cases with improved precision</li>
                <li>Reduce surgical risks through real-time tracking</li>
                <li>Enhance prosthetic accuracy and restorative outcomes</li>
                <li>Strengthen collaboration within multidisciplinary dental teams</li>
              </ul>
            </div>

            {/* A Successful Learning Milestone */}
            <div className="event9-block-card">
              <h2 className="event9-block-title">A Successful Learning Milestone</h2>
              <p className="event9-lead-p">
                The NAVIDENT Comprehensive Surgical &amp; Prosthetic Navigation Workshop 2025 marked a significant step toward digitally empowered implantology. The strong engagement, interactive discussions, and hands-on participation reflected the profession&apos;s commitment to adopting advanced, minimally invasive, and technology-driven clinical protocols.
              </p>
              <p className="event9-lead-p">
                We extend our appreciation to all clinicians and experts who contributed to making this workshop a valuable educational milestone.
              </p>
              <p className="event9-lead-p" style={{ marginBottom: 0 }}>
                As digital dentistry continues to evolve, we remain committed to supporting clinicians with advanced training programs that redefine precision, predictability, and long-term clinical excellence.
              </p>
            </div>

            {/* Event Details */}
            <div className="event9-block-card">
              <h2 className="event9-block-title">Event Details</h2>
              <div className="event9-details-list">
                <div className="event9-detail-row">
                  <div className="event9-detail-icon">
                    <i className="fa-regular fa-calendar-days"></i>
                  </div>
                  <div className="event9-detail-content">
                    <span className="event9-detail-label">Date</span>
                    <span className="event9-detail-val">26th November 2025</span>
                  </div>
                </div>

                <div className="event9-detail-row">
                  <div className="event9-detail-icon">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <div className="event9-detail-content">
                    <span className="event9-detail-label">Time</span>
                    <span className="event9-detail-val">9:30 AM – 6:30 PM</span>
                  </div>
                </div>

                <div className="event9-detail-row">
                  <div className="event9-detail-icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="event9-detail-content">
                    <span className="event9-detail-label">Venue</span>
                    <span className="event9-detail-val">
                      IDA Headquarters, Prabhadevi, Mumbai, India
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/*
            Call To Action Box - Hidden per user request
            <div className="event9-cta-box">
              <h3 className="event9-cta-title">Interested in Future Navident Workshops &amp; Masterclasses?</h3>
              <p className="event9-cta-desc">
                Connect with Marks Biotech for upcoming hands-on dynamic navigation training sessions, clinical masterclasses, and product demonstrations in Mumbai and nationwide.
              </p>
              <div className="event9-cta-actions">
                <a
                  href="https://wa.me/919840000000?text=Hi%2C%20I%20am%20interested%20in%20future%20Navident%20Advanced%20Surgical%20%26%20Prosthetic%20Workshops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event9-btn-primary"
                >
                  <i className="fa-brands fa-whatsapp"></i> Inquire via WhatsApp
                </a>
                <Link to="/events" className="event9-btn-secondary">
                  <i className="fa-solid fa-list-check"></i> Explore All Events
                </Link>
              </div>
            </div>
            */}
          </div>
        </section>
      </div>

      {/* Lightbox Flyer / Image Modal */}
      {lightboxImg && (
        <div
          className="event9-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event9-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event9-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged view"
              className="event9-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
