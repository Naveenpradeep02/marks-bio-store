import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogTen({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Evaluvating 3D Implant Placement Using Digital Dentistry Software | Marks Biotech";

    const sectionIds = [
      "intro",
      "software-function",
      "three-metrics",
      "comparative-evidence",
      "sources-of-error",
      "ai-assisted-planning",
      "evaluation-checklist",
      "honest-limits",
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
      "Evaluvating 3D Implant Placement Using Digital Dentistry Software | Marks Biotech";

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
              Evaluvating 3D Implant Placement Using Digital Dentistry Software
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Digital Dentistry Software</span> •{" "}
              <span>3D Implant Planning</span>
            </div>
            <h1 itemProp="headline">
              Evaluvating 3D Implant Placement Using Digital Dentistry Software
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              Comparing planned vs actual placed positions: entry-point, apical,
              and angular deviations, registration accuracy, delivery methods, and
              practical software evaluation criteria.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Virtual Implant Planning</span>
              <span className="photo-meta-dot">•</span>
              <span>Workflow Accuracy Analysis</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-10.webp"
              alt="Evaluating 3D Implant Placement Using Digital Dentistry Software"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-cube"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Virtual Implant Planning • Deviation Analysis &amp; Workflow Accuracy
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
              Overview &amp; Real Question
            </a>
            <a
              href="#software-function"
              className={
                activeSection === "software-function" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "software-function")}
            >
              What Software Actually Does
            </a>
            <a
              href="#three-metrics"
              className={activeSection === "three-metrics" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "three-metrics")}
            >
              The Three Defining Metrics
            </a>
            <a
              href="#comparative-evidence"
              className={
                activeSection === "comparative-evidence" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "comparative-evidence")}
            >
              What the Evidence Shows
            </a>
            <a
              href="#sources-of-error"
              className={activeSection === "sources-of-error" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "sources-of-error")}
            >
              Where Error Enters Workflow
            </a>
            <a
              href="#ai-assisted-planning"
              className={
                activeSection === "ai-assisted-planning" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "ai-assisted-planning")}
            >
              AI-Assisted Planning
            </a>
            <a
              href="#evaluation-checklist"
              className={
                activeSection === "evaluation-checklist" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "evaluation-checklist")}
            >
              Evaluation Checklist
            </a>
            <a
              href="#honest-limits"
              className={activeSection === "honest-limits" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "honest-limits")}
            >
              The Honest Limits
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
                <strong>Core Concept:</strong> Evaluating 3D implant placement in
                digital dentistry software means comparing the planned implant
                position — set virtually on a merged CBCT and surface-scan model
                — against the implant&apos;s actual placed position, measured as
                deviation at the entry point, deviation at the apex, and angular
                deviation. Current comparative research shows computer-assisted
                planning consistently outperforms freehand placement on these
                three metrics, but the size of the gap depends heavily on which
                delivery method (static guide, dynamic navigation, or robotic)
                carries that plan from screen to mouth.
              </div>
              <p>
                Software doesn&apos;t place implants. It plans them, and the plan
                is only as good as how faithfully the rest of the workflow
                reproduces it. This is where &ldquo;which software is
                accurate&rdquo; turns out to be the wrong question — the better
                one is &ldquo;accurate at doing what, compared against
                what.&rdquo;
              </p>
            </section>

            {/* What 3D Implant Planning Software Actually Does */}
            <section id="software-function">
              <h2>What 3D Implant Planning Software Actually Does</h2>
              <p>
                At its core, virtual implant planning software performs one job:
                merge two different datasets — a CBCT scan showing bone anatomy
                and a surface scan (intraoral or model-based) showing the
                prosthetic landscape — into one coordinate system the clinician
                can plan against. Once merged, the software lets the clinician
                position a virtual implant relative to both the available bone
                and the intended final restoration, often starting from a
                diagnostic wax-up or denture duplicate to keep planning
                prosthetically driven rather than bone-driven.
              </p>
              <p>
                From there, depending on the platform, the plan can be exported
                to design a 3D-printed static surgical guide, transferred to a
                dynamic navigation system for real-time tracked surgery, or in a
                smaller but growing number of cases, used to drive a robotic
                placement arm.
              </p>

              {/* Figure: Virtual Planning Trajectory */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-3.webp"
                    alt="Virtual Implant Planning Trajectory and Restoratively Driven Design"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Virtual Implant Planning: Entry-Point, Apical
                  &amp; Angular Trajectory Alignments
                </figcaption>
              </figure>
            </section>

            {/* The Three Metrics That Actually Define "Accurate" */}
            <section id="three-metrics">
              <h2>The Three Metrics That Actually Define &ldquo;Accurate&rdquo;</h2>
              <p>
                Nearly every comparative study in this field uses the same three
                measurements, which makes them worth understanding before any
                vendor&apos;s accuracy claim means much:
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Entry-point deviation</h3>
                  <p>
                    How far the actual implant shoulder/entry position sits from
                    the planned position, usually reported in millimeters.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Apical deviation</h3>
                  <p>
                    The same measurement taken at the implant apex, which tends
                    to be larger than entry-point deviation because angular error
                    compounds over the implant&apos;s length.
                  </p>
                </article>

                <article
                  className="photo-feature"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <span className="photo-feature-num">03</span>
                  <h3>Angular deviation</h3>
                  <p>
                    The angle between the planned and achieved implant axis,
                    reported in degrees.
                  </p>
                </article>
              </div>

              <div className="photo-callout" style={{ marginTop: "20px" }}>
                A planning software evaluation that doesn&apos;t report all three
                is giving an incomplete picture — a system can look excellent on
                entry-point accuracy while angular drift quietly pushes the apex
                toward an adjacent root or the sinus floor.
              </div>
            </section>

            {/* What the Comparative Evidence Shows */}
            <section id="comparative-evidence">
              <h2>What the Comparative Evidence Shows</h2>
              <p>
                A 2024 systematic review (Saini et al., DHE Journal) looking
                specifically at how 3D imaging and virtual-patient techniques
                affect implant planning and placement accuracy found a striking
                spread between methods — one included study reported angular
                deviation of 4.8&deg; with 3D virtual planning and surgical
                templates versus 9.8&deg; with freehand placement, roughly
                double the error without digital planning. The same review noted
                that aligning surface-scan data with CBCT for template design
                consistently improved accuracy (p&lt;0.001 in the pooled studies
                reviewed), reinforcing that the registration step between
                datasets — not just the planning software&apos;s interface — is
                where a meaningful share of accuracy is won or lost.
              </p>
              <p>
                A broader 2024 meta-analysis (Khaohoen et al., BMC Oral Health)
                pooling 67 clinical studies across static, dynamic, and
                robot-assisted guided surgery reported an overall mean deviation
                of 1.11 mm at the entry point, 1.40 mm at the apex, and
                3.51&deg; angular deviation across computerized methods
                generally — with robotic systems showing the tightest figures
                (0.81 mm coronal, 0.77 mm apical, 1.71&deg; angular) among the
                methods compared.
              </p>
              <p>
                A 2025 network meta-analysis specifically comparing different
                computer-assisted implant-surgery methods against each other and
                against freehand placement reinforces the same hierarchy:
                digital planning paired with any delivery method (static,
                dynamic, or robotic) outperforms freehand placement, with the
                delivery method chosen to execute the plan mattering as much as
                the planning software used to create it.
              </p>

              {/* Figure: Multi-Dataset Coordinate Registration */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/digitalsection.webp"
                    alt="Multi-Dataset Coordinate Registration fusing CBCT and Optical Surface Scans"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Multi-Dataset Coordinate Registration: Fusing CBCT
                  Anatomy &amp; Optical Surface Scans
                </figcaption>
              </figure>
            </section>

            {/* Where Error Actually Enters the Workflow */}
            <section id="sources-of-error">
              <h2>Where Error Actually Enters the Workflow</h2>
              <p>
                This is the part evaluation checklists often skip, and it matters
                more than picking between two similarly capable software
                platforms:
              </p>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 1</span>
                  <h3>CBCT-to-surface-scan registration</h3>
                  <p>
                    One review of virtual planning software reported a mean
                    deviation of roughly 0.54 mm between surface scan and CBCT
                    models during alignment — before any implant is even
                    planned. If this step is off, every downstream measurement
                    inherits that error.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 2</span>
                  <h3>Guide or marker fabrication</h3>
                  <p>
                    Static guides depend on manufacturing tolerance of the
                    sleeve and printed template; dynamic navigation depends on
                    the stability of the tracked reference during surgery.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 3</span>
                  <h3>Clinical execution</h3>
                  <p>
                    Operator experience, drill deflection, bone density, and
                    limited access all still influence the final result,
                    independent of how accurate the virtual plan was.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 4</span>
                  <h3>Software-specific workflow gaps</h3>
                  <p>
                    Some planning platforms are purpose-built for implant
                    positioning alone and don&apos;t integrate with CAD systems
                    for the final restoration, which can mean the prosthetic
                    design drifts from the original virtual wax-up by the time
                    it&apos;s manufactured — a gap worth checking for
                    specifically when evaluating a platform, not assuming away.
                  </p>
                </div>
              </div>

              <div className="photo-callout" style={{ marginTop: "20px" }}>
                A planning software evaluation that only asks &ldquo;how accurate
                is the plan&rdquo; and never asks &ldquo;how much of that
                accuracy survives registration, fabrication, and
                execution&rdquo; is evaluating half the problem.
              </div>
            </section>

            {/* AI-Assisted Planning: Where It Helps, and Where It Doesn't Yet */}
            <section id="ai-assisted-planning">
              <h2>AI-Assisted Planning: Where It Helps, and Where It Doesn&apos;t Yet</h2>
              <p>
                A growing number of platforms now offer AI-assisted
                segmentation — automatically identifying bone boundaries, nerve
                canals, and suggesting implant size and position from the CBCT
                dataset, rather than requiring the clinician to trace every
                structure manually. A 2025 systematic review of AI in implant
                planning found this genuinely speeds up workflow, but accuracy
                for fully automated size and position suggestions remains
                inconsistent: one study in the review reported automated
                implant-length prediction accuracy of around 76% and diameter
                prediction accuracy of around 59% against expert-confirmed ground
                truth, which is useful as a starting suggestion but not yet a
                replacement for clinician review.
              </p>
              <div className="photo-callout">
                The practical takeaway for evaluating AI-enabled software
                specifically: treat automated suggestions as a faster first
                draft, not a final plan, until the accuracy data for a given
                platform&apos;s segmentation model is independently reported
                rather than vendor-claimed.
              </div>
            </section>

            {/* A Practical Evaluation Checklist */}
            <section id="evaluation-checklist">
              <h2>A Practical Evaluation Checklist</h2>
              <p>
                When comparing 3D implant planning software platforms, these are
                the questions worth asking beyond &ldquo;is it accurate&rdquo;:
              </p>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <span
                    style={{
                      color: "var(--b3-red)",
                      fontWeight: "700",
                      marginRight: "8px",
                    }}
                  >
                    &bull;
                  </span>
                  Does it support prosthetically driven planning — starting from
                  a wax-up or scanned denture, not bone volume alone?
                </div>
                <div className="photo-limits-item">
                  <span
                    style={{
                      color: "var(--b3-red)",
                      fontWeight: "700",
                      marginRight: "8px",
                    }}
                  >
                    &bull;
                  </span>
                  What&apos;s the reported registration accuracy between CBCT and
                  surface-scan data, and is that figure independently published
                  or only vendor-claimed?
                </div>
                <div className="photo-limits-item">
                  <span
                    style={{
                      color: "var(--b3-red)",
                      fontWeight: "700",
                      marginRight: "8px",
                    }}
                  >
                    &bull;
                  </span>
                  Does it integrate with CAD design for the final restoration, or
                  does the prosthetic design need to be redone in separate
                  software after implant planning?
                </div>
                <div className="photo-limits-item">
                  <span
                    style={{
                      color: "var(--b3-red)",
                      fontWeight: "700",
                      marginRight: "8px",
                    }}
                  >
                    &bull;
                  </span>
                  Which delivery methods does it support — static guide export,
                  dynamic navigation compatibility, or both — and does that match
                  the clinic&apos;s existing surgical workflow?
                </div>
                <div className="photo-limits-item">
                  <span
                    style={{
                      color: "var(--b3-red)",
                      fontWeight: "700",
                      marginRight: "8px",
                    }}
                  >
                    &bull;
                  </span>
                  Is there published, independent accuracy data for this
                  specific platform, or only for the broader category of
                  computer-assisted planning it belongs to?
                </div>
                <div className="photo-limits-item">
                  <span
                    style={{
                      color: "var(--b3-red)",
                      fontWeight: "700",
                      marginRight: "8px",
                    }}
                  >
                    &bull;
                  </span>
                  What&apos;s the actual learning curve for the planning
                  interface itself, separate from the surgical technique it
                  feeds into?
                </div>
              </div>
            </section>

            {/* The Honest Limits */}
            <section id="honest-limits">
              <h2>The Honest Limits</h2>
              <p>
                No planning software, however accurate its interface claims to
                be, closes the gap between plan and outcome on its own. The
                registration step, the guide or navigation hardware, and the
                clinician&apos;s hands all still contribute error that the
                software cannot correct for after the fact. Published accuracy
                figures for &ldquo;computer-assisted implant surgery&rdquo; as a
                category are genuinely strong compared with freehand placement —
                but they describe the combined workflow, not the planning
                software in isolation. Evaluating software well means evaluating
                the whole chain it sits inside, not just the screen where the plan
                gets drawn.
              </p>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Evaluating 3D implant placement software isn&apos;t really about
                ranking interfaces — it&apos;s about understanding where
                accuracy is created and where it&apos;s lost across the full
                digital workflow, from CBCT registration through to surgical
                execution. The category-level evidence is strong:
                computer-assisted planning consistently beats freehand placement
                on entry-point, apical, and angular deviation, regardless of
                which specific platform or delivery method is used. The software
                that deserves trust is the one with accuracy data published
                independently of its own marketing, built around prosthetically
                driven planning, and matched honestly to the delivery method a
                practice actually uses.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • DIGITAL DENTISTRY &amp; SURGICAL SOLUTIONS
                  </div>
                  <h2>Digital Surgical Guidance &amp; Navigation</h2>
                  <p>
                    Discover complete solutions from digital planning to
                    guided execution with the B&amp;B Digital Surgical Guide and
                    Navident Dynamic Navigation.
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
                  <span>3D</span>
                  <small>
                    IMPLANT
                    <br />
                    PLANNING
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
