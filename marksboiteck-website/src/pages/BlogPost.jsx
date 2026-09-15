import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/blog-1.css";

export default function BlogPost() {
  const { id } = useParams();

  if (id === "2") {
    return (
      <main className="blog-post-page">
        <div
          className="blog-detail-container"
          style={{
            maxWidth: "960px",
            margin: "40px auto",
            padding: "0 20px",
            color: "#fff",
          }}
        >
          <div
            className="breadcrumb"
            style={{ color: "#aaa", marginBottom: "20px" }}
          >
            <Link to="/" style={{ color: "#c81616", textDecoration: "none" }}>
              Home
            </Link>{" "}
            »{" "}
            <Link
              to="/blog"
              style={{ color: "#c81616", textDecoration: "none" }}
            >
              Blogs
            </Link>{" "}
            » Dynamic Navigation: Precision Implant Surgery
          </div>

          <h1
            className="blog-detail-title"
            style={{ fontSize: "36px", marginBottom: "25px", color: "#fff" }}
          >
            Dynamic Navigation: Precision Implant Surgery
          </h1>

          <img
            src="/assets/imgs/blog-2.webp"
            alt="Dynamic Navigation"
            className="blog-detail-img"
            style={{
              width: "100%",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          />

          <div
            className="blog-detail-content"
            style={{ lineHeight: "1.8", fontSize: "17px", color: "#ddd" }}
          >
            <p>
              Dynamic Navigation is the most effective means by which to
              accurately transfer a planned implant position to a patient. In
              contrast to the inherent inaccuracy of Freehand and Static
              Navigation, dynamic computer-guided surgery provides real-time
              optical tracking.
            </p>
            <h3
              style={{
                color: "#c81616",
                marginTop: "25px",
                marginBottom: "15px",
              }}
            >
              Why Dynamic Navigation?
            </h3>
            <p>
              By utilizing motion-tracking stereoscopic cameras and advanced
              planning software, surgeons can visualize drill positioning and
              trajectory with sub-millimeter precision on screen while
              performing the osteotomy.
            </p>
            <ul
              style={{
                marginLeft: "20px",
                marginTop: "15px",
                marginBottom: "20px",
              }}
            >
              <li>Real-time visual guidance on CBCT diagnostics</li>
              <li>
                Flexibility to modify plan chairside without waiting for
                surgical guides
              </li>
              <li>Minimal flap incisions and reduced patient recovery times</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }

  // Default to Blog 1: Morse Taper Connection
  return (
    <main className="blog-post-page">
      <div
        className="blog-detail-container"
        style={{
          maxWidth: "960px",
          margin: "40px auto",
          padding: "0 20px",
          color: "#fff",
        }}
      >
        <div
          className="breadcrumb"
          style={{ color: "#aaa", marginBottom: "20px" }}
        >
          <Link to="/" style={{ color: "#c81616", textDecoration: "none" }}>
            Home
          </Link>{" "}
          »{" "}
          <Link to="/blog" style={{ color: "#c81616", textDecoration: "none" }}>
            Blogs
          </Link>{" "}
          » Morse Taper Connection
        </div>

        <h1
          className="blog-detail-title"
          style={{ fontSize: "36px", marginBottom: "25px", color: "#fff" }}
        >
          Morse Taper Connection
        </h1>

        <img
          src="/assets/imgs/blog-1.webp"
          alt="Morse Taper Connection"
          className="blog-detail-img"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "30px" }}
        />

        <div
          className="blog-detail-content"
          style={{ lineHeight: "1.8", fontSize: "17px", color: "#ddd" }}
        >
          <p>
            In 1864 an engineer named Stephen Morse conceptualised the
            mechanical phenomenon stating that when two conical metal components
            (female + male) reach a tight contact, these fix one into the other
            through cold welding. To obtain a real Morse effect, the conical
            sides of the components must not exceed a 50 overall inclination.
          </p>
          <p>
            In the following years, this mechanism was widely employed in
            mechanical and industrial fields to create modular components which
            necessitated a high structural stability.
          </p>

          <h4
            style={{
              color: "#c81616",
              marginTop: "30px",
              marginBottom: "15px",
            }}
          >
            Key Advantages:
          </h4>
          <ul style={{ marginLeft: "20px", marginBottom: "30px" }}>
            <li>
              <b>Cold Welding Seal:</b> The interface between abutment and
              implant creates a hermetic seal thanks to its extra-tight
              friction, virtually eliminating micro-gaps and bacterial
              microleakage.
            </li>
            <li>
              <b>Mechanical Stability:</b> Minimizes micro-movements to
              safeguard regenerating bone and adjacent peri-implant tissues.
            </li>
            <li>
              <b>Higher Load Bearing:</b> Internal conical connection withstands
              higher masticatory stresses and prevents screw loosening.
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              background: "#1c1c1c",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <img
              src="/assets/imgs/blog-1.1.webp"
              alt="B&B Dental Conexa"
              style={{ width: "120px", borderRadius: "8px" }}
            />
            <p style={{ margin: 0, color: "#ccc" }}>
              B&amp;B Dental’s CONEXA connection features a cone Morse
              connection with internal hex indexing, offering accurate placement
              with reduced trauma for surrounding tissues.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
