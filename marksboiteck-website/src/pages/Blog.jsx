import React from "react";
import { Link } from "react-router-dom";
import "../styles/blog.css";

export default function Blog() {
  const [dynamicBlogs, setDynamicBlogs] = React.useState([]);

  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.blogs && data.blogs.length > 0) {
          const formatted = data.blogs.map((b) => ({
            id: b.id,
            slug: b.slug,
            title: b.title,
            category: b.category || "CLINICAL INSIGHTS",
            img: b.featured_image || "/assets/imgs/blog-1.webp",
            snippet:
              b.excerpt ||
              (b.content
                ? b.content.replace(/<[^>]+>/g, "").slice(0, 180) + "..."
                : ""),
          }));
          setDynamicBlogs(formatted);
        }
      })
      .catch(() => {});
  }, []);

  const blogList = [
    {
      id: 1,
      slug: "1",
      title: "Morse Taper Connection",
      category: "DENTAL IMPLANT TECHNOLOGY",
      img: "/assets/imgs/blog-1.webp",
      snippet:
        "In 1864 an engineer named Stephen Morse conceptualised the mechanical phenomenon stating that when twoconical metal components (female + male) reach a tight contact, these fix one into the other, through a the so called \"cold welding\".",
    },
    {
      id: 2,
      slug: "2",
      title: "Dynamic Navigation: Precision Implant Surgery",
      category: "SURGICAL NAVIGATION TECHNOLOGY",
      img: "/assets/imgs/blog-2.webp",
      snippet:
        "Dynamic Navigation is the most effective means by which to accurately transfer a planned implant position to a patient. In contrast to the inherent inaccuracy of Freehand and Static Navigation...",
    },
    {
      id: 3,
      slug: "3",
      title: "Photogrammetry in Full-Arch Dental Implants for Passivity",
      category: "DIGITAL DENTISTRY • PHOTOGRAMMETRY",
      img: "/assets/imgs/micronmaper.webp",
      snippet:
        "Explore how photogrammetry supports accurate implant-position capture in full-arch dental implant workflows, its relationship with passive fit, CAD/CAM and clinical verification.",
    },
    {
      id: 4,
      slug: "4",
      title: "Passive Fit of Implant Prosthesis Using Digital Technology",
      category: "DIGITAL WORKFLOW • IMPLANT PROSTHODONTICS",
      img: "/assets/imgs/blog-4.webp",
      snippet:
        "A framework that needs to be forced into place is already telling you something: the prosthesis and the implant positions are not matching as they should. Discover how digital technology controls passive fit...",
    },
    {
      id: 5,
      slug: "5",
      title: "Radiographic Markers for Guided Implant Surgery",
      category: "GUIDED IMPLANT SURGERY • CBCT PLANNING",
      img: "/assets/imgs/blog-5.webp",
      snippet:
        "Radiopaque markers for dental implants are small, X-ray-visible reference points incorporated into a radiographic template to help relate intended prosthetics to patient anatomy.",
    },
    {
      id: 6,
      slug: "6",
      title: "Role Of Compactors / Expanders in Dental Implant Surgery",
      category: "IMPLANT SITE PREPARATION • RIDGE EXPANSION",
      img: "/assets/imgs/blog-6.webp",
      snippet:
        "Bone compactors and expanders widen or densify a narrow or low-density ridge by pushing bone laterally rather than drilling it away, preserving bone volume and boosting primary stability.",
    },
    {
      id: 7,
      slug: "7",
      title:
        "Emergence Profile in Dental Implant Procedure Using PEEK Abutments",
      category: "IMPLANT PROSTHODONTICS • SOFT TISSUE ARCHITECTURE",
      img: "/assets/imgs/blog-7.webp",
      snippet:
        "Standard round healing abutments never replicate a tooth's cervical anatomy. Discover how PEEK components guide critical and subcritical contours during early soft tissue healing.",
    },
    {
      id: 8,
      slug: "8",
      title: "Guided Endodontics in Dynamic Navigation Systems",
      category: "SURGICAL NAVIGATION • GUIDED ENDODONTICS",
      img: "/assets/imgs/blog-8.webp",
      snippet:
        "Dynamic navigation in endodontics uses real-time optical tracking to guide burs along pre-planned CBCT paths for calcified canals, conservative access, and microsurgery.",
    },
    {
      id: 9,
      slug: "9",
      title:
        "Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry",
      category: "ARTIFICIAL INTELLIGENCE • CBCT SEGMENTATION",
      img: "/assets/imgs/blog-9.webp",
      snippet:
        "Deep learning networks automate tooth, alveolar bone, sinus, and mandibular canal segmentation in seconds, transforming digital implant planning and guide design.",
    },
    {
      id: 10,
      slug: "10",
      title:
        "Evaluvating 3D Implant Placement Using Digital Dentistry Software",
      category: "VIRTUAL IMPLANT PLANNING • ACCURACY ANALYSIS",
      img: "/assets/imgs/blog-10.webp",
      snippet:
        "Comparing planned vs actual placed positions: entry-point, apical, and angular deviations, registration accuracy, and how delivery methods affect digital implant outcomes.",
    },
    {
      id: 11,
      slug: "11",
      title:
        "Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry",
      category: "DIGITAL DENTISTRY • MULTIMODAL REGISTRATION",
      img: "/assets/imgs/blog-11.webp",
      snippet:
        "Auto-merging aligns CBCT bone scans with soft-tissue intraoral scans into a single coordinate system. Explore AI-driven registration, submillimeter accuracy, and virtual patient workflows.",
    },
    {
      id: 12,
      slug: "12",
      title:
        "TMJ Pain Management (Arthrocenthesis) & Navigation Procedure",
      category: "TMJ PROCEDURES • SURGICAL NAVIGATION",
      img: "/assets/imgs/blog-12.webp",
      snippet:
        "Examine TMJ arthrocentesis mechanisms, landmark-based limitations, patient-specific 3D printed guides, real-time dynamic navigation, and comparative clinical outcomes.",
    },
    {
      id: 13,
      slug: "13",
      title: "Tissue Adhesives in Dentistry",
      category: "BIOMATERIALS • WOUND CLOSURE",
      img: "/assets/imgs/blog-13.webp",
      snippet:
        "Cyanoacrylate tissue adhesives vs conventional sutures: wound healing, chair time, graft fixation, hemostatic benefits, and tension limitations in oral surgery.",
    },
    {
      id: 14,
      slug: "14",
      title:
        "Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery",
      category: "PHOTOGRAMMETRY • FULL-ARCH RESTORATION",
      img: "/assets/imgs/blog-14.webp",
      snippet:
        "MicronMapper Tissue Mapper replaces wet, bloody, tongue-crowded post-op optical scans with contact-based Trace surface registration on surgery day.",
    },
  ];

  return (
    <main className="blog-page-main">
      <h1 className="sr-only">Blogs | Marks Biotech</h1>

      {/* Top Compact Breadcrumb */}
      <div className="blog-breadcrumb-wrap">
        <div className="blog-container">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-home">
              Home
            </Link>
            <span className="breadcrumb-sep">&raquo;</span>
            <span className="breadcrumb-current">Blogs</span>
          </nav>
        </div>
      </div>

      <div className="blog-container">
        {/* Blogs Heading with Short Red Underline */}
        <div className="blog-heading-wrap">
          <h2 className="blog-page-title">Blogs</h2>
          <span className="blog-title-line"></span>
        </div>

        {/* Responsive 3-Column Blog Grid */}
        <div className="blog-grid">
          {(dynamicBlogs.length > 0 ? dynamicBlogs : blogList).map((post) => (
            <article key={post.id} className="blog-card">
              <Link to={`/blog/${post.slug}`} className="blog-card-link">
                {/* Image at Top */}
                <div className="blog-card-img-wrap">
                  <img src={post.img} alt={post.title} loading="lazy" />
                </div>

                {/* Card Content Body */}
                <div className="blog-card-body">
                  <span className="blog-card-category">{post.category}</span>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-desc">{post.snippet}</p>

                  {/* Card Footer with Horizontal Alignment */}
                  <div className="blog-card-footer">
                    <span className="blog-card-action">Learn More &rarr;</span>
                    <span className="blog-card-arrow-circle" aria-hidden="true">
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
