import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogNine({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title =
      "Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry | Marks Biotech";

    const sectionIds = [
      "intro",
      "what-is-segmentation",
      "accuracy-evidence",
      "implant-planning",
      "intraoral-scans",
      "beyond-implant-planning",
      "limitations",
      "practical-takeaways",
      "faq",
      "explore-solutions",
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
      "Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry | Marks Biotech";

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
              Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Artificial Intelligence</span> •{" "}
              <span>CBCT Digital Segmentation</span>
            </div>
            <h1 itemProp="headline">
              Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry
            </h1>
            <p className="photo-hero-desc" itemProp="description">
              How deep learning networks automate tooth, alveolar bone, sinus,
              and mandibular canal segmentation in seconds to accelerate digital
              implant planning.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Deep Learning &amp; U-Net</span>
              <span className="photo-meta-dot">•</span>
              <span>Automated 3D Segmentation</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-9.webp"
              alt="Tooth and Bone Segmentation Using Artificial Intelligence in Dentistry"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-brain"
                style={{ color: "var(--b3-red)" }}
              ></i>
              AI-Driven Deep Learning • Automated 3D Anatomical Segmentation
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
              Overview &amp; Workflow Bottleneck
            </a>
            <a
              href="#what-is-segmentation"
              className={
                activeSection === "what-is-segmentation" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "what-is-segmentation")}
            >
              What Is AI Segmentation?
            </a>
            <a
              href="#accuracy-evidence"
              className={
                activeSection === "accuracy-evidence" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "accuracy-evidence")}
            >
              Accuracy vs Manual Tracing
            </a>
            <a
              href="#implant-planning"
              className={activeSection === "implant-planning" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "implant-planning")}
            >
              AI for Implant Planning
            </a>
            <a
              href="#intraoral-scans"
              className={activeSection === "intraoral-scans" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "intraoral-scans")}
            >
              Intraoral Scan Segmentation
            </a>
            <a
              href="#beyond-implant-planning"
              className={
                activeSection === "beyond-implant-planning" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "beyond-implant-planning")}
            >
              Applications Beyond Implants
            </a>
            <a
              href="#limitations"
              className={activeSection === "limitations" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "limitations")}
            >
              Limitations &amp; Verification
            </a>
            <a
              href="#practical-takeaways"
              className={
                activeSection === "practical-takeaways" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "practical-takeaways")}
            >
              Practical Takeaways
            </a>
            <a
              href="#faq"
              className={activeSection === "faq" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "faq")}
            >
              FAQs
            </a>
            <a
              href="#explore-solutions"
              className={
                activeSection === "explore-solutions" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "explore-solutions")}
            >
              Explore Solutions
            </a>
          </aside>

          {/* Article Editorial Content Body */}
          <div className="photo-article-body">
            {/* Intro Section */}
            <section id="intro">
              <div className="photo-callout">
                <strong>Core Problem:</strong> Before any CBCT dataset becomes a
                surgical guide, an implant plan, or a 3D printed model, something
                has to separate the teeth from the bone, the bone from the sinus,
                and the mandibular canal from everything around it. That process
                — segmentation — has traditionally meant a clinician or
                technician manually tracing structures slice by slice, a task
                that can take anywhere from twenty minutes to well over an hour
                per scan depending on complexity, and that varies noticeably
                between operators.
              </div>
              <p>
                Deep learning has moved into this exact bottleneck over the past
                several years, and the results are no longer preliminary.
                Multiple validated systems now segment a full CBCT volume —
                teeth, alveolar bone, sinus, mandibular canal — in seconds, with
                accuracy metrics that, in several studies, are statistically
                indistinguishable from expert manual tracing. For implant
                planning specifically, where the value of a digital workflow
                depends on how accurately bone and neurovascular anatomy were
                captured in the first place, this matters directly.
              </p>
              <p>
                This article looks at how AI segmentation actually works, what
                the evidence shows about its accuracy for teeth, alveolar bone,
                and the mandibular canal, where it fits into implant planning
                and other digital workflows, and where its real limitations lie —
                because, as with every other digital tool discussed on this site,
                accuracy on a validation dataset is not the same thing as a
                guarantee on the next patient&apos;s scan.
              </p>
            </section>

            {/* What Is AI-Based Tooth and Bone Segmentation? */}
            <section id="what-is-segmentation">
              <h2>What Is AI-Based Tooth and Bone Segmentation?</h2>
              <p>
                Segmentation is the process of labeling which voxels (in a 3D
                CBCT volume) or mesh regions (on an intraoral scan) belong to
                which anatomical structure — an individual tooth, the mandible,
                the maxillary sinus, the mandibular canal, or soft tissue. The
                output is typically an STL file for each structure, usable for 3D
                printing, surgical guide design, or import into planning
                software.
              </p>

              <h3>From Manual Tracing to Deep Learning</h3>
              <p>
                Earlier automated approaches relied on thresholding, template
                fitting, or level-set methods based on CBCT intensity values.
                These struggle where intensity alone cannot distinguish
                structures reliably — metal restorations, low-dose scans, and
                the simple fact that tooth and bone density can overlap. Deep
                learning models, particularly convolutional neural networks
                built on the U-Net architecture, instead learn structural and
                contextual patterns from large sets of expert-annotated scans,
                which is why they generalize better to irregular anatomy than
                intensity-based methods do.
              </p>

              <h3>How the Models Work</h3>
              <p>
                Most published systems break the task into stages: localizing the
                region of interest, segmenting individual teeth, and segmenting
                bone separately, sometimes with a dedicated network stage to
                enhance contrast at bone boundaries before final delineation.
                Multi-class systems also classify each segmented tooth by type
                and position, which matters for treatment planning software that
                needs to know not just &ldquo;a tooth&rdquo; but &ldquo;the
                mandibular left first molar.&rdquo;
              </p>

              {/* Figure: Automated Anatomical Segmentation */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/di-1.webp"
                    alt="CBCT 3D Automated Anatomical Segmentation of Teeth, Bone and Canal"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • CBCT 3D Automated Anatomical Segmentation of Teeth,
                  Bone &amp; Nerve Canal
                </figcaption>
              </figure>
            </section>

            {/* How Accurate Is AI Segmentation Compared With Manual Methods? */}
            <section id="accuracy-evidence">
              <h2>
                How Accurate Is AI Segmentation Compared With Manual Methods?
              </h2>
              <p>
                The evidence base here is larger and more consistent than for
                many other AI applications in dentistry.
              </p>
              <p>
                A deep-learning system validated on real-patient CBCT data,
                published in Nature Communications, reported average Dice scores
                of 91.5% for tooth segmentation and 93.0% for alveolar bone
                segmentation — Dice score measuring overlap between the AI output
                and ground truth, where 100% is perfect agreement — and the
                system performed consistently even on cases with dental
                abnormalities. A separate 3D U-Net framework trained and tested
                on nearly 200 CBCT scans achieved segmentation more than 1,800
                times faster than an expert, with a mean difference from ground
                truth of roughly half a millimeter on Hausdorff distance, a
                measure of maximum boundary deviation. A broader systematic
                review evaluating AI segmentation of teeth, jawbone, and the
                mandibular (inferior alveolar) canal across 30 studies concluded
                that deep-learning models demonstrate accuracy comparable to
                expert manual segmentation.
              </p>
              <p>
                Accuracy is not uniform across structures, however. Alveolar
                ridge and tooth segmentation models have reported Dice scores
                above 0.97 in some studies, while mandibular canal segmentation —
                a thinner, lower-contrast, more anatomically variable structure —
                has shown more moderate performance in comparison, with at least
                one recent study reporting a Dice score closer to 0.56 for the
                canal specifically, even where bone segmentation in the same
                system exceeded 0.98. This gap matters clinically: the
                mandibular canal is precisely the structure where a positioning
                error has the most serious consequences.
              </p>
            </section>

            {/* AI Segmentation for Implant Planning */}
            <section id="implant-planning">
              <h2>AI Segmentation for Implant Planning</h2>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Application 1</span>
                  <h3>Mandibular Canal and Sinus Delineation</h3>
                  <p>
                    Several deep-learning tools developed specifically for
                    implant planning target the mandibular canal, including its
                    anterior loop and bifid variations, both of which are easy to
                    miss or underestimate on manual review. One validated tool
                    achieved accurate canal segmentation even in the presence of
                    an anterior loop, with median segmentation times of roughly
                    22 seconds for the fully automated output. A separate
                    voxel-based system reported accuracy figures around 92% for
                    mandibular canal, 92% for maxillary sinus, and 92% for
                    missing-tooth bone region segmentation in an implant-planning
                    context. Thesis-level comparative work has also found AI
                    segmentation of the mandibular canal showing lower
                    variability than segmentation performed by junior clinicians,
                    closer to an experienced-operator reference standard — though
                    this remains early-stage, single-study evidence rather than
                    an established finding.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Application 2</span>
                  <h3>Edentulous Bone and Site Assessment</h3>
                  <p>
                    A related application segments the edentulous alveolar ridge
                    itself, delineating available bone volume at a planned
                    implant site before any digital plan is built around it.
                    Studies developing this capability describe it as the first
                    stage in digital implant planning, feeding directly into
                    implant size, direction, and depth selection, and report good
                    agreement with manual measurement, though this remains an
                    earlier-stage application than tooth or full-arch bone
                    segmentation.
                  </p>
                </div>

                <div
                  className="photo-step-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <span className="photo-step-badge">Application 3</span>
                  <h3>From Segmentation to Surgical Guide</h3>
                  <p>
                    Once teeth, bone, sinus, and canal are segmented as individual
                    STL structures, that output becomes the digital model used
                    for virtual implant planning and, where appropriate, static
                    or dynamic guided surgery — the same CBCT-based planning
                    foundation discussed elsewhere on this site in relation to
                    dynamic navigation and digital implant workflows. Commercial
                    platforms built around this capability typically combine
                    CBCT segmentation with intraoral scan merging in a single
                    workflow, producing a unified digital model for planning,
                    patient communication, and guide design.
                  </p>
                </div>
              </div>

              {/* Figure: Digital Planning Pipeline */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/digitalsection.webp"
                    alt="Digital Planning Pipeline and 3D Model Integration"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Unified Digital Model: Integrating Segmented Bone
                  with Surgical Trajectory
                </figcaption>
              </figure>
            </section>

            {/* AI Segmentation on Intraoral Scans */}
            <section id="intraoral-scans">
              <h2>AI Segmentation on Intraoral Scans</h2>
              <p>
                Segmentation is not limited to CBCT. Intraoral scan (IOS) data
                also requires individual tooth separation for orthodontic
                simulation, prosthodontic design, and implant treatment planning,
                and semi-automatic segmentation in conventional CAD software has
                well-documented limitations — it is labor-intensive, requires
                manual correction, and depends heavily on operator expertise.
              </p>
              <p>
                A 3D U-Net pipeline developed specifically for IOS data
                demonstrated average automated segmentation times of roughly 32
                seconds per jaw, and in clinical applicability testing,
                AI-assisted refinement cut segmentation time by more than half
                compared with conventional semi-automatic methods while matching
                or exceeding their reliability. In the same study, fully
                automated segmentation with no manual refinement at all was
                faster still, though the authors evaluated it as a separate mode
                from the refined and semi-automatic approaches rather than
                claiming it was interchangeable with them in every case.
              </p>
              <p>
                This matters for digital implant workflows broadly, since
                intraoral scan segmentation sits alongside CBCT segmentation as
                one of the data-processing steps that determines how clean the
                final digital model is before CAD design begins. A poorly
                segmented tooth boundary at this stage, carried forward into
                implant planning or restorative design, is a quiet source of the
                kind of cumulative error discussed elsewhere in the context of
                digital workflow accuracy — a reminder that segmentation quality
                deserves the same scrutiny as scanning or CAD/CAM accuracy, even
                though it happens earlier and less visibly in the process.
              </p>
            </section>

            {/* Segmentation Applications Beyond Implant Planning */}
            <section id="beyond-implant-planning">
              <h2>Segmentation Applications Beyond Implant Planning</h2>
              <p>
                Implant planning is where segmentation accuracy has the clearest
                safety stakes, but the same underlying technology supports
                several other clinical uses worth being aware of.
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Periodontal ligament mapping</h3>
                  <p>
                    An instance-segmentation approach using a Mask R-CNN network
                    has been used to automatically delineate the periodontal
                    ligament space on CBCT, defined as the region where segmented
                    tooth and alveolar bone structures overlap. Reported
                    segmentation accuracy reached 100% for incisors, canines,
                    premolars, third molars, and implant sites in one study,
                    dropping to 96.4% for molars — a tool with potential
                    chairside relevance for periodontists, orthodontists, and
                    implantologists assessing ligament space without manual
                    measurement.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Tooth autotransplantation and surgical guides</h3>
                  <p>
                    Segmented tooth models have been used to 3D print donor tooth
                    replicas and sockets for autotransplantation planning,
                    letting the surgical team rehearse fit before the donor tooth
                    is ever removed.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Orthodontic and prosthodontic design</h3>
                  <p>
                    On intraoral scan data, individual tooth segmentation
                    underlies treatment simulation, aligner design, and
                    prosthodontic CAD workflows — the same category of task
                    discussed above for implant-focused CAD/CAM, just applied to
                    tooth movement and restorative design rather than implant
                    positioning.
                  </p>
                </article>
              </div>

              <p style={{ marginTop: "20px" }}>
                These applications share the same dependency on segmentation
                accuracy as implant planning does, and the same caution about
                structure-specific performance and external validation applies
                across all of them.
              </p>
            </section>

            {/* Limitations and Where Manual Verification Still Matters */}
            <section id="limitations">
              <h2>Limitations and Where Manual Verification Still Matters</h2>
              <p>
                The clinical accuracy figures above should not be read as a
                guarantee that any given AI segmentation output is ready to plan
                surgery from without review. Several specific limitations are
                documented in the literature.
              </p>

              <div className="photo-feature-grid">
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <h3>Metal artifact</h3>
                  <p>
                    Restorations, crowns, and metal implants degrade CBCT image
                    quality through beam hardening and scatter, and this is
                    consistently flagged as a factor that complicates both
                    manual and automated mandibular canal and bone segmentation.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <h3>Generalizability across scanners</h3>
                  <p>
                    Several studies note that models trained and validated on a
                    single CBCT machine or a narrow patient population may not
                    generalize reliably to other scanners, acquisition settings,
                    or demographics — a limitation inherent to how these models
                    are trained, not specific to any one product.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <h3>Structure-dependent accuracy</h3>
                  <p>
                    As the mandibular canal data above shows, accuracy is not
                    uniform; thin, low-contrast, or highly variable structures
                    remain harder to segment reliably than bulk bone or
                    individual teeth, and anatomical variations such as bifid
                    canals have shown measurably lower segmentation accuracy than
                    the standard canal path in at least one recent study.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">04</span>
                  <h3>External validation gaps</h3>
                  <p>
                    A technical validation study of a commercially available
                    intraoral scan segmentation algorithm specifically noted that
                    the external validity of most available systems remains
                    unclear, and called for standardized datasets, external
                    validation, and clinically relevant performance metrics — not
                    accuracy figures reported only on a vendor&apos;s own internal
                    test set — before broader clinical reliance is warranted.
                  </p>
                </article>
              </div>

              <div className="photo-callout" style={{ marginTop: "20px" }}>
                None of this means AI segmentation is unreliable; the overall
                evidence base, particularly for teeth and bulk alveolar bone, is
                genuinely strong. It means the appropriate clinical posture is
                the same one that applies to any digital planning tool: treat the
                automated output as a highly efficient starting point, and
                review structures — particularly the mandibular canal and any
                site affected by metal artifact — before committing to implant
                positioning or guide fabrication.
              </div>
            </section>

            {/* Practical Takeaways for Clinicians Evaluating AI Segmentation Tools */}
            <section id="practical-takeaways">
              <h2>
                Practical Takeaways for Clinicians Evaluating AI Segmentation
                Tools
              </h2>

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
                  Ask what the reported accuracy figures actually measure. A Dice
                  score for bulk bone segmentation and a Dice score for
                  mandibular canal segmentation from the same system can differ
                  substantially; a single headline accuracy number can obscure
                  this.
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
                  Check whether validation was external. Accuracy reported on the
                  same dataset used for training tends to overstate real-world
                  performance; look for studies or documentation describing
                  validation on independent scans.
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
                  Expect variable performance with metal artifact. If a
                  significant share of your case mix involves existing
                  restorations or implants near the planning site, ask
                  specifically how the system handles artifact-affected regions.
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
                  Keep manual review in the workflow, particularly around the
                  mandibular canal, sinus floor, and any anatomically atypical
                  case, rather than treating automated segmentation as a final,
                  unreviewed output.
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
                  Confirm the output format fits your downstream workflow —
                  whether the STL files integrate cleanly with your implant
                  planning, guided surgery, or CAD/CAM software before adopting
                  a tool into routine use.
                </div>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <section id="faq">
              <h2>Frequently Asked Questions</h2>
              <div className="photo-faq-wrap">
                <div className="photo-faq-item">
                  <details open>
                    <summary>What is AI segmentation in dentistry?</summary>
                    <p>
                      AI segmentation uses deep learning, most commonly
                      convolutional neural networks based on the U-Net
                      architecture, to automatically identify and separate
                      individual anatomical structures — teeth, alveolar bone, the
                      mandibular canal, sinus — from CBCT or intraoral scan data,
                      producing usable 3D models in seconds instead of the many
                      minutes manual tracing requires.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      How accurate is AI tooth and bone segmentation compared
                      with manual segmentation?
                    </summary>
                    <p>
                      Validated systems have reported accuracy comparable to
                      expert manual segmentation for teeth and bulk alveolar bone,
                      with Dice scores commonly above 0.90 in peer-reviewed
                      studies, though accuracy is lower and more variable for
                      thinner, lower-contrast structures such as the mandibular
                      canal.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Can AI segmentation be used for dental implant planning?
                    </summary>
                    <p>
                      Yes — AI segmentation of the mandibular canal, maxillary
                      sinus, and edentulous bone has been developed and validated
                      specifically to support implant planning, and its output
                      can feed into virtual implant planning and guided surgery
                      workflows, though mandibular canal segmentation accuracy
                      remains more variable than bone or tooth segmentation and
                      benefits from clinical review.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Does metal artifact affect AI segmentation accuracy?
                    </summary>
                    <p>
                      Yes. Existing restorations and metal implants degrade CBCT
                      image quality through beam hardening and scatter, and this
                      is a documented limitation for both manual and AI-based
                      segmentation, particularly affecting structures located
                      near the artifact-affected region.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      Is AI segmentation reliable enough to skip manual review?
                    </summary>
                    <p>
                      Current evidence does not support skipping manual review
                      entirely, especially for critical structures like the
                      mandibular canal or in cases with metal artifact or unusual
                      anatomy; AI segmentation is best treated as a fast, highly
                      accurate starting point that still benefits from clinician
                      verification before surgical planning decisions are
                      finalized.
                    </p>
                  </details>
                </div>

                <div className="photo-faq-item">
                  <details>
                    <summary>
                      What is the difference between CBCT segmentation and
                      intraoral scan segmentation?
                    </summary>
                    <p>
                      CBCT segmentation separates 3D volumetric structures such
                      as teeth, bone, and the mandibular canal from a
                      radiographic dataset, while intraoral scan segmentation
                      separates individual teeth from a surface mesh captured by a
                      scanner; both are used in digital dental workflows but
                      serve different planning needs and use different underlying
                      data formats.
                    </p>
                  </details>
                </div>
              </div>
            </section>

            {/* Explore Digital Implant Planning Solutions */}
            <section id="explore-solutions">
              <h2>Explore Digital Implant Planning Solutions</h2>
              <p>
                AI-based segmentation is becoming a standard early step in the
                digital implant workflow, turning a CBCT dataset into usable 3D
                structures in seconds rather than the better part of an hour —
                but it works best as a starting point that clinicians verify,
                not a replacement for clinical judgment around the mandibular
                canal, sinus, and other critical anatomy. Clinicians building out
                a fully digital planning pipeline can review the CBCT-based
                navigation, photogrammetry, and guided surgery technologies
                available through Marks Biotech&apos;s product pages to see how
                segmented data carries through to surgical execution.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • DIGITAL DENTISTRY WORKFLOWS
                  </div>
                  <h2>Precision Digital Planning &amp; Navigation</h2>
                  <p>
                    From high-resolution CBCT data processing to dynamic surgical
                    guidance with Navident and full-arch photogrammetry with
                    MicronMapper, explore the complete digital chain.
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
                      Explore Digital Products{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                    <Link className="photo-btn light" to="/blog/3">
                      Photogrammetry Guide{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>AI</span>
                  <small>
                    3D CBCT
                    <br />
                    SEGMENT
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
