import React, { useRef, useEffect } from "react";
import "./EVQuantumBackground.css";

export default function EVQuantumBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;
    let width = (canvas.width =
      canvas.parentElement.clientWidth || window.innerWidth);
    let height = (canvas.height =
      canvas.parentElement.clientHeight || window.innerHeight);

    // Subtle 3D mouse parallax coordinates
    const mouse = {
      x: width * 0.5,
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5,
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width =
        canvas.parentElement.clientWidth || window.innerWidth;
      height = canvas.height =
        canvas.parentElement.clientHeight || window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Delicate, light starlight colors
    const starPalettes = [
      { r: 255, g: 255, b: 255 }, // Crisp Pure White
      { r: 241, g: 245, b: 249 }, // Diamond Silver White
      { r: 233, g: 213, b: 255 }, // Delicate Soft Lilac
      { r: 216, g: 180, b: 254 }, // Subtle Starlight Violet
      { r: 244, g: 208, b: 254 }, // Faint Lavender
      { r: 224, g: 242, b: 254 }, // Faint Ice Blue
    ];

    // Responsive Star Count (around 180–300 delicate scattered stars)
    const STAR_COUNT = Math.min(
      Math.max(Math.floor((width * height) / 4500), 160),
      320,
    );
    let stars = [];

    class Star {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial
          ? Math.random() * height
          : Math.random() < 0.5
            ? -10
            : height + 10;
        this.z = Math.random() * 0.85 + 0.15; // Depth factor (0.15 far -> 1.0 near)

        // Super gentle, calm floating drift
        this.vx = (Math.random() - 0.5) * 0.14 * this.z;
        this.vy = (Math.random() - 0.5) * 0.14 * this.z;

        // Delicate micro-size (0.4px to 1.6px)
        this.baseSize = (Math.random() * 1.1 + 0.45) * this.z;
        this.color =
          starPalettes[Math.floor(Math.random() * starPalettes.length)];

        // Light, subtle alpha
        this.baseAlpha = Math.random() * 0.4 + 0.18;
        this.twinkleSpeed = Math.random() * 0.02 + 0.006;
        this.twinkleOffset = Math.random() * Math.PI * 2;
      }

      update(time, parallaxX, parallaxY) {
        // Slow organic floating
        this.x += this.vx;
        this.y += this.vy;

        // Seamless wrap
        if (this.x < -15) this.x = width + 15;
        if (this.x > width + 15) this.x = -15;
        if (this.y < -15) this.y = height + 15;
        if (this.y > height + 15) this.y = -15;

        // Gentle sinusoidal twinkle
        this.currentAlpha = Math.max(
          0.05,
          this.baseAlpha +
            Math.sin(time * this.twinkleSpeed + this.twinkleOffset) *
              (this.baseAlpha * 0.75),
        );

        // Parallax depth offset
        this.renderX = this.x + parallaxX * (this.z * 14);
        this.renderY = this.y + parallaxY * (this.z * 14);
      }

      draw() {
        const { r, g, b } = this.color;
        const alpha = this.currentAlpha;

        ctx.save();

        // 1. Soft faint halo on closer stars
        if (this.baseSize > 0.9) {
          ctx.beginPath();
          ctx.arc(
            this.renderX,
            this.renderY,
            this.baseSize * 2.2,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`;
          ctx.fill();
        }

        // 2. Core light star point
        ctx.beginPath();
        ctx.arc(this.renderX, this.renderY, this.baseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
        ctx.shadowBlur = this.baseSize * 3;
        ctx.fill();

        ctx.restore();
      }
    }

    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push(new Star());
      }
    };

    initStars();

    let time = 0;

    // Animation loop
    const animate = () => {
      time += 1;

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      const parallaxX = mouse.x / width - 0.5;
      const parallaxY = mouse.y / height - 0.5;

      ctx.clearRect(0, 0, width, height);

      // Render delicate scattered stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update(time, parallaxX, parallaxY);
        stars[i].draw();
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="ev-quantum-canvas" aria-hidden="true" />
  );
}
