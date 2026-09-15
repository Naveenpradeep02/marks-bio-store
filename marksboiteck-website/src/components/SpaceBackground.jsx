import { useEffect, useRef } from "react";
import "./SpaceBackground.css";

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const stars = Array.from({ length: 210 }, (_, index) => {
  const r1 = seededRandom(index * 17.31 + 1.2);
  const r2 = seededRandom(index * 43.17 + 8.9);
  const r3 = seededRandom(index * 71.93 + 3.4);
  const r4 = seededRandom(index * 29.45 + 5.6);
  const r5 = seededRandom(index * 91.13 + 7.1);

  // Varied sizes: mostly micro stars (1-1.5px), some medium (2-2.5px), few bright hero stars (3-4px)
  let size = 1.2;
  let type = "star-micro";
  if (r3 > 0.88) {
    size = 3.5;
    type = "star-flare";
  } else if (r3 > 0.65) {
    size = 2.2;
    type = "star-bright";
  } else if (r3 > 0.35) {
    size = 1.6;
    type = "star-med";
  }

  const duration = (1.6 + r4 * 3.4).toFixed(2);
  const delay = (-r5 * 5).toFixed(2);

  return {
    type,
    style: {
      left: `${(r1 * 98 + 1).toFixed(2)}%`,
      top: `${(r2 * 96 + 2).toFixed(2)}%`,
      "--star-size": `${size}px`,
      "--star-delay": `${delay}s`,
      "--star-duration": `${duration}s`,
    },
  };
});

const meteors = Array.from({ length: 8 }, (_, index) => ({
  left: `${15 + ((index * 27.7) % 85)}%`,
  top: `${-5 + ((index * 19.3) % 45)}%`,
  "--meteor-duration": `${6 + index * 1.5}s`,
  "--meteor-delay": `${-index * 3.2}s`,
  "--meteor-length": `${85 + (index % 4) * 35}px`,
}));

export default function SpaceBackground({ image = "/img/hero-space-bg.jpg" }) {
  const backgroundRef = useRef(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const hero = background?.closest("section");
    if (!hero) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let scroll = 0;

    const render = () => {
      frame = 0;
      if (motion.matches || !visible || document.hidden) return;
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      background.style.setProperty("--space-x", `${x.toFixed(2)}px`);
      background.style.setProperty("--space-y", `${y.toFixed(2)}px`);
      background.style.setProperty("--space-scroll", `${scroll.toFixed(2)}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05) schedule();
    };
    const schedule = () => {
      if (!frame && visible && !motion.matches && !document.hidden) {
        frame = requestAnimationFrame(render);
      }
    };
    const onScroll = () => {
      const bounds = hero.getBoundingClientRect();
      scroll = Math.max(-70, Math.min(70, -bounds.top * 0.14));
      schedule();
    };
    const onPointer = (event) => {
      if (event.pointerType === "touch") return;
      const bounds = hero.getBoundingClientRect();
      targetX =
        ((event.clientX - bounds.left - bounds.width / 2) / bounds.width) * 24;
      targetY =
        ((event.clientY - bounds.top - bounds.height / 2) / bounds.height) * 18;
      schedule();
    };
    const resetPointer = () => {
      targetX = 0;
      targetY = 0;
      schedule();
    };
    const onMotion = () => {
      x = y = targetX = targetY = 0;
      background.style.setProperty("--space-x", "0px");
      background.style.setProperty("--space-y", "0px");
      background.style.setProperty("--space-scroll", "0px");
      onScroll();
    };
    const onVisibility = () => {
      background.dataset.paused = String(!visible || document.hidden);
      onScroll();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      background.dataset.paused = String(!visible || document.hidden);
      if (visible) onScroll();
    });
    observer.observe(hero);
    hero.addEventListener("pointermove", onPointer, { passive: true });
    hero.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return (
    <div className="space-background" ref={backgroundRef} aria-hidden="true">
      <img
        className="space-background-image"
        src={image}
        alt=""
        fetchPriority="high"
      />
      <div className="space-background-shade" />
      {[0, 1, 2].map((layer) => (
        <div
          className={`space-background-stars space-stars-layer-${layer}`}
          key={layer}
        >
          {stars.slice(layer * 70, (layer + 1) * 70).map((star, index) => (
            <span
              key={index}
              className={`space-star ${star.type}`}
              style={star.style}
            />
          ))}
        </div>
      ))}
      <div className="space-background-meteors">
        {meteors.map((style, index) => (
          <span className="space-meteor-track" key={index} style={style}>
            <i />
          </span>
        ))}
      </div>
      <div className="space-background-atmosphere" />
    </div>
  );
}
