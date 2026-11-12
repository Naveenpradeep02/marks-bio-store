import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogEleven({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry | Marks Biotech";

    const sectionIds = [
      "intro",
      "why-two-scans",
      "registration-approaches",
      "accuracy-data",
      "soft-tissue-challenges",
      "clinical-applications",
      "where-it-falls-short",
      "faq",
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
      "Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry | Marks Biotech";

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
              Auto-merging CBCT Data &amp; Soft Tissue USing Digital Dentistry
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Digital Dentistry</span> • <span>Multimodal Registration</span>
            </div>
            <h1 itemProp="headline">
              Auto-merging CBCT Data &amp; Soft Tissue USing Digital Dentistry
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              Aligning CBCT bone anatomy and optical soft-tissue scans into a
              unified coordinate system: algorithmic matching, AI registration,
              submillimeter accuracy, and virtual patient workflows.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">CBCT &amp; Soft Tissue Merge</span>
              <span className="photo-meta-dot">•</span>
              <span>Virtual Patient Architecture</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-11.webp"
              alt="Auto-merging CBCT Data and Soft Tissue Using Digital Dentistry"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-cube"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Multimodal Registration • Hard &amp; Soft Tissue Coordinate Merging
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
              Overview &amp; Registration Core
            </a>
            <a
              href="#why-two-scans"
              className={activeSection === "why-two-scans" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "why-two-scans")}
            >
              Why Two Scans Need to Become One Model
            </a>
            <a
              href="#registration-approaches"
              className={
                activeSection === "registration-approaches" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "registration-approaches")}
            >
              Registration Approaches
            </a>
            <a
              href="#accuracy-data"
              className={activeSection === "accuracy-data" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "accuracy-data")}
            >
              How Accurate Is the Automatic Merge?
            </a>
            <a
              href="#soft-tissue-challenges"
              className={
                activeSection === "soft-tissue-challenges" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "soft-tissue-challenges")}
            >
              Where Soft Tissue Gets Harder
            </a>
            <a
              href="#clinical-applications"
              className={
                activeSection === "clinical-applications" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "clinical-applications")}
            >
              Clinical Applications
            </a>
            <a
              href="#where-it-falls-short"
              className={
                activeSection === "where-it-falls-short" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "where-it-falls-short")}
            >
              Where This Still Falls Short
            </a>
            <a
              href="#faq"
              className={activeSection === "faq" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQ
            </a>
            <a
              href="#conclusion"
              className={activeSection === "conclusion" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "conclusion")}
            >
              Conclusion
            </a>
          </aside>

          {/* Article Editorial Content Body */}
          <div className="photo-article-body">
            {/* Intro Section */}
            <section id="intro">
              <div className="photo-callout">
                <strong>Core Concept:</strong> Auto-merging in digital dentistry
                refers to software automatically aligning a CBCT scan (bone and
                hard tissue) with an intraoral or soft-tissue scan (teeth,
                gingiva, mucosa) into a single coordinate system — without a
                clinician manually marking matching landmarks on both datasets.
                Recent systematic review data puts this at the center of building
                an accurate &ldquo;virtual patient&rdquo; model, and newer
                AI-driven registration methods are reporting meaningfully higher
                consistency than the manual and semi-automatic techniques
                they&apos;re replacing.
              </div>
              <p>
                Every piece of implant planning, guided surgery, or prosthetic
                design built on a merged dataset inherits whatever error happened
                at this one step. Get the registration wrong and a beautifully
                planned implant position can end up beautifully wrong too — which
                is exactly why how the merge happens has become its own area of
                active research, not just a background technical detail.
              </p>
            </section>

            {/* Why Two Scans Need to Become One Model */}
            <section id="why-two-scans">
              <h2>Why Two Scans Need to Become One Model</h2>
              <p>
                CBCT shows bone. It&apos;s poor at showing soft tissue detail —
                gingival contour, tooth surface fine detail, and anything beyond
                what differential X-ray absorption can distinguish. An intraoral
                scan (or a facial/surface scan) is the opposite: excellent
                soft-tissue and surface detail, no information about what&apos;s
                happening underneath.
              </p>
              <p>
                Neither dataset alone is enough for prosthetically driven implant
                planning, orthodontic treatment planning, or guided surgery
                design. The clinician needs to see the planned crown position
                relative to the bone it will sit above — which means merging the
                two datasets into what the literature has called, since Joda and
                Gallucci&apos;s original concept over a decade ago, a
                &ldquo;virtual patient&rdquo;: one coordinate system holding both
                hard and soft tissue data simultaneously.
              </p>
            </section>

            {/* Manual, Semi-Automatic, and Automatic Registration */}
            <section id="registration-approaches">
              <h2>Manual, Semi-Automatic, and Automatic Registration</h2>
              <p>
                Three approaches exist for performing this merge, and the
                difference matters for both accuracy and chair time.
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Manual registration</h3>
                  <p>
                    Manual registration has the clinician select corresponding
                    landmark points on both datasets by eye — reliable in
                    experienced hands but slow, and dependent on the
                    operator&apos;s ability to identify truly matching points
                    across two very different image types.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Semi-automatic registration</h3>
                  <p>
                    Semi-automatic registration typically uses an algorithm
                    (commonly Iterative Closest Point, or ICP) to refine an
                    initial manual alignment, reducing but not eliminating the
                    operator-dependent step.
                  </p>
                </article>

                <article
                  className="photo-feature"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <span className="photo-feature-num">03</span>
                  <h3>Fully automatic registration</h3>
                  <p>
                    Fully automatic registration removes the manual landmark step
                    entirely, using either geometry-based algorithms
                    (coarse-to-fine surface matching) or, increasingly, AI-driven
                    methods — typically convolutional neural networks trained to
                    segment and align anatomical structures across both datasets
                    without operator input.
                  </p>
                </article>
              </div>

              <p style={{ marginTop: "24px" }}>
                A 2025 systematic review and meta-analysis in Clinical Oral
                Investigations (Zheng et al.) specifically evaluating automatic
                multimodal CBCT–intraoral scan registration identified 22
                qualifying studies: 14 using geometry-based methods, 7 using AI
                techniques, and one comparing both directly. The review&apos;s
                overall finding was that AI-based methods are trending toward
                greater automation and robustness than purely geometric
                approaches, though the evidence base for head-to-head comparison
                between the two is still developing.
              </p>

              {/* Figure 1: AI & Multimodal Registration */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/ai-driven-dental.webp"
                    alt="AI-driven multimodal registration aligning CBCT and intraoral scan surfaces"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Multimodal Registration: AI &amp; Algorithmic
                  Alignment of Hard and Soft Tissues
                </figcaption>
              </figure>
            </section>

            {/* How Accurate Is the Automatic Merge? */}
            <section id="accuracy-data">
              <h2>How Accurate Is the Automatic Merge?</h2>
              <p>
                Several recent validation studies give a concrete sense of where
                this technology currently stands.
              </p>
              <p>
                A 2024 validation study testing a novel AI-driven automated
                registration tool against semi-automated and manual registration
                found the automated method achieved 99.6% similarity to the
                reference standard, compared with 88.3% for the semi-automated
                approach — with notably lower standard deviation across cases,
                meaning the automated method wasn&apos;t just more accurate on
                average, it was more consistent case to case.
              </p>
              <p>
                A separate validation study using 3D segmentation-supported
                automatic registration between CBCT and intraoral scan data
                reported a mean registration deviation of 0.234 mm across ten
                sample cases, with standard deviation around 0.13 mm —
                submillimeter accuracy that&apos;s clinically comparable to, and
                in some reported cases tighter than, semi-automatic techniques
                requiring manual landmark input.
              </p>
              <p>
                A 2025 study comparing virtual-patient creation from MSCT versus
                CBCT datasets specifically examined the impact of soft tissue on
                registration accuracy and found no significant difference
                between the two imaging modalities for soft-tissue registration —
                useful reassurance that CBCT, the far more common in-office
                imaging modality, performs comparably to medical-grade CT for
                this specific registration task.
              </p>
            </section>

            {/* Where Soft Tissue Registration Specifically Gets Harder */}
            <section id="soft-tissue-challenges">
              <h2>Where Soft Tissue Registration Specifically Gets Harder</h2>
              <p>
                Hard-tissue (bone-to-bone, or tooth-to-tooth) registration has a
                natural advantage: both datasets are capturing a rigid structure
                that doesn&apos;t move or deform between scans. Soft tissue
                registration doesn&apos;t have that luxury — gingival contour and
                mucosal surfaces can shift slightly between the CBCT appointment
                and the intraoral scan appointment, from factors as simple as
                retractor pressure, hydration, or time elapsed between scans.
              </p>
              <div className="photo-callout">
                This is part of why several of the more robust automatic
                registration methods anchor their alignment to a hard-tissue
                reference first — typically tooth surfaces or the palatal vault,
                which deforms far less than gingival or buccal mucosa — and then
                register soft tissue data relative to that fixed hard-tissue
                frame, rather than attempting to align soft tissue surfaces
                directly against each other.
              </div>
            </section>

            {/* Clinical Applications Built on the Merged Model */}
            <section id="clinical-applications">
              <h2>Clinical Applications Built on the Merged Model</h2>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Application 1</span>
                  <h3>Prosthetically driven implant planning</h3>
                  <p>
                    Seeing the planned crown position directly against the bone
                    it will be placed into, which is the entire basis of modern
                    guided implant workflows.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Application 2</span>
                  <h3>Esthetic zone treatment planning</h3>
                  <p>
                    Evaluating soft-tissue profile, gingival margin position, and
                    emergence contour against the underlying bone and root
                    anatomy simultaneously, particularly relevant for anterior
                    implant and restorative cases.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Application 3</span>
                  <h3>Orthodontic and orthognathic planning</h3>
                  <p>
                    Visualizing tooth root position (visible only on CBCT)
                    relative to crown position and soft-tissue profile (visible
                    on surface/facial scans).
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Application 4</span>
                  <h3>Surgical guide and template design</h3>
                  <p>
                    Any static or dynamic guided-surgery workflow depends on an
                    accurately merged dataset as its starting input;
                    registration error here propagates directly into surgical
                    deviation.
                  </p>
                </div>
              </div>

              {/* Figure 2: Restorative Planning and Digital Guides */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/di-1.webp"
                    alt="Virtual Patient Model: Integrating Hard Tissue, Soft Tissue, and Prosthetic Plans"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Virtual Patient Dataset: Restorative Planning and
                  Guided Surgical Execution
                </figcaption>
              </figure>
            </section>

            {/* Where This Still Falls Short */}
            <section id="where-it-falls-short">
              <h2>Where This Still Falls Short</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <strong>Imaging artifacts.</strong> Metal restorations,
                  orthodontic hardware, and motion artifacts on the CBCT side can
                  degrade the hard-tissue reference the registration depends on.
                </div>
                <div className="photo-limits-item">
                  <strong>Scan stitching errors.</strong> Intraoral scans built
                  from multiple stitched images can carry their own internal
                  distortion, particularly over longer spans — distortion that an
                  otherwise accurate registration algorithm will faithfully
                  merge into the final model.
                </div>
                <div className="photo-limits-item">
                  <strong>Soft-tissue deformation between scans.</strong> Even
                  automatic methods anchored to hard tissue can&apos;t fully
                  correct for genuine positional change in soft tissue between
                  the two scan sessions.
                </div>
                <div className="photo-limits-item">
                  <strong>Validation still study-specific.</strong> Reported
                  accuracy figures (99.6% similarity, sub-millimeter deviation)
                  come from individual validation studies on specific tools and
                  datasets — they demonstrate the technology&apos;s potential
                  more than they guarantee identical performance across every
                  commercial platform.
                </div>
                <div className="photo-limits-item">
                  <strong>AI method transparency.</strong> Deep-learning
                  registration tools can be highly consistent without always
                  being easy to audit case by case — a clinician reviewing the
                  merged output visually before planning against it remains good
                  practice regardless of how the alignment was generated.
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <h2>FAQ</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", color: "var(--b3-text-dark)" }}>
                    What is a &ldquo;virtual patient&rdquo; in digital dentistry?
                  </h3>
                  <p style={{ margin: 0 }}>
                    A single 3D model combining CBCT (bone) data with intraoral
                    or facial surface scan (soft tissue) data in one coordinate
                    system, used as the foundation for implant planning, guided
                    surgery, and esthetic treatment planning.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", color: "var(--b3-text-dark)" }}>
                    How is automatic registration different from manual registration?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Manual registration requires a clinician to select matching
                    landmark points on both datasets by eye; automatic
                    registration uses geometry-based or AI-driven algorithms to
                    align the datasets without that manual step.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", color: "var(--b3-text-dark)" }}>
                    Is AI-based registration more accurate than geometry-based methods?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Current evidence trends in that direction — one validation
                    study reported 99.6% similarity to reference with an
                    AI-driven method versus 88.3% for a semi-automated approach
                    — though a 2025 systematic review notes the comparative
                    evidence base between AI and geometry-based methods is still
                    developing.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", color: "var(--b3-text-dark)" }}>
                    Does CBCT work as well as medical CT for soft tissue registration?
                  </h3>
                  <p style={{ margin: 0 }}>
                    A 2025 comparative study found no significant difference
                    between MSCT and CBCT specifically for soft-tissue
                    registration accuracy, suggesting standard in-office CBCT is
                    a reasonable basis for virtual patient creation.
                  </p>
                </div>

                <div className="photo-limits-item">
                  <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", color: "var(--b3-text-dark)" }}>
                    What&apos;s the biggest source of error in CBCT–intraoral scan merging?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Imaging artifacts (metal restorations, motion) on the CBCT
                    side and stitching distortion within the intraoral scan
                    itself are the most commonly cited sources, alongside genuine
                    soft-tissue positional change between scan sessions.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Auto-merging CBCT and soft-tissue scan data has moved from a
                manual, landmark-dependent step to an increasingly automated
                one, with AI-driven registration methods now reporting
                sub-millimeter accuracy and notably higher consistency than
                earlier semi-automatic techniques in published validation
                studies. It&apos;s foundational, not peripheral — every downstream
                step in digital implant planning, guided surgery, and esthetic
                treatment design inherits whatever accuracy (or error) happens
                at this merge. The direction of the evidence is genuinely
                encouraging; the responsible habit is still to look at the merged
                model before planning against it, not just trust the percentage
                on the validation report.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • DIGITAL DENTISTRY &amp; SURGICAL SOLUTIONS
                  </div>
                  <h2>Digital Surgical Guidance &amp; Navigation</h2>
                  <p>
                    Experience seamless digital workflows from automated scan
                    alignment to guided execution with the B&amp;B Digital Surgical
                    Guide and Navident Dynamic Navigation.
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
                      Explore Products{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <Link className="photo-btn light" to="/blog/2">
                      Dynamic Navigation Guide{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>AI</span>
                  <small>
                    CBCT
                    <br />
                    MERGE
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
