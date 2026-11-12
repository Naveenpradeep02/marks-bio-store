import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import Threads from "../components/Threads";
import DuravitEV from "../components/DuravitEV";
import EVImplantTechnology from "../components/EVImplantTechnology";
import "../styles/home-navident.css";
import "../styles/navident-stage.css";
import "../styles/digital-workflow.css";

export default function Home() {
  const [activeCard, setActiveCard] = useState(0);

  // Navident Carousel State
  const [navidentSlide, setNavidentSlide] = useState(0);
  const [isNavidentHovered, setIsNavidentHovered] = useState(false);
  const navidentSectionRef = useRef(null);
  const [isNavidentVisible, setIsNavidentVisible] = useState(false);
  const totalNavidentSlides = 3;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavidentVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    if (navidentSectionRef.current)
      observer.observe(navidentSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const nextNavidentSlide = useCallback(() => {
    setNavidentSlide((prev) => (prev + 1) % totalNavidentSlides);
  }, [totalNavidentSlides]);

  const prevNavidentSlide = useCallback(() => {
    setNavidentSlide(
      (prev) => (prev - 1 + totalNavidentSlides) % totalNavidentSlides,
    );
  }, [totalNavidentSlides]);

  // Auto slide when not hovered
  useEffect(() => {
    if (
      !isNavidentVisible ||
      isNavidentHovered ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const interval = setInterval(() => {
      nextNavidentSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isNavidentHovered, isNavidentVisible, nextNavidentSlide]);

  const duravitCards = [
    {
      name: "Duravit 3P",
      bgClass: "purple",
      img: "/assets/imgs/1.webp",
      alt: "Duravit 3P dental implant",
      subtitle: "Universal Cylindrical Implant",
      desc: "Designed for high primary stability in soft and hard bone with double progressive thread design.",
      specs: [
        { label: "Diameter", val: "Ø 3.5 - 5.5 mm" },
        { label: "Connection", val: "Internal Hex" },
        { label: "Bone Type", val: "Class I - IV" },
        { label: "Surface", val: "S.L.A. Acid Etched" },
      ],
      link: "/all-products",
    },
    {
      name: "Duravit EV",
      bgClass: "green",
      img: "/assets/imgs/2.webp",
      alt: "Duravit EV dental implant",
      subtitle: "Conical Morse Taper Seal",
      desc: "Advanced Morse Taper conical connection ensuring zero micro-movement and supreme crestal bone preservation.",
      specs: [
        { label: "Diameter", val: "Ø 3.0 - 5.0 mm" },
        { label: "Connection", val: "Morse Taper 11°" },
        { label: "Bone Type", val: "Ideal for Post-Extraction" },
        { label: "Surface", val: "Anodized Collar" },
      ],
      link: "/all-products",
    },
    {
      name: "Duravit Wide",
      bgClass: "cyan",
      img: "/assets/imgs/3.webp",
      alt: "Duravit Wide dental implant",
      subtitle: "Immediate Molar Replacement",
      desc: "Maximized emergency profile and wide platform designed specifically for immediate molar sites.",
      specs: [
        { label: "Diameter", val: "Ø 6.0 - 7.0 mm" },
        { label: "Connection", val: "Internal Octa / Hex" },
        { label: "Bone Type", val: "Molar Post-Extraction" },
        { label: "Surface", val: "S.L.A. Micro-grooved" },
      ],
      link: "/all-products",
    },
    {
      name: "Duravit Pterygo",
      bgClass: "red",
      img: "/assets/imgs/4.webp",
      alt: "Duravit Pterygo pterygoid implant",
      subtitle: "Atrophic Maxilla Solution",
      desc: "Engineered for pterygoid & tuberosity anchorage, eliminating the need for sinus lift procedures.",
      specs: [
        { label: "Lengths", val: "15 - 20 mm" },
        { label: "Connection", val: "Rigid Hex Lock" },
        { label: "Indication", val: "Graftless Atrophic Maxilla" },
        { label: "Anchorage", val: "Pterygoid Plate" },
      ],
      link: "/all-products",
    },
    {
      name: "Duravit Slim",
      bgClass: "yellow",
      img: "/assets/imgs/5.webp",
      alt: "Duravit Slim narrow implant",
      subtitle: "Narrow Ridge & Anterior Solution",
      desc: "Ultra-slim profile delivering maximum vascular preservation in tight interdental spaces and lower incisors.",
      specs: [
        { label: "Diameter", val: "Ø 2.5 - 3.0 mm" },
        { label: "Connection", val: "High-Tensile Titanium" },
        { label: "Indication", val: "Narrow Ridges / Incisors" },
        { label: "Loading", val: "Immediate Provisional" },
      ],
      link: "/all-products",
    },
    {
      name: "Duravit Mini",
      bgClass: "brown",
      img: "/assets/imgs/6.webp",
      alt: "Duravit Mini implant",
      subtitle: "Overdenture Stabilization",
      desc: "One-piece mini implant system for instant overdenture retention and minimally invasive placement.",
      specs: [
        { label: "Diameter", val: "Ø 2.0 - 2.5 mm" },
        { label: "Design", val: "1-Piece Ball Head" },
        { label: "Indication", val: "Denture Retention" },
        { label: "Protocol", val: "Flapless Surgery" },
      ],
      link: "/all-products",
    },
  ];

  return (
    <main>
      {/* =========================================================================
          STRAUMANN STYLE HERO SECTION
          ========================================================================= */}
      <section
        id="hero"
        className="hero-section straumann-hero theme-red"
        aria-label="Hero Banner"
      >
        {/* Hero Central Inner Container aligned with Header (1280px max-width) */}
        <div className="straumann-hero-inner">
          {/* Hero Content on the Left */}
          <div className="straumann-hero-content">
            {/* 3-Line Giant Headline */}
            <h1 className="straumann-headline three-lines-headline">
              <div className="headline-row line-1">
                <span className="text-white">MARKS BIOTECH</span>
              </div>
              <div className="headline-row line-2">
                <span className="text-white">FUTURE </span>
                <span className="text-red">DENTISTRY</span>
              </div>
              <div className="headline-row line-3">
                <span className="text-white">TODAY</span>
              </div>
            </h1>

            {/* Tagline */}
            <p className="straumann-tagline">
              Bridging Boundaries, Building Brilliance,
              <br />
              Together Towards Tomorrow
            </p>

            <div className="straumann-cta-row">
              <Link to="/products" className="hero-primary-pill-btn">
                <span>Explore Our Solutions</span>
                <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>

          {/* Hero Visual on the Right (Astronaut with Red Hexagons) */}
          <div className="straumann-hero-visual">
            <img
              src="/assets/imgs/hero.webp"
              alt="Marks Biotech Futuristic Dentistry Astronaut"
              className="straumann-hero-img astronaut-hero-img"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* SECTION 1 – AR / Navident */}
      <section
        id="navident-ar"
        className="navident-ar"
        aria-label="Navident Augmented Reality"
      >
        <div className="ar-layout">
          <div className="ar-visual">
            <div className="ar-visual-label">
              <span></span> A NEW PERSPECTIVE IN DENTISTRY
            </div>
            <div className="ar-artwork">
              <span className="ar-background-title" aria-hidden="true">
                AR
                <span className="ar-background-full-form">
                  AUGMENTED REALITY
                </span>
              </span>
              <span className="ar-background-glasses" aria-hidden="true">
                SPECIAL
                <br />
                GLASSES
              </span>
              <img
                src="/assets/imgs/hero-section.webp"
                alt="Navident AR glasses in dental surgery"
                loading="lazy"
                width="635"
                height="633"
              />
            </div>
            <div className="ar-visual-caption">
              <span className="ar-crosshair" aria-hidden="true">
                +
              </span>
              <div>
                <strong>See beyond the screen.</strong>
                <span>Augmented reality. Connected to your workflow.</span>
              </div>
            </div>
          </div>
          <div className="ar-content">
            <h2>
              VIRTUAL TO <span>REALITY</span>
            </h2>
            <h3>
              NAVIDENT OFFERS A SOLUTION OF AUGMENTED REALITY AR GLASSES
            </h3>
            <p className="ar-description">
              Navident is compatible with multiple Augmented Reality (AR)
              Glasses which will help the clinicians during surgery to view the
              patient jaw and the monitor screen at the same time on the Head
              Gear AR Glasses.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 – Video */}
      <section
        id="navident-video"
        className="section-2"
        aria-label="Navident Navoice Video"
      >
        <div className="navoice-heading">
          <div>
            <div className="ar-eyebrow">SEE IT IN ACTION</div>
            <h2>
              Meet Navident <span>Navoice.</span>
            </h2>
          </div>
          <p>
            Take a closer look at the Navident experience.
            <br />
            Watch the tutorial below.
          </p>
        </div>
        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/iE1CrhtRrSU"
            title="Navident Navoice – Robotic Dental Navigation Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* SECTION 3 – Navident Cards Slider */}
      <section
        id="navident-systems"
        ref={navidentSectionRef}
        className={`section-3 ${isNavidentVisible ? "navident-is-visible" : ""}`}
        aria-label="Navident Product Range"
        onMouseEnter={() => setIsNavidentHovered(true)}
        onMouseLeave={() => setIsNavidentHovered(false)}
        onFocusCapture={() => setIsNavidentHovered(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setIsNavidentHovered(false);
        }}
      >
        {/* Interactive Background Ambience & Grid */}
        <div className="navident-threads-background" aria-hidden="true">
          <Threads
            color={[0.12, 0.55, 1]}
            secondaryColor={[1, 1, 1]}
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>

        <div className="over-stack-container">
          {/* Prev Slide Button */}
          <button
            type="button"
            className="slider-btn prev-btn"
            onClick={prevNavidentSlide}
            aria-label="Previous Product Slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          {/* Smooth Carousel Track */}
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${navidentSlide * 100}%)`,
              transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Slide 1 – Navident 3.0 */}
            <div
              className={`over-con1 card ${navidentSlide === 0 ? "slide-is-active" : ""}`}
              inert={navidentSlide !== 0}
            >
              <div className="navident-card-inner-box">
                <div className="navident-stage-wordmark" aria-hidden="true">
                  NAVIDENT <span>3.0</span>
                </div>
                <span
                  className="navident-stage-cross cross-one"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="navident-stage-cross cross-two"
                  aria-hidden="true"
                >
                  +
                </span>
                <div className="nav3-text">
                  <div className="navident-slide-intro">
                    <h2 className="nav-product-title">
                      Navident <span>3.0</span>
                    </h2>
                    <p className="nav-product-desc">
                      Claronav Navident is a cutting-edge computer-guided
                      implant navigation solution that provides live, real-time
                      tracking during dental surgeries. It empowers dentists
                      with complete control over angle, depth, and position,
                      ensuring predictable and efficient implant outcomes.
                    </p>
                    <p className="nav-product-desc" style={{ marginTop: "14px" }}>
                      Built for precision-driven implantology and superior
                      clinical performance.
                    </p>
                  </div>
                  {/*
                  <div className="navident-specs-row">
                    <div className="spec-metric-box">
                      <span className="spec-val">&lt; 0.5 mm</span>
                      <span className="spec-lbl">Targeting Accuracy</span>
                    </div>
                    <div className="spec-metric-box">
                      <span className="spec-val">Real-time</span>
                      <span className="spec-lbl">Optical 3D Tracking</span>
                    </div>
                    <div className="spec-metric-box">
                      <span className="spec-val">Universal</span>
                      <span className="spec-lbl">Implant Compatibility</span>
                    </div>
                  </div>
                  */}

                  <div className="navident-card-actions">
                    <a href="#navident-video" className="navident-primary-cta">
                      <i className="fa-solid fa-play" aria-hidden="true"></i>
                      <span>Watch Live Demo</span>
                    </a>
                    <Link to="/all-products" className="navident-secondary-cta">
                      <span>Explore Catalog</span>
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>

                <div className="nav3-img navident-img-stage">
                  <div className="navident-device-glow-ring"></div>
                  <img
                    src="/assets/navident/navident-3 (2).png"
                    alt="Navident 3.0 computer-guided implant navigation system"
                    className="navident-device-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Slide 2 – Navident 4.0 EVO */}
            <div
              className={`over-con2 card ${navidentSlide === 1 ? "slide-is-active" : ""}`}
              inert={navidentSlide !== 1}
            >
              <div className="navident-card-inner-box">
                <div className="navident-stage-wordmark" aria-hidden="true">
                  NAVIDENT <span>4.0 EVO</span>
                </div>
                <span
                  className="navident-stage-cross cross-one"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="navident-stage-cross cross-two"
                  aria-hidden="true"
                >
                  +
                </span>
                <div className="nav3-text">
                  <div className="navident-slide-intro">
                    <h2 className="nav-product-title">
                      Navident <span>4.0 EVO</span>
                    </h2>
                    <p className="nav-product-desc">
                      Navident EVO is the latest in dental-surgical navigation
                      technology, designed to enhance the precision and improve
                      the results of hard-tissue dental surgeries.
                    </p>
                  </div>
                  {/*
                  <div className="navident-specs-row">
                    <div className="spec-metric-box">
                      <span className="spec-val">60 FPS</span>
                      <span className="spec-lbl">Stereo Visual Sensor</span>
                    </div>
                    <div className="spec-metric-box">
                      <span className="spec-val">Auto-Calib</span>
                      <span className="spec-lbl">Drill Handpiece Sync</span>
                    </div>
                    <div className="spec-metric-box">
                      <span className="spec-val">AR-Ready</span>
                      <span className="spec-lbl">Direct HUD Display</span>
                    </div>
                  </div>
                  */}

                  <div className="navident-card-actions">
                    <a
                      href="https://forms.gle/gaHuNfEUe9TzGB8s5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navident-primary-cta mb-navident-4-event-btn"
                    >
                      <i
                        className="fa-solid fa-calendar-check"
                        aria-hidden="true"
                      ></i>
                      <span>Register For Workshop Event</span>
                    </a>
                    <a
                      href="https://wa.me/919819893250"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navident-secondary-cta"
                    >
                      <i
                        className="fa-brands fa-whatsapp"
                        aria-hidden="true"
                      ></i>
                      <span>Request Demo Unit</span>
                    </a>
                  </div>
                </div>

                <div className="nav3-img navident-img-stage">
                  <div className="navident-device-glow-ring ring-cyan"></div>
                  <img
                    src="/assets/navident/navident-4-evo-4.png"
                    alt="Navident 4.0 EVO advanced surgical navigation"
                    className="navident-device-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Slide 3 – MicronMapper */}
            <div
              className={`over-con3 card ${navidentSlide === 2 ? "slide-is-active" : ""}`}
              inert={navidentSlide !== 2}
            >
              <div className="navident-card-inner-box">
                <div className="navident-stage-wordmark" aria-hidden="true">
                  MICRON<span>MAPPER</span>
                </div>
                <span
                  className="navident-stage-cross cross-one"
                  aria-hidden="true"
                >
                  +
                </span>
                <span
                  className="navident-stage-cross cross-two"
                  aria-hidden="true"
                >
                  +
                </span>
                <div className="nav3-text">
                  <div className="navident-slide-intro">
                    <h2 className="nav-product-title">
                      Experience Precision and Predictability with{" "}
                      <span>MicronMapper</span>
                    </h2>
                    <p className="nav-product-desc">
                      ClaroNav&apos;s MicronMapper is our latest digital solution.
                      This is the key technology utilized by surgeons to deliver
                      a double arch 3D provisional within one hour.
                    </p>
                  </div>
                  {/*
                  <div className="navident-specs-row">
                    <div className="spec-metric-box">
                      <span className="spec-val">&lt; 10 µm</span>
                      <span className="spec-lbl">
                        Photogrammetric Precision
                      </span>
                    </div>
                    <div className="spec-metric-box">
                      <span className="spec-val">&lt; 45 Sec</span>
                      <span className="spec-lbl">Full-Arch Capture</span>
                    </div>
                    <div className="spec-metric-box">
                      <span className="spec-val">Same Day</span>
                      <span className="spec-lbl">Provisional Prosthetics</span>
                    </div>
                  </div>
                  */}

                  <div className="navident-card-actions">
                    <Link to="/all-products" className="navident-primary-cta">
                      <i
                        className="fa-solid fa-cart-shopping"
                        aria-hidden="true"
                      ></i>
                      <span>Order MicronMapper Unit</span>
                    </Link>
                    <a
                      href="https://wa.me/919819893250"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navident-secondary-cta"
                    >
                      <i
                        className="fa-brands fa-whatsapp"
                        aria-hidden="true"
                      ></i>
                      <span>Speak with Specialist</span>
                    </a>
                  </div>
                </div>

                <div className="nav3-img navident-img-stage">
                  <div className="navident-device-glow-ring ring-purple"></div>
                  <img
                    src="/assets/navident/micronmapper_solo.png"
                    alt="MicronMapper photogrammetry device for dental digital workflow"
                    className="navident-device-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Next Slide Button */}
          <button
            type="button"
            className="slider-btn next-btn"
            onClick={nextNavidentSlide}
            aria-label="Next Product Slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="navident-dots-container">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              className={`navident-dot ${navidentSlide === idx ? "active" : ""}`}
              onClick={() => setNavidentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={navidentSlide === idx ? "true" : undefined}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4 – Duravit Implants */}
      <section
        id="duravit-implants"
        className="section-4"
        aria-label="Duravit Implant Range"
      >
        <div className="ex-container">
          {duravitCards.map((card, index) => (
            <div
              key={card.name}
              className={`ex-card ${activeCard === index ? "active" : ""}`}
              onMouseEnter={() => setActiveCard(index)}
              onClick={() => setActiveCard(index)}
            >
              <div className={`card-bg ${card.bgClass}`}>
                <h4>{card.name}</h4>
              </div>

              <div className="card-content">
                {/* Top-Left: Badge, Title & Description */}
                <div className="duravit-top-left">
                  {/*
                  <div className="duravit-badge">
                    <span>PREMIUM DENTAL IMPLANT</span>
                  </div>
                  */}
                  <h3 className="duravit-title">{card.name}</h3>
                  {/*
                  <h5 className="duravit-subtitle">{card.subtitle}</h5>
                  <p className="duravit-desc">{card.desc}</p>
                  */}
                </div>

                {/* Center: Large 3D Floating Product Image */}
                <div className="duravit-center-stage">
                  <div className="implant-center-aura"></div>
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="product-img-center"
                    loading="lazy"
                  />
                </div>

                {/* Right-Bottom: CTA Button */}
                {/*
                <div className="duravit-bottom-right">
                  <div className="duravit-action-row">
                    <Link to="/all-products" className="duravit-explore-btn">
                      <span>View Specifications</span>
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </div>
                </div>
                */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 - Surgical Guide Interactive Section */}
      <section
        id="surgical-guides"
        className="section-5"
        aria-label="Digital Surgical Guide"
      >
        {/* Background Atmosphere Layers */}
        <div className="section-5-overlay" aria-hidden="true"></div>
        <div className="section-5-purple-glow" aria-hidden="true"></div>

        {/* Central Content */}
        <div className="section-5-content">
          <h2 className="section-5-title">DIGITAL SURGICAL GUIDE</h2>
          <p className="section-5-description">
            B&amp;B Dental Surgical Guides Offer Predictable Clinical Outcome
            With Ease Even In Complex Clinical Situations. Indigenous Guided
            Surgery Software Planning And Comprehensive Surgical Kit For All
            Choice Of Clinical Situations.
          </p>

          {/* Explore CTA Row */}
          <a
            href="https://bnbimplant.in/digitalsurgicalguide"
            target="_blank"
            rel="noopener noreferrer"
            className="surgical-explore-link"
          >
            <div className="surgical-explore-wrap">
              <span className="surgical-line-bar left-bar"></span>
              <span className="surgical-line-text">EXPLORE</span>
              <span className="surgical-line-bar right-bar"></span>
            </div>
          </a>
        </div>
      </section>

      {/* SECTION 7 – Digital Workflow Hub */}
      <section
        id="digital-workflow"
        className="section7"
        aria-label="Digital Workflow Hub"
      >
        <div className="section7-overlay" aria-hidden="true"></div>
        <div className="section7-red-glow" aria-hidden="true"></div>

        <div className="section7-container">
          <div className="section7-eyebrow">
            PRECISION TODAY FOR BETTER TOMORROWS
          </div>
          <h2 className="section7-title">
            DIGITAL <span className="section7-title-red">WORKFLOW HUB</span>
          </h2>
          <p className="section7-subtitle">
            <span className="section7-highlight">
              Seamless digital processes
            </span>{" "}
            designed to deliver{" "}
            <strong>precision, speed, and clinical reliability.</strong>
            <br />
            Our streamlined digital workflow integrates advanced technology with
            expert-driven systems to ensure consistent accuracy and efficient
            clinical outcomes. From planning to execution, every step is
            optimized for quality and speed.
          </p>

          <div className="section7-workflow-track">
            {/* Step 01 – Scan */}
            <div className="section7-workflow-card">
              <div className="section7-circle-wrap">
                <div className="section7-circle">
                  <img
                    src="/assets/imgs/l1.webp"
                    alt="Scan – digital impression step"
                    loading="lazy"
                  />
                </div>
                <div className="section7-step-badge">01</div>
              </div>
              <h4 className="section7-step-title">Scan</h4>
              <p className="section7-step-desc">
                Capture precise digital impressions and patient data for
                accurate outcomes.
              </p>
            </div>

            {/* Connecting Chevron Node 1 */}
            <div className="section7-connector" aria-hidden="true">
              <svg
                className="workflow-connector-curve"
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path d="M 0 40 Q 50 0 100 40" />
              </svg>
              <div className="section7-connector-node">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  focusable="false"
                >
                  <path
                    d="m9 6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Step 02 – Plan */}
            <div className="section7-workflow-card">
              <div className="section7-circle-wrap">
                <div className="section7-circle">
                  <img
                    src="/assets/imgs/l2.webp"
                    alt="Plan – treatment planning step"
                    loading="lazy"
                  />
                </div>
                <div className="section7-step-badge">02</div>
              </div>
              <h4 className="section7-step-title">Plan</h4>
              <p className="section7-step-desc">
                Design treatment workflows tailored for each patient.
              </p>
            </div>

            {/* Connecting Chevron Node 2 */}
            <div className="section7-connector" aria-hidden="true">
              <svg
                className="workflow-connector-curve"
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path d="M 0 40 Q 50 0 100 40" />
              </svg>
              <div className="section7-connector-node">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  focusable="false"
                >
                  <path
                    d="m9 6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Step 03 – Create */}
            <div className="section7-workflow-card">
              <div className="section7-circle-wrap">
                <div className="section7-circle">
                  <img
                    src="/assets/imgs/l3.webp"
                    alt="Create – customised dental solution step"
                    loading="lazy"
                  />
                </div>
                <div className="section7-step-badge">03</div>
              </div>
              <h4 className="section7-step-title">Create</h4>
              <p className="section7-step-desc">
                Develop customized solutions using advanced digital systems and
                tools.
              </p>
            </div>

            {/* Connecting Chevron Node 3 */}
            <div className="section7-connector" aria-hidden="true">
              <svg
                className="workflow-connector-curve"
                viewBox="0 0 100 44"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path d="M 0 40 Q 50 0 100 40" />
              </svg>
              <div className="section7-connector-node">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  focusable="false"
                >
                  <path
                    d="m9 6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Step 04 – Execute */}
            <div className="section7-workflow-card">
              <div className="section7-circle-wrap">
                <div className="section7-circle">
                  <img
                    src="/assets/imgs/l4.webp"
                    alt="Execute – clinical workflow execution step"
                    loading="lazy"
                  />
                </div>
                <div className="section7-step-badge">04</div>
              </div>
              <h4 className="section7-step-title">Execute</h4>
              <p className="section7-step-desc">
                Implement workflows with precision for predictable results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 – Duravit EV Feature */}
      <DuravitEV />

      {/* EV implant technology — replaces the static technical banner */}
      <EVImplantTechnology />
    </main>
  );
}
