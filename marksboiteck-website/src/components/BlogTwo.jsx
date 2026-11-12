import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogTwo({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Dynamic Navigation: Precision Implant Surgery | Marks Biotech";

    const sectionIds = [
      "intro",
      "planning",
      "tap",
      "calibration",
      "navigation",
      "conclusion",
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title =
      "Dynamic Navigation: Precision Implant Surgery | Marks Biotech";

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
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
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
    }
  };

  return (
    <article
      className="photo-article-page"
      itemScope
      itemType="https://schema.org/TechArticle"
    >
      {/* Top Reading Progress Bar */}
      <div
        className="photo-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Top Compact Breadcrumb */}
      <div className="photo-breadcrumb-wrap">
        <div className="photo-container">
          <nav className="photo-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">&gt;</span>
            <Link to="/blog">Blogs</Link>
            <span className="separator">&gt;</span>
            <span className="current">
              Dynamic Navigation: Precision Implant Surgery
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Surgical Navigation Technology</span> • <span>Real-Time Guidance</span>
            </div>
            <h1 itemProp="headline">
              Dynamic Navigation: Precision Implant Surgery
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              Dynamic Navigation is the most effective means by which to accurately
              transfer a planned implant position to a patient. In contrast to the
              inherent inaccuracy of Freehand and Static Navigation, Dynamic Navigation
              software algorithms direct the surgeon to angulate and orient the
              osteotomy drill using realtime feedback.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Computer Guided Surgery</span>
              <span className="photo-meta-dot">•</span>
              <span>Optical Sensor Triangulation</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-2.webp"
              alt="Dynamic Navigation: Precision Implant Surgery"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-crosshairs"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Dynamic Navigation: Precision Implant Surgery
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout with Sticky TOC */}
      <main className="photo-main">
        <div className="photo-container photo-layout">
          {/* Table of Contents Sticky Sidebar */}
          <aside className="photo-toc" aria-label="Table of contents">
            <div className="photo-toc-title">
              <i className="fa-solid fa-list-ul"></i> On this page
            </div>
            <a
              href="#intro"
              className={activeSection === "intro" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "intro")}
            >
              Overview
            </a>
            <a
              href="#planning"
              className={activeSection === "planning" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "planning")}
            >
              Planning Phase
            </a>
            <a
              href="#tap"
              className={activeSection === "tap" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "tap")}
            >
              Trace and Place Registration (TaP)
            </a>
            <a
              href="#calibration"
              className={activeSection === "calibration" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "calibration")}
            >
              Calibration of the handpiece
            </a>
            <a
              href="#navigation"
              className={activeSection === "navigation" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "navigation")}
            >
              Surgical Navigation
            </a>
            <a
              href="#conclusion"
              className={activeSection === "conclusion" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "conclusion")}
            >
              Conclusion
            </a>
          </aside>

          {/* Article Body */}
          <div className="photo-article-body">
            {/* Intro Section */}
            <section id="intro">
              <p>
                Dynamic Navigation is the most effective means by which to accurately
                transfer a planned implant position to a patient. In contrast to the
                inherent inaccuracy of Freehand and Static Navigation, Dynamic Navigation
                software algorithms direct the surgeon to angulate and orient the
                osteotomy drill using realtime feedback. The surgical path can be
                modified during treatment and the use of Dynamic Navigation in such
                situations as limited opening is unparalleled. It is equally as
                exacting with dentate and anodentate jaws.
              </p>
            </section>

            {/* Planning Phase */}
            <section id="planning" style={{ marginTop: "40px" }}>
              <h2>Planning Phase</h2>
              <p>
                Implant dentistry demands precision placement of the fixture. Ideal
                location and position, dimension (length and diameter) and depth and
                angulation are mandated for positive treatment outcomes. Restoratively
                driven implant placement is paramount for the overall integrity of
                the dentition. Thus, it is essential to first visualize the final
                prosthesis in place in order to determine the type and number of
                implants necessary to support the intended prosthesis based on
                residual bone volume [Figures 1a, 1b].
              </p>

              {/* Figure 1a & Figure 1b */}
              <div className="photo-figure-grid-2" style={{ marginTop: "24px" }}>
                <figure className="photo-figure-frame">
                  <div className="photo-figure-img-wrap">
                    <img
                      src="/assets/imgs/blog-2-Dynamic-Navigation-2.webp"
                      alt="Figure 1a"
                      className="photo-figure-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="photo-figure-caption">Figure 1a</figcaption>
                </figure>

                <figure className="photo-figure-frame">
                  <div className="photo-figure-img-wrap">
                    <img
                      src="/assets/imgs/blog-2-Dynamic-Navigation-3.webp"
                      alt="Figure 1b"
                      className="photo-figure-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="photo-figure-caption">Figure 1b</figcaption>
                </figure>
              </div>
            </section>

            {/* Trace and Place Registration (TaP) */}
            <section id="tap" style={{ marginTop: "48px" }}>
              <h2>Trace and Place Registration (TaP)</h2>
              <p>
                Historically, image-guided surgical registration required the use of
                fiducials to map the maxilla or the mandible to the cbCT scan. TaP
                registers high-contrast surfaces present in the data set obviating the
                need for a stent or clip attached to or positioned between the maxilla
                and mandible.
              </p>

              <p>
                TaP uses a Tracer Tool and Tag [Figure 2], Jaw Tracker [Figure 3] or a
                Head Tracker [Figure 4]. The Jaw Tracker in the mandible (or maxilla)
                or the Head Tracker in the maxilla are detected and triangulated by the
                optical sensor and thus always in sync regardless of how the head is
                positioned.
              </p>

              {/* figure 2 */}
              <figure className="photo-figure-frame" style={{ marginTop: "24px", marginBottom: "32px" }}>
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-4.webp"
                    alt="figure 2"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">figure 2</figcaption>
              </figure>

              {/* figure 3 & figure 4 */}
              <div className="photo-figure-grid-2" style={{ marginBottom: "32px" }}>
                <figure className="photo-figure-frame">
                  <div className="photo-figure-img-wrap">
                    <img
                      src="/assets/imgs/blog-2-Dynamic-Navigation-5.webp"
                      alt="figure 3"
                      className="photo-figure-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="photo-figure-caption">figure 3</figcaption>
                </figure>

                <figure className="photo-figure-frame">
                  <div className="photo-figure-img-wrap">
                    <img
                      src="/assets/imgs/blog-2-Dynamic-Navigation-6.webp"
                      alt="figure 4"
                      className="photo-figure-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="photo-figure-caption">figure 4</figcaption>
                </figure>
              </div>

              <p>
                Three to six stable structures (non-colinear teeth or bone screws in
                edentulous jaws) are chosen. The software algorithms prompt the user
                to hold the Tracer Tool on the marked structures as close to the
                landmark position as possible.
              </p>

              {/* figure 5a */}
              <figure className="photo-figure-frame" style={{ marginTop: "24px", marginBottom: "32px" }}>
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-7.webp"
                    alt="figure 5a"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">figure 5a</figcaption>
              </figure>

              <p>
                The Tracer Tool is moved around the landmark (only the tip should
                contact the tooth). A sound denotes the counter reaching 100, a
                percentage the points contacted. When trace registration is completed,
                the jaw structure has been mapped to the cbCT data set [Figure 5b].
              </p>

              {/* figure 5b */}
              <figure className="photo-figure-frame" style={{ marginTop: "24px", marginBottom: "32px" }}>
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-8.webp"
                    alt="figure 5b"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">figure 5b</figcaption>
              </figure>
            </section>

            {/* Calibration of the handpiece */}
            <section id="calibration" style={{ marginTop: "48px" }}>
              <h2>Calibration of the handpiece</h2>
              <p>
                The handpiece (product agnostic) is attached to a Drill Tag and the
                drill axis and drill tip are calibrated. This ensures that the
                spatial correlation of the drill axis and the drill tip is exact. The
                optical sensor is able to track and triangulate the tags (on patient,
                on tracer, on drill) at any time from the moment the sensor is ON. The
                difference is that after Calibration of the instruments and
                Registration of patient to the CBCT scan – the system can now show, in
                real-time, and continuously, the location of the drill in the patient
                [Figure 6a, 6b]
              </p>

              {/* figure 6a & figure 6b */}
              <div className="photo-figure-grid-2" style={{ marginTop: "24px", marginBottom: "32px" }}>
                <figure className="photo-figure-frame">
                  <div className="photo-figure-img-wrap">
                    <img
                      src="/assets/imgs/blog-2-Dynamic-Navigation-9.webp"
                      alt="figure 6a"
                      className="photo-figure-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="photo-figure-caption">figure 6a</figcaption>
                </figure>

                <figure className="photo-figure-frame">
                  <div className="photo-figure-img-wrap">
                    <img
                      src="/assets/imgs/blog-2-Dynamic-Navigation-10.webp"
                      alt="figure 6b"
                      className="photo-figure-img"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="photo-figure-caption">figure 6b</figcaption>
                </figure>
              </div>
            </section>

            {/* Surgical Navigation */}
            <section id="navigation" style={{ marginTop: "48px" }}>
              <h2>Surgical Navigation</h2>
              <p>
                The navigation screen is active when the system identifies the
                calibrated instrument as it approaches the patient’s jaw. The target
                view measures the distance between the instrument’s tip and central
                axis of the designated access penetration point, the glide path or the
                osteotomy. The central axis length of the planned procedure is
                represented by the center of the static white target, the tip of the
                drill is indicated by the moving black cross following the drill tip
                movement. The real-time direction of the drill is represented as a cone
                in the head of the handpiece [Figure 7].
              </p>

              {/* figure 7 */}
              <figure className="photo-figure-frame" style={{ marginTop: "24px", marginBottom: "32px" }}>
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2.webp"
                    alt="figure 7"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">figure 7</figcaption>
              </figure>
            </section>

            {/* Conclusion */}
            <section id="conclusion" style={{ marginTop: "48px" }}>
              <h2>Conclusion</h2>
              <p>
                TaP registration is more time and treatment efficient and effective
                than traditional stent protocols. Scans can be taken with the jaws in
                occlusion (no stent to separate them) for improved crown planning.
                Stents or clips do not impede handpiece access to space restricted
                locations and most importantly, dynamic guided surgery enables
                changes to the treatment plan intra-operatively.
              </p>
            </section>

            {/* Social Sharing & Back Link */}
            <div className="photo-share-wrap" style={{ marginTop: "48px" }}>
              <span className="photo-share-label">Share article:</span>
              <button
                type="button"
                className="photo-share-btn"
                onClick={() => handleShare("linkedin")}
                aria-label="Share on LinkedIn"
              >
                <i
                  className="fa-brands fa-linkedin"
                  style={{ color: "#0077b5" }}
                ></i>
                Share on LinkedIn
              </button>
              <button
                type="button"
                className="photo-share-btn"
                onClick={() => handleShare("whatsapp")}
                aria-label="Share on WhatsApp"
              >
                <i
                  className="fa-brands fa-whatsapp"
                  style={{ color: "#25d366" }}
                ></i>
                Share on WhatsApp
              </button>
              <button
                type="button"
                className={`photo-share-btn ${copied ? "copied" : ""}`}
                onClick={() => handleShare("copy")}
                aria-label="Copy article link"
              >
                <i
                  className={copied ? "fa-solid fa-check" : "fa-regular fa-copy"}
                ></i>
                {copied ? "Link Copied!" : "Copy Link"}
              </button>
            </div>

            <Link to="/blog" className="photo-back-link">
              <i className="fa-solid fa-arrow-left"></i> Back to All Articles
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
}
