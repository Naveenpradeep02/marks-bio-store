import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-25.css";

export default function EventTwentyFiveDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselRef = useRef(null);

  const youtubeVideoId = "FYQUKaYSk8w";

  useEffect(() => {
    document.title =
      "Expodent Delhi | Expodent International India 2025 | Marks Biotech";
    window.scrollTo(0, 0);
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/pastevent3/EI-3.webp",
      alt: "Marks Biotech DURA-VIT dental implant system exhibition booth at Expodent Delhi",
    },
    {
      src: "/assets/event/pastevent3/E1-6.webp",
      alt: "Live clinical demonstration of Navident dynamic navigation on phantom head",
    },
    {
      src: "/assets/event/pastevent3/EI-5.webp",
      alt: "Doctor testing Navident smart optical tracking glasses and navigation unit",
    },
    {
      src: "/assets/event/pastevent3/E1-2.webp",
      alt: "ClaroNav Dental and Marks Biotech leadership team at MicronMapper & Navident pavilion",
    },
    {
      src: "/assets/event/pastevent3/EI-1.webp",
      alt: "Clinicians and delegates exploring MONO, PTERYGO, and MINI dental implants",
    },
    {
      src: "/assets/event/pastevent3/EI-4.webp",
      alt: "Visiting dental dignitaries and clinical delegates at Expodent Delhi",
    },
    {
      src: "/assets/event/pastevent3/1.webp",
      alt: "Scientific presentation and interactive clinician engagement",
    },
    {
      src: "/assets/event/pastevent3/5.webp",
      alt: "Comprehensive surgical instrumentation and dynamic guidance showcase",
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
      "Expodent Delhi | Expodent International India 2025 | Marks Biotech";

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
    <main className="event25-page-main">
      <div className="event25-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event25-back-wrap">
          <Link to="/events" className="event25-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event25-hero-grid">
          <div>
            <span className="event25-eyebrow">Workshop</span>
            <h1 className="event25-title">Expodent Delhi</h1>
            {/*
            <div className="event25-subtitle">
              EXPODENT INTERNATIONAL INDIA 2025 | Pragati Maidan, New Delhi
            </div>
            <p className="event25-hero-desc">
              Asia&apos;s premier dental trade exhibition brought together leading clinicians, dental surgeons, and industry innovators. Marks Biotech, in partnership with ClaroNav Dental Canada and B. &amp; B. Dental Italy, showcased next-generation dynamic 3D navigation, state-of-the-art implantology protocols, digital photogrammetry, and live clinical simulation workflows.
            </p>
            */}
          </div>

          {/* Right Banner Poster Image */}
          <div
            className="event25-banner-frame"
            onClick={() => setLightboxImg("/assets/event/25.webp")}
            role="button"
            tabIndex={0}
            aria-label="Click to enlarge event flyer"
            onKeyDown={(e) => {
              if (e.key === "Enter") setLightboxImg("/assets/event/25.webp");
            }}
          >
            <img
              src="/assets/event/25.webp"
              alt="Expodent International India 2025 Flyer"
              className="event25-banner-img"
              loading="eager"
            />
            {/*
            <div className="event25-zoom-indicator">
              <i className="fa-solid fa-magnifying-glass-plus"></i> Click to enlarge
            </div>
            */}
          </div>
        </section>

        {/* Event Gallery & Video Showcase */}
        <section className="event25-gallery-section">
          <h2 className="event25-gallery-heading">Event Gallery</h2>

          {/* Featured Video Frame */}
          <div className="event25-video-wrapper">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Day 2 Expodent Delhi - Marks Biotech & Navident Showcase"
                className="event25-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="event25-video-cover"
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Play Day 2 Expodent Delhi video"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsVideoPlaying(true);
                }}
              >
                {/* Ambient Blurred Backdrop */}
                <img
                  src="/assets/event/event25-video-cover.jpg"
                  alt="Expodent Delhi Video Cover Ambient Backdrop"
                  aria-hidden="true"
                  className="event25-video-backdrop"
                />

                {/* Center Video Cover Graphic */}
                <div className="event25-video-center-panel">
                  <img
                    src="/assets/event/event25-video-cover.jpg"
                    alt="Day 2 Expodent Delhi Video Cover"
                    className="event25-video-center-img"
                  />
                </div>

                {/* YouTube Play Button Overlay */}
                <div className="event25-video-overlay">
                  <div className="event25-play-btn" aria-label="Play video">
                    <div className="event25-play-triangle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/*
          Gallery Carousel Slider - Hidden per user reference screenshot
          <div className="event25-carousel-container">
            <button
              type="button"
              className="event25-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event25-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event25-thumb-card ${
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
                    className="event25-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event25-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          */}
        </section>

        {/*
        Two-Column Editorial Details Layout - Hidden per user reference screenshot
        <section className="event25-content-layout">
          Left Column: Tags, Share & Quick Info
          <aside className="event25-sidebar">
            <div className="event25-sidebar-block">
              <div className="event25-sidebar-title">TAGS</div>
              <div className="event25-tags-list">
                <div className="event25-tag-item">
                  <Link to="/events" className="event25-tag-link">
                    EVENTS
                  </Link>
                </div>
                <div className="event25-tag-item">
                  <Link to="/events" className="event25-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </div>
                <div className="event25-tag-item">
                  <Link to="/events" className="event25-tag-link">
                    PAST EVENTS
                  </Link>
                </div>
              </div>
            </div>

            <div className="event25-sidebar-block">
              <div className="event25-sidebar-title">Share</div>
              <div className="event25-share-icons">
                <button
                  type="button"
                  className="event25-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event25-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event25-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event25-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>

            Quick Facts Snapshot
            <div className="event25-quick-facts">
              <div className="event25-fact-row">
                <span className="event25-fact-label">Event:</span>
                <span className="event25-fact-val">Expodent International India 2025</span>
              </div>
              <div className="event25-fact-row">
                <span className="event25-fact-label">Dates:</span>
                <span className="event25-fact-val">26th, 27th &amp; 28th December 2025</span>
              </div>
              <div className="event25-fact-row">
                <span className="event25-fact-label">Venue:</span>
                <span className="event25-fact-val">Pragati Maidan, New Delhi, India</span>
              </div>
              <div className="event25-fact-row">
                <span className="event25-fact-label">Category:</span>
                <span className="event25-fact-val">International Dental Exhibition &amp; Live Workshop</span>
              </div>
              <div className="event25-fact-row">
                <span className="event25-fact-label">Featured Partners:</span>
                <span className="event25-fact-val">ClaroNav Dental Canada &amp; B. &amp; B. Dental Italy</span>
              </div>
              <div className="event25-fact-row">
                <span className="event25-fact-label">Key Highlights:</span>
                <span className="event25-fact-val">Navident Evo 3D Navigation, DURA-VIT Implants, MicronMapper</span>
              </div>
            </div>
          </aside>

          Right Main Column: Workshop &amp; Exhibition Content
          <div className="event25-main-column">
            Header Block
            <div className="event25-block-card">
              <h1 className="event25-section-heading">
                Expodent Delhi – A Convergence of Innovation &amp; Clinical Precision
              </h1>
              <div className="event25-section-subheading">
                EXPODENT INTERNATIONAL INDIA 2025 | Pragati Maidan, New Delhi
              </div>
              <p className="event25-lead-p">
                EXPODENT INTERNATIONAL INDIA 2025 stood as one of South Asia&apos;s most prominent dental congresses and trade exhibitions, held at the iconic Pragati Maidan in New Delhi. Over three action-packed days from 26th to 28th December 2025, dental practitioners, implantologists, maxillofacial surgeons, and postgraduate scholars gathered to explore the frontiers of modern dentistry.
              </p>
              <p className="event25-lead-p" style={{ marginBottom: 0 }}>
                Marks Biotech established a high-impact presence, presenting live clinical demonstrations of Navident Evo Dynamic 3D Navigation, B. &amp; B. Dental Italy&apos;s DURA-VIT premium implant line, and MicronMapper optical photogrammetry systems.
              </p>
            </div>

            About Expodent International
            <div className="event25-block-card">
              <h2 className="event25-block-title">
                <i className="fa-solid fa-circle-info"></i> About Expodent International
              </h2>
              <p className="event25-lead-p">
                Expodent International is the benchmark annual exhibition for dental healthcare innovation in India. It serves as the primary meeting ground where global technological advancements interface directly with everyday clinical practice.
              </p>
              <p className="event25-lead-p">
                The 2025 edition witnessed unprecedented participation, with thousands of delegates discovering real-time surgical guidance, digital impression scanning, guided prosthetic protocols, and regenerative biology breakthroughs designed to elevate patient outcomes.
              </p>
            </div>

            Key Technology Showcases
            <div className="event25-block-card">
              <h2 className="event25-block-title">
                <i className="fa-solid fa-microchip"></i> Technology Showcases at the Marks Biotech Pavilion
              </h2>

              <div className="event25-focus-item">
                <h3 className="event25-focus-item-title">
                  <i className="fa-solid fa-compass"></i> Navident Evo Dynamic 3D Navigation
                </h3>
                <p className="event25-focus-item-desc">
                  Powered by ClaroNav Dental Canada, Navident Evo offers computer-assisted dynamic surgical tracking. Clinicians observed real-time drill positioning, 3D angulation, and depth control against pre-operative CBCT scans without requiring static surgical stents.
                </p>
              </div>

              <div className="event25-focus-item">
                <h3 className="event25-focus-item-title">
                  <i className="fa-solid fa-tooth"></i> B. &amp; B. Dental Implant Line (Italy)
                </h3>
                <p className="event25-focus-item-desc">
                  With over 34 years of global clinical success, B. &amp; B. Dental Italy showcased its versatile DURA-VIT implant ecosystem—including 3P, Wide, Slim, EV Slim, Mono, and Pterygo implants with proven Morse-taper hermetic seal connections and exceptional primary stability.
                </p>
              </div>

              <div className="event25-focus-item">
                <h3 className="event25-focus-item-title">
                  <i className="fa-solid fa-camera"></i> MicronMapper Digital Photogrammetry
                </h3>
                <p className="event25-focus-item-desc">
                  A breakthrough in multi-implant and full-arch restorative dentistry, MicronMapper captures exact three-dimensional implant positions with sub-micron accuracy, eliminating impression discrepancies and guaranteeing passive prosthetic fit.
                </p>
              </div>

              <div className="event25-focus-item">
                <h3 className="event25-focus-item-title">
                  <i className="fa-solid fa-hands-holding-circle"></i> Live Hands-On Simulation on Phantom Heads
                </h3>
                <p className="event25-focus-item-desc">
                  Delegates had the opportunity to hold the navigation-tracked handpiece, wear Navident optical tracking smart glasses, and perform guided osteotomies on lifelike phantom jaw models under expert guidance.
                </p>
              </div>
            </div>

            Day 2 Highlights
            <div className="event25-block-card">
              <h2 className="event25-block-title">
                <i className="fa-solid fa-film"></i> Live Highlights from Day 2 at Expodent Delhi
              </h2>
              <p className="event25-lead-p">
                Day 2 of Expodent International witnessed a continuous stream of enthusiastic clinicians visiting the Marks Biotech booth. As captured in the featured video showcase, participants engaged in deep-dive discussions on:
              </p>
              <ul className="event25-bullet-list">
                <li>Dynamic navigation protocols in severe atrophy and complex anatomical cases</li>
                <li>Immediate loading protocols with DURA-VIT Morse taper connection implants</li>
                <li>Transitioning from conventional freehand implantology to dynamic guided surgery</li>
                <li>Pterygoid and zygomatic implant placement with real-time navigational confidence</li>
                <li>Chairside digital workflows linking CBCT, intraoral scanning, and prosthetic design</li>
              </ul>
            </div>

            Clinical Impact
            <div className="event25-block-card">
              <h2 className="event25-block-title">
                <i className="fa-solid fa-chart-line"></i> Clinical Impact &amp; The Digital Future
              </h2>
              <p className="event25-lead-p">
                The massive response at Expodent Delhi reflects the Indian dental fraternity&apos;s strong shift toward minimally invasive, technology-driven protocols. Dynamic navigation bridges the gap between surgical planning and operative execution, minimizing surgical risks and maximizing long-term clinical predictability.
              </p>
              <p className="event25-lead-p" style={{ marginBottom: 0 }}>
                Marks Biotech remains dedicated to empowering Indian dental clinicians with hands-on workshops, certified training, and comprehensive post-installation support across the country.
              </p>
            </div>

            Information &amp; Contact CTA
            <div className="event25-info-banner">
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px" }}>
                  Elevate Your Clinical Practice with Navident &amp; DURA-VIT
                </h3>
                <p style={{ fontSize: "14.5px", color: "#cfd4d9", margin: 0, lineHeight: 1.6 }}>
                  Interested in experiencing a live hands-on clinical workshop or scheduling an in-clinic demonstration of Navident Evo and B. &amp; B. Dental implants? Connect with the Marks Biotech team today.
                </p>
              </div>
              <Link to="/contact" className="event25-cta-btn">
                <i className="fa-solid fa-envelope"></i> Contact Us for Inquiries
              </Link>
            </div>
          </div>
        </section>
        */}

        {/* Lightbox Modal for Full Image Zoom */}
        {lightboxImg && (
          <div
            className="event25-lightbox-overlay"
            onClick={() => setLightboxImg(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image Preview"
          >
            <div
              className="event25-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="event25-lightbox-close"
                onClick={() => setLightboxImg(null)}
                aria-label="Close modal"
              >
                &times;
              </button>
              <img
                src={lightboxImg}
                alt="Enlarged view"
                className="event25-lightbox-img"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
