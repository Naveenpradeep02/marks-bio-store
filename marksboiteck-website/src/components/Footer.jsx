import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import "../styles/footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div
      className="footer-full-dark-bg"
      style={{ backgroundColor: "#0f0f0f", width: "100%" }}
    >
      <footer className="mb-footer">
        {/* TOP */}
        <div className="mb-footer-top">
          <div className="mb-footer-title">
            <Link to="/" aria-label="Marks Biotech home">
              <img
                src="/assets/imgs/marks-biotech-logo 1.webp"
                alt="Marks Biotech"
                className="mb-footer-logo"
                loading="lazy"
              />
            </Link>
            <p>Partners in transforming life.</p>
          </div>

          <div className="mb-footer-support">
            <p>We are here to support You</p>
            <h2>Connect with us</h2>
          </div>

          <div className="mb-footer-subscribe">
            <p className="mb-footer-newsletter-label">
              Product updates, events and insights.
            </p>
            <form id="footer-newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                aria-label="Email address"
                autoComplete="email"
                placeholder={
                  subscribed
                    ? "Thank you for subscribing!"
                    : "Your email address"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="mb-footer-submit" type="submit">
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <hr />

        {/* BOTTOM */}
        <div className="mb-footer-grid">
          {/* QUICK LINKS */}
          <div className="mb-footer-col">
            <h4>Quick links</h4>
            <ul>
              <li>
                <Link to="/">Highlights</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/blog">Blog &amp; insights</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/#navident-video">Navident demo</Link>
              </li>
            </ul>
          </div>

          {/* PRODUCTS */}
          <div className="mb-footer-col mb-footer-products">
            <h4>Products</h4>
            <ul>
              <li>
                <a
                  href="https://bnbimplant.in/uniqueimplant"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  B&B Dental Implants Italy
                </a>
              </li>
              <li>
                <a
                  href="https://bnbimplant.in/surgicalkit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  B&B SURGICAL KITS
                </a>
              </li>
              <li>
                <a
                  href="https://bnbimplant.in/digitalsurgicalguide"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Computer Guided Surgery
                </a>
              </li>
              <li>
                <Link to="/allograft">Rocky Mountain Allograft</Link>
              </li>
              <li>
                <Link to="/xenograft">NovoBone Xenograft</Link>
              </li>
              <li>
                <Link to="/xenograft#collagen">T-Collagen Membrane</Link>
              </li>
              <li>
                <Link to="/tissue">Tissue Adhesive</Link>
              </li>
              <li>
                <a
                  href="https://navident.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Navident 3.0
                </a>
              </li>
              <li>
                <a
                  href="https://navidentevo.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Navident 4.0 EVO
                </a>
              </li>
              <li>
                <a
                  href="https://micronmapper.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MicronMapper
                </a>
              </li>
            </ul>
          </div>

          {/* ADDRESS */}
          <div className="mb-footer-col mb-footer-address">
            <h4>Visit us</h4>

            <p className="mb-footer-address-label">Operations office</p>
            <p>
              84, 1st floor, Thirupathy Nagar,
              <br />
              Mainroad, 1st Cross street, <br />
              Valasaravakkam, Chennai, India -600087.
            </p>

            <p className="mb-footer-address-label">Registered office</p>
            <p>
              104/5, 6th Street, S-1, 2nd floor, The Brown CLS Building, Radha
              Avenue, Valasaravakam, Chennai, India -600087.
            </p>
          </div>

          {/* LOGO + MAP */}
          <div className="mb-footer-col mb-footer-brand">
            <h4>Contact</h4>
            <div className="mb-footer-contacts">
              <a href="tel:+914448593250">
                <Phone size={16} aria-hidden="true" />
                +91 44 485 93250
              </a>
              <a href="tel:+919819893250">
                <Phone size={16} aria-hidden="true" />
                +91 98198 93250
              </a>
              <a href="tel:+919840320250">
                <Phone size={16} aria-hidden="true" />
                +91 98403 20250
              </a>
              <a href="mailto:info@marksbiotech.com">
                <Mail size={16} aria-hidden="true" />
                info@marksbiotech.com
              </a>
            </div>
          </div>
        </div>
        {/* Large Brand Wordmark */}
        <div className="mb-footer-wordmark" aria-hidden="true">
          <svg viewBox="0 0 1200 190" focusable="false">
            <defs>
              <linearGradient
                id="footer-brand-fade"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#ce2017" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
            </defs>
            <text
              x="0"
              y="155"
              textLength="1200"
              lengthAdjust="spacingAndGlyphs"
              fill="url(#footer-brand-fade)"
            >
              Marks Biotech
            </text>
          </svg>
        </div>

        {/* Footer Bottom Copyright & Credits */}
        <div className="mb-footer-bottom">
          <p className="mb-footer-copy">
            &copy; {new Date().getFullYear()} Marks Biotech. All rights
            reserved.
          </p>
          <p className="mb-footer-credits">
            Design and Developed by{" "}
            <a
              href="https://dgrowmarketing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="dgrow-credit-link"
            >
              DGROW Marketing Agency
            </a>
          </p>
          <a href="#" className="mb-footer-back-top">
            Back to top <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
