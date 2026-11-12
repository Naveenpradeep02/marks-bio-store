import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogThree({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Photogrammetry in Full-Arch Dental Implants for Passivity | Marks Biotech";

    // Track active section for Table of Contents
    const sectionIds = [
      "intro",
      "passivity",
      "what-is",
      "supports",
      "comparison",
      "research",
      "workflow",
      "cadcam",
      "verification",
      "micronmapper",
      "limits",
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
      "Photogrammetry in Full-Arch Dental Implants for Passivity | Marks Biotech";

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
              Photogrammetry in Full-Arch Dental Implants for Passivity
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Digital Dentistry</span> • <span>Photogrammetry</span>
            </div>
            <h1 itemProp="headline">
              Photogrammetry in Full-Arch Dental Implants for Passivity
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              How accurate implant-position capture fits into a controlled
              digital workflow for full-arch implant-supported prostheses.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Dental Technology Insight</span>
              <span className="photo-meta-dot">•</span>
              <span>Full-Arch Implant Workflow</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* 3D Visual Implant Scan Simulation */}
          <div className="photo-visual" aria-hidden="true">
            <div className="photo-visual-gridlines"></div>
            <i className="photo-scanpoint p1"></i>
            <i className="photo-scanpoint p2"></i>
            <i className="photo-scanpoint p3"></i>
            <i className="photo-scanpoint p4"></i>
            <div className="photo-visual-label">
              <span className="photo-visual-live-dot"></span>
              3D IMPLANT POSITION CAPTURE
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
              href="#passivity"
              className={activeSection === "passivity" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "passivity")}
            >
              Why Passivity Matters
            </a>
            <a
              href="#what-is"
              className={activeSection === "what-is" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "what-is")}
            >
              What Is Photogrammetry?
            </a>
            <a
              href="#supports"
              className={activeSection === "supports" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "supports")}
            >
              How It Supports Fit
            </a>
            <a
              href="#comparison"
              className={activeSection === "comparison" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "comparison")}
            >
              Photogrammetry vs IOS
            </a>
            <a
              href="#research"
              className={activeSection === "research" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "research")}
            >
              Research
            </a>
            <a
              href="#workflow"
              className={activeSection === "workflow" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "workflow")}
            >
              Workflow
            </a>
            <a
              href="#cadcam"
              className={activeSection === "cadcam" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "cadcam")}
            >
              CAD/CAM Fit
            </a>
            <a
              href="#verification"
              className={activeSection === "verification" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "verification")}
            >
              Fit Verification
            </a>
            <a
              href="#micronmapper"
              className={activeSection === "micronmapper" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "micronmapper")}
            >
              MicronMapper
            </a>
            <a
              href="#limits"
              className={activeSection === "limits" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "limits")}
            >
              Limitations
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

          {/* Article Editorial Sections */}
          <div className="photo-article-body">
            {/* Intro Section */}
            <section id="intro">
              <div className="photo-callout">
                <strong>Key principle:</strong> Photogrammetry is a precision step
                for recording implant positions. It can support a more controlled
                prosthetic workflow, but it does not by itself guarantee passive fit.
              </div>
              <p>
                Achieving a passive fit is one of the fundamental objectives when
                fabricating a full-arch implant-supported prosthesis. When multiple
                implants are connected by a rigid framework, even small
                discrepancies in recorded implant positions can influence how
                accurately the prosthesis fits the implants.
              </p>
              <p>
                <strong>Photogrammetry in full-arch dental implants</strong> offers a
                digital approach specifically focused on capturing the
                three-dimensional spatial relationship between multiple implants.
                The result is highly accurate implant-position data that can be
                incorporated into a CAD/CAM workflow for full-arch prosthetic
                fabrication.
              </p>
            </section>

            {/* Why Passivity Matters */}
            <section id="passivity">
              <h2>Why Passivity Matters in Full-Arch Dental Implants</h2>
              <p>
                A full-arch implant restoration connects multiple implants through a
                single prosthetic framework. Unlike an individual implant crown,
                where a small discrepancy may have less obvious consequences, a
                rigid full-arch framework has considerably less tolerance for
                cumulative positional discrepancies.
              </p>
              <p>
                If the implant positions recorded digitally do not accurately
                represent their actual clinical positions, that discrepancy can be
                transferred into the CAD design and subsequently into the
                manufactured framework. The result may be a framework that does not
                seat accurately or requires adjustment during try-in.
              </p>
              <p>
                An inaccurate or non-passive framework can introduce unwanted
                stresses at the implant–prosthesis interface and may contribute to
                mechanical complications. This is why passive fit remains an
                important consideration in full-arch implant rehabilitation.
              </p>
              <p>
                The goal, therefore, is not simply to obtain a digital impression.
                It is to create a reliable digital representation of the implant
                positions that can be carried accurately through the prosthetic
                workflow.
              </p>
            </section>

            {/* What Is Photogrammetry? */}
            <section id="what-is">
              <h2>What Is Photogrammetry in Dental Implants?</h2>
              <p>
                Photogrammetry is an optical measurement technique used to
                determine the three-dimensional position of objects from captured
                images.
              </p>
              <p>
                In implant dentistry, specially designed scan bodies or coded
                markers are connected to the implants. A photogrammetry system
                captures these markers and calculates their spatial relationship,
                allowing the implant positions and angulations to be digitally
                recorded.
              </p>
              <p>
                This is particularly relevant to full-arch implant cases because
                the primary objective is to accurately establish the relationship
                between multiple implants.
              </p>
              <p>
                A system such as{" "}
                <a
                  href="https://micronmapper.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--b3-red)",
                    fontWeight: "700",
                    textDecoration: "underline",
                  }}
                >
                  MicronMapper
                </a>{" "}
                is specifically designed around this implant-position capture
                workflow. The manufacturer describes MicronMapper as a
                photogrammetry solution for implant dentistry that captures the 3D
                positions of multiple implants in a short acquisition time and
                integrates with digital workflows.
              </p>
            </section>

            {/* How Photogrammetry Supports Fit */}
            <section id="supports">
              <h2>How Photogrammetry Supports Passive Fit</h2>
              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Accurate Implant-Position Capture</h3>
                  <p>
                    Passive fit begins with an accurate record of where the
                    implants actually are. Photogrammetry focuses specifically on
                    capturing implant-level spatial information.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Maintaining Implant-to-Implant Relationships</h3>
                  <p>
                    In a full-arch restoration, the relationship between implants
                    matters as much as the position of each individual implant.
                    Photogrammetry is designed to capture these spatial
                    relationships directly.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Supporting CAD/CAM Framework Design</h3>
                  <p>
                    Implant coordinates provide the foundation for positioning
                    implant interfaces within the CAD/CAM framework, while
                    additional scans can provide soft tissue, teeth, emergence
                    profiles and occlusion.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>Supporting a Controlled Prosthetic Workflow</h3>
                  <p>
                    The objective is to carry accurate information from the
                    patient's mouth into the laboratory and ultimately into the
                    manufactured prosthesis.
                  </p>
                </article>
              </div>

              <div className="photo-workflow-strip">
                <div className="photo-workflow-item">Implant Position</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Digital Capture</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">CAD Design</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Manufacturing</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Verification</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Definitive Prosthesis</div>
              </div>
            </section>

            {/* Photogrammetry vs IOS */}
            <section id="comparison">
              <h2>Photogrammetry vs Intraoral Scanning for Full-Arch Implants</h2>
              <p>
                Photogrammetry and intraoral scanning are not necessarily
                competing technologies. They can perform different functions within
                the same digital implant workflow.
              </p>

              <div className="photo-table-wrap">
                <table className="photo-table">
                  <thead>
                    <tr>
                      <th>Clinical Requirement</th>
                      <th>Photogrammetry</th>
                      <th>Intraoral Scanning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Implant-position capture</td>
                      <td>
                        Specifically designed for implant spatial-position recording
                      </td>
                      <td>Captures implant positions as part of a broader scan</td>
                    </tr>
                    <tr>
                      <td>Full-arch implant accuracy</td>
                      <td>
                        Strong accuracy reported in recent comparative studies
                      </td>
                      <td>
                        Accuracy can be influenced by scan path and stitching over
                        long spans
                      </td>
                    </tr>
                    <tr>
                      <td>Soft tissue</td>
                      <td>Requires a separate scan</td>
                      <td>Captured directly</td>
                    </tr>
                    <tr>
                      <td>Teeth and emergence profile</td>
                      <td>Requires a separate scan</td>
                      <td>Captured directly</td>
                    </tr>
                    <tr>
                      <td>Implant coordinates</td>
                      <td>Primary function</td>
                      <td>One component of the digital impression</td>
                    </tr>
                    <tr>
                      <td>Full digital workflow</td>
                      <td>Combined with IOS/CAD-CAM where required</td>
                      <td>Can provide broader digital impression data</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="photo-callout">
                <strong>Practical takeaway:</strong> Photogrammetry can capture
                implant coordinates, while intraoral scanning can capture the
                surrounding oral anatomy. Combining the two can create a
                comprehensive digital record for full-arch prosthetic workflows.
              </div>
            </section>

            {/* What Does Research Say */}
            <section id="research">
              <h2>What Does the Research Say About Photogrammetry and Passivity?</h2>
              <p>
                The evidence supporting photogrammetry for complete-arch
                implant-position recording has grown significantly.
              </p>

              <div className="photo-evidence-grid">
                <article className="photo-evidence-card">
                  <div className="photo-evidence-eyebrow">
                    2025 SYSTEMATIC REVIEW &amp; META-ANALYSIS
                  </div>
                  <h3>Pozzi et al.</h3>
                  <p>
                    Compared stereophotogrammetry with intraoral scanning for
                    complete-arch digital implant impressions. The authors
                    reported significantly greater trueness and precision for
                    stereophotogrammetry within the limitations of the available
                    evidence, while emphasizing the need for further clinical trials
                    and rigid prototype try-in before final delivery.
                  </p>
                </article>

                <article className="photo-evidence-card">
                  <div className="photo-evidence-eyebrow">
                    JOURNAL OF PROSTHETIC DENTISTRY
                  </div>
                  <h3>Altalla et al.</h3>
                  <p>
                    A systematic review and meta-analysis including 14 studies
                    reported significantly better trueness for photogrammetry for
                    distance and angular deviation, with precision also favouring
                    photogrammetry.
                  </p>
                </article>

                <article className="photo-evidence-card">
                  <div className="photo-evidence-eyebrow">2026 IN-VITRO STUDY</div>
                  <h3>Borella et al.</h3>
                  <p>
                    The study investigated full-arch restorations fabricated from
                    different materials using photogrammetry-based capture.
                    Manufacturing material influenced the accuracy and fit of the
                    resulting restorations.
                  </p>
                </article>
              </div>

              <div className="photo-callout warning">
                <strong>Important clinical principle:</strong> Photogrammetry can
                improve the accuracy of one critical stage of the workflow, but
                passive fit remains a multi-stage process.
              </div>
            </section>

            {/* The Full-Arch Dental Implant Workflow */}
            <section id="workflow">
              <h2>The Full-Arch Dental Implant Workflow With Photogrammetry</h2>
              <div className="photo-steps-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">01</span>
                  <h3>Implant Placement &amp; Integration</h3>
                  <p>
                    Implants are placed according to the planned surgical and
                    prosthetic protocol.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">02</span>
                  <h3>Scan Body Placement</h3>
                  <p>
                    Appropriate scan bodies are connected to the implants and
                    correctly seated.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">03</span>
                  <h3>Photogrammetry Capture</h3>
                  <p>
                    The photogrammetry system records the spatial positions of the
                    implants.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">04</span>
                  <h3>Intraoral Scanning</h3>
                  <p>
                    A separate intraoral scan may capture soft tissue, adjacent
                    teeth, emergence profiles and occlusal information.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">05</span>
                  <h3>Digital Data Integration</h3>
                  <p>
                    Implant-position data and broader intraoral or laboratory
                    scans are combined.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">06</span>
                  <h3>CAD/CAM Framework Design</h3>
                  <p>
                    The laboratory designs the full-arch framework using recorded
                    implant positions and prosthetic parameters.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">07</span>
                  <h3>Manufacturing</h3>
                  <p>
                    The framework is milled, printed or otherwise manufactured
                    according to the selected material and protocol.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">08</span>
                  <h3>Verification</h3>
                  <p>
                    Before definitive delivery, the framework or prototype is
                    clinically evaluated to confirm fit.
                  </p>
                </div>
              </div>

              <div className="photo-callout">
                <strong>Verification remains essential.</strong> Digital accuracy
                reduces the risk of positional errors, but clinical verification
                remains essential.
              </div>
            </section>

            {/* CAD/CAM & Passive Fit */}
            <section id="cadcam">
              <h2>Photogrammetry, CAD/CAM and Passive-Fit Prostheses</h2>
              <p>
                The value of photogrammetry becomes clearer when it is considered as
                part of the complete CAD/CAM full-arch implant workflow.
              </p>

              <div className="photo-capture-flow">
                <span>Capture</span>
                <span>&rarr;</span>
                <span>Merge</span>
                <span>&rarr;</span>
                <span>Design</span>
                <span>&rarr;</span>
                <span>Manufacture</span>
                <span>&rarr;</span>
                <span>Verify</span>
              </div>

              <p>
                The quality of the final prosthesis depends on each stage. An
                accurate implant-position record can support accurate CAD
                positioning. Accurate CAD design can support precise
                manufacturing. Precise manufacturing can contribute to better
                framework fit. But errors can still be introduced at any stage.
              </p>
              <p>
                For this reason, photogrammetry should not be marketed as a
                replacement for clinical judgment or verification. Instead, it
                provides a more controlled method of obtaining one of the most
                important datasets in a full-arch implant restoration: the
                three-dimensional implant positions.
              </p>
            </section>

            {/* Verification */}
            <section id="verification">
              <h2>The Role of Fit Verification</h2>
              <p>
                A major advantage of a mature digital workflow is the ability to
                incorporate verification rather than assuming that digital accuracy
                automatically equals clinical fit.
              </p>
              <p>
                MicronMapper's product workflow includes an optional Fit Checker
                approach using dedicated scan bodies to assess the prosthesis
                digitally before delivery. The manufacturer's information describes
                this as a method for checking prosthetic passivity at the
                laboratory stage.
              </p>
              <p>
                This type of verification can add another level of quality control
                to the workflow. However, laboratory verification does not
                eliminate the need for appropriate clinical evaluation.
              </p>
            </section>

            {/* Product CTA - MicronMapper */}
            <section id="micronmapper" className="photo-product-cta">
              <div>
                <div className="photo-eyebrow">MARKS BIOTECH • PHOTOGRAMMETRY</div>
                <h2>Where MicronMapper Fits Into the Digital Workflow</h2>
                <p>
                  MicronMapper is designed around photogrammetric implant-position
                  capture for implant dentistry. The system is engineered for
                  full-arch applications and digital implant workflows, including
                  Fit Check and coded scan-body options.
                </p>
                <p>
                  The larger opportunity is a more controlled pathway from
                  implant placement to implant-position capture, digital design,
                  CAD/CAM manufacturing, verification and prosthetic delivery.
                </p>
                <a
                  className="photo-btn light"
                  href="https://micronmapper.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore MicronMapper <i className="fa-solid fa-arrow-up-right-from-square"></i>
                </a>
              </div>

              <div className="photo-orb">
                <span>3D</span>
                <small>
                  IMPLANT
                  <br />
                  POSITION
                </small>
              </div>
            </section>

            {/* Limits */}
            <section id="limits">
              <h2>The Honest Limits of Photogrammetry</h2>
              <p>
                Photogrammetry is not a shortcut around fundamental prosthodontic
                principles.
              </p>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <span className="cross">&#10005;</span> Correct an incorrectly
                  positioned implant
                </div>
                <div className="photo-limits-item">
                  <span className="cross">&#10005;</span> Compensate for an
                  improperly seated scan body
                </div>
                <div className="photo-limits-item">
                  <span className="cross">&#10005;</span> Fix an inaccurate CAD
                  design
                </div>
                <div className="photo-limits-item">
                  <span className="cross">&#10005;</span> Correct manufacturing
                  inaccuracies
                </div>
                <div className="photo-limits-item">
                  <span className="cross">&#10005;</span> Eliminate the influence
                  of restorative material
                </div>
                <div className="photo-limits-item">
                  <span className="cross">&#10005;</span> Replace clinical
                  verification
                </div>
                <div className="photo-limits-item" style={{ gridColumn: "1 / -1" }}>
                  <span className="cross">&#10005;</span> Guarantee passive fit in
                  every case
                </div>
              </div>

              <p>
                Instead, photogrammetry should be understood as a{" "}
                <strong>precision technology for implant-position capture</strong>.
                Its role is to provide accurate information to the next stage of
                the workflow.
              </p>
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <h2>Frequently Asked Questions</h2>
              <div className="photo-faq-wrap">
                <div className="photo-faq-item">
                  <details open>
                    <summary>
                      What is photogrammetry in full-arch dental implants?
                    </summary>
                    <p>
                      Photogrammetry is an optical technique used to capture the
                      three-dimensional spatial positions and relationships of
                      multiple dental implants. It is particularly useful in
                      full-arch implant workflows where accurate implant-position
                      recording is critical to prosthetic fabrication.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Why is passive fit important in full-arch implant prostheses?
                    </summary>
                    <p>
                      A full-arch framework connects multiple implants through a
                      rigid prosthesis. Accurate implant-position recording helps
                      the laboratory design a framework that corresponds closely
                      to the clinical implant positions. Passive fit is
                      influenced by implant position, digital capture, CAD design,
                      manufacturing and clinical verification.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>Does photogrammetry guarantee passive fit?</summary>
                    <p>
                      No. Photogrammetry can improve the accuracy of
                      implant-position capture, but it does not guarantee the
                      final passive fit of a prosthesis. Framework design,
                      manufacturing accuracy, material, components and clinical
                      verification also influence the final result.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is photogrammetry more accurate than intraoral scanning for
                      full-arch implants?
                    </summary>
                    <p>
                      Recent systematic reviews have reported significantly better
                      trueness and precision for photogrammetry when recording
                      implant positions in complete-arch and multi-implant cases.
                      However, the evidence includes many in-vitro studies, and
                      clinical results can depend on the specific system, workflow
                      and technique.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Does photogrammetry replace an intraoral scanner?
                    </summary>
                    <p>
                      Not necessarily. Photogrammetry primarily captures implant
                      positions. An intraoral scanner can capture soft tissue,
                      teeth, emergence profiles and other oral structures. The two
                      datasets can therefore complement each other in a digital
                      full-arch workflow.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      How does photogrammetry support CAD/CAM full-arch implants?
                    </summary>
                    <p>
                      Photogrammetry provides implant-position data that can be
                      incorporated into CAD software. The laboratory can then
                      design the framework around the recorded implant coordinates
                      before manufacturing.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is a verification try-in still necessary with
                      photogrammetry?
                    </summary>
                    <p>
                      Yes. Accurate digital capture does not eliminate the need
                      for appropriate clinical verification. Recent
                      systematic-review evidence continues to support rigid
                      prototype or verification try-in before definitive delivery.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Who can benefit from full-arch implant photogrammetry?
                    </summary>
                    <p>
                      Photogrammetry can be relevant to implantologists,
                      prosthodontists, periodontists, oral and maxillofacial
                      surgeons, full-arch restorative practices and dental
                      laboratories involved in multi-implant and full-arch
                      workflows.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      What factors besides photogrammetry affect passive fit?
                    </summary>
                    <p>
                      Important factors include implant position and angulation,
                      scan-body seating and accuracy, digital data alignment, CAD
                      design, framework material, manufacturing method, implant
                      components and clinical verification. Recent in-vitro
                      research also demonstrates that manufacturing material can
                      influence the accuracy and fit of full-arch restorations.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>Is MicronMapper available in India?</summary>
                    <p>
                      Yes. MicronMapper is distributed in India by Marks Biotech,
                      which provides local product support and training.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Passivity in full-arch implant prostheses depends on more than one
                technology or one stage of treatment. It begins with accurate
                implant placement and continues through implant-position recording,
                digital design, manufacturing and clinical verification.
              </p>
              <p>
                <strong>Photogrammetry in full-arch dental implants</strong> addresses
                one of the most important stages in this chain: accurately
                recording the three-dimensional relationship between multiple
                implants.
              </p>
              <p>
                Recent research indicates that photogrammetry can provide higher
                trueness and precision than intraoral scanning for complete-arch
                implant-position recording. At the same time, the evidence
                reinforces an important point: accurate digital capture is a
                foundation for predictable prosthetic workflows, not a guarantee of
                passive fit by itself.
              </p>
              <p>
                When photogrammetry is combined with intraoral scanning, CAD/CAM
                design, controlled manufacturing and appropriate verification, it
                can form an important part of a modern digital workflow for
                full-arch implant-supported restorations.
              </p>
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
                <i className="fa-brands fa-linkedin" style={{ color: "#0077b5" }}></i>
                Share on LinkedIn
              </button>
              <button
                type="button"
                className="photo-share-btn"
                onClick={() => handleShare("whatsapp")}
                aria-label="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp" style={{ color: "#25d366" }}></i>
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
