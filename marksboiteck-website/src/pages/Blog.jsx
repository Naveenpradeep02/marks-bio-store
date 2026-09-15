import React from "react";
import { Link } from "react-router-dom";
import "../styles/blog.css";

export default function Blog() {
  const blogList = [
    {
      id: 1,
      slug: "1",
      title: "Morse Tapered Connection Implants",
      img: "/assets/imgs/blog-1.webp",
      snippet:
        "In 1864 an engineer named Stephen Morse conceptualised the mechanical phenomenon stating that when two conical metal components (female + male) reach a tight contact, these fix one into the other through cold welding.",
    },
    {
      id: 2,
      slug: "2",
      title: "Dynamic Navigation: Precision Implant Surgery",
      img: "/assets/imgs/blog-2.webp",
      snippet:
        "Dynamic Navigation is the most effective means by which to accurately transfer a planned implant position to a patient. In contrast to the inherent inaccuracy of Freehand and Static Navigation...",
    },
  ];

  return (
    <main className="blog-page-main">
      <h1 className="sr-only">Blogs | Marks Biotech</h1>

      <div className="breadcrumb-n">
        <div className="container">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>››</li>
            <li className="blog-name">Blogs</li>
          </ul>
        </div>
      </div>

      <div className="blog-container">
        <h2 className="blog-page-title">Blogs</h2>
        <div className="blog-grid">
          {blogList.map((post) => (
            <div key={post.id} className="blog-card">
              <Link to={`/blog/${post.slug}`}>
                <img src={post.img} alt={post.title} loading="lazy" />
                <div className="blog-content">
                  <h3>{post.title}</h3>
                  <p>{post.snippet}</p>
                  <span className="read-more">Learn more »</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
