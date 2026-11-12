import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/blog-3.css";

export default function BlogOne({ scrollProgress = 0 }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Morse Taper Connection | Marks Biotech";

    const sectionIds = ["overview", "summary", "conexa"];

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
    const title = "Morse Taper Connection | Marks Biotech";

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
            <span className="current">Morse Taper Connection</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <header className="photo-hero">
        <div className="photo-container photo-hero-grid">
          <div>
            <div className="photo-eyebrow">
              <span>Dental Implant Technology</span> • <span>Biomechanical Seal</span>
            </div>
            <h1 itemProp="headline">Morse Taper Connection</h1>
            <p className="photo-hero-desc" itemProp="description">
              In 1864 an engineer named Stephen Morse conceptualised the
              mechanical phenomenon stating that when twoconical metal components
              (female + male) reach a tight contact, these fix one into the
              other, through a the so called &quot;cold welding&quot;. To obtain a
              real Morse effect, the conical sides of the components must not
              exceed a 50 overall inclination.
            </p>
            <div className="photo-meta">
              <span className="photo-meta-tag">Implant Engineering</span>
              <span className="photo-meta-dot">•</span>
              <span>Hermetic Seal &amp; Microleakage Prevention</span>
              <span className="photo-meta-dot">•</span>
              <span>Marks Biotech</span>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="photo-hero-image-card">
            <img
              src="/assets/imgs/blog-1.webp"
              alt="Morse Taper Connection"
              className="photo-hero-img"
              itemProp="image"
              loading="eager"
            />
            <div className="photo-hero-img-caption">
              <i
                className="fa-solid fa-certificate"
                style={{ color: "var(--b3-red)" }}
              ></i>
              Morse Taper Connection
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
              href="#overview"
              className={activeSection === "overview" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "overview")}
            >
              Morse Taper Connection
            </a>
            <a
              href="#summary"
              className={activeSection === "summary" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "summary")}
            >
              In summary:
            </a>
            <a
              href="#conexa"
              className={activeSection === "conexa" ? "active" : ""}
              onClick={(e) => scrollToSection(e, "conexa")}
            >
              B&amp;B Dental CONEXA
            </a>
          </aside>

          {/* Article Body */}
          <div className="photo-article-body">
            {/* Overview / Background */}
            <section id="overview">
              <p>
                In 1864 an engineer named Stephen Morse conceptualised the mechanical
                phenomenon stating that when twoconical metal components (female +
                male) reach a tight contact, these fix one into the other, through a
                the so called &quot;cold welding&quot;. To obtain a real Morse
                effect, the conical sides of the components must not exceed a 50
                overall inclination.
              </p>

              <p>
                In the following years, this mechanism was widely employed in
                mechanical and industrial fields (lathes, millingmachines…) and in
                prosthetic fields (orthopaedic and medical), to create and use
                modular components whichnecessitated a high structural stability.
              </p>

              <p>
                Implantology, which is a relatively recent branch in both
                medicine and therefore dentistry, employs these precisionmechanical
                elements to build and consolidate dental reconstructions. For
                decades, dental implants with anexternal connection have been used in
                prosthetic surgeries, coherently with the instruments and knowledge
                ofthat time. The development and advancement of the industrial
                technology made it possible to adopt the hexagonalinternal
                connection and later on the addition of a conical or a cone Morse
                connexion. Today this particular kind ofproduct is increasingly used
                during successful placements of dental implants, both in case of a
                complete or singleedentulous situation.
              </p>

              <p>
                By exploiting the solidity granted by the Morse connection, it was
                possible to eectively answer to challenges andneeds posed by
                implantologists. Namely, the need to preserve at their best
                peri-implant hard tissues, so that theycan adequately support soft
                tissues and their optimal healing.
              </p>

              <p>
                Many clinical and in vitro trials show that, at the time being,
                internal Morse connexion is the most ecient optionamongst the ones
                on the market to perform successful implant surgeries, with
                long-lasting results thanks to itsanti-bacterial action:
              </p>

              <div className="photo-callout" style={{ marginTop: "24px", marginBottom: "24px" }}>
                <p style={{ margin: 0 }}>
                  (1) “Implants with an internal connection of the Morse taper
                  type show lower levels of microleakage than those with
                  anexternal connection regardless of the torque applied to tighten
                  the screw, so they would be less likely to developin
                </p>
              </div>
            </section>

            {/* In Summary */}
            <section id="summary" style={{ marginTop: "40px" }}>
              <h2>In summary:</h2>

              <div className="photo-feature-grid" style={{ marginTop: "24px" }}>
                <article className="photo-feature">
                  <span className="photo-feature-num">01</span>
                  <p>
                    The “cold welding” between the interfaceabutment/implant
                    creates a hermetic seal thanks to its extra-tight friction,
                    virtuallyeliminating the micro-gaps usually existingbetween
                    both metal components. Thisprevents bacteria to spread and
                    developacross the dento-gingival junction, minimisingthe
                    probability of infammatory processesinsurgence.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">02</span>
                  <p>
                    The firm mechanical stability reduces micro-movements,
                    potentially very dangerous forthe regenerating bone and the
                    adjacenttissues.
                  </p>
                </article>

                <article className="photo-feature">
                  <span className="photo-feature-num">03</span>
                  <p>
                    The prosthetic structure sustained by an internal connection
                    can tolerate greater chewing loads.
                  </p>
                </article>
              </div>
            </section>

            {/* B&B Dental CONEXA section */}
            <section id="conexa" style={{ marginTop: "48px" }}>
              <div
                className="photo-product-frame"
                style={{
                  background: "#f8fafc",
                  border: "1px solid var(--b3-line)",
                  borderRadius: "16px",
                  padding: "28px",
                  textAlign: "center",
                  marginBottom: "32px",
                }}
              >
                <img
                  src="/assets/imgs/blog-1.1.webp"
                  alt="Blog 1 1 - Marks Biotech"
                  className="photo-product-img"
                  loading="lazy"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "360px",
                    objectFit: "contain",
                    margin: "0 auto",
                    display: "block",
                  }}
                />
                <span
                  className="photo-product-badge"
                  style={{
                    display: "inline-block",
                    marginTop: "16px",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "var(--b3-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Blog 1 1 - Marks Biotech
                </span>
              </div>

              <p>
                B&amp;B Dental’s CONEXA connection is characterized by a cone
                Morse connection with an internal hexagonal indexthat allows a more
                accurate placing of the implants in the bone cavity, with
                significantly reduced traumas for thesurrounding tissues.
              </p>

              <p>
                These specific features promote an increased osseointegration, a
                higher level of bone and volumes regeneration, ahealthy and solid
                gingiva once the healing process is completed. In this case,
                post-surgical complicationsimmediately after the procedure and in
                the following years are drastically reduced so the patient won’t
                have toundergo an additional repairing surgery.
              </p>

              <p>
                Clearly, post-surgeryresults must be assimilar as possible tothe
                patients’ naturaldental state,regarding colour,looks, volumes. It
                isnecessary to avoidthe creation of gapsbetween theprosthesis and
                theabutment, betweennatural and rebuiltteeth, the gingivamust
              </p>

              <p>
                B&amp;B Dental builds different lines ofimplants with theMorse
                connexion, called Conexa, because it recognisesits advantages
                bothfor the clinician, whowill operate withincreased security,and
                for the patient,who will experience afaster anduntroubled
                healingprocess.
              </p>

              <p>
                B&amp;B Dental production is entirelyMade in Italy,abutments
                andimplants are realisedin a complementaryway, in the sameproduction
                plant.This guarantees the absolute compatibility of the components
                and their high-level quality, in compliance withinternational
                requirements.
              </p>
            </section>

            {/* Social Sharing & Back Link */}
            <div className="photo-share-wrap" style={{ marginTop: "48px" }}>
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
