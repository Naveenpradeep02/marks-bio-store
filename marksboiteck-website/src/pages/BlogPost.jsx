import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import BlogOne from "../components/BlogOne";
import BlogTwo from "../components/BlogTwo";
import BlogThree from "../components/BlogThree";
import BlogFour from "../components/BlogFour";
import BlogFive from "../components/BlogFive";
import BlogSix from "../components/BlogSix";
import BlogSeven from "../components/BlogSeven";
import BlogEight from "../components/BlogEight";
import BlogNine from "../components/BlogNine";
import BlogTen from "../components/BlogTen";
import BlogEleven from "../components/BlogEleven";
import BlogTwelve from "../components/BlogTwelve";
import BlogThirteen from "../components/BlogThirteen";
import BlogFourteen from "../components/BlogFourteen";
import VisualBlocksRenderer from "../components/VisualBlocksRenderer";

export default function BlogPost() {
  const { id } = useParams();
  const location = useLocation();
  const [customPost, setCustomPost] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/blogs/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.content || data.title || data.blocks_json)) {
          setCustomPost(data);
        }
      })
      .catch(() => {});
  }, [id]);

  // If blog has custom Visual Page Builder design blocks, render the live Elementor blocks!
  if (customPost && customPost.blocks_json) {
    try {
      const parsedBlocks =
        typeof customPost.blocks_json === "string"
          ? JSON.parse(customPost.blocks_json)
          : customPost.blocks_json;
      if (Array.isArray(parsedBlocks) && parsedBlocks.length > 0) {
        return (
          <main style={{ minHeight: "80vh", background: "#ffffff" }}>
            <VisualBlocksRenderer blocks={parsedBlocks} />
          </main>
        );
      }
    } catch (e) {
      console.warn("Failed to parse blog blocks_json:", e);
    }
  }

  const isBlog14 =
    id === "14" ||
    id === "tissue-mapper-eliminate-ios-scans-full-arch-case-day-of-surgery" ||
    location.pathname.includes("blog-14") ||
    location.pathname.includes("tissue-mapper") ||
    location.pathname.includes("eliminate-ios");

  const isBlog13 =
    id === "13" ||
    id === "tissue-adhesives-in-dentistry" ||
    location.pathname.includes("blog-13") ||
    location.pathname.includes("tissue-adhesives") ||
    location.pathname.includes("cyanoacrylate");

  const isBlog12 =
    id === "12" ||
    id === "tmj-pain-management-arthrocentesis-navigation-procedure" ||
    location.pathname.includes("blog-12") ||
    location.pathname.includes("arthrocentesis") ||
    location.pathname.includes("tmj");

  const isBlog11 =
    id === "11" ||
    id === "auto-merging-cbct-data-soft-tissue-digital-dentistry" ||
    location.pathname.includes("blog-11") ||
    location.pathname.includes("auto-merging") ||
    location.pathname.includes("soft-tissue");

  const isBlog10 =
    id === "10" ||
    id === "evaluating-3d-implant-placement-digital-dentistry-software" ||
    location.pathname.includes("blog-10") ||
    location.pathname.includes("evaluating-3d-implant") ||
    location.pathname.includes("implant-placement");

  const isBlog9 =
    id === "9" ||
    id === "tooth-bone-segmentation-ai-dentistry" ||
    location.pathname.includes("blog-9") ||
    location.pathname.includes("segmentation") ||
    location.pathname.includes("artificial-intelligence");

  const isBlog8 =
    id === "8" ||
    id === "guided-endodontics-dynamic-navigation-systems" ||
    location.pathname.includes("blog-8") ||
    location.pathname.includes("endodontics") ||
    location.pathname.includes("guided-endo");

  const isBlog7 =
    id === "7" ||
    id === "emergence-profile-dental-implant-peek-abutments" ||
    location.pathname.includes("blog-7") ||
    location.pathname.includes("emergence-profile") ||
    location.pathname.includes("peek");

  const isBlog6 =
    id === "6" ||
    id === "compactors-expanders-dental-implant-surgery" ||
    location.pathname.includes("blog-6") ||
    location.pathname.includes("compactors");

  const isBlog5 =
    id === "5" ||
    id === "radiographic-markers-guided-implant-surgery" ||
    location.pathname.includes("blog-5") ||
    location.pathname.includes("radiographic-markers");

  const isBlog4 =
    id === "4" ||
    id === "passive-fit-implant-prosthesis-digital-technology" ||
    location.pathname.includes("blog-4") ||
    location.pathname.includes("passive-fit");

  const isBlog3 =
    id === "3" ||
    id === "photogrammetry-full-arch-dental-implants-passivity" ||
    location.pathname.includes("blog-3") ||
    location.pathname.includes("photogrammetry");

  const isBlog2 =
    id === "2" ||
    id === "dynamic-navigation-precision-implant-surgery" ||
    location.pathname.includes("blog-2") ||
    location.pathname.includes("dynamic-navigation");

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [id, location.pathname]);

  // Render appropriate article with unified Blog styling
  if (isBlog14) {
    return <BlogFourteen scrollProgress={scrollProgress} />;
  }

  if (isBlog13) {
    return <BlogThirteen scrollProgress={scrollProgress} />;
  }

  if (isBlog12) {
    return <BlogTwelve scrollProgress={scrollProgress} />;
  }

  if (isBlog11) {
    return <BlogEleven scrollProgress={scrollProgress} />;
  }

  if (isBlog10) {
    return <BlogTen scrollProgress={scrollProgress} />;
  }

  if (isBlog9) {
    return <BlogNine scrollProgress={scrollProgress} />;
  }

  if (isBlog8) {
    return <BlogEight scrollProgress={scrollProgress} />;
  }

  if (isBlog7) {
    return <BlogSeven scrollProgress={scrollProgress} />;
  }

  if (isBlog6) {
    return <BlogSix scrollProgress={scrollProgress} />;
  }

  if (isBlog5) {
    return <BlogFive scrollProgress={scrollProgress} />;
  }

  if (isBlog4) {
    return <BlogFour scrollProgress={scrollProgress} />;
  }

  if (isBlog3) {
    return <BlogThree scrollProgress={scrollProgress} />;
  }

  if (isBlog2) {
    return <BlogTwo scrollProgress={scrollProgress} />;
  }

  // Render Dynamic CMS Blog Post if available
  if (customPost) {
    return (
      <main className="blog-detail-main" style={{ minHeight: "80vh", background: "#f8fafc", paddingBottom: "4rem" }}>
        {/* Progress Bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: `${scrollProgress}%`,
            height: "4px",
            background: "#e11d48",
            zIndex: 99999,
            transition: "width 0.1s linear",
          }}
        />

        {/* Hero Section */}
        <section
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            color: "#fff",
            padding: "4rem 1.5rem 3rem",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem" }}>
              <span
                style={{
                  background: "#e11d48",
                  color: "#fff",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {customPost.category || "Clinical Insight"}
              </span>
              {customPost.read_time && (
                <span style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                  ⏱ {customPost.read_time}
                </span>
              )}
            </div>

            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.25,
                margin: "0 0 1.25rem",
                color: "#ffffff",
              }}
            >
              {customPost.title}
            </h1>

            {customPost.excerpt && (
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  margin: "0 0 1.75rem",
                }}
              >
                {customPost.excerpt}
              </p>
            )}

            {/* Author Bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              {customPost.author_avatar && (
                <img
                  src={customPost.author_avatar}
                  alt={customPost.author_name}
                  style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #e11d48" }}
                />
              )}
              <div>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                  {customPost.author_name || "Marks Biotech Clinical Team"}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "0.8rem" }}>
                  {customPost.author_title || "Regenerative Solutions"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {customPost.featured_image && (
          <div style={{ maxWidth: "860px", margin: "-2rem auto 2.5rem", padding: "0 1.5rem" }}>
            <img
              src={customPost.featured_image}
              alt={customPost.featured_image_alt || customPost.title}
              style={{
                width: "100%",
                maxHeight: "440px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.2)",
                display: "block",
              }}
            />
          </div>
        )}

        {/* Article Body */}
        <article
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 1.5rem",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#334155",
          }}
          dangerouslySetInnerHTML={{ __html: customPost.content }}
        />
      </main>
    );
  }

  return <BlogOne scrollProgress={scrollProgress} />;
}
