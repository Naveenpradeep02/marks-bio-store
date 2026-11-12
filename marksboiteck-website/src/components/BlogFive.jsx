import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogFive({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Radiographic Markers for Guided Implant Surgery | Marks Biotech";

    const sectionIds = [
      "intro",
      "why-planning-starts-before-cbct",
      "what-are-radiopaque-markers",
      "why-markers-are-used",
      "radiographic-template",
      "how-markers-work-cbct",
      "role-in-guided-surgery",
      "markers-digital-navigation",
      "navident-dynamic-navigation",
      "common-errors",
      "guarantee-accuracy",
      "best-practices",
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
      "Radiographic Markers for Guided Implant Surgery | Marks Biotech";

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
              Radiographic Markers for Guided Implant Surgery
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Guided Implant Surgery</span> •{" "}
              <span>CBCT Digital Planning</span>
            </div>
            <h1 itemProp="headline">
              Radiographic Markers for Guided Implant Surgery
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              How radiopaque markers interact with CBCT datasets and digital
              planning to help relate intended prosthetics to patient anatomy.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Computer Guided Surgery</span>
              <span className="photo-meta-dot">•</span>
              <span>Prosthetically Driven Planning</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-5.webp"
              alt="Radiographic Markers for Guided Implant Surgery"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-crosshairs"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Radiographic Markers &amp; Digital Guided Implant Surgery
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
              Quick Answer &amp; Overview
            </a>
            <a
              href="#why-planning-starts-before-cbct"
              className={
                activeSection === "why-planning-starts-before-cbct"
                  ? "active"
                  : ""
              }
              onClick={(e) =>
                scrollToSection(e, "why-planning-starts-before-cbct")
              }
            >
              Planning Before CBCT
            </a>
            <a
              href="#what-are-radiopaque-markers"
              className={
                activeSection === "what-are-radiopaque-markers" ? "active" : ""
              }
              onClick={(e) =>
                scrollToSection(e, "what-are-radiopaque-markers")
              }
            >
              What Are Radiopaque Markers?
            </a>
            <a
              href="#why-markers-are-used"
              className={
                activeSection === "why-markers-are-used" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "why-markers-are-used")}
            >
              Why Markers Are Used
            </a>
            <a
              href="#radiographic-template"
              className={
                activeSection === "radiographic-template" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "radiographic-template")}
            >
              Radiographic Template
            </a>
            <a
              href="#how-markers-work-cbct"
              className={
                activeSection === "how-markers-work-cbct" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "how-markers-work-cbct")}
            >
              How Markers Work with CBCT
            </a>
            <a
              href="#role-in-guided-surgery"
              className={
                activeSection === "role-in-guided-surgery" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "role-in-guided-surgery")}
            >
              Role in Guided Surgery
            </a>
            <a
              href="#markers-digital-navigation"
              className={
                activeSection === "markers-digital-navigation" ? "active" : ""
              }
              onClick={(e) =>
                scrollToSection(e, "markers-digital-navigation")
              }
            >
              Digital Navigation Workflow
            </a>
            <a
              href="#navident-dynamic-navigation"
              className={
                activeSection === "navident-dynamic-navigation" ? "active" : ""
              }
              onClick={(e) =>
                scrollToSection(e, "navident-dynamic-navigation")
              }
            >
              Navident Navigation
            </a>
            <a
              href="#common-errors"
              className={activeSection === "common-errors" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "common-errors")}
            >
              Common Errors
            </a>
            <a
              href="#guarantee-accuracy"
              className={
                activeSection === "guarantee-accuracy" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "guarantee-accuracy")}
            >
              Do Markers Guarantee Accuracy?
            </a>
            <a
              href="#best-practices"
              className={activeSection === "best-practices" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "best-practices")}
            >
              Best Practices
            </a>
            <a
              href="#faq"
              className={activeSection === "faq" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQs
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
                <strong>Quick answer:</strong> Radiopaque markers for dental
                implants are small, X-ray-visible reference points incorporated
                into a radiographic template. They appear on CBCT images
                alongside the patient&apos;s anatomy and can help establish the
                relationship between the intended prosthetic position and the
                underlying anatomy during digital implant planning.
              </div>
              <p>
                If you&apos;ve ever planned an implant case and found that the
                final clinical position did not correspond exactly to the
                digital plan, the marker and template workflow is one of several
                stages worth reviewing. Understanding how radiographic markers
                work, how they interact with CBCT and digital planning, and
                where errors can occur can help clinicians build a more reliable
                guided implant workflow.
              </p>
            </section>

            {/* Why Accurate Planning Starts Before the CBCT Scan */}
            <section id="why-planning-starts-before-cbct">
              <h2>Why Accurate Planning Starts Before the CBCT Scan</h2>
              <p>
                Implant planning has one important objective: place the implant
                where the future restoration requires it while respecting the
                available anatomy.
              </p>
              <p>
                Bone-driven placement without adequate prosthetic reference can
                make the restorative phase more challenging. Prosthetically
                driven implant planning therefore considers the intended tooth
                position together with factors such as available bone, implant
                angulation, depth, and surrounding anatomical structures.
              </p>
              <p>
                CBCT provides three-dimensional information about the
                patient&apos;s anatomy. However, the scan does not necessarily
                show the intended prosthetic position. Depending on the clinical
                workflow, radiopaque markers and other digital reference methods
                can help establish the relationship between the planned
                restoration and the patient&apos;s anatomy.
              </p>
            </section>

            {/* What Are Radiopaque Markers in Dental Implant Planning? */}
            <section id="what-are-radiopaque-markers">
              <h2>What Are Radiopaque Markers in Dental Implant Planning?</h2>
              <p>
                A radiopaque marker is a small structure — often gutta-percha,
                barium sulfate–impregnated resin, or a metal sphere —
                incorporated into a radiographic template.
              </p>
              <p>
                Because these materials appear distinctly on radiographic and
                CBCT images, they can provide identifiable reference points
                during digital planning.
              </p>
              <p>
                Planning software can use these reference points, together with
                other datasets, to help relate the prosthetic setup — such as a
                scanned denture, wax-up, or digital scan — to the patient&apos;s
                three-dimensional anatomy.
              </p>
              <p>
                This registration can bring anatomical and prosthetic
                information together within the digital implant-planning
                workflow.
              </p>
            </section>

            {/* Why Are Radiographic Markers Used in Implant Surgery? */}
            <section id="why-markers-are-used">
              <h2>Why Are Radiographic Markers Used in Implant Surgery?</h2>
              <p>
                The short version: they can help keep implant planning
                prosthetically driven rather than purely anatomy-driven.
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Implant positioning</h3>
                  <p>
                    The planned implant can be evaluated against the intended
                    tooth position rather than only the available bone.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Prosthetically driven planning</h3>
                  <p>
                    The desired crown position can be considered when
                    determining implant angulation, depth, and position.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Relating restoration to anatomy</h3>
                  <p>
                    The clinician can evaluate the planned implant relative to
                    the future restoration and important anatomical structures.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>Reference points during digital planning</h3>
                  <p>
                    Markers can provide identifiable reference points when
                    different datasets are being aligned within the planning
                    workflow.
                  </p>
                </article>
              </div>
            </section>

            {/* What Is a Radiographic Template for Dental Implants? */}
            <section id="radiographic-template">
              <h2>What Is a Radiographic Template for Dental Implants?</h2>
              <p>
                A radiographic template — sometimes called a radiographic guide
                or scan appliance — is a removable device, typically resembling
                a denture or splint, that the patient wears during the CBCT
                scan.
              </p>
              <p>
                It can carry radiopaque markers at fixed positions and may
                reproduce the planned tooth positions.
              </p>
              <p>Two factors are particularly important:</p>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Factor 1</span>
                  <h3>Template stability</h3>
                  <p>
                    If the template rocks, tips, or seats differently during the
                    workflow, the marker positions may no longer represent the
                    intended reference accurately.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Factor 2</span>
                  <h3>Relationship to the surgical guide</h3>
                  <p>
                    In workflows using radiographic templates, the information
                    captured during imaging can contribute to the design of the
                    subsequent surgical guide and the transfer of the planned
                    geometry into surgery.
                  </p>
                </div>
              </div>

              <p style={{ marginTop: "18px" }}>
                For clinicians exploring digitally planned guided surgery,{" "}
                <a
                  href="https://bnbimplant.in/digitalsurgicalguide"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--b3-red)",
                    fontWeight: "700",
                    textDecoration: "underline",
                  }}
                >
                  B&amp;B Digital Surgical Guide
                </a>{" "}
                is a related solution within the digital implant workflow.
              </p>

              {/* Figure: B&B Digital Surgical Guide */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/digital-surgical-guide-hero.png"
                    alt="B&B Digital Surgical Guide and Radiographic Template Alignment"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Radiographic Template Integration &amp; Digital
                  Surgical Guide Design
                </figcaption>
              </figure>
            </section>

            {/* How Do Radiographic Markers Work With CBCT? */}
            <section id="how-markers-work-cbct">
              <h2>How Do Radiographic Markers Work With CBCT?</h2>
              <p>The workflow can generally be understood in five stages:</p>

              <div className="photo-workflow-strip">
                <div className="photo-workflow-item">CBCT Acquisition</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Marker Identification</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Image Registration</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">
                  Virtual Implant Planning
                </div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Transfer to Surgery</div>
              </div>

              <div className="photo-step-grid" style={{ marginTop: "24px" }}>
                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 1</span>
                  <h3>CBCT acquisition</h3>
                  <p>
                    The patient is scanned with the radiographic template and
                    markers positioned according to the planned workflow.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 2</span>
                  <h3>Marker identification</h3>
                  <p>
                    Planning software identifies the radiopaque reference points
                    in the DICOM dataset.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 3</span>
                  <h3>Image registration</h3>
                  <p>
                    The marker information can help align the CBCT dataset with
                    another source of prosthetic information, such as an
                    intraoral or model scan, depending on the workflow.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 4</span>
                  <h3>Virtual implant planning</h3>
                  <p>
                    Once the relevant datasets are aligned, the clinician can
                    plan implant position, angulation, and depth in relation to
                    the intended restoration and anatomy.
                  </p>
                </div>

                <div
                  className="photo-step-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <span className="photo-step-badge">Stage 5</span>
                  <h3>Transfer to guided surgery</h3>
                  <p>
                    The completed plan can be used to design a static surgical
                    guide or transferred into a dynamic navigation workflow.
                  </p>
                </div>
              </div>

              {/* Figure: CBCT Multi-Dataset Registration */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/di-1.webp"
                    alt="CBCT Multi-Dataset Registration with Markers"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • CBCT Imaging Dataset Alignment &amp; Virtual
                  Prosthetic Trajectory Registration
                </figcaption>
              </figure>

              <div className="photo-callout">
                Each stage depends on the quality of the preceding steps. An
                incorrectly identified marker, unstable template, or inaccurate
                registration can introduce discrepancies that carry into
                subsequent planning and surgery.
              </div>
            </section>

            {/* Role of Radiographic Markers in Guided Implant Surgery */}
            <section id="role-in-guided-surgery">
              <h2>Role of Radiographic Markers in Guided Implant Surgery</h2>
              <p>
                Once the digital plan is complete, it can be transferred to
                surgery through different approaches.
              </p>
              <p>
                A static surgical guide is a physical guide designed from the
                digital plan. It can use sleeves or other guiding features to
                help control the planned drilling or implant trajectory.
              </p>
              <p>
                Dynamic navigation uses tracking technology to provide real-time
                guidance during surgery. Instead of relying on a physical
                drill-guiding sleeve, the clinician views the tracked instrument
                relative to the planned implant position.
              </p>
              <p>
                Radiographic markers can contribute to the imaging and
                registration workflow, but they do not determine the accuracy of
                the entire surgical procedure.
              </p>
              <p>
                For static guided surgery, guide design, manufacturing accuracy,
                and guide seating are important. For dynamic navigation,
                patient-to-image registration, tracking, calibration, and
                surgical execution also influence the transfer of the digital
                plan.
              </p>
            </section>

            {/* Radiographic Markers and Digital Navigation */}
            <section id="markers-digital-navigation">
              <h2>Radiographic Markers and Digital Navigation</h2>
              <p>The broader digital workflow can be represented as:</p>

              <div className="photo-workflow-strip">
                <div className="photo-workflow-item">CBCT</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Digital Planning</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Registration</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Navigation/Guidance</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Implant Placement</div>
              </div>

              <p style={{ marginTop: "20px" }}>
                Dynamic navigation introduces an additional registration step
                that connects the preoperative digital plan to the patient&apos;s
                actual position during surgery.
              </p>
              <p>
                This means the accuracy of dynamic navigation depends on more
                than the radiographic marker or preoperative dataset. Published
                systematic reviews have found measurable deviations in dynamic
                navigation and have emphasized the influence of the overall
                workflow, including registration and technical factors.
              </p>
            </section>

            {/* Navident and Dynamic Navigation */}
            <section id="navident-dynamic-navigation">
              <h2>Navident and Dynamic Navigation</h2>
              <p>
                <a
                  href="https://navident.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--b3-red)",
                    fontWeight: "700",
                    textDecoration: "underline",
                  }}
                >
                  Navident System
                </a>{" "}
                is an example of a dynamic navigation technology used for
                real-time guidance during implant surgery.
              </p>
              <p>
                Within a dynamic navigation workflow, the clinician works from a
                preoperative digital plan while tracking the surgical
                instruments and patient position during the procedure.
              </p>
              <p>The important point is that navigation is part of a larger digital workflow:</p>

              <div className="photo-workflow-strip">
                <div className="photo-workflow-item">Imaging</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Planning</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Registration</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Tracking</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Surgical Execution</div>
              </div>

              <p style={{ marginTop: "20px" }}>
                Radiographic markers may contribute to the reference and
                planning stage, but the final clinical accuracy depends on the
                complete workflow.
              </p>

              {/* Figure: Navident Dynamic Navigation */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/navident-1.webp"
                    alt="Navident Dynamic Navigation System Real-Time Tracking"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 3 • Navident Optical Real-Time Dynamic Guidance &amp;
                  Surgical Tracking
                </figcaption>
              </figure>
            </section>

            {/* Common Errors With Radiographic Markers */}
            <section id="common-errors">
              <h2>Common Errors With Radiographic Markers</h2>
              <p>
                Potential sources of error can occur at several stages of the
                guided-surgery workflow:
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Marker displacement</h3>
                  <p>
                    A marker that shifts from its intended position can affect
                    the reliability of the reference information.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Poor template seating</h3>
                  <p>
                    A template that does not seat consistently can introduce
                    positional discrepancies.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>CBCT artifacts</h3>
                  <p>
                    Metal restorations, scatter, or patient movement can affect
                    image quality and marker visibility.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>Incorrect registration</h3>
                  <p>
                    Incorrect matching between datasets can transfer an
                    inaccurate relationship into the treatment plan.
                  </p>
                </article>
              </div>

              <div className="photo-feature-grid" style={{ marginTop: "18px" }}>
                <article className="photo-feature">
                  <span className="photo-feature-num">05</span>
                  <h3>Patient movement</h3>
                  <p>
                    Movement during CBCT acquisition can affect the quality of
                    the resulting dataset.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">06</span>
                  <h3>Planning or positioning errors</h3>
                  <p>
                    Errors can also occur during digital planning or clinical
                    execution independently of the marker itself.
                  </p>
                </article>
              </div>
            </section>

            {/* Do Radiographic Markers Guarantee Accurate Implant Placement? */}
            <section id="guarantee-accuracy">
              <h2>
                Do Radiographic Markers Guarantee Accurate Implant Placement?
              </h2>
              <p>No.</p>
              <p>
                Radiographic markers are reference points within the workflow.
                They do not guarantee the accuracy of the final implant
                position.
              </p>
              <p>
                Clinical studies and systematic reviews show that
                computer-assisted implant surgery can achieve relatively small
                deviations from the planned implant position, but measurable
                differences can still occur. Reported accuracy varies according
                to the guidance method, imaging protocol, registration, guide
                stability, clinical situation, operator technique, and
                measurement method.
              </p>
              <p>The complete workflow can be viewed as:</p>

              <div className="photo-workflow-strip">
                <div className="photo-workflow-item">Imaging</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Planning</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Registration</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Guide/Navigation</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Surgical Execution</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Verification</div>
              </div>

              <p style={{ marginTop: "20px" }}>
                A well-positioned marker on an unstable template can still
                produce an unreliable reference. Similarly, an accurately
                registered plan can still be affected by guide movement,
                tracking errors, or clinical execution.
              </p>
              <p>
                The marker is therefore one component of the workflow rather
                than a guarantee of the final outcome.
              </p>
            </section>

            {/* Best Practices for Using Radiographic Markers */}
            <section id="best-practices">
              <h2>Best Practices for Using Radiographic Markers</h2>

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
                  Use a stable radiographic template with a well-fitting and
                  verifiable seat.
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
                  Position markers clearly and consider potential sources of
                  imaging artifacts.
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
                  Check CBCT quality before proceeding with digital planning.
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
                  Verify registration rather than assuming an automatic dataset
                  match is correct.
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
                  Use prosthetically driven planning so that the intended
                  restoration remains central to implant positioning.
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
                  Verify the final surgical workflow, whether using a static
                  guide or dynamic navigation.
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>FAQ</h2>
              <div className="photo-faq-wrap">
                <div className="photo-faq-item">
                  <details open>
                    <summary>
                      What material are radiopaque markers usually made from?
                    </summary>
                    <p>
                      Common materials include gutta-percha, barium
                      sulfate–impregnated resin, and small metal markers. The
                      material is selected according to the imaging and template
                      requirements of the workflow.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is a radiographic template the same as a surgical guide?
                    </summary>
                    <p>
                      No.
                      <br />
                      A radiographic template is primarily used during imaging
                      to carry markers and/or represent the intended prosthetic
                      position.
                      <br />
                      A surgical guide is used during the surgical procedure to
                      help transfer the planned implant position.
                      <br />
                      They are related components, but they serve different
                      purposes.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Do radiopaque markers work with dynamic navigation systems
                      like Navident?
                    </summary>
                    <p>
                      Radiopaque markers can contribute to the preoperative
                      imaging and planning workflow. Dynamic navigation then uses
                      its own patient-to-image registration and tracking
                      process to connect the digital plan with the patient&apos;s
                      actual position during surgery.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      What is an important source of error with radiographic
                      markers?
                    </summary>
                    <p>
                      Template instability is an important and potentially
                      preventable source of positional error. If the template
                      does not seat consistently or moves during the workflow,
                      the reference position represented by the markers can be
                      affected.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      How accurate is guided implant surgery overall?
                    </summary>
                    <p>
                      Guided implant surgery can improve the transfer of a
                      digital plan to implant placement, but it does not
                      eliminate deviation.
                      <br />
                      Systematic reviews have reported measurable deviations for
                      both static and dynamic computer-assisted implant surgery,
                      with results varying according to the technique, clinical
                      situation, and measurement method.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Radiopaque markers are a small physical component with an
                important role in certain digital implant-planning workflows.
                They can help provide identifiable reference points when
                connecting prosthetic information with the patient&apos;s
                anatomical data during CBCT-based planning.
              </p>
              <p>
                From there, the workflow continues through registration, digital
                planning, surgical-guide or navigation design, surgical
                execution, and verification.
              </p>
              <p>
                The reliability of the final result depends on the complete
                workflow rather than any single component.
              </p>
              <p>
                When the template is stable, markers are clearly identified,
                registration is verified, and the surgical workflow is carefully
                executed, radiographic markers can provide a useful reference
                within digitally planned guided implant surgery.
              </p>
              <p>
                For dental professionals looking to integrate digital planning,
                navigation, photogrammetry, and implant solutions into their
                workflows, explore the technologies available through Marks
                Biotech.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • GUIDED SURGERY &amp; NAVIGATION
                  </div>
                  <h2>Digital Guidance Solutions</h2>
                  <p>
                    Explore digitally planned surgical solutions including the{" "}
                    <a
                      href="https://bnbimplant.in/digitalsurgicalguide"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#ffffff",
                        fontWeight: "700",
                        textDecoration: "underline",
                      }}
                    >
                      B&amp;B Digital Surgical Guide
                    </a>{" "}
                    and real-time surgical navigation with the{" "}
                    <a
                      href="https://navident.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#ffffff",
                        fontWeight: "700",
                        textDecoration: "underline",
                      }}
                    >
                      Navident System
                    </a>
                    .
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      marginTop: "16px",
                    }}
                  >
                    <a
                      className="photo-btn light"
                      href="https://bnbimplant.in/digitalsurgicalguide"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      B&amp;B Surgical Guide{" "}
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <a
                      className="photo-btn light"
                      href="https://navident.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Navident Navigation{" "}
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>CBCT</span>
                  <small>
                    GUIDED
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
