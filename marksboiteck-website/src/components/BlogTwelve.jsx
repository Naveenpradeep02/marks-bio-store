import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogTwelve({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "TMJ Pain Management (Arthrocenthesis) & Navigation Procedure | Marks Biotech";

    const sectionIds = [
      "intro",
      "what-is-arthrocentesis",
      "needle-placement-accuracy",
      "guided-and-navigation-access",
      "conventional-vs-guided-table",
      "safety-considerations",
      "where-guidance-adds-value",
      "practical-considerations",
      "faq",
      "explore-digital-planning",
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
      "TMJ Pain Management (Arthrocenthesis) & Navigation Procedure | Marks Biotech";

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
              TMJ Pain Management (Arthrocenthesis) &amp; Navigation Procedure
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>TMJ Pain Management</span> • <span>Surgical Navigation</span>
            </div>
            <h1 itemProp="headline">
              TMJ Pain Management (Arthrocenthesis) &amp; Navigation Procedure
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              Arthrocentesis mechanisms, landmark-based limitations,
              patient-specific 3D printed guides, real-time dynamic navigation,
              and comparative clinical evidence for TMJ access.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">TMJ Arthrocentesis</span>
              <span className="photo-meta-dot">•</span>
              <span>Computer-Guided TMJ Access</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-12.webp"
              alt="TMJ Pain Management Arthrocentesis & Navigation Procedure"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-cube"
                style={{ color: "var(--b3-red)" }}
              ></i>
              TMJ Arthrocentesis • Image Guidance &amp; Surgical Navigation
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
              href="#what-is-arthrocentesis"
              className={
                activeSection === "what-is-arthrocentesis" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "what-is-arthrocentesis")}
            >
              What Is TMJ Arthrocentesis?
            </a>
            <a
              href="#needle-placement-accuracy"
              className={
                activeSection === "needle-placement-accuracy" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "needle-placement-accuracy")}
            >
              Needle Placement Accuracy
            </a>
            <a
              href="#guided-and-navigation-access"
              className={
                activeSection === "guided-and-navigation-access" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "guided-and-navigation-access")}
            >
              Computer-Guided &amp; Navigation
            </a>
            <a
              href="#conventional-vs-guided-table"
              className={
                activeSection === "conventional-vs-guided-table" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "conventional-vs-guided-table")}
            >
              Conventional vs Guided Comparison
            </a>
            <a
              href="#safety-considerations"
              className={
                activeSection === "safety-considerations" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "safety-considerations")}
            >
              Safety Considerations
            </a>
            <a
              href="#where-guidance-adds-value"
              className={
                activeSection === "where-guidance-adds-value" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "where-guidance-adds-value")}
            >
              Where Image Guidance Adds Value
            </a>
            <a
              href="#practical-considerations"
              className={
                activeSection === "practical-considerations" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "practical-considerations")}
            >
              Practical Considerations
            </a>
            <a
              href="#faq"
              className={activeSection === "faq" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "faq")}
            >
              Frequently Asked Questions
            </a>
            <a
              href="#explore-digital-planning"
              className={
                activeSection === "explore-digital-planning" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "explore-digital-planning")}
            >
              Explore Digital Solutions
            </a>
          </aside>

          {/* Article Editorial Content Body */}
          <div className="photo-article-body">
            {/* Intro Section */}
            <section id="intro">
              <p>
                Temporomandibular joint pain is one of the more frustrating
                conditions to manage conservatively, because by the time a patient
                reaches arthrocentesis, physiotherapy, splints, and pharmacologic
                management have usually already been tried and have not resolved
                the pain or the closed lock. Arthrocentesis sits in the gap between
                that conservative first line and open joint surgery — minimally
                invasive, low in complications, and reasonably well supported by
                decades of clinical use.
              </p>
              <p>
                What has not changed much in that time is how the needle finds the
                joint space in the first place. Standard technique still relies on
                surface landmarks — a line from the tragus to the outer canthus, a
                measured distance anterior to the tragus — applied to a joint
                whose depth and orientation vary meaningfully between patients.
                That variability is exactly the kind of problem image-guided
                planning and navigation have addressed elsewhere in dentistry, and
                a growing, still early-stage body of research is asking whether the
                same principle applies here.
              </p>
              <div className="photo-callout">
                This article covers what TMJ arthrocentesis actually does and for
                whom, why landmark-based needle placement has real limitations,
                and what the current evidence says about computer-guided and
                navigation-assisted approaches to TMJ access — including where
                that evidence is still thin and should not be oversold.
              </div>
            </section>

            {/* What Is TMJ Arthrocentesis? */}
            <section id="what-is-arthrocentesis">
              <h2>What Is TMJ Arthrocentesis?</h2>
              <p>
                TMJ arthrocentesis is the lavage of the joint&apos;s superior
                compartment with a sterile solution, typically lactated
                Ringer&apos;s or saline, performed without directly visualizing
                the joint. The mechanism is believed to work by flushing out
                inflammatory mediators and breaking down fibrous adhesions that
                restrict disc movement, combined with hydraulic distension of the
                joint space that can help release a displaced disc and allow
                mandibular condyle translation to normalize. First described by
                Nitzan in 1991, it occupies a specific niche in TMJ management —
                more invasive than splints, physiotherapy, or pharmacologic
                management, but considerably less invasive than open joint
                surgery or arthroscopy, both of which carry higher complication
                rates.
              </p>

              <h3>Indications</h3>
              <p>
                Arthrocentesis is indicated for patients who have not responded to
                conservative management and present with TMJ-predominant pain,
                anterior disc displacement with or without reduction, synovitis
                or capsulitis, degenerative osteoarthritis, or acute closed lock
                with limited mouth opening. Unilateral TMJ pain and a positive
                response to joint loading on examination are commonly used
                selection criteria, since residual muscle pain or bilateral
                involvement can confound how much benefit the joint-focused
                procedure actually delivers.
              </p>

              <h3>Technique</h3>
              <p>
                The original single-compartment technique described by Nitzan
                uses two needles placed into the superior joint space — one for
                inflow, one for outflow — with irrigation volumes reported across
                the literature ranging widely, though systematic review evidence
                has looked specifically at which lavage volume produces the best
                outcomes. Single-needle techniques with upper-compartment
                distension have also been studied as an alternative, generally
                showing comparable pain reduction to the two-needle approach
                with fewer needle insertions. Needle depth itself is not uniform:
                MRI-based anatomical study has found clinically meaningful,
                gender-related variation in the distance from skin to the joint
                space, which is part of why a fixed landmark-based depth is an
                approximation rather than a precise target.
              </p>

              <h3>Evidence of Effectiveness</h3>
              <p>
                Across multiple systematic reviews, arthrocentesis is consistently
                associated with significant improvement in pain and mouth opening
                in appropriately selected patients, and complication rates are
                low — a large retrospective review reported preauricular hematoma
                in 0.4% of cases and transient vertigo in 0.2%, with no major
                permanent complications identified. Reviews comparing
                arthrocentesis with or without intra-articular injectables (such
                as hyaluronic acid) have found that significant pain reduction is
                generally limited to groups receiving arthrocentesis itself, with
                or without an added injectable, rather than injection alone.
              </p>

              {/* Figure 1 */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/669ff494c357e8b5911c0173_navident 2.webp"
                    alt="Intraoperative navigation tracking system for clinical access"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Real-Time Optical Tracking &amp; Surgical Navigation
                  Interface
                </figcaption>
              </figure>
            </section>

            {/* Why Needle Placement Accuracy Matters */}
            <section id="needle-placement-accuracy">
              <h2>Why Needle Placement Accuracy Matters</h2>
              <p>
                The superior joint space arthrocentesis is targeting is a narrow
                compartment close to the facial nerve, the external auditory
                canal, and the middle cranial fossa. Standard technique locates
                it using surface anatomical landmarks and a fixed or estimated
                needle depth, with the clinician relying on tactile feedback —
                bony contact, a change in resistance — rather than direct
                visualization to confirm position.
              </p>
              <p>
                This works well in experienced hands, which is reflected in
                arthrocentesis&apos;s generally low complication rate. But it is
                also, by design, an estimation technique rather than a verified
                one. A difficult second-needle placement is a recognized,
                specifically documented problem in the literature — if the outflow
                needle is positioned incorrectly relative to the inflow needle,
                lavage can fail outright, prompting repeated needle insertions
                that extend procedure time and have been identified as a
                contributing factor in post-procedural swelling and patient
                discomfort. Anatomical variation between patients, including the
                gender-related depth differences noted in MRI-based study, means a
                technique calibrated to average anatomy will be less precise for
                patients who deviate from it.
              </p>
            </section>

            {/* Computer-Guided and Navigation-Assisted TMJ Access */}
            <section id="guided-and-navigation-access">
              <h2>Computer-Guided and Navigation-Assisted TMJ Access</h2>

              <h3>Static, Patient-Specific Guides</h3>
              <p>
                The most developed line of research uses CT- or CBCT-derived,
                3D-printed, patient-specific guides — a physical template that
                rests on the facial soft tissue and is fixed via an occlusal bite
                block, with one or more channels directing the needle to a
                pre-planned trajectory into the superior joint space. This is
                conceptually the same static guided-surgery principle used in
                implant dentistry, applied to a soft-tissue target instead of a
                bone osteotomy.
              </p>
              <p>
                A randomized clinical comparison of this approach against
                conventional landmark-based arthrocentesis found no needle
                relocation was required in the guided group, compared with the
                conventional group, a statistically significant difference. Pain
                reduction, mouth opening, and joint sound outcomes were not
                significantly different between the two groups in that study,
                which is an important and honest finding: the guide improved
                first-pass accuracy and procedural efficiency without
                demonstrating a difference in the ultimate clinical outcome
                measures. A separate accuracy-focused study used post-procedure CT
                to directly compare the planned needle position against the
                achieved position when a patient-specific guide was used,
                describing the method as reproducible, though this was reported
                from a very small case series.
              </p>

              <h3>Dynamic, Real-Time Navigation</h3>
              <p>
                A smaller and earlier-stage body of work has explored real-time,
                intraoperative navigation — the same general category of
                technology used for dynamic implant navigation — applied to TMJ
                access. An early preliminary report loaded TMJ MRI data into an
                intraoperative navigation system to guide needle placement into
                the superior and inferior joint spaces, demonstrating feasibility
                in a two-patient case series. Navigation has a more established,
                though still developing, role in more invasive TMJ procedures
                such as total joint replacement and ankylosis surgery, where
                studies have compared real-time navigation against
                patient-specific drilling guides for implant and osteotomy
                positioning; in at least one in vitro comparison, a purpose-built
                drilling guide outperformed real-time navigation for positional
                accuracy, while navigation showed no added benefit over a
                well-designed static guide for that specific application.
              </p>

              <h3>What This Means in Practice</h3>
              <p>
                Dynamic navigation systems, including the kind used in implant
                dentistry, are not established or validated as a routine tool for
                TMJ arthrocentesis specifically. Patient-specific static guides
                have the stronger, though still limited, evidence base for the
                arthrocentesis application itself, with the clearest demonstrated
                benefit being a reduction in needle repositioning rather than a
                proven difference in pain or mouth-opening outcomes. Clinicians
                exploring either approach should treat the current literature as
                early-stage and procedure-specific, not as an indication that
                navigated TMJ injection is interchangeable with, or an upgrade on,
                well-performed conventional arthrocentesis in experienced hands.
              </p>

              {/* Figure 2 */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/blog-2-Dynamic-Navigation-7.webp"
                    alt="Precision navigation and guided instrumentation in maxillofacial procedures"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Digital Trajectory Planning &amp; Surgical Guidance
                  Instrumentation
                </figcaption>
              </figure>
            </section>

            {/* Conventional vs Guided TMJ Arthrocentesis Table */}
            <section id="conventional-vs-guided-table">
              <h2>Conventional vs Guided TMJ Arthrocentesis</h2>

              <div className="photo-table-wrap">
                <table className="photo-table">
                  <thead>
                    <tr>
                      <th>Aspect</th>
                      <th>Conventional (Landmark-Based)</th>
                      <th>Computer-Guided (Static)</th>
                      <th>Dynamic Navigation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Planning basis</td>
                      <td>Surface anatomical landmarks, estimated depth</td>
                      <td>CT/CBCT-derived 3D model, pre-planned trajectory</td>
                      <td>CT/CBCT or MRI data tracked in real time</td>
                    </tr>
                    <tr>
                      <td>Needle trajectory</td>
                      <td>Determined intraoperatively by palpation and feel</td>
                      <td>Fixed by a physical, patient-specific guide</td>
                      <td>Displayed live; adjustable during the procedure</td>
                    </tr>
                    <tr>
                      <td>Evidence base</td>
                      <td>Decades of clinical use; well-established safety profile</td>
                      <td>Several small randomized and case-series studies</td>
                      <td>Very limited; largely feasibility-level case reports</td>
                    </tr>
                    <tr>
                      <td>Demonstrated benefit</td>
                      <td>Reliable in experienced hands</td>
                      <td>Fewer needle relocation attempts in controlled comparison</td>
                      <td>Feasibility shown; comparative accuracy data lacking for arthrocentesis specifically</td>
                    </tr>
                    <tr>
                      <td>Lead time</td>
                      <td>None; performed chairside or in theatre directly</td>
                      <td>Requires imaging, planning, and guide fabrication in advance</td>
                      <td>Requires imaging and registration setup intraoperatively</td>
                    </tr>
                    <tr>
                      <td>Clinical pain/mobility outcomes</td>
                      <td>Established and effective in appropriate candidates</td>
                      <td>Not shown to significantly differ from conventional technique</td>
                      <td>Not yet adequately studied for this specific application</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="photo-callout">
                This comparison should not be read as guided or navigated
                technique being clinically superior — the evidence to date shows
                a procedural efficiency benefit (fewer needle passes) without a
                demonstrated difference in pain or mouth-opening outcomes, and
                conventional technique remains a well-validated, effective
                default in experienced hands.
              </div>
            </section>

            {/* Safety Considerations Common to All Approaches */}
            <section id="safety-considerations">
              <h2>Safety Considerations Common to All Approaches</h2>
              <p>
                Regardless of how the needle trajectory is planned, several
                safety principles apply across conventional, guided, and navigated
                TMJ arthrocentesis alike. The facial nerve&apos;s temporal and
                zygomatic branches run close to the injection site, and
                inadvertent paresis, though uncommon and usually transient when
                it occurs, remains the complication clinicians are most focused
                on avoiding. Preauricular hematoma and transient vertigo are the
                next most frequently reported events, both low in incidence in
                large retrospective reviews. Patient selection matters as much as
                technique: outcomes are most favorable in patients with
                TMJ-predominant pain and minimal myofascial component, and
                bilateral or muscle-dominant presentations are more likely to
                leave residual symptoms regardless of how precisely the needle
                was placed. None of the guided or navigated approaches discussed
                above change these underlying risk factors — they address
                trajectory accuracy, not patient selection or the biological
                response to the procedure itself.
              </p>
            </section>

            {/* Where Image Guidance May Add the Most Value */}
            <section id="where-guidance-adds-value">
              <h2>Where Image Guidance May Add the Most Value</h2>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Scenario 1</span>
                  <h3>Anatomically atypical patients</h3>
                  <p>
                    Where surface landmarks are less reliable — altered facial
                    anatomy, prior surgery, significant asymmetry — a pre-planned
                    trajectory derived from the patient&apos;s own imaging may
                    offer more than a fixed landmark estimate.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Scenario 2</span>
                  <h3>Reducing repeat needle insertion</h3>
                  <p>
                    The clearest demonstrated benefit in the current literature
                    is fewer needle relocation attempts, which plausibly reduces
                    procedure time and the soft-tissue trauma associated with
                    multiple passes, even without a shown difference in ultimate
                    pain outcomes.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Scenario 3</span>
                  <h3>Training and procedural consistency</h3>
                  <p>
                    A pre-planned, image-derived trajectory may have more value
                    as a way to standardize technique across operators of
                    varying experience than as an enhancement for an
                    already-experienced clinician.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Scenario 4</span>
                  <h3>Combined procedures</h3>
                  <p>
                    Where arthrocentesis is being performed alongside more
                    invasive TMJ surgery already using navigation or guided
                    planning, extending the same digital dataset to guide the
                    injection step is a logical, low-additional-cost
                    application.
                  </p>
                </div>
              </div>
            </section>

            {/* Practical Considerations for Clinicians Evaluating Guided Approaches */}
            <section id="practical-considerations">
              <h2>Practical Considerations for Clinicians Evaluating Guided Approaches</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <strong>Match the tool to the actual problem.</strong> If
                  repeated needle insertion and procedure time are the recurring
                  issue in your practice, a guided approach addresses that
                  directly; if pain outcomes are the concern, current evidence
                  does not show guided technique outperforming well-executed
                  conventional arthrocentesis on that measure.
                </div>

                <div className="photo-limits-item">
                  <strong>Weigh planning lead time against procedural time saved.</strong> Static
                  guides require imaging, digital planning, and fabrication in
                  advance, which adds time and cost before the procedure that a
                  same-day conventional approach does not.
                </div>

                <div className="photo-limits-item">
                  <strong>Treat small-sample studies as early signal, not proof.</strong> Several
                  of the guided-arthrocentesis studies cited in current
                  literature involve single-digit to small double-digit patient
                  numbers; the directional finding (fewer needle relocations) is
                  worth attention, but larger, better-powered trials are still
                  needed before guided technique should be considered a new
                  standard of care.
                </div>

                <div className="photo-limits-item">
                  <strong>Keep patient selection central.</strong> No guidance
                  technology changes which patients are good candidates for
                  arthrocentesis in the first place — TMJ-predominant pain with
                  minimal muscular component remains the key selection
                  criterion regardless of how the needle is placed.
                </div>

                <div className="photo-limits-item">
                  <strong>Consider case complexity.</strong> Atypical facial
                  anatomy, prior TMJ surgery, or significant asymmetry are the
                  scenarios where a pre-planned, image-derived trajectory most
                  plausibly adds value over landmark estimation.
                </div>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq">
              <h2>Frequently Asked Questions</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <h3
                    style={{
                      fontSize: "1.05rem",
                      marginBottom: "6px",
                      color: "var(--b3-text-dark)",
                    }}
                  >
                    What is TMJ arthrocentesis used for?
                  </h3>
                  <p style={{ margin: 0 }}>
                    TMJ arthrocentesis is used to manage joint pain, limited mouth
                    opening, and closed lock associated with disc displacement or
                    osteoarthritis in patients who have not responded to
                    conservative treatment such as physiotherapy, splints, or
                    medication.
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
                    How effective is arthrocentesis for TMJ pain?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Multiple systematic reviews report significant improvement in
                    pain and mouth opening in appropriately selected patients,
                    with a low rate of complications; outcomes are generally
                    better when patients have TMJ-predominant pain with minimal
                    muscle involvement.
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
                    Why is needle placement accuracy a concern in TMJ arthrocentesis?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Conventional technique relies on surface landmarks and
                    estimated needle depth to reach a narrow joint space located
                    close to the facial nerve and other sensitive structures, and
                    anatomical depth has been shown to vary between patients,
                    which can make landmark-based placement less precise in
                    atypical anatomy.
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
                    What is computer-guided TMJ arthrocentesis?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Computer-guided arthrocentesis uses a patient-specific guide,
                    typically 3D-printed from CT or CBCT data, that directs the
                    needle along a pre-planned trajectory into the superior joint
                    space, similar in principle to static guided surgery used in
                    implant dentistry.
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
                    Does navigation improve outcomes in TMJ arthrocentesis?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Early controlled research shows guided approaches can reduce
                    the need for needle repositioning compared with conventional
                    technique, but current studies have not demonstrated a
                    significant difference in pain or mouth-opening outcomes
                    between guided and conventional arthrocentesis, and the
                    evidence base remains limited and early-stage.
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
                    Is dynamic navigation an established technique for TMJ procedures?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Dynamic, real-time navigation has a more established role in
                    more invasive TMJ surgery such as joint replacement, but its
                    use for arthrocentesis specifically is supported only by very
                    limited, early case-level evidence and is not a standard or
                    validated indication at this time.
                  </p>
                </div>
              </div>
            </section>

            {/* Explore Digital Planning and Navigation Solutions */}
            <section id="explore-digital-planning">
              <h2>Explore Digital Planning and Navigation Solutions</h2>
              <p>
                TMJ arthrocentesis remains an effective, low-complication procedure
                performed well by experienced clinicians using conventional
                technique, and the emerging guided and navigated approaches
                discussed here are best understood as early-stage refinements
                aimed at reducing needle repositioning, not as a replacement for
                sound clinical technique. Clinicians already using CBCT-based
                planning and dynamic navigation for implant placement can review
                the relevant technologies through Marks Biotech&apos;s product
                pages to see how the same digital planning principles are being
                explored in adjacent procedures.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • SURGICAL NAVIGATION &amp; DIGITAL DENTISTRY
                  </div>
                  <h2>Digital Surgical Guidance &amp; Navigation</h2>
                  <p>
                    Discover complete solutions from digital planning to
                    real-time surgical tracking with the B&amp;B Digital Surgical
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
                  <span>TMJ</span>
                  <small>
                    SURGICAL
                    <br />
                    GUIDANCE
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
