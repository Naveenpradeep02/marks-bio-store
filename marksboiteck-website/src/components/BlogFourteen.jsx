import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogFourteen({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery | Marks Biotech";

    const sectionIds = [
      "intro",
      "the-hard-scan",
      "what-tissue-mapper-does",
      "why-it-matters",
      "workflow",
      "what-it-doesnt-change",
      "who-its-built-for",
      "faq",
      "talk-to-marks",
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
      "Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery | Marks Biotech";

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
              Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Full-Arch Photogrammetry</span> • <span>Tissue Mapping</span>
            </div>
            <h1 itemProp="headline">
              Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              Replacing wet, bloody, tongue-interrupted post-op optical scans
              with contact-based Trace surface registration on MicronMapper.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">MicronMapper Tissue Mapper</span>
              <span className="photo-meta-dot">•</span>
              <span>Full-Arch Immediate Loading</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-14.webp"
              alt="Tissue Mapper MicronMapper Photogrammetry Unit"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-cube"
                style={{ color: "var(--b3-red)" }}
              ></i>
              MicronMapper • Implant Photogrammetry &amp; Soft-Tissue Trace Mapping
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
              href="#the-hard-scan"
              className={activeSection === "the-hard-scan" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "the-hard-scan")}
            >
              The Hard Post-Op Scan
            </a>
            <a
              href="#what-tissue-mapper-does"
              className={
                activeSection === "what-tissue-mapper-does" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "what-tissue-mapper-does")}
            >
              What Tissue Mapper Does
            </a>
            <a
              href="#why-it-matters"
              className={activeSection === "why-it-matters" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "why-it-matters")}
            >
              Why This Matters
            </a>
            <a
              href="#workflow"
              className={activeSection === "workflow" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "workflow")}
            >
              Full-Arch Workflow
            </a>
            <a
              href="#what-it-doesnt-change"
              className={
                activeSection === "what-it-doesnt-change" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "what-it-doesnt-change")}
            >
              What This Doesn&apos;t Change
            </a>
            <a
              href="#who-its-built-for"
              className={
                activeSection === "who-its-built-for" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "who-its-built-for")}
            >
              Who This Is Built For
            </a>
            <a
              href="#faq"
              className={activeSection === "faq" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQ
            </a>
            <a
              href="#talk-to-marks"
              className={activeSection === "talk-to-marks" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "talk-to-marks")}
            >
              Talk to Marks Biotech
            </a>
          </aside>

          {/* Article Editorial Content Body */}
          <div className="photo-article-body">
            {/* Intro Section */}
            <section id="intro">
              <div className="photo-callout">
                <strong>Core Concept:</strong> Tissue Mapper is a MicronMapper
                capability that captures post-operative soft-tissue data using
                the same photogrammetry hardware already in the room for
                implant-position capture — instead of a separate intraoral scan.
                A wand gently traces the intaglio surface and surrounding
                gingiva using patented surface-registration (Trace) technology,
                replacing the single hardest scan in full-arch workflow: the
                wet, bloody, tongue-interrupted post-op soft-tissue impression.
              </div>
              <p>
                If you&apos;ve ever tried to get a clean post-op intraoral scan of
                a freshly surgerized mandibular arch, you already know why this
                matters more than it sounds like it should on paper.
              </p>
            </section>

            {/* The Scan Nobody Looks Forward To */}
            <section id="the-hard-scan">
              <h2>The Scan Nobody Looks Forward To</h2>
              <p>
                Full-arch implant protocols have gotten genuinely good at
                capturing implant position accurately — photogrammetry systems
                routinely do that part in under a minute. What hasn&apos;t gotten
                easier, until recently, is the scan that comes right after:
                recording the soft-tissue surface the provisional needs to be
                designed against.
              </p>
              <p>
                That scan happens at the worst possible moment for an optical
                intraoral scanner to do its job well. There&apos;s active or
                recently-controlled bleeding. Saliva pools faster than suction
                can clear it. The tongue, understandably uncooperative after
                surgery, keeps intruding on the scan field. In the mandible
                especially, operators routinely describe this as the single most
                frustrating capture in the entire full-arch appointment — not
                because the technique is hard to learn, but because the clinical
                environment actively fights the scanner&apos;s need for a clean,
                dry, stable optical field.
              </p>
              <p>
                The practical consequence: rescanning, delays, and sometimes a
                compromised soft-tissue dataset that the lab has to work around
                rather than work from.
              </p>
            </section>

            {/* What Tissue Mapper Actually Does */}
            <section id="what-tissue-mapper-does">
              <h2>What Tissue Mapper Actually Does</h2>
              <p>
                Tissue Mapper takes a different physical approach to the same
                problem. Rather than relying on optical surface scanning — which
                needs a clear, dry line of sight to function well — it uses a
                wand-style pointer and ClaroNav&apos;s patented
                surface-registration (Trace) technology to gently touch the
                gingival surface across the intaglio area and surrounding tissue,
                building an accurate 3D representation of the soft-tissue contour
                point by point rather than optically.
              </p>
              <p>
                Because contact-based registration doesn&apos;t depend on the same
                unobstructed, well-lit, moisture-free conditions an optical
                scanner needs, it holds up in exactly the clinical environment
                where post-op IOS scanning struggles most — a bloody,
                saliva-active, tongue-crowded surgical field.
              </p>
              <p>
                Critically, Tissue Mapper isn&apos;t a separate piece of hardware
                requiring its own setup: it runs through the same MicronMapper unit
                already being used to capture implant position, often using the
                same two-part scan body system — a titanium base scanned
                intraorally before suturing, with a snap-on scan cap used for the
                photogrammetry and Tissue Mapper captures. One device, one scan
                body family, two datasets.
              </p>

              {/* Figure 1 */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/MM IMAGE 1.jpg.webp"
                    alt="MicronMapper dental photogrammetry camera system"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • MicronMapper Photogrammetry Camera &amp; Contact-Based
                  Trace Registration Platform
                </figcaption>
              </figure>
            </section>

            {/* Why This Matters Beyond Convenience */}
            <section id="why-it-matters">
              <h2>Why This Matters Beyond Convenience</h2>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>It removes a genuine bottleneck</h3>
                  <p>
                    The post-op IOS scan has historically been a time sink
                    precisely because it so often needs repeating. Replacing it
                    with a capture method suited to the actual surgical field
                    conditions shortens that part of the appointment rather than
                    just making it marginally easier.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>It protects the data the lab works from</h3>
                  <p>
                    A soft-tissue dataset captured cleanly the first time, rather
                    than stitched together from a difficult, interrupted optical
                    scan, gives the lab a more reliable foundation for designing
                    the provisional against actual tissue contour — directly
                    relevant to how well that same-day or next-day prosthesis
                    ultimately fits.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>It keeps the workflow in one device</h3>
                  <p>
                    Clinics already running MicronMapper for implant-position
                    capture don&apos;t need to introduce a second system, train a
                    separate technique, or manage a different data format just
                    to solve the soft-tissue problem — it extends the same
                    photogrammetry platform rather than bolting on an unrelated
                    tool.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>It&apos;s built for the case type where this problem is worst</h3>
                  <p>
                    Full-arch, same-day or near-same-day provisionalization is
                    exactly the scenario where a clean post-op soft-tissue
                    capture matters most and is hardest to get — which is the
                    specific gap Tissue Mapper was designed to close.
                  </p>
                </article>
              </div>
            </section>

            {/* Where This Fits in the Full-Arch Workflow */}
            <section id="workflow">
              <h2>Where This Fits in the Full-Arch Workflow</h2>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Step 1</span>
                  <h3>Implant placement</h3>
                  <p>Standard surgical protocol, implants placed to plan.</p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Step 2</span>
                  <h3>Scan body attachment</h3>
                  <p>
                    Titanium bases are seated on the implants; snap-on scan caps
                    attached for capture.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Step 3</span>
                  <h3>Photogrammetry capture</h3>
                  <p>
                    MicronMapper records precise 3D implant positions in under a
                    minute.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Step 4</span>
                  <h3>Tissue Mapper capture</h3>
                  <p>
                    The wand traces the intaglio and surrounding gingival surface,
                    building the soft-tissue dataset — in the same visit, with the
                    same unit, without requiring the field conditions a
                    conventional IOS scan needs.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Step 5</span>
                  <h3>Data export to design</h3>
                  <p>
                    Implant-position and soft-tissue data move together into CAD
                    design for the provisional.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Step 6</span>
                  <h3>Same-day or near-same-day delivery</h3>
                  <p>
                    The lab works from a complete, reliably captured dataset
                    rather than reconstructing around a compromised scan.
                  </p>
                </div>
              </div>

              {/* Figure 2 */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/MM IMAGE 3.jpg.webp"
                    alt="MicronMapper full arch scan body capture and clinical workflow"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Full-Arch Scan Body Capture &amp; Dual-Dataset
                  Photogrammetry Export
                </figcaption>
              </figure>
            </section>

            {/* What This Doesn't Change */}
            <section id="what-it-doesnt-change">
              <h2>What This Doesn&apos;t Change</h2>
              <p>
                Tissue Mapper solves the soft-tissue capture problem specifically
                — it doesn&apos;t replace clinical verification of the final
                prosthesis fit, and it doesn&apos;t substitute for sound surgical
                and prosthetic planning upstream of the scan itself. A clean
                soft-tissue dataset gives the lab accurate information to design
                against; it&apos;s still one input into a multi-step workflow, the
                same honest caveat that applies to implant-position
                photogrammetry generally. The value here is specifically in
                removing a well-documented point of friction in full-arch
                same-day protocols — not in promising a shortcut around the rest
                of the clinical process.
              </p>
            </section>

            {/* Who This Is Built For */}
            <section id="who-its-built-for">
              <h2>Who This Is Built For</h2>
              <p>
                Clinics and labs running, or considering, same-day or
                near-same-day full-arch provisionalization protocols —
                particularly those who&apos;ve experienced firsthand how
                unreliable a post-op mandibular IOS scan can be in a live surgical
                field. It&apos;s a natural extension for any practice already
                using photogrammetry-based implant-position capture for full-arch
                cases, rather than a standalone purchase decision made
                independently of that workflow.
              </p>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq">
              <h2>FAQ</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                      color: "var(--b3-text-dark)",
                    }}
                  >
                    What problem does Tissue Mapper actually solve?
                  </h3>
                  <p style={{ margin: 0 }}>
                    It replaces the conventional post-operative intraoral scan
                    for soft-tissue capture — historically the hardest scan in a
                    full-arch protocol due to bleeding, saliva, and tongue
                    interference, particularly in the mandible.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                      color: "var(--b3-text-dark)",
                    }}
                  >
                    Does Tissue Mapper require separate hardware from MicronMapper?
                  </h3>
                  <p style={{ margin: 0 }}>
                    No. It runs through the same MicronMapper unit used for
                    implant-position photogrammetry, typically using the same
                    two-part scan body system for both captures.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                      color: "var(--b3-text-dark)",
                    }}
                  >
                    How does Tissue Mapper capture soft tissue without an optical scan?
                  </h3>
                  <p style={{ margin: 0 }}>
                    It uses a wand-style pointer and patented surface-registration
                    (Trace) technology to physically trace the intaglio and
                    surrounding gingival surface, rather than relying on optical
                    line-of-sight the way a conventional intraoral scanner does.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                      color: "var(--b3-text-dark)",
                    }}
                  >
                    Is Tissue Mapper only useful for full-arch cases?
                  </h3>
                  <p style={{ margin: 0 }}>
                    It&apos;s specifically built for the scenario where post-op
                    soft-tissue capture is hardest and matters most — full-arch,
                    same-day or near-same-day provisionalization — though the
                    underlying principle applies anywhere post-op field
                    conditions make optical scanning unreliable.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                      color: "var(--b3-text-dark)",
                    }}
                  >
                    Does this replace clinical verification of the final prosthesis?
                  </h3>
                  <p style={{ margin: 0 }}>
                    No. It improves the accuracy and reliability of the
                    soft-tissue data the lab designs from; the prosthesis still
                    requires clinical try-in and verification like any digitally
                    designed full-arch restoration.
                  </p>
                </div>
              </div>
            </section>

            {/* Talk to Marks Biotech */}
            <section id="talk-to-marks">
              <h2>Talk to Marks Biotech</h2>
              <p>
                Marks Biotech is the Indian distribution partner for
                ClaroNav&apos;s MicronMapper platform, including Tissue Mapper. If
                post-op soft-tissue capture has been the weak link in your
                full-arch protocol, it&apos;s worth seeing the workflow in person.
                Book a MicronMapper demonstration or reach the team at
                info@marksbiotech.com / +91 98198 93250.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • PHOTOGRAMMETRY &amp; DIGITAL DENTISTRY
                  </div>
                  <h2>MicronMapper with Tissue Mapper</h2>
                  <p>
                    Capture 3D implant positions and soft tissue intaglio contours
                    in a single appointment without the need for post-op intraoral
                    scanning.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginTop: "16px",
                    }}
                  >
                    <Link className="photo-btn light" to="/products">
                      Explore MicronMapper{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <a
                      className="photo-btn light"
                      href="mailto:info@marksbiotech.com"
                    >
                      Book a Demo <i className="fa-solid fa-calendar-check"></i>
                    </a>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>TRACE</span>
                  <small>
                    TISSUE
                    <br />
                    MAPPER
                  </small>
                </div>
              </div>
            </section>

            {/* Social Share & Back Navigation */}
            <div className="photo-share-wrap">
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
