import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/event-22.css";

export default function EventTwentyTwoDetail() {
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [copiedLink, setCopiedLink] = useState(null);
  const [pageCopied, setPageCopied] = useState(false);

  const videos = [
    {
      id: "H5tFbTC_pnQ",
      title:
        "Claronav dental releases at ids cologne new feature in Micronmapper photogrammetry #claronav #tissuemapper",
      subtitle:
        "The TissueMapper Introduction – Eliminating Post-Operative Intraoral Scanning",
      redirectUrl: "https://youtu.be/H5tFbTC_pnQ?si=VeqS666csExDvoeY",
    },
    {
      id: "MOvL8B0Pd1w",
      title:
        "#idscologne day 2 real action , learning for life Digital Dentistry excitement 1",
      subtitle:
        "IDS Cologne Day 2 Live Action & Digital Dentistry Excitement",
      redirectUrl: "https://youtu.be/MOvL8B0Pd1w?si=F6DeqOthvxOtGPoJ",
    },
    {
      id: "Ac8269-la1k",
      title: "Navident Evo New Artificial Intelligence",
      subtitle:
        "Navident Evo: Next-Generation AI-Assisted Dynamic Navigation",
      redirectUrl: "https://youtu.be/Ac8269-la1k?si=qYPwdda9x0JlY5VB",
    },
    {
      id: "kEwFTqce2mA",
      title: "Day 2 at IDS cologne Germany B&B Dental Dental Implant Italy",
      subtitle:
        "B&B Dental Made in Italy Excellence at IDS Cologne Germany",
      redirectUrl: "https://youtu.be/kEwFTqce2mA?si=gAE0XetfypD4TZMI",
    },
  ];

  const handleCopy = async (text, key) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (key === "page") {
      setPageCopied(true);
      setTimeout(() => setPageCopied(false), 2000);
    } else {
      setCopiedLink(key);
      setTimeout(() => setCopiedLink(null), 2000);
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title =
      "IDS Cologne Germany 2025 | Claronav Dental TissueMapper & MicronMapper | Marks Biotech";

    if (platform === "copy") {
      handleCopy(url, "page");
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
    <main className="event22-page-main">
      <div className="event22-container">
        {/* Top Breadcrumb Navigation */}
        <div className="event22-back-wrap">
          <Link to="/events" className="event22-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to All Events
          </Link>
        </div>

        {/* Hero Section */}
        <section className="event22-hero-grid">
          <div>
            <span className="event22-eyebrow">Conference</span>
            <h1 className="event22-title">IDS Cologne Germany – 2025</h1>
            <div className="event22-headline-red">
              Claronav dental releases new feature in Micronmapper
              (photogrammetry solutions) with elimating post operative ios,
              with tissuemapper accessories introduction
            </div>

            {/*
            Date & Location Badges
            <div className="event22-badge-strip">
              <div className="event22-badge-date">
                <i className="fa-regular fa-calendar-days"></i>
                <span>25th – 29th March 2025</span>
              </div>
              <div className="event22-badge-location">
                <i className="fa-solid fa-location-dot"></i>
                <span>Cologne, Germany</span>
              </div>
            </div>

            <p className="event22-desc">
              At the world’s leading dental business summit, Claronav Dental
              unveiled groundbreaking advancements in optical photogrammetry
              and dynamic 3D surgical navigation. The introduction of
              TissueMapper eliminates the need for post-operative intraoral
              scanning, streamlining full-arch implant workflows with
              unprecedented passive fit accuracy.
            </p>
            */}
          </div>

          {/* Right Banner Image */}
          <div className="event22-banner-frame">
            <img
              src="/assets/event/23.webp"
              alt="IDS Cologne Germany 2025 - Claronav Dental & Marks Biotech"
              className="event22-banner-img"
              loading="eager"
            />
          </div>
        </section>

        {/* Event Gallery - YouTube Videos Stack */}
        <section className="event22-gallery-section">
          <h2 className="event22-section-heading">Event Gallery</h2>

          <div className="event22-videos-stack">
            {videos.map((vid, idx) => {
              const isPlaying = playingVideoId === vid.id;

              return (
                <div key={idx} className="event22-video-card">
                  <div className="event22-video-container">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${vid.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={vid.title}
                        className="event22-video-iframe"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div
                        className="event22-video-cover"
                        style={{
                          backgroundImage: `url('https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg'), url('https://img.youtube.com/vi/${vid.id}/hqdefault.jpg')`,
                        }}
                        onClick={() => setPlayingVideoId(vid.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Play ${vid.title}`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            setPlayingVideoId(vid.id);
                          }
                        }}
                      >
                        <div className="event22-video-overlay"></div>

                        {/* Top Header Bar */}
                        <div className="event22-video-topbar">
                          <div className="event22-avatar-wrap">
                            <img
                              src="/assets/imgs/logo.png"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                              alt="Marks Biotech"
                              className="event22-avatar-img"
                            />
                          </div>
                          <div className="event22-video-top-title">
                            {vid.title}
                          </div>
                        </div>

                        {/* Center Play Button */}
                        <div
                          className="event22-play-btn"
                          aria-label="Play video"
                        >
                          <div className="event22-play-triangle"></div>
                        </div>

                        {/* Bottom Controls Bar with YouTube Redirect Link */}
                        <div
                          className="event22-video-bottombar"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className="event22-copy-icon-btn"
                            onClick={() => handleCopy(vid.redirectUrl, vid.id)}
                            title={
                              copiedLink === vid.id
                                ? "Link Copied!"
                                : "Copy YouTube Link"
                            }
                            aria-label="Copy YouTube Link"
                          >
                            <i
                              className={
                                copiedLink === vid.id
                                ? "fa-solid fa-check"
                                : "fa-solid fa-link"
                            }
                          ></i>
                        </button>

                        <a
                          href={vid.redirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="event22-watch-yt-btn"
                        >
                          <i className="fa-brands fa-youtube event22-yt-icon"></i>
                          <span>Watch on YouTube</span>
                          <i
                            className="fa-solid fa-arrow-up-right-from-square"
                            style={{ fontSize: "11px" }}
                          ></i>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/*
      Two-Column Editorial Details Layout - Hidden per user request
      <section className="event22-content-layout">
        Left Column: Tags & Share
        <aside className="event22-sidebar">
          <div className="event22-sidebar-block">
            <div className="event22-sidebar-title">TAGS</div>
            <div className="event22-tags-list">
              <span className="event22-tag-item">IDS COLOGNE</span>
              <span className="event22-tag-item">MICRONMAPPER</span>
              <span className="event22-tag-item">TISSUEMAPPER</span>
              <span className="event22-tag-item">NAVIDENT EVO AI</span>
              <span className="event22-tag-item">B&amp;B DENTAL</span>
              <span className="event22-tag-item">GERMANY 2025</span>
            </div>
          </div>

          <div className="event22-sidebar-block">
            <div className="event22-sidebar-title">Share</div>
            <div className="event22-share-icons">
              <button
                type="button"
                className="event22-share-icon-btn"
                onClick={() => handleShare("copy")}
                title={pageCopied ? "Link Copied!" : "Copy Link"}
                aria-label="Copy Link"
              >
                <i
                  className={
                    pageCopied ? "fa-solid fa-check" : "fa-solid fa-link"
                  }
                ></i>
              </button>
              <button
                type="button"
                className="event22-share-icon-btn"
                onClick={() => handleShare("whatsapp")}
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button
                type="button"
                className="event22-share-icon-btn"
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
                className="event22-share-icon-btn"
                title="YouTube"
                aria-label="YouTube"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </aside>

        Right Column: Main Content
        <div className="event22-main-column">
          About IDS Cologne
          <h2 className="event22-section-red">
            About IDS Cologne Germany 2025
          </h2>
          <p>
            The International Dental Show (IDS) in Cologne is the undisputed
            global benchmark exhibition for the dental industry, gathering
            over 120,000 dental professionals, clinicians, researchers, and
            trade leaders from across 160 countries at Koelnmesse, Germany.
          </p>
          <p>
            At IDS 2025, Claronav Dental Canada and Marks Biotech presented
            pioneering breakthroughs redefining digital dentistry: the launch
            of the <strong>TissueMapper</strong> accessory for MicronMapper
            photogrammetry, and the debut of <strong>Navident Evo</strong> with
            Artificial Intelligence.
          </p>

          Fast Facts Card
          <h3 className="event22-subhead-red">Event Details &amp; Fast Facts</h3>
          <div className="event22-facts-card">
            <div className="event22-fact-row">
              <span className="event22-fact-label">Event:</span>
              <span>IDS Cologne Germany 2025</span>
            </div>
            <div className="event22-fact-row">
              <span className="event22-fact-label">Dates:</span>
              <span>25th – 29th March 2025</span>
            </div>
            <div className="event22-fact-row">
              <span className="event22-fact-label">Venue:</span>
              <span>Koelnmesse Exhibition Centre, Cologne, Germany</span>
            </div>
            <div className="event22-fact-row">
              <span className="event22-fact-label">Key Launches:</span>
              <span>
                MicronMapper TissueMapper, Navident Evo Artificial
                Intelligence, B&amp;B Dental Italian Systems
              </span>
            </div>
          </div>

          TissueMapper Innovation
          <h3 className="event22-subhead-red">
            MicronMapper TissueMapper: Eliminating Post-Operative IOS
          </h3>
          <p>
            Until now, full-arch photogrammetry workflows required a two-step
            scanning procedure: capturing implant spatial coordinates with
            photogrammetry cameras, followed by a separate post-operative
            intraoral scan (IOS) to capture soft tissue contours.
          </p>
          <p>
            With Claronav Dental's newly introduced <strong>TissueMapper</strong> accessories,
            clinicians can now capture soft tissue emergence profiles and
            implant positions simultaneously in one seamless, high-speed
            optical protocol. This eliminates the distortion, blood/saliva
            interference, and stitching errors inherent to traditional
            intraoral scanners, ensuring absolute passive fit and instantaneous
            prosthetic manufacturing.
          </p>

          Navident Evo with AI
          <h3 className="event22-subhead-red">
            Navident Evo: AI-Powered Dynamic Surgical Navigation
          </h3>
          <p>
            IDS 2025 marked the international introduction of <strong>Navident Evo</strong>,
            incorporating intelligent computer vision and artificial
            intelligence algorithms. Navident Evo delivers:
          </p>
          <ul className="event22-bullet-list">
            <li>
              <strong>Automated Trace Registration:</strong> AI-driven anatomical
              landmark recognition reducing calibration and patient registration
              to seconds.
            </li>
            <li>
              <strong>Real-Time 3D Drill Tracking:</strong> Sub-millimeter
              navigational accuracy displayed in real time, granting complete
              surgical flexibility without the limitations of physical static
              guides.
            </li>
            <li>
              <strong>Smart Glasses Integration:</strong> Direct heads-up
              display overlays allowing surgeons to maintain constant focus on
              the patient's surgical field.
            </li>
          </ul>

          B&B Dental Italian Excellence
          <h3 className="event22-subhead-red">
            B&amp;B Dental Implant Italy: Made in Italy Excellence
          </h3>
          <p>
            B&amp;B Dental highlighted its complete Italian implantology
            portfolio at IDS Cologne, showcasing proven biological surface
            topographies, high primary stability designs for immediate loading,
            and biomaterials designed to support bone regeneration in complex
            clinical situations.
          </p>
        </div>
      </section>
      */}
      </div>
    </main>
  );
}
