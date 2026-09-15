import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "../styles/side-nav.css";

// Predefined clean section labels for main pages
const PREDEFINED_PAGE_SECTIONS = {
  home: [
    { id: "hero", label: "Marks Biotech" },
    { id: "navident-ar", label: "Navident AR Solution" },
    { id: "navident-video", label: "Navoice Demo" },
    { id: "navident-systems", label: "Navident & MicronMapper" },
    { id: "duravit-implants", label: "Duravit Implant Range" },
    { id: "surgical-guides", label: "Digital Surgical Guide" },
    { id: "digital-workflow", label: "Digital Workflow Hub" },
    { id: "duravit-ev", label: "DURAVIT EV™" },
    { id: "ev-implant-technology", label: "EV Implant Technology" },
  ],
  about: [
    { id: "about-partners", label: "Partners in India" },
    { id: "about-core", label: "Core Offerings" },
    { id: "about-coverage", label: "Coverage & Network" },
    { id: "about-learning", label: "Learning for Life" },
    { id: "about-mission", label: "Vision & Mission" },
    { id: "about-market", label: "Market Entry Support" },
    { id: "about-device", label: "Device Registration" },
    { id: "about-story", label: "Story of Marks Biotech" },
    { id: "about-founder", label: "Founder Profile" },
    { id: "about-team", label: "Consultants & Leaders" },
  ],
};

export default function SideSectionNav() {
  const location = useLocation();
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".mb-side-scrollspy")) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Determine current page key
  const pageKey = useMemo(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, "");
    if (path === "" || path === "/index.html") return "home";
    if (path.includes("/about")) return "about";
    if (path.includes("/events")) return "events";
    if (path.includes("/careers")) return "careers";
    if (path.includes("/scientific-evidence")) return "scientific-evidence";
    if (path.includes("/allograft")) return "allograft";
    if (path.includes("/xenograft")) return "xenograft";
    if (path.includes("/tissue")) return "tissue";
    if (path.includes("/product")) return "products";
    if (path.includes("/blog")) return "blog";
    return "other";
  }, [location.pathname]);

  // Auth pages should not render navigation
  const isAuthPage = useMemo(() => {
    const p = location.pathname.toLowerCase();
    return (
      p.includes("/login") ||
      p.includes("/signin") ||
      p.includes("/signup") ||
      p.includes("/register") ||
      p.includes("/forgot")
    );
  }, [location.pathname]);

  // Discover / Build sections for the active page
  useEffect(() => {
    if (isAuthPage) {
      setSections([]);
      return;
    }

    // Small timeout to allow the target page DOM to settle
    const timer = setTimeout(() => {
      let pageSections = [];

      // 1. Check predefined sections first
      if (PREDEFINED_PAGE_SECTIONS[pageKey]) {
        const configured = PREDEFINED_PAGE_SECTIONS[pageKey];
        const existing = configured.filter((s) =>
          Boolean(document.getElementById(s.id)),
        );
        if (existing.length > 0) {
          pageSections = existing;
        }
      }

      // 2. Dynamic DOM scan fallback for any other page or unlisted sections
      if (pageSections.length === 0) {
        const domSections = document.querySelectorAll(
          "main > section, main > div[id], section[id], main > div.container",
        );

        domSections.forEach((el, index) => {
          // If no id, assign a clean virtual id
          let secId = el.id;
          if (!secId) {
            secId = `sec-auto-${index}`;
            el.id = secId;
          }

          // Find a sensible label from heading or text
          const heading = el.querySelector("h1, h2, h3, h4, h5");
          let label = heading
            ? heading.innerText.trim()
            : `Section ${index + 1}`;
          if (label.length > 28) {
            label = label.substring(0, 26) + "...";
          }
          if (!label) label = `Section ${index + 1}`;

          pageSections.push({ id: secId, label });
        });
      }

      // If only 1 or 0 sections detected on short page, provide top / bottom
      if (pageSections.length <= 1) {
        pageSections = [
          { id: "top", label: "Top of Page" },
          { id: "content", label: "Main Content" },
        ];
      }

      setSections(pageSections);
      if (pageSections.length > 0) {
        setActiveSectionId(pageSections[0].id);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [pageKey, isAuthPage, location.pathname]);

  // Scrollspy: update active dot based on scroll position
  const handleScroll = useCallback(() => {
    if (sections.length === 0) return;

    const scrollPos = window.scrollY + window.innerHeight / 3;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          setActiveSectionId(sections[i].id);
          return;
        }
      }
    }

    if (sections.length > 0) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (isAuthPage || sections.length === 0) return null;

  const scrollToSection = (id, index) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    } else {
      // Proportional fallback scroll
      const targetY =
        (document.body.scrollHeight / Math.max(sections.length, 1)) * index;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <aside
      className={`mb-side-scrollspy ${isExpanded ? "nav-is-open" : ""}`}
      aria-label="Section Navigator"
    >
      <div
        className={`side-scrollspy-inner ${isExpanded ? "is-expanded" : ""}`}
      >
        {/* Top Header / Toggle Button */}
        <div className="side-nav-header">
          <button
            type="button"
            className="side-nav-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse Section Menu" : "Expand Section Menu"}
            aria-label="Toggle section navigation"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <circle cx="4" cy="4.5" r="1.6" />
              <rect x="7.5" y="3.5" width="9" height="2" rx="1" />
              <circle cx="4" cy="10" r="1.6" />
              <rect x="7.5" y="9" width="9" height="2" rx="1" />
              <circle cx="4" cy="15.5" r="1.6" />
              <rect x="7.5" y="14.5" width="9" height="2" rx="1" />
            </svg>
          </button>
          <span className="side-nav-header-title">SECTIONS</span>
        </div>

        {/* Section List of Dots + Labels */}
        <ul className="side-nav-dots-list">
          {sections.map((sec, index) => {
            const isActive = activeSectionId === sec.id;
            return (
              <li
                key={sec.id || index}
                className={`side-nav-item ${isActive ? "active" : ""}`}
                onClick={() => scrollToSection(sec.id, index)}
                title={sec.label}
              >
                <span className="side-nav-dot" aria-hidden="true">
                  <span className="dot-inner"></span>
                </span>
                <span className="side-nav-label">{sec.label}</span>
                <span className="side-nav-tooltip" aria-hidden="true">
                  {sec.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
