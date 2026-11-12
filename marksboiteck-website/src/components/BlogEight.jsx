import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogEight({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Guided Endodontics in Dynamic Navigation Systems | Marks Biotech";

    const sectionIds = [
      "intro",
      "calcified-canals",
      "dynamic-vs-static",
      "clinical-applications",
      "accuracy-data",
      "workflow",
      "limitations",
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
      "Guided Endodontics in Dynamic Navigation Systems | Marks Biotech";

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
              Guided Endodontics in Dynamic Navigation Systems
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Surgical Navigation</span> •{" "}
              <span>Guided Endodontics</span>
            </div>
            <h1 itemProp="headline">
              Guided Endodontics in Dynamic Navigation Systems
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              How real-time optical tracking from dynamic navigation guides
              calcified canal location, minimally invasive access cavities, and
              endodontic microsurgery.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Dynamic Navigation</span>
              <span className="photo-meta-dot">•</span>
              <span>Minimally Invasive Endodontics</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-8.webp"
              alt="Guided Endodontics in Dynamic Navigation Systems"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-crosshairs"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Dynamic Navigation • Real-Time Guided Endodontics &amp; Microsurgery
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
              Overview &amp; Rationale
            </a>
            <a
              href="#calcified-canals"
              className={activeSection === "calcified-canals" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "calcified-canals")}
            >
              Why Calcified Canals Are Hard
            </a>
            <a
              href="#dynamic-vs-static"
              className={activeSection === "dynamic-vs-static" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "dynamic-vs-static")}
            >
              Dynamic vs Static Guided
            </a>
            <a
              href="#clinical-applications"
              className={
                activeSection === "clinical-applications" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "clinical-applications")}
            >
              Where DNS Is Actually Used
            </a>
            <a
              href="#accuracy-data"
              className={activeSection === "accuracy-data" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "accuracy-data")}
            >
              How Accurate Is It, Really?
            </a>
            <a
              href="#workflow"
              className={activeSection === "workflow" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "workflow")}
            >
              Workflow, Step by Step
            </a>
            <a
              href="#limitations"
              className={activeSection === "limitations" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "limitations")}
            >
              Where It Falls Short
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
                <strong>Core Concept:</strong> Dynamic navigation in endodontics
                uses the same real-time tracking technology developed for guided
                implant surgery to guide a bur or file along a pre-planned path on
                a CBCT-based 3D model, displayed live on-screen during treatment.
                It&apos;s primarily used for three scenarios conventional
                technique struggles with — locating calcified canals, performing
                minimally invasive access cavities, and guiding endodontic
                microsurgery — and current systematic reviews report it
                outperforms freehand technique on accuracy, tooth-structure
                preservation, and complication rate, though most of the
                supporting evidence is still case reports and in-vitro work
                rather than large clinical trials.
              </div>
              <p>
                If you&apos;ve ever spent twenty minutes freehand-hunting for a
                canal that calcified shut years ago, you already understand the
                appeal here. The question worth asking isn&apos;t whether
                navigation helps — it&apos;s where it actually earns its
                complexity, and where freehand is still perfectly fine.
              </p>
            </section>

            {/* Why Calcified Canals Are a Different Kind of Hard */}
            <section id="calcified-canals">
              <h2>Why Calcified Canals Are a Different Kind of Hard</h2>
              <p>
                Locating a canal in a tooth with normal anatomy is a skill most
                clinicians master early. Locating one in a tooth with pulp canal
                obliteration — common after trauma, deep restorations, or simply
                age — is a different problem entirely. The canal is there, but
                the visual and tactile cues that normally guide access
                preparation are gone, replaced by dentin that looks and feels the
                same whether you&apos;re on the correct path or drilling toward a
                perforation.
              </p>
              <p>
                The conventional response has been caution: remove dentin
                conservatively, check radiographs repeatedly, accept that the
                procedure will take longer and occasionally still end in
                perforation or referral. Dynamic navigation changes the sequence
                — instead of exploring and checking, the clinician plans the
                pathway on a CBCT scan beforehand and then follows that plan in
                real time, with the system continuously confirming bur position
                relative to the planned trajectory.
              </p>
            </section>

            {/* How Dynamic Navigation Differs From Static Guided Endodontics */}
            <section id="dynamic-vs-static">
              <h2>How Dynamic Navigation Differs From Static Guided Endodontics</h2>
              <p>
                Guided endodontics comes in two forms, and they solve the problem
                differently.
              </p>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Approach 1</span>
                  <h3>Static guides</h3>
                  <p>
                    Static guides are 3D-printed templates, fabricated in
                    advance from a merged CBCT and surface scan, with a metal
                    sleeve that mechanically constrains the bur along a single
                    fixed trajectory — conceptually similar to a static implant
                    surgical guide. They&apos;re precise for the one path they
                    were designed for, but offer no flexibility if the clinical
                    picture shifts mid-procedure, and fabrication adds a lab or
                    printing step before treatment can begin.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Approach 2</span>
                  <h3>Dynamic navigation systems (DNS)</h3>
                  <p>
                    Dynamic navigation systems (DNS) track the handpiece and the
                    patient&apos;s jaw in real time, using optical or infrared
                    tracking, and display the live position of the bur against
                    the planned trajectory on a screen — without a physical guide
                    constraining the instrument. The clinician can adjust
                    trajectory intraoperatively if needed, and there&apos;s no
                    separate guide fabrication step, though the hardware
                    investment and learning curve run higher than a printed
                    template.
                  </p>
                </div>
              </div>

              <p style={{ marginTop: "20px" }}>
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
                  Navident
                </a>{" "}
                is among the dynamic navigation systems that have crossed over
                from implant placement into this endodontic application — the
                same chairside tracking hardware repurposed for a canal-location
                or microsurgery workflow rather than implant drilling.
              </p>

              {/* Figure: Real-Time Optical Tracking */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-8.webp"
                    alt="Dynamic Navigation Optical Tracking and Drill Guidance"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Real-Time Dynamic Instrument Tracking vs Physical
                  Guide Templates
                </figcaption>
              </figure>
            </section>

            {/* Where DNS Is Actually Being Used */}
            <section id="clinical-applications">
              <h2>Where DNS Is Actually Being Used</h2>
              <p>
                A 2025 systematic review in the Journal of Endodontics reviewed
                14 published cases and case series using dynamic navigation
                across three applications: endodontic microsurgery (used in
                78.3% of cases reviewed), negotiation of calcified canals
                (20.5%), and nonsurgical retreatment (1.2%). The systems
                reported in use included Navident, DHC-ENDO1, and X-Guide. The
                review&apos;s conclusion was consistent across applications: DNS
                was associated with fewer iatrogenic errors and reduced
                operative time compared with conventional freehand technique,
                though the authors were explicit that the underlying evidence —
                mostly case reports — remains low-certainty.
              </p>
              <p>
                That three-way split (microsurgery, calcified-canal access,
                retreatment) is a useful way to think about the technology,
                because the clinical justification is slightly different in each
                case.
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Locating calcified canals</h3>
                  <p>
                    This is where the case for navigation is most intuitive —
                    and where the earliest and most consistent comparative data
                    exists. A 2025 in-vitro study (Urbone et al., Journal of
                    Functional Biomaterials) comparing dynamic navigation
                    against freehand access preparation in severely calcified
                    3D-printed teeth found navigation produced significantly
                    greater accuracy and fewer root perforations, though
                    preparation time was notably longer with navigation (204
                    seconds vs. 108.5 seconds, p&lt;0.001). A broader scoping
                    review of DNS applications similarly found navigated access
                    produced less tooth substance loss and higher precision in
                    locating obliterated canals than freehand technique.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Minimally invasive access cavities</h3>
                  <p>
                    Because the navigated trajectory is planned against the
                    actual canal position visible on CBCT, access cavities can
                    be prepared smaller and more conservatively than a freehand
                    &ldquo;explore and widen&rdquo; approach typically allows —
                    directly relevant to preserving remaining tooth structure in
                    an already-compromised tooth.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Endodontic retreatment and post removal</h3>
                  <p>
                    A 2025 systematic review and meta-analysis (Cureus) pooling
                    10 studies on DNS-guided nonsurgical retreatment evaluated
                    tooth-structure loss, linear and angular deviation, and
                    procedural mishaps against freehand technique, reporting
                    improved precision and reduced iatrogenic risk with
                    navigation, while again flagging that the evidence base
                    remains dominated by in-vitro and case-level studies rather
                    than randomized trials.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>Endodontic microsurgery</h3>
                  <p>
                    Apicoectomy and periradicular surgery were, per the Kapoor et
                    al. review, the single largest reported application of DNS
                    in endodontics to date. A separate 2025 systematic review
                    focused specifically on endodontic surgery similarly
                    reported promising accuracy and reliability data for dynamic
                    navigation in apicectomy procedures, while noting the
                    literature here is newer and thinner than the
                    implant-navigation evidence base DNS originally grew out
                    of.
                  </p>
                </article>
              </div>

              {/* Figure: Navident Real-Time Optical Tracking */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/navident.webp"
                    alt="Navident Dynamic Navigation in Clinical Practice"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Navident Optical Real-Time Tracking &amp; Live
                  On-Screen Trajectory Feedback
                </figcaption>
              </figure>
            </section>

            {/* How Accurate Is It, Really? */}
            <section id="accuracy-data">
              <h2>How Accurate Is It, Really?</h2>
              <p>
                Numbers vary across the pooled literature, which mixes in-vitro
                and clinical data and is worth reading with that caveat attached.
                One meta-analysis cited across several of the reviews above
                reported mean angular deflection of roughly 2.0&deg; in in-vitro
                studies and roughly 3.7&deg; in clinical studies — a reminder
                that accuracy figures generated on 3D-printed test teeth
                don&apos;t automatically transfer one-to-one to a live patient
                with soft tissue, saliva, and limited access.
              </p>
              <div className="photo-callout">
                The consistent qualitative finding across reviews, rather than
                any single number, is that DNS outperforms freehand technique
                on accuracy and substance preservation, while typically taking
                longer per procedure — an honest trade clinicians should plan
                for rather than a cost-free upgrade.
              </div>
            </section>

            {/* Workflow, Step by Step */}
            <section id="workflow">
              <h2>Workflow, Step by Step</h2>

              <div className="photo-workflow-strip">
                <div className="photo-workflow-item">CBCT Acquisition</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Treatment Planning</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Registration</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Guided Execution</div>
                <i className="photo-workflow-arrow">&rarr;</i>
                <div className="photo-workflow-item">Verification</div>
              </div>

              <div className="photo-step-grid" style={{ marginTop: "24px" }}>
                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 1</span>
                  <h3>CBCT acquisition</h3>
                  <p>CBCT acquisition of the relevant tooth or teeth.</p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 2</span>
                  <h3>Treatment planning</h3>
                  <p>
                    The clinician marks the planned access or surgical trajectory
                    against the 3D anatomy in planning software.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 3</span>
                  <h3>Patient and instrument registration</h3>
                  <p>
                    A tracked reference is attached intraorally (patient-side)
                    and to the handpiece (instrument-side), linking both to the
                    planned CBCT model.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Stage 4</span>
                  <h3>Real-time guided execution</h3>
                  <p>
                    The clinician follows the live on-screen trajectory display
                    while preparing access, negotiating the canal, or performing
                    surgery.
                  </p>
                </div>

                <div
                  className="photo-step-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <span className="photo-step-badge">Stage 5</span>
                  <h3>Verification</h3>
                  <p>
                    Radiographic or direct clinical confirmation that the
                    planned outcome (canal location, root-end resection, post
                    removal) was achieved as intended.
                  </p>
                </div>
              </div>

              {/* Figure: CBCT 3D Trajectory Planning */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-4.webp"
                    alt="CBCT 3D Trajectory Planning for Endodontics"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 3 • Pre-Operative CBCT Multi-Planar Alignment &amp; 3D
                  Canal Trajectory Mapping
                </figcaption>
              </figure>

              <div className="photo-callout">
                The registration step in stage 3 is the one most reviews flag as
                the primary source of error when outcomes fall short — a loosely
                seated reference clip, or one that shifts during the procedure,
                degrades accuracy for every step that follows it.
              </div>
            </section>

            {/* Where It Falls Short */}
            <section id="limitations">
              <h2>Where It Falls Short</h2>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Cost and learning curve</h3>
                  <p>
                    Several reviews explicitly cite the high initial investment
                    and a genuine learning curve as barriers to adoption — this
                    isn&apos;t a drop-in replacement for freehand skill,
                    it&apos;s an added technique requiring its own competency.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Low-certainty evidence base</h3>
                  <p>
                    Most supporting studies to date are case reports, case
                    series, or in-vitro work on 3D-printed teeth, not randomized
                    clinical trials. The direction of the evidence is
                    consistently favorable; its strength is not yet at the level
                    implant navigation research has reached.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Longer procedural time</h3>
                  <p>
                    Longer procedural time, at least in several direct
                    comparisons, which matters for chair scheduling even when the
                    accuracy benefit is real.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>Registration sensitivity</h3>
                  <p>
                    Accuracy depends entirely on a stable, correctly seated
                    patient-tracking reference — the same vulnerability that
                    affects dynamic navigation in implant surgery applies here.
                  </p>
                </article>
              </div>

              <div style={{ marginTop: "18px" }}>
                <article className="photo-feature">
                  <span className="photo-feature-num">05</span>
                  <h3>Not a substitute for diagnosis and planning</h3>
                  <p>
                    Navigation executes a plan precisely; it doesn&apos;t
                    replace the clinical judgment that decides whether
                    retreatment, surgery, or referral is the right call in the
                    first place.
                  </p>
                </article>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq">
              <h2>FAQ</h2>
              <div className="photo-faq-wrap">
                <div className="photo-faq-item">
                  <details open>
                    <summary>
                      What&apos;s the difference between dynamic and static
                      guided endodontics?
                    </summary>
                    <p>
                      Static guides are pre-fabricated templates with a
                      mechanical sleeve fixing one trajectory; dynamic
                      navigation tracks the handpiece and jaw in real time and
                      displays the planned path on-screen, without a physical
                      guide, allowing intraoperative adjustment.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is dynamic navigation only used for calcified canals?
                    </summary>
                    <p>
                      No. Published reviews report its use across
                      calcified-canal access, minimally invasive access cavity
                      preparation, nonsurgical retreatment, and — currently the
                      most-reported application — endodontic microsurgery such as
                      apicoectomy.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is Navident used for endodontic applications, or only
                      implants?
                    </summary>
                    <p>
                      Navident originated as a dynamic navigation system for
                      implant placement, and published case reports and case
                      series have also reported its use for guided endodontic
                      applications including calcified-canal negotiation and
                      microsurgery.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Does dynamic navigation take longer than freehand
                      treatment?
                    </summary>
                    <p>
                      In several direct comparisons, yes — navigated procedures
                      have taken roughly twice as long as freehand in at least
                      one controlled in-vitro study, though with higher accuracy
                      and fewer perforations.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      How strong is the evidence for dynamic navigation in
                      endodontics?
                    </summary>
                    <p>
                      Directionally consistent but still developing — most
                      current systematic reviews are built on case reports, case
                      series, and in-vitro studies rather than large randomized
                      clinical trials, a limitation the reviews themselves note.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Dynamic navigation brings the same real-time tracking principle
                that transformed guided implant placement into a genuinely
                different problem — finding and treating canals that conventional
                technique struggles to see. The evidence, while still young by
                clinical-trial standards, consistently favors navigation over
                freehand technique on accuracy and tooth-structure preservation
                for calcified canals, minimally invasive access, and
                microsurgery. It isn&apos;t a faster option, and it isn&apos;t
                necessary for routine anatomy — but for the specific cases it
                targets, it&apos;s solving a problem freehand technique was never
                well equipped to solve in the first place.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • DYNAMIC NAVIGATION SYSTEMS
                  </div>
                  <h2>Navident Dynamic Navigation</h2>
                  <p>
                    Experience sub-millimeter surgical accuracy with real-time
                    optical tracking across implantology and specialized guided
                    endodontic procedures.
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
                      href="https://navident.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore Navident{" "}
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                    <Link className="photo-btn light" to="/blog/2">
                      Dynamic Navigation Guide{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>DNS</span>
                  <small>
                    REAL-TIME
                    <br />
                    TRACKING
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
