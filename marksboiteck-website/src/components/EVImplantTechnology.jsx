import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import "../styles/ev-implant-technology.css";

const asset = (number) => `/assets/last-section/1%20(${number}).png`;
const features = [
  {
    id: "01",
    title: "Morse taper & internal hexagon",
    description: [
      "Precision in positioning the prosthetic components",
      "Contact area increased between implant surface and abutment",
      "High stability of the abutment",
    ],
    side: "left",
    detailImage: 4,
    row: 0,
    target: [785, 198],
    path: "M 785 198 L 660 268 L 565 268 L 565 294 L 380 294",
  },
  {
    id: "02",
    title: "Back-tapered coronal design with micro rings",
    description: [
      "Optimal soft tissue support",
      "Maximum alveolar bone volume",
      "Less crestal resorption",
    ],
    side: "right",
    detailImage: 5,
    row: 0,
    target: [910, 248],
    path: "M 910 248 L 1000 294 L 1130 294 L 1208 256 L 1230 256",
  },
  {
    id: "03",
    title: "Double thread body",
    description: [
      "Thread of increased depth and highly sharp",
      "Easy insertion and bone condensing",
      "Higher primary stability",
    ],
    side: "left",
    detailImage: 6,
    row: 1,
    target: [788, 440],
    path: "M 788 440 L 754 440 L 620 480 L 380 480",
  },
  {
    id: "04",
    title: "Anatomical implant design",
    description: [
      "Innovative macromorphology, designed for a primary high stability",
    ],
    side: "right",
    detailImage: 3,
    row: 1,
    target: [878, 496],
    path: "M 878 496 L 952 496 L 998 478 L 1190 478 L 1214 452 L 1230 452",
  },
  {
    id: "05",
    title: "Self tapping system",
    description: ["Self tapping", "Self drilling"],
    side: "left",
    detailImage: 7,
    row: 2,
    target: [800, 667],
    path: "M 800 667 L 680 628 L 565 628 L 565 634 L 380 634",
  },
  {
    id: "06",
    title: "Apical blade",
    description: ["Penetrate small diameter preparations", "Optimal anchorage"],
    side: "right",
    detailImage: 2,
    row: 2,
    target: [851, 706],
    path: "M 851 706 L 1030 676 L 1116 676 L 1214 624 L 1230 624",
  },
];

function EVImplantHeader() {
  return (
    <header className="evt-header evt-reveal">
      <h2 id="ev-technology-title">
        <span>EV</span> IMPLANT
      </h2>
    </header>
  );
}
function ImplantVisual() {
  return (
    <div className="evt-product evt-reveal">
      <img
        src={asset(8)}
        width="887"
        height="1774"
        alt="Titanium EV dental implant with micro rings, double threads and an apical blade"
        loading="lazy"
        decoding="async"
      />
      <svg
        className="evt-rotation-arrows"
        viewBox="0 0 887 1774"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <marker
            id="evt-yellow-arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#f3e632" />
          </marker>
          <marker
            id="evt-red-arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="#ed2537" />
          </marker>
        </defs>
        <path
          d="M 680 590 C 740 660 590 750 270 790"
          stroke="#f3e632"
          strokeWidth="10"
          strokeLinecap="round"
          markerEnd="url(#evt-yellow-arrowhead)"
        />
        <path
          d="M 680 765 C 740 835 590 925 270 965"
          stroke="#ed2537"
          strokeWidth="10"
          strokeLinecap="round"
          markerEnd="url(#evt-red-arrowhead)"
        />
      </svg>
    </div>
  );
}
function DetailCircle({ feature }) {
  return (
    <div className="evt-detail">
      <img
        src={asset(feature.detailImage)}
        width="1254"
        height="1254"
        alt={`${feature.title} â€” magnified implant detail`}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
function TechnicalFeature({ feature, active, onActivate }) {
  return (
    <article
      className={`evt-feature evt-${feature.side} evt-reveal${active ? " is-active" : ""}`}
      style={{
        "--row": feature.row,
        "--delay": `${0.45 + Number(feature.id) * 0.12}s`,
      }}
      onMouseEnter={() => onActivate(feature.id)}
      onMouseLeave={() => onActivate(null)}
      onFocus={() => onActivate(feature.id)}
      onBlur={() => onActivate(null)}
    >
      <details className="evt-feature-copy" open>
        <summary
          onClick={(event) => {
            if (window.matchMedia("(min-width: 901px)").matches)
              event.preventDefault();
          }}
        >
          <span className="evt-number">
            {feature.id}
            <i />
          </span>
          <h3>{feature.title}</h3>
          <ChevronDown className="evt-chevron" size={18} aria-hidden="true" />
        </summary>
        <ul>
          {feature.description.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </details>
      <DetailCircle feature={feature} />
    </article>
  );
}
function ConnectorLine({ feature, active }) {
  return (
    <g
      className={active ? "is-active" : ""}
      style={{ "--delay": `${0.7 + Number(feature.id) * 0.12}s` }}
    >
      <path className="evt-connector" d={feature.path} pathLength="1" />
      <circle
        className="evt-target-halo"
        cx={feature.target[0]}
        cy={feature.target[1]}
        r="18"
      />
      <circle
        className="evt-target"
        cx={feature.target[0]}
        cy={feature.target[1]}
        r="5"
      />
      <circle
        cx={feature.target[0]}
        cy={feature.target[1]}
        r="2"
        fill="white"
      />
    </g>
  );
}
export default function EVImplantTechnology() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(null);
  const [selected, setSelected] = useState(null);
  const highlighted = active ?? selected;
  const navigateFeature = (direction) => {
    const current = features.findIndex((feature) => feature.id === highlighted);
    const index =
      current < 0
        ? direction > 0
          ? 0
          : features.length - 1
        : (current + direction + features.length) % features.length;
    setSelected(features[index].id);
    if (window.matchMedia("(max-width: 900px)").matches) {
      sectionRef.current.querySelectorAll("details").forEach((detail, i) => {
        detail.open = i === index;
      });
    }
  };
  useEffect(() => {
    const section = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    observer.observe(section);
    const mobile = window.matchMedia("(max-width: 900px)");
    const syncDetails = () =>
      section.querySelectorAll("details").forEach((detail, index) => {
        detail.open = !mobile.matches || index === 0;
      });
    syncDetails();
    mobile.addEventListener("change", syncDetails);
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight - rect.top) /
              (window.innerHeight + rect.height),
          ),
        );
        section.style.setProperty("--scroll-progress", progress);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      mobile.removeEventListener("change", syncDetails);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section
      id="ev-implant-technology"
      ref={sectionRef}
      className={`evt-section${visible ? " evt-visible" : ""}${inView ? " evt-in-view" : ""}`}
      aria-labelledby="ev-technology-title"
    >
      <div className="evt-background" aria-hidden="true" />
      <div className="evt-stage">
        <EVImplantHeader />
        <ImplantVisual />
        <svg
          className="evt-connectors"
          viewBox="0 0 1600 900"
          fill="none"
          aria-hidden="true"
        >
          {features.map((feature) => (
            <ConnectorLine
              key={feature.id}
              feature={feature}
              active={highlighted === feature.id}
            />
          ))}
        </svg>
        <div
          className="evt-features"
          aria-label="EV implant technical features"
        >
          {features.map((feature) => (
            <TechnicalFeature
              key={feature.id}
              feature={feature}
              active={highlighted === feature.id}
              onActivate={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
