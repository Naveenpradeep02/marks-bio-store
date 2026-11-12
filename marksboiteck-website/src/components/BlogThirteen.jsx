import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogThirteen({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Tissue Adhesives in Dentistry | Marks Biotech";

    const sectionIds = [
      "intro",
      "why-not-sutures",
      "what-adhesives-are",
      "evidence",
      "what-they-do-well",
      "sutures-edge",
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
    const title = "Tissue Adhesives in Dentistry | Marks Biotech";

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
            <span className="current">Tissue Adhesives in Dentistry</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Surgical Biomaterials</span> • <span>Wound Closure</span>
            </div>
            <h1 itemProp="headline">Tissue Adhesives in Dentistry</h1>
            <p className="photo-hero-desc" itemProp="description">
              Comparing cyanoacrylate formulations and fibrin sealants against
              conventional sutures: wound healing, chair time, graft fixation,
              and tension thresholds.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Cyanoacrylate Adhesives</span>
              <span className="photo-meta-dot">•</span>
              <span>Periodontal Flap Closure</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-13.webp"
              alt="Tissue Adhesives in Dentistry - Amcrylate Cyanoacrylate"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-droplet"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Tissue Adhesives • Cyanoacrylate Wound Closure &amp; Graft Fixation
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
              href="#why-not-sutures"
              className={activeSection === "why-not-sutures" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "why-not-sutures")}
            >
              Why Sutures Aren&apos;t Obvious
            </a>
            <a
              href="#what-adhesives-are"
              className={
                activeSection === "what-adhesives-are" ? "active" : ""
              }
              onClick={(e) => scrollToSection(e, "what-adhesives-are")}
            >
              What Adhesives Actually Are
            </a>
            <a
              href="#evidence"
              className={activeSection === "evidence" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "evidence")}
            >
              Where the Evidence Points
            </a>
            <a
              href="#what-they-do-well"
              className={activeSection === "what-they-do-well" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "what-they-do-well")}
            >
              What Adhesives Do Well
            </a>
            <a
              href="#sutures-edge"
              className={activeSection === "sutures-edge" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "sutures-edge")}
            >
              Where Sutures Have the Edge
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
                <strong>Core Concept:</strong> Tissue adhesives — predominantly
                cyanoacrylate-based formulations, with fibrin sealants used in
                select cases — are liquid or gel biomaterials that polymerize on
                contact with tissue moisture to close oral surgical wounds without
                needle penetration. Current systematic reviews report that wound
                healing with tissue adhesives is comparable to, and in several
                measures better than, conventional sutures for periodontal flap
                closure and soft-tissue graft fixation, with the added
                advantages of faster application and no suture-removal visit —
                though sutures still hold the edge in high-tension or heavily
                mobile sites.
              </div>
              <p>
                If chair time, patient comfort, and a follow-up visit for suture
                removal are all things you&apos;d rather not spend on a routine
                flap closure, this is the category worth understanding properly
                rather than dismissing as a gimmick.
              </p>
            </section>

            {/* Why Sutures Aren't Always the Obvious Choice */}
            <section id="why-not-sutures">
              <h2>Why Sutures Aren&apos;t Always the Obvious Choice</h2>
              <p>
                Sutures work. They&apos;ve closed oral surgical wounds reliably
                for decades, and nothing here argues they should be abandoned.
                But they come with trade-offs that are easy to overlook simply
                because they&apos;re familiar: needle penetration adds a discrete
                injury at every suture site, tight sutures can strangulate tissue
                and compromise local blood supply, and most techniques require a
                second visit purely for removal — an appointment that adds
                nothing clinically beyond undoing what the first visit did.
              </p>
              <p>
                Tissue adhesives were developed specifically to sidestep these
                trade-offs in appropriate cases — not to replace sutures
                everywhere, but to offer a genuinely different closure mechanism
                where the clinical situation suits it.
              </p>
            </section>

            {/* What Tissue Adhesives Actually Are */}
            <section id="what-adhesives-are">
              <h2>What Tissue Adhesives Actually Are</h2>
              <p>
                The dominant category in oral and periodontal surgery is
                cyanoacrylate — a liquid monomer that polymerizes almost instantly
                on contact with moisture (including blood and tissue fluid),
                forming a flexible bond across the wound margins. Several
                cyanoacrylate variants are used clinically, differing mainly in
                the length of their alkyl chain, which affects flexibility,
                degradation rate, and bond strength:
              </p>

              <div className="photo-step-grid">
                <div className="photo-step-card">
                  <span className="photo-step-badge">Variant 1</span>
                  <h3>n-butyl-2-cyanoacrylate</h3>
                  <p>
                    One of the most studied formulations in periodontal and oral
                    surgery literature, favored for its balance of flexibility
                    and bond strength.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Variant 2</span>
                  <h3>Isoamyl 2-cyanoacrylate</h3>
                  <p>
                    Slower degrading and somewhat more flexible, used in
                    several comparative periodontal flap studies.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Variant 3</span>
                  <h3>2-octyl cyanoacrylate</h3>
                  <p>
                    A longer-chain variant with greater flexibility, more
                    common in dermatologic use but studied intraorally as well.
                  </p>
                </div>

                <div className="photo-step-card">
                  <span className="photo-step-badge">Biological Sealant</span>
                  <h3>Fibrin sealants</h3>
                  <p>
                    Derived from pooled or autologous blood components,
                    represent a biologically different approach — promoting
                    hemostasis and tissue approximation through the clotting
                    cascade itself rather than a synthetic polymer bond. They
                    appear less frequently in the oral surgery literature than
                    cyanoacrylates but are specifically studied for applications
                    like third-molar extraction socket management.
                  </p>
                </div>
              </div>

              {/* Figure 1 */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/amcrylate-pack.jpeg"
                    alt="Amcrylate medical cyanoacrylate tissue adhesive packaging"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 1 • Medical Grade Cyanoacrylate Tissue Adhesive (Amcrylate)
                  for Needle-Free Wound Closure
                </figcaption>
              </figure>
            </section>

            {/* Where the Evidence Actually Points */}
            <section id="evidence">
              <h2>Where the Evidence Actually Points</h2>

              <h3>Periodontal flap closure</h3>
              <p>
                A 2025 systematic review and meta-analysis in Frontiers in Oral
                Health (Jeevitha, Kaarthikeyan, Natarajan), registered with
                PROSPERO, pooled 10 studies comparing tissue adhesives against
                sutures for periodontal flap wound closure, evaluated by standard
                wound healing indices. The conclusion: wound healing with tissue
                adhesives was better or comparable to sutures across the
                reviewed studies — cyanoacrylate and 3-0 black silk were the most
                commonly compared materials.
              </p>
              <p>
                A separate comparative study found cyanoacrylate showed less
                inflammation than sutures during the first week post-surgery,
                with both approaches converging to similar healing patterns by 21
                days to 6 weeks — and no statistically significant difference in
                pain, analgesic intake, or modified early wound healing index
                between the two.
              </p>

              <h3>Free gingival graft and connective tissue graft fixation</h3>
              <p>
                A 2025 systematic review and meta-analysis in the Journal of
                Esthetic and Restorative Dentistry (Negre et al.) comparing
                cyanoacrylate against sutures specifically for free gingival
                graft fixation found no significant difference in recession
                reduction or keratinized tissue height gain, with a small but
                clinically negligible difference favoring the adhesive for
                probing-depth reduction. A broader 2024 systematic review and
                meta-analysis in the International Wound Journal (Medeiros et
                al.), pooling 15 studies across 477 patients, reported that
                cyanoacrylate closure of the connective tissue graft donor site
                was approximately five minutes faster than conventional suturing
                — a meaningful reduction in total procedure time without a
                corresponding loss in closure quality.
              </p>

              <h3>Extraction sockets and minor oral surgery</h3>
              <p>
                Multiple randomized controlled trials cited across a 2025
                scoping review in Medicina (Gerardi et al.) — covering RCTs
                published 2015–2025 — found cyanoacrylate performed favorably
                compared with sutures following impacted third-molar removal and
                other minor oral surgical procedures, with several studies
                reporting reduced postoperative pain, swelling, and analgesic
                requirement in the adhesive group. The same scoping
                review&apos;s overall conclusion was that cyanoacrylate tissue
                adhesives represent a valid alternative to sutures in several
                surgical contexts, particularly procedures involving mucogingival
                grafts.
              </p>

              <h3>Guided tissue regeneration and membrane fixation</h3>
              <p>
                Cyanoacrylate has also been studied as a fixation method for GTR
                membranes, offering an alternative to membrane-stabilizing
                sutures or tacks in select regenerative procedures — though this
                remains a narrower, less extensively studied application than
                flap closure or graft fixation.
              </p>

              {/* Figure 2 */}
              <figure className="photo-figure-frame">
                <div className="photo-figure-img-wrap">
                  <img
                    src="/assets/imgs/Tissue.webp"
                    alt="Soft tissue graft fixation and regenerative periodontal wound closure"
                    className="photo-figure-img"
                    loading="lazy"
                  />
                </div>
                <figcaption className="photo-figure-caption">
                  Figure 2 • Soft Tissue Healing &amp; Graft Stabilization in
                  Periodontal Reconstructive Procedures
                </figcaption>
              </figure>
            </section>

            {/* What Tissue Adhesives Do Well */}
            <section id="what-they-do-well">
              <h2>What Tissue Adhesives Do Well</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <strong>Faster application</strong> — closure in a fraction of
                  the time multiple interrupted sutures require, directly
                  reducing chair time.
                </div>

                <div className="photo-limits-item">
                  <strong>No suture-removal visit</strong> — the adhesive degrades
                  or sloughs off naturally, eliminating a follow-up appointment
                  that exists purely to reverse the first one.
                </div>

                <div className="photo-limits-item">
                  <strong>No needle penetration</strong> — avoiding the
                  additional point-injury and associated discomfort each suture
                  throw introduces.
                </div>

                <div className="photo-limits-item">
                  <strong>Bacteriostatic properties</strong> — several reviews
                  note cyanoacrylate&apos;s inherent antibacterial activity
                  against certain organisms, a property sutures don&apos;t
                  share.
                </div>

                <div className="photo-limits-item">
                  <strong>Hemostatic effect</strong> — the rapid polymerization
                  helps control minor bleeding at the wound margin during
                  application.
                </div>

                <div className="photo-limits-item">
                  <strong>Comparable or better early wound healing</strong> in
                  multiple head-to-head comparisons, particularly in the first
                  post-operative week.
                </div>
              </div>
            </section>

            {/* Where Sutures Still Have the Edge */}
            <section id="sutures-edge">
              <h2>Where Sutures Still Have the Edge</h2>

              <div className="photo-limits-grid">
                <div className="photo-limits-item">
                  <strong>High-tension closures.</strong> Cyanoacrylate bonds are
                  strong but more brittle under tension than a properly placed
                  suture; wounds under meaningful mechanical load are still better
                  served by sutures, particularly where primary closure requires
                  active approximation rather than simple surface sealing.
                </div>

                <div className="photo-limits-item">
                  <strong>Highly mobile sites.</strong> Areas with significant
                  tissue movement (certain vestibular or floor-of-mouth locations)
                  can compromise adhesive bond integrity before healing
                  progresses.
                </div>

                <div className="photo-limits-item">
                  <strong>Technique sensitivity.</strong> Cyanoacrylate must be
                  applied to a relatively dry field in a controlled, thin layer
                  — excess pooling can create a brittle, poorly adapted bond,
                  and inadequate hemostasis before application undermines the
                  seal.
                </div>

                <div className="photo-limits-item">
                  <strong>Evidence base still maturing.</strong> Several of the
                  reviews above explicitly call for larger, standardized
                  randomized trials; current conclusions, while consistently
                  favorable, are often built on relatively small individual
                  studies with varying protocols.
                </div>

                <div className="photo-limits-item">
                  <strong>Not a substitute for proper flap design and tension-free closure.</strong> An
                  adhesive closes a wound; it doesn&apos;t correct a flap that was
                  poorly designed or closed under avoidable tension in the first
                  place.
                </div>
              </div>
            </section>

            {/* FAQ Section */}
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
                    Is cyanoacrylate tissue adhesive as strong as sutures?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Not under tension — cyanoacrylate bonds are reliable for
                    tension-free or low-tension closures but are more brittle than
                    sutures under mechanical load, which is why high-tension sites
                    still favor conventional suturing.
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
                    Do tissue adhesives need to be removed like sutures?
                  </h3>
                  <p style={{ margin: 0 }}>
                    No. Most formulations degrade or slough off naturally within
                    one to two weeks, eliminating the need for a dedicated
                    suture-removal appointment.
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
                    Does tissue adhesive cause more or less pain than sutures?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Multiple comparative studies report similar or lower pain and
                    reduced analgesic requirement with cyanoacrylate compared with
                    sutures, particularly in periodontal flap and minor oral
                    surgery applications.
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
                    Can tissue adhesive be used for free gingival graft fixation?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Yes — a 2025 systematic review found no significant difference
                    in clinical outcomes (recession reduction, keratinized tissue
                    gain) between cyanoacrylate and sutures for free gingival
                    graft fixation around natural teeth.
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
                    What&apos;s the main downside of using tissue adhesive instead of sutures?
                  </h3>
                  <p style={{ margin: 0 }}>
                    Technique sensitivity and reduced reliability under tension
                    — the field must be relatively dry for a good bond, and
                    tension-bearing closures are still better served by sutures.
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Tissue adhesives, led by cyanoacrylate formulations, have moved
                well beyond novelty status in oral and periodontal surgery. The
                current evidence — spanning periodontal flap closure, free
                gingival graft fixation, extraction sockets, and minor oral
                surgery — consistently shows comparable or better early healing
                than sutures, with genuine practical advantages in chair time
                and patient comfort. The honest caveat holds regardless: this is
                a tool for tension-free and low-tension closures, not a
                universal suture replacement, and flap design and surgical
                technique still matter more than which closure material finishes
                the job.
              </p>
              <p>
                Marks Biotech supplies tissue adhesive products for Indian dental
                practices alongside its implant and digital-workflow range — for
                product-specific details or to discuss fit for a particular
                procedure, reach the team at info@marksbiotech.com.
              </p>

              {/* Product CTA Card */}
              <div className="photo-product-cta" style={{ marginTop: "32px" }}>
                <div>
                  <div className="photo-eyebrow">
                    MARKS BIOTECH • REGENERATIVE BIOMATERIALS &amp; SURGICAL SOLUTIONS
                  </div>
                  <h2>Tissue Adhesives &amp; Regenerative Solutions</h2>
                  <p>
                    Discover Amcrylate medical cyanoacrylate tissue adhesives
                    and our complete range of biomaterials and membranes.
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
                    <a
                      className="photo-btn light"
                      href="mailto:info@marksbiotech.com"
                    >
                      Contact Team <i className="fa-solid fa-envelope"></i>
                    </a>
                  </div>
                </div>

                <div className="photo-orb">
                  <span>GLUE</span>
                  <small>
                    TISSUE
                    <br />
                    ADHESIVE
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
