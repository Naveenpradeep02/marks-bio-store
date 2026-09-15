import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import "../styles/duravit-ev.css";

export default function DuravitEV() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="duravit-ev"
      className={`duravit-ev-hero ${isVisible ? "is-visible" : ""}`}
      ref={sectionRef}
      aria-label="Duravit EV Dental Implant System"
    >
      {/* Studio Background Layer */}
      <div className="duravit-ev-bg-layer" aria-hidden="true">
        <div className="duravit-ev-bg-img" />
        <div className="duravit-ev-studio-vignette" />
        <div className="duravit-ev-light-beam" />
      </div>

      <div className="duravit-ev-container">
        {/* Left Content Area (42% negative/content area) */}
        <div className="duravit-ev-content">
          <h2 className="duravit-ev-title">
            DURAVIT <span className="duravit-ev-accent">EV</span>
          </h2>

          <p className="duravit-ev-desc">
            Advanced EV Implant System
            <br />
            Designed for immediate load
            <br />
            with functional Prosthesis.
          </p>

          <div className="duravit-ev-eyebrow">SHORTER TIME TO TEETH.</div>

          <div className="duravit-ev-cta-wrapper">
            <a
              href="https://bnbimplant.in/uniqueimplant#design1"
              target="_blank"
              rel="noopener noreferrer"
              className="duravit-ev-btn"
            >
              <span>Explore Duravit EV</span>
              <ArrowRight
                size={18}
                className="duravit-ev-arrow"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Right Product Showcase Area (58% product area) */}
        <div className="duravit-ev-visual-stage" aria-hidden="true">
          <div className="duravit-ev-implant-composite">
            <img
              src="/assets/implan/i%20(1).png"
              alt="Titanium Duravit EV dental implants resting on black stone pedestal"
              className="duravit-ev-implant-img"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
