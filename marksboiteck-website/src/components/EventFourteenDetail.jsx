import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-14.css";

export default function EventFourteenDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const carouselRef = useRef(null);

  const youtubeVideoId = "ZcW-Osi1yBs";

  useEffect(() => {
    document.title =
      "OSICON 2025 – 2nd National Conference of the Osseointegration Society of India | Marks Biotech";
  }, []);

  const galleryImages = [
    {
      src: "/assets/event/pastevent4/1.webp",
      alt: "OSICON 2025 Jaipur Traditional Arch Official Backdrop",
    },
    {
      src: "/assets/event/pastevent4/2.webp",
      alt: "Clinical Delegates and Dignitaries at OSICON 2025 Jaipur",
    },
    {
      src: "/assets/event/pastevent4/finalposter.webp",
      alt: "2nd National Conference OSICON 2025 Graphic Showcase",
    },
    {
      src: "/assets/event/pastevent4/5.webp",
      alt: "Delegates Exploring Advanced Implant Systems at Booth 104 & 105",
    },
    {
      src: "/assets/event/pastevent4/8.webp",
      alt: "Clinical Discussions and Digital Workflow Demonstration",
    },
    {
      src: "/assets/event/pastevent4/3.webp",
      alt: "Keynote Lecture and Scientific Paper Presentation Session",
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
      "OSICON 2025 – 2nd National Conference of the Osseointegration Society of India | Marks Biotech";

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
    <main className="event14-page-main">
      <div className="event14-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event14-back-wrap">
          <Link to="/events" className="event14-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event14-hero-grid">
          <div>
            <span className="event14-badge-pill">CONFERENCE 2025</span>
            <h1 className="event14-title">
              OSICON 2025 – 2nd National Conference of the Osseointegration Society of India
            </h1>
            <div className="event14-subtitle">
              Jaipur | 31st October – 2nd November 2025
            </div>
            <p className="event14-hero-desc">
              The 2nd National Conference of the Osseointegration Society of
              India (OSICON 2025) concluded successfully in Jaipur, bringing
              together leading implantologists, clinicians, researchers, and
              industry innovators from across the country.
            </p>
          </div>

          {/* Right Banner Poster Image */}
          <div className="event14-banner-frame">
            <img
              src="/assets/event/16.webp"
              alt="2nd National Conference OSICON 2025 Jaipur"
              className="event14-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery & Video Showcase */}
        <section className="event14-gallery-section">
          <h2 className="event14-section-heading">Event Gallery</h2>

          {/* Featured Video Frame */}
          <div className="event14-video-wrapper">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title="OSICON 2025 Video Showcase"
                className="event14-video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className="event14-video-cover"
                onClick={() => setIsVideoPlaying(true)}
                role="button"
                tabIndex={0}
                aria-label="Play OSICON 2025 video showcase"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setIsVideoPlaying(true);
                }}
              >
                <div className="event14-video-panels">
                  <img
                    src="/assets/imgs/E1-6.webp"
                    alt="Clinical Discussion"
                    className="event14-panel-img"
                  />
                  <img
                    src="/assets/event/pastevent4/6.webp"
                    alt="Marks Biotech Booth OSICON"
                    className="event14-panel-img"
                  />
                  <img
                    src="/assets/imgs/EI-5.webp"
                    alt="Navident Dynamic Navigation Demonstration"
                    className="event14-panel-img"
                  />
                </div>

                <div className="event14-video-overlay">
                  <div className="event14-play-btn" aria-label="Play video">
                    <div className="event14-play-triangle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Carousel Slider */}
          <div className="event14-carousel-container">
            <button
              type="button"
              className="event14-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event14-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event14-thumb-card ${
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
                    className="event14-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event14-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event14-content-layout">
          {/* Left Column: Tags & Share */}
          <aside className="event14-sidebar">
            <div className="event14-sidebar-block">
              <div className="event14-sidebar-title">TAGS</div>
              <div className="event14-tags-list">
                <span className="event14-tag-item">
                  <Link to="/events" className="event14-tag-link">
                    EVENTS
                  </Link>
                </span>
                <span className="event14-tag-item">
                  <Link to="/events" className="event14-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </span>
                <span className="event14-tag-item">
                  <Link to="/events" className="event14-tag-link">
                    PAST EVENTS
                  </Link>
                </span>
              </div>
            </div>

            <div className="event14-sidebar-block">
              <div className="event14-sidebar-title">Share</div>
              <div className="event14-share-icons">
                <button
                  type="button"
                  className="event14-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event14-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event14-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event14-share-icon-btn"
                  onClick={() => handleShare("youtube")}
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <i className="fa-brands fa-youtube"></i>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Main Content */}
          <div className="event14-main-column">
            {/* About OSICON 2025 */}
            <h2 className="event14-article-title">About OSICON 2025</h2>
            <p>
              Centered around the theme &ldquo;Osseointegration: From
              Foundation to Future&rdquo;, the conference served as a powerful
              platform for scientific exchange, clinical discussions, and the
              exploration of next-generation implant technologies.
            </p>
            <p>
              The event gathered some of the most respected voices in implant
              dentistry, creating an environment that fostered learning,
              collaboration, and innovation across academic and clinical
              domains.
            </p>

            {/* Our Presence at OSICON 2025 */}
            <h3 className="event14-subhead-red">
              Our Presence at OSICON 2025
            </h3>
            <p>
              We were proud to participate in this prestigious national event at{" "}
              <strong>Booth 104 &amp; 105</strong>, where we showcased our
              advanced implant solutions and cutting-edge technologies in
              collaboration with global leaders in implant innovation.
            </p>
            <p>
              Our booth attracted significant engagement from dental
              professionals, academic experts, and young clinicians eager to
              explore:
            </p>

            <ul className="event14-bullet-list">
              <li>Advanced implant systems</li>
              <li>Precision-driven surgical solutions</li>
              <li>Innovative biomaterials</li>
              <li>Digital workflow integration</li>
              <li>Evidence-based clinical applications</li>
            </ul>

            <p>
              The response was overwhelming, reaffirming the growing demand for
              high-quality, reliable implant solutions in the Indian market.
            </p>

            {/* Scientific Excellence & Industry Innovation */}
            <h3 className="event14-subhead-red">
              Scientific Excellence &amp; Industry Innovation
            </h3>
            <p>
              OSICON 2025 featured insightful keynote lectures, panel
              discussions, scientific paper presentations, and hands-on
              sessions led by respected experts in implant dentistry.
            </p>
            <p>The conference highlighted emerging trends in:</p>

            <ul className="event14-bullet-list">
              <li>Surface technology advancements</li>
              <li>Regenerative protocols</li>
              <li>Guided implant surgery</li>
              <li>Prosthetic precision</li>
              <li>Long-term clinical predictability</li>
            </ul>

            <p>
              The scientific depth and collaborative environment made this
              edition of OSICON a benchmark event in the implant dentistry
              landscape.
            </p>

            {/* Strengthening Strategic Partnerships */}
            <h3 className="event14-subhead-red">
              Strengthening Strategic Partnerships
            </h3>
            <p>
              Our participation also strengthened strategic collaborations with
              leading implant innovators including:
            </p>

            <ul className="event14-bullet-list">
              <li>Navident</li>
              <li>B&amp;B Dental Implant Company (Italy)</li>
            </ul>

            <p>
              These partnerships reflect our continued commitment to delivering
              world-class implant solutions backed by research, precision, and
              long-term clinical reliability.
            </p>

            {/* A Successful Milestone */}
            <h3 className="event14-subhead-red">A Successful Milestone</h3>
            <p>
              OSICON 2025 was more than a conference — it was a milestone in
              advancing implant dentistry in India. The exchange of ideas, the
              enthusiasm of young professionals, and the spirit of innovation
              demonstrated that the future of osseointegration is stronger than
              ever.
            </p>
            <p>
              We extend our sincere gratitude to the Osseointegration Society of
              India, the organizing committee, and all the dental professionals
              who visited us at Booth 104 &amp; 105.
            </p>
            <p>
              We look forward to continuing our journey of innovation,
              collaboration, and excellence in implant dentistry.
            </p>
          </div>
        </section>
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event14-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event14-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event14-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged OSICON showcase preview"
              className="event14-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
