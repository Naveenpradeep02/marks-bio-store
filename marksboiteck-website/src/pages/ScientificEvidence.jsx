import React from "react";
import "../styles/scientific-evidence.css";

export default function ScientificEvidence() {
  const papers = [
    {
      title:
        "Accuracy of dental implant placement with or without the use of a dynamic navigation assisted system",
      img: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9d8845f4c60d428d9f4e7_accuracy_of_dental_implants.webp",
      pdf: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9dcc0890b6014396a675d_2023%20Accuracy%20of%20dental%20implant%20placement%20with%20or%20without%20the%20use%20of%20a%20dynamic%20navigation.pdf",
    },
    {
      title: "Intraosseous Anesthesia Using Dynamic Navigation Technology",
      img: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9d6346997c5af24672d00_Intraosseous.webp",
      pdf: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9d530458174694be8661b_2020%20Intraosseous%20Anesthesia%20using%20Dynamic%20Navigation%20Technology.pdf",
    },
    {
      title:
        "Comparative Evaluation of Accuracy of Dynamic Navigation and Free Hand Methods During Zygomatic Implant Placement",
      img: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9dc71890b6014396a2631_comparative.webp",
      pdf: "https://cdn.prod.website-files.com/666b2e8675e7f9f8749dd981/66d9dcd4fb58a158393242b8_2024%20Comparative%20Evaluation%20of%20the%20Accuracy%20of%20Dynamic%20Navigation%20and%20Free%20Hand%20Methods.pdf",
    },
  ];

  return (
    <main className="scientific-evidence-page">
      <section className="top-banner-careers">
        <div>
          <h1>Transform Your Dental Practice Today</h1>
        </div>
      </section>

      <section
        id="faqs"
        className="light-section"
        style={{
          padding: "60px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          color: "#fff",
        }}
      >
        <div className="w-layout-blockcontainer regulatory-container w-container">
          <h2
            className="heading-3"
            style={{ fontSize: "32px", color: "#c81616", marginBottom: "15px" }}
          >
            Scientific Evidence
          </h2>
          <div
            className="faq-text"
            style={{ fontSize: "18px", color: "#ccc", marginBottom: "40px" }}
          >
            Read about how Navident and MicronMapper are advancing dentistry
            science.
          </div>

          <div
            className="div-block-27"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "30px",
              marginBottom: "50px",
            }}
          >
            {papers.map((paper, idx) => (
              <a
                key={idx}
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="evidence-link w-inline-block"
                style={{
                  background: "#1a1a1a",
                  padding: "20px",
                  borderRadius: "12px",
                  textDecoration: "none",
                  color: "#fff",
                  border: "1px solid #333",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "transform 0.2s",
                  textAlign: "center",
                }}
              >
                <img
                  src={paper.img}
                  loading="lazy"
                  alt={paper.title}
                  className="evidence-image"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
                <div
                  className="evidence-text"
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "1.5",
                    color: "#eee",
                  }}
                >
                  {paper.title}
                </div>
              </a>
            ))}
          </div>

          <div
            className="faq-text"
            style={{
              background: "#141414",
              padding: "30px",
              borderRadius: "12px",
              border: "1px solid #282828",
              lineHeight: "1.8",
              color: "#aaa",
              fontSize: "15px",
            }}
          >
            <h4 style={{ color: "#fff", marginBottom: "15px" }}>
              Key Clinical References:
            </h4>
            <p>
              1. Rutkunas V, Gendvilienė I, et al. Influence of Kennedy class
              and number of implants on the accuracy of dynamic implant
              navigation. J Dent. 2023.
            </p>
            <p>
              2. Fujinaka T, Kernitsky J, Liu J, Dibart S. Piezocision Through
              Computer-Guided Navigation. Int J Periodontics Restorative Dent.
              2023.
            </p>
            <p>
              3. Jorba-García A, Bara-Casaus JJ, et al. Accuracy of dental
              implant placement with or without dynamic navigation: Randomized
              clinical trial. Clin Oral Implants Res. 2023.
            </p>
            <p>
              4. Wang X, Shujaat S, et al. Performance of novice vs experienced
              surgeons for implant placement with dynamic navigation. Sci Rep.
              2023.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
