import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogSix({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Role Of Compactors / Expanders in Dental Implant Surgery | Marks Biotech";

    const sectionIds = [
      "intro",
      "problem-solved",
      "what-are-instruments",
      "primary-stability",
      "indications",
      "technique-comparison",
      "evidence",
      "risks-failure-points",
      "guarantee-success",
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
      "Role Of Compactors / Expanders in Dental Implant Surgery | Marks Biotech";

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
              Role Of Compactors / Expanders in Dental Implant Surgery
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Implant Site Preparation</span> •{" "}
              <span>Ridge Expansion &amp; Compaction</span>
            </div>
            <h1 itemProp="headline">
              Role Of Compactors / Expanders in Dental Implant Surgery
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              How bone compactors, expanders, and osseodensification burs
              preserve bone volume and improve primary stability in narrow ridges
              and low-density bone.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Implant Site Preparation</span>
              <span className="photo-meta-dot">•</span>
              <span>Primary Stability Optimization</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-6.webp"
              alt="Role Of Compactors and Expanders in Dental Implant Surgery"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-bone"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Ridge Expansion &amp; Bone Compaction • Primary Stability
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
              Overview &amp; Core Concept
            </a>
            <a
              href="#problem-solved"
              className={activeSection === "problem-solved" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "problem-solved")}
            >
              The Problem They&apos;re Solving
            </a>
            <a
              href="#what-are-instruments"
              className={
                activeSection === "what-are-instruments" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "what-are-instruments")}
            >
              What Are Compactors &amp; Expanders?
            </a>
            <a
              href="#primary-stability"
              className={activeSection === "primary-stability" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "primary-stability")}
            >
              Why Primary Stability Matters
            </a>
            <a
              href="#indications"
              className={activeSection === "indications" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "indications")}
            >
              Indications
            </a>
            <a
              href="#technique-comparison"
              className={
                activeSection === "technique-comparison" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "technique-comparison")}
            >
              How Techniques Compare
            </a>
            <a
              href="#evidence"
              className={activeSection === "evidence" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "evidence")}
            >
              What the Evidence Shows
            </a>
            <a
              href="#risks-failure-points"
              className={
                activeSection === "risks-failure-points" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "risks-failure-points")}
            >
              Risks &amp; Failure Points
            </a>
            <a
              href="#guarantee-success"
              className={activeSection === "guarantee-success" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "guarantee-success")}
            >
              Do They Guarantee Success?
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
                <strong>Core Concept:</strong> Bone compactors and expanders are
                implant-site preparation instruments — osteotomes, threaded
                expanders, and osseodensification burs — that widen or densify a
                narrow or low-density ridge by pushing bone laterally rather than
                drilling it away. Compared with conventional drilling alone,
                they preserve more bone volume at the osteotomy site and are
                associated with higher implant stability quotient (ISQ) values
                immediately after placement, which is why they&apos;re routinely
                chosen for narrow ridges and soft, low-density bone.
              </div>
              <p>
                If you&apos;ve placed implants in a knife-edge ridge or a
                posterior maxilla with D3/D4 bone, you already know why primary
                stability is the thing that keeps you up the night before
                surgery. This is where compaction and expansion techniques earn
                their place in the protocol — and where their limits start too.
              </p>
            </section>

            {/* The Problem They're Solving */}
            <section id="problem-solved">
              <h2>The Problem They&apos;re Solving</h2>
              <p>
                Conventional drilling removes bone to create the osteotomy.
                That&apos;s fine when there&apos;s plenty of bone to spare and
                it&apos;s dense enough to grip an implant tightly on insertion.
                It&apos;s a much harder proposition in two common scenarios: a
                horizontally deficient ridge too narrow to drill into without
                perforating a cortical plate, and soft, trabecular-heavy bone —
                typically posterior maxilla — where a drilled osteotomy simply
                doesn&apos;t generate enough mechanical engagement for confident
                primary stability.
              </p>
              <p>
                Compactors and expanders exist because removing bone isn&apos;t
                the only option. Pushing it sideways, compressing it, or
                densifying it in place can solve both problems — width and
                density — without necessarily reaching for a bone graft first.
              </p>

              {/* Figure: Site Preparation & Preservation */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/implant1.webp"
                    alt="Implant Osteotomy Site Preparation and Bone Preservation"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Preserving Trabecular Architecture &amp; Lateral
                  Bone Condensation
                </figcaption>
              </figure>
            </section>

            {/* What Are Bone Compactors and Expanders? */}
            <section id="what-are-instruments">
              <h2>What Are Bone Compactors and Expanders?</h2>
              <p>
                Three related but distinct instrument families fall under this
                heading, and the differences between them matter more than the
                marketing around them usually suggests.
              </p>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Family 1</span>
                  <h3>Osteotomes</h3>
                  <p>
                    Osteotomes are hand instruments, traditionally mallet-driven
                    (and now increasingly magneto-dynamic or motor-assisted),
                    that are tapped or pressed into the osteotomy in gradually
                    increasing diameters. Rather than cutting, they laterally
                    compress trabecular bone outward against the cortical walls,
                    increasing local bone density around the future implant
                    site.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Family 2</span>
                  <h3>Threaded bone expanders</h3>
                  <p>
                    Threaded bone expanders work on a similar compression
                    principle but are inserted by rotation rather than
                    malleting, gradually widening the osteotomy as their diameter
                    increases along the instrument&apos;s length. They&apos;re
                    often preferred where a mallet technique is impractical or
                    where more controlled, incremental expansion is wanted.
                  </p>
                </div>

                <div
                  className="photo-step-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <span className="photo-step-badge">Family 3</span>
                  <h3>Osseodensification burs</h3>
                  <p>
                    Osseodensification burs (the technique popularized under the
                    trade name Versah, among others) are a more recent addition —
                    specially fluted burs rotated in reverse (counter-clockwise,
                    in a clockwise-cutting system) so they compact and
                    auto-graft bone along the osteotomy walls instead of
                    extracting it, densifying the site while simultaneously, and
                    often more predictably, expanding it.
                  </p>
                </div>
              </div>

              <p style={{ marginTop: "20px" }}>
                All three share the same underlying principle: preserve or
                compact bone rather than remove it, with the goal of improving
                primary stability and, where needed, physically widening a
                deficient ridge.
              </p>
            </section>

            {/* Why Primary Stability Is the Whole Point */}
            <section id="primary-stability">
              <h2>Why Primary Stability Is the Whole Point</h2>
              <p>
                Primary stability — the mechanical grip an implant has at the
                moment of placement, before any biological healing has occurred —
                is one of the strongest predictors of how smoothly
                osseointegration proceeds. High primary stability tends to
                translate into faster secondary (biological) stability, and
                it&apos;s the practical reason clinicians can consider immediate
                loading protocols in select cases. Low primary stability, by
                contrast, increases the risk of micromovement at the
                bone-implant interface during the critical early healing window,
                which is associated with fibrous encapsulation rather than true
                osseointegration.
              </p>
              <p>
                Compaction and expansion techniques target this directly. By
                densifying or laterally compressing trabecular bone instead of
                drilling it out, they increase the mechanical engagement
                available to the implant at insertion — which is exactly the
                variable primary stability depends on.
              </p>
            </section>

            {/* Indications: When Compaction or Expansion Makes Sense */}
            <section id="indications">
              <h2>Indications: When Compaction or Expansion Makes Sense</h2>

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
                  Narrow (knife-edge) ridges where the available width is close
                  to, but slightly under, the planned implant diameter, and
                  splitting the ridge without a separate grafting procedure is
                  clinically reasonable.
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
                  Low-density bone, particularly posterior maxilla (Misch/Lekholm-Zarb
                  Type III–IV), where conventional drilling alone often produces
                  disappointingly low ISQ values.
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
                  Sites where immediate or early loading is planned, and primary
                  stability needs a reliable boost beyond what standard drilling
                  would deliver.
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
                  Cases aiming to avoid or minimize grafting, where modest
                  horizontal deficiency can be managed by expansion rather than
                  a staged augmentation procedure.
                </div>
              </div>

              <div className="photo-callout" style={{ marginTop: "20px" }}>
                They are not a substitute for grafting in cases of significant
                bone deficiency — that distinction matters clinically and is
                worth stating plainly rather than blurring.
              </div>

              {/* Figure: Implant Seating & Ridge Architecture */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/implant6.webp"
                    alt="Implant Stability and Ridge Width Management"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Mechanical Stability &amp; Preservation of Cortical
                  Plates in Low-Density Bone
                </figcaption>
              </figure>
            </section>

            {/* How the Techniques Compare */}
            <section id="technique-comparison">
              <h2>How the Techniques Compare</h2>

              <div className="photo-table-wrap">
                <table className="photo-table">
                  <thead>
                    <tr>
                      <th>Technique</th>
                      <th>Mechanism</th>
                      <th>Best suited for</th>
                      <th>Key consideration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Osteotomes (malleted)</td>
                      <td>
                        Lateral compression via tapping, increasing diameter
                      </td>
                      <td>Soft maxillary bone, modest expansion</td>
                      <td>
                        Mallet force and patient comfort; risk of BPPV-type
                        vestibular symptoms in rare cases
                      </td>
                    </tr>
                    <tr>
                      <td>Threaded expanders</td>
                      <td>Rotational, incremental widening</td>
                      <td>Controlled expansion without malleting</td>
                      <td>
                        Requires sequential diameter steps; slower than drilling
                      </td>
                    </tr>
                    <tr>
                      <td>Osseodensification burs</td>
                      <td>Reverse-rotation compaction and auto-grafting</td>
                      <td>Narrow ridges and soft bone, same protocol</td>
                      <td>
                        Technique-sensitive; needs irrigation and correct
                        rotation direction
                      </td>
                    </tr>
                    <tr>
                      <td>Ridge-split with osteotomes/piezo</td>
                      <td>
                        Surgical splitting of cortical plates, often combined
                        with graft
                      </td>
                      <td>More significant horizontal deficiency</td>
                      <td>More invasive; frequently combined with GBR</td>
                    </tr>
                    <tr>
                      <td>Conventional drilling</td>
                      <td>Bone removal</td>
                      <td>Adequate width and density</td>
                      <td>
                        Reference baseline most alternatives are measured
                        against
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                These are general tendencies drawn from the comparative
                literature, not fixed rules — operator technique, bone quality
                within a single arch, and implant macro-design all still
                influence the outcome.
              </p>
            </section>

            {/* What the Evidence Shows */}
            <section id="evidence">
              <h2>What the Evidence Shows</h2>
              <p>
                A 2025 systematic review and meta-analysis in Frontiers in
                Bioengineering and Biotechnology evaluated expansion,
                compaction, and densification methods in narrow alveolar ridges
                specifically, measuring their effect on bone density, alveolar
                crest expansion, and implant stability quotient — reporting
                measurable gains across all three outcomes compared with
                standard drilling protocols, while noting technique and case
                selection still account for meaningful variation between
                studies.
              </p>
              <p>
                A 2023 systematic review (Manekar et al., cited within the above
                analysis) pooling 22 cohort studies and 2 randomized controlled
                trials — 634 patients, 1,287 implants placed after alveolar
                ridge splitting and expansion — reported an overall implant
                survival rate of 98.07% at three months of follow-up.
              </p>
              <p>
                A separate systematic review of ridge-split instrumentation
                found osteotomes used in roughly 65% of the reviewed protocols,
                with pooled implant success around 97%, and noted that gradual,
                incremental expansion was associated with greater primary
                stability and less bone loss than aggressive single-step
                techniques, along with comparatively minimal heat generation
                versus rotary drilling.
              </p>
              <p>
                For osseodensification specifically, comparative studies cited
                in recent reviews report higher ISQ and resonance frequency
                analysis values versus conventional drilling in several clinical
                comparisons, and a broader meta-analysis of ridge augmentation
                via osseodensification, GBR, and ridge-split techniques reported
                a pooled implant survival rate of 99.1% across the included
                studies — though the authors note direct head-to-head
                comparisons between techniques remain limited, and most
                supporting data comes from cohort studies rather than large
                RCTs.
              </p>
              <p>
                Taken together, the literature supports compaction and expansion
                techniques as effective tools for improving primary stability
                and preserving ridge width in appropriately selected cases — with
                the consistent caveat that technique selection, operator
                experience, and case selection still drive a meaningful share
                of the outcome variance.
              </p>
            </section>

            {/* Risks and Technique-Sensitive Failure Points */}
            <section id="risks-failure-points">
              <h2>Risks and Technique-Sensitive Failure Points</h2>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Cortical plate fracture</h3>
                  <p>
                    Over-aggressive expansion can fracture a thin buccal or
                    lingual cortical plate, particularly in the maxilla, turning
                    a planned expansion into an unplanned grafting case
                    mid-surgery.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Vestibular symptoms (BPPV)</h3>
                  <p>
                    Malleted osteotome technique carries a small but recognized
                    risk of benign paroxysmal positional vertigo (BPPV)-type
                    symptoms from the percussive force, particularly in posterior
                    maxillary sites near the vestibular apparatus — worth
                    discussing with patients as part of informed consent.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Localized thermal injury</h3>
                  <p>
                    Heat generation, while generally lower than aggressive rotary
                    drilling, is not zero — inadequate irrigation during expander
                    or osseodensification bur use can still cause localized
                    thermal injury.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>Incorrect rotation direction</h3>
                  <p>
                    Incorrect rotation direction with osseodensification burs
                    (clockwise instead of the compacting counter-rotation)
                    effectively converts the instrument into a standard cutting
                    bur, defeating the purpose of the technique.
                  </p>
                </article>
              </div>

              <div style={{ marginTop: "18px" }}>
                <article className="photo-feature">
                  <span className="photo-feature-num">05</span>
                  <h3>Case misselection</h3>
                  <p>
                    Case misselection — attempting expansion on a ridge that
                    genuinely requires staged grafting — tends to produce an
                    unstable implant and a more complicated salvage procedure
                    than if grafting had simply been planned from the start.
                  </p>
                </article>
              </div>
            </section>

            {/* Do Compactors and Expanders Guarantee Implant Success? */}
            <section id="guarantee-success">
              <h2>Do Compactors and Expanders Guarantee Implant Success?</h2>
              <p>
                No. They improve two specific, measurable variables — bone
                density and primary stability — in cases where the ridge anatomy
                is suitable for them. They do not compensate for poor implant
                positioning, inadequate restorative planning, uncontrolled
                occlusal loading, or a ridge deficiency genuinely beyond what
                expansion alone can safely address. Case selection remains the
                clinician&apos;s judgment call, not something the instrument
                decides on its own.
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2>FAQ</h2>
              <div className="photo-faq-wrap">
                <div className="photo-faq-item">
                  <details open>
                    <summary>
                      What&apos;s the difference between an osteotome and a
                      threaded bone expander?
                    </summary>
                    <p>
                      Osteotomes are typically tapped into place with a mallet (or
                      magneto-dynamic device) to compress bone laterally;
                      threaded expanders achieve a similar compression effect
                      through rotational insertion, generally offering more
                      controlled, incremental widening.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is osseodensification the same as using an osteotome?
                    </summary>
                    <p>
                      No. Osseodensification uses specially fluted burs rotated
                      in reverse to compact and auto-graft bone along the
                      osteotomy wall, while osteotomes achieve compression
                      through percussive or rotational insertion rather than a
                      rotating cutting instrument.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Do bone expanders eliminate the need for grafting?
                    </summary>
                    <p>
                      Not always. They can reduce or avoid grafting in cases of
                      modest horizontal deficiency, but more significant bone loss
                      typically still requires guided bone regeneration or a
                      staged grafting approach.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Can compaction techniques be used in soft, low-density bone
                      without a narrow ridge?
                    </summary>
                    <p>
                      Yes — soft posterior maxillary bone is one of the most
                      common indications for osteotomes and osseodensification,
                      independent of ridge width, because the goal there is
                      density rather than width.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      What&apos;s the main risk of expansion techniques?
                    </summary>
                    <p>
                      Fracture of a thin cortical plate from over-aggressive
                      expansion is the most commonly cited technical risk,
                      alongside a small recognized risk of transient
                      vertigo-type symptoms with malleted osteotome technique.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Compactors and expanders earn their place in implant surgery by
                solving two specific problems — insufficient ridge width and
                insufficient bone density — without always requiring a
                graft-first approach. The evidence base, while still leaning on
                cohort studies more than large RCTs, consistently shows better
                primary stability and preserved bone volume compared with
                drilling alone in appropriately selected narrow or soft-bone
                cases. The technique doesn&apos;t replace clinical judgment on
                case selection — it extends what&apos;s possible once that
                judgment has already ruled grafting in or out.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • IMPLANTOLOGY &amp; BIOMATERIALS
                  </div>
                  <h2>Comprehensive Implant Solutions</h2>
                  <p>
                    Explore advanced implant systems, site-preparation
                    technologies, and regenerative biomaterials engineered for
                    predictable primary stability and long-term osseointegration.
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
                      View Implant Portfolio{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <Link className="photo-btn light" to="/allograft">
                      Biomaterials &amp; GBR{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>ISQ</span>
                  <small>
                    PRIMARY
                    <br />
                    STABILITY
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
