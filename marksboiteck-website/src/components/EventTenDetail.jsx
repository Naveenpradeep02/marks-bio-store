import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/event-10.css";

export default function EventTenDetail() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    document.title =
      "Indian Society of Oral Implantologists (ISOI) Conference – Mumbai | Marks Biotech";
  }, []);

  const galleryImages = [
    {
      src: "/assets/imgs/EI-5.webp",
      alt: "Hands-on Navident Phantom Head Demonstration with Smart Glasses",
    },
    {
      src: "/assets/imgs/E1-6.webp",
      alt: "Navident Live Discussion and Demonstration at ISOI Conference",
    },
    {
      src: "/assets/imgs/EI-1.webp",
      alt: "Marks Biotech and B&B Dental Team at ISOI Exhibition Showcase",
    },
    {
      src: "/assets/imgs/EI-4.webp",
      alt: "Dignitaries and Clinical Leaders at ISOI Mumbai",
    },
    {
      src: "/assets/imgs/EI-3.webp",
      alt: "B&B Dental Clinical Success Exhibition Showcase",
    },
    {
      src: "/assets/imgs/E1-2.webp",
      alt: "Clinical Practice Mastery Session at ISOI",
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
      "Indian Society of Oral Implantologists (ISOI) Conference – Mumbai | Marks Biotech";

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
    <main className="event10-page-main">
      <div className="event10-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event10-back-wrap">
          <Link to="/events" className="event10-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event10-hero-grid">
          <div>
            <span className="event10-badge-pill">CONFERENCE 2025</span>
            <h1 className="event10-title">
              Indian Society of Oral Implantologists (ISOI) Conference – Mumbai
            </h1>
            <div className="event10-subtitle">
              Future Technology Today – Precision, Navigation &amp; Digital Excellence
            </div>
          </div>

          {/* Right Banner Poster Image */}
          <div className="event10-banner-frame">
            <img
              src="/assets/event/13.webp"
              alt="Indian Society of Oral Implantologists (ISOI) Conference 2025 - Mumbai"
              className="event10-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery */}
        <section className="event10-gallery-section">
          <h2 className="event10-section-heading">Event Gallery</h2>

          {/* Gallery Carousel Slider */}
          <div className="event10-carousel-container">
            <button
              type="button"
              className="event10-carousel-btn"
              onClick={() => scrollCarousel("left")}
              aria-label="Previous gallery image"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="event10-carousel-track" ref={carouselRef}>
              {galleryImages.map((image, idx) => (
                <div
                  key={idx}
                  className={`event10-thumb-card ${
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
                    className="event10-thumb-img"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="event10-carousel-btn"
              onClick={() => scrollCarousel("right")}
              aria-label="Next gallery image"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        {/* Two-Column Editorial Details Layout */}
        <section className="event10-content-layout">
          {/* Left Column: Tags & Share */}
          <aside className="event10-sidebar">
            <div className="event10-sidebar-block">
              <div className="event10-sidebar-title">TAGS</div>
              <div className="event10-tags-list">
                <span className="event10-tag-item">
                  <Link to="/events" className="event10-tag-link">
                    EVENTS
                  </Link>
                </span>
                <span className="event10-tag-item">
                  <Link to="/events" className="event10-tag-link">
                    UPCOMING EVENTS
                  </Link>
                </span>
                <span className="event10-tag-item">
                  <Link to="/events" className="event10-tag-link">
                    PAST EVENTS
                  </Link>
                </span>
              </div>
            </div>

            <div className="event10-sidebar-block">
              <div className="event10-sidebar-title">Share</div>
              <div className="event10-share-icons">
                <button
                  type="button"
                  className="event10-share-icon-btn"
                  onClick={() => handleShare("facebook")}
                  title="Share on Facebook"
                  aria-label="Share on Facebook"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  type="button"
                  className="event10-share-icon-btn"
                  onClick={() => handleShare("whatsapp")}
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <i className="fa-brands fa-whatsapp"></i>
                </button>
                <button
                  type="button"
                  className="event10-share-icon-btn"
                  onClick={() => handleShare("instagram")}
                  title="Share on Instagram"
                  aria-label="Share on Instagram"
                >
                  <i className="fa-brands fa-instagram"></i>
                </button>
                <button
                  type="button"
                  className="event10-share-icon-btn"
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
          <div className="event10-main-column">
            {/* About ISOI Conference 2025 */}
            <h2 className="event10-article-title">
              About ISOI Conference 2025
            </h2>
            <p>
              The Indian Society of Oral Implantologists (ISOI) Conference is one
              of the most prestigious implant-focused scientific gatherings in
              India. The 2025 edition emphasizes digital integration, guided
              surgical protocols, regenerative advancements, and precision-driven
              full-arch rehabilitation.
            </p>
            <p>
              As implant dentistry evolves, clinicians are increasingly adopting
              computer-assisted workflows to enhance predictability, efficiency,
              and patient safety. ISOI 2025 provides an immersive platform for
              exploring these advancements through:
            </p>

            <ul className="event10-bullet-list">
              <li>Scientific lectures by internationally recognized experts</li>
              <li>Interactive panel discussions and Q&amp;A sessions</li>
              <li>
                Live surgical demonstrations showcasing cutting-edge techniques
              </li>
              <li>Hands-on workshops and skill-building sessions</li>
              <li>
                Industry-led technology showcases and product launches
              </li>
            </ul>

            <p>
              Attendees will gain practical knowledge to incorporate digital
              dentistry tools into their practices, network with peers and
              pioneers, and stay ahead in an ever-evolving field.
            </p>

            {/* Technologies & Solutions Presented by Marks Biotech */}
            <h3 className="event10-subhead-red">
              Technologies &amp; Solutions Presented by Marks Biotech
            </h3>

            {/* Who Should Attend */}
            <h3 className="event10-subhead-red">Who Should Attend</h3>
            <ul className="event10-bullet-list">
              <li>
                Implantologists and oral surgeons seeking advanced digital
                solutions
              </li>
              <li>
                Prosthodontists focused on precision prosthetics and full-arch
                rehabilitation
              </li>
              <li>
                Restorative dentists integrating guided surgery and digital
                workflows
              </li>
              <li>
                Dental students and emerging practitioners learning from global
                experts
              </li>
              <li>
                Clinic owners exploring future-ready implant technologies
              </li>
            </ul>

            {/* Conference Highlights */}
            <h3 className="event10-subhead-red">Conference Highlights</h3>
            <ul className="event10-bullet-list">
              <li>Live Surgery &amp; Navigation Demonstrations</li>
              <li>Expert Panel Discussions on emerging trends</li>
              <li>
                Hands-on workshops with digital tools and implant systems
              </li>
              <li>
                Innovation zone featuring regenerative techniques &amp;
                AI-assisted planning
              </li>
              <li>
                Strategic Networking Opportunities with industry leaders
              </li>
            </ul>

            {/* Future Trends in Implantology */}
            <h3 className="event10-subhead-red">
              Future Trends in Implantology
            </h3>
            <p>
              ISOI 2025 emphasizes the integration of technology, precision, and
              patient-centric care:
            </p>
            <ul className="event10-bullet-list">
              <li>
                Adoption of dynamic navigation systems for safer, more accurate
                surgeries
              </li>
              <li>
                Growth of full-digital workflows including photogrammetry &amp;
                CAD/CAM prosthetics
              </li>
              <li>
                Incorporation of regenerative and minimally invasive techniques
              </li>
              <li>
                AI-driven treatment planning and robotics for complex cases
              </li>
              <li>
                Enhancing patient outcomes through predictable, streamlined
                protocols
              </li>
            </ul>

            <p>
              Attendees will leave the conference equipped with actionable
              insights, ready to implement next-generation solutions in their
              practices and gain a competitive edge in a rapidly evolving dental
              landscape.
            </p>
          </div>
        </section>
      </div>

      {/* Lightbox Image Preview Modal */}
      {lightboxImg && (
        <div
          className="event10-lightbox"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="event10-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="event10-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image preview"
            >
              &times;
            </button>
            <img
              src={lightboxImg}
              alt="Enlarged event showcase preview"
              className="event10-lightbox-img"
            />
          </div>
        </div>
      )}
    </main>
  );
}
