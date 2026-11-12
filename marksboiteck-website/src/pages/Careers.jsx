import React, { useState } from "react";
import "../styles/careers.css";

export default function Careers() {
  const [showPositions, setShowPositions] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    role: "",
    resume: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectRole = (roleName) => {
    setFormData((prev) => ({ ...prev, role: roleName }));
    const formElement = document.getElementById("form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for applying! Your application has been submitted successfully.",
    );
    setFormData({
      name: "",
      email: "",
      mobile: "",
      city: "",
      role: "",
      resume: "",
      message: "",
    });
  };

  return (
    <main className="careers-main-wrap">
      {/* 1. TOP BANNER */}
      <section className="top-banner-careers">
        <div>
          <h1>CAREERS</h1>
        </div>
      </section>

      {/* 2. CAREER HERO */}
      <section className="career-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Build Your Career in Dental Innovation</h1>
            <p className="hero-sub">
              Be part of the fastest growing dental innovation company and shape
              your career.
            </p>
            <div className="hero-cta">
              <button
                className="btn-primary"
                id="toggleOpenPositionsBtn"
                type="button"
                aria-expanded={showPositions}
                onClick={() => setShowPositions((prev) => !prev)}
              >
                {showPositions ? (
                  <>
                    <i className="fa-solid fa-chevron-up"></i> Hide Open Positions
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-briefcase"></i> View Open Positions
                  </>
                )}
              </button>
              <button className="btn-outline" type="button">
                <a href="#form">
                  <i className="fa-solid fa-file-arrow-up"></i> Send Your Resume
                </a>
              </button>
            </div>
          </div>

          <div
            className={`open-positions-panel ${showPositions ? "is-open" : ""}`}
            id="openPositionsPanel"
            aria-hidden={!showPositions}
          >
            <h3>Open Service Roles</h3>
            <div className="service-roles-grid">
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Territory Sales Managers")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Territory Sales Managers");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Territory Sales Managers</h4>
              </div>
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Sales & Service Engineers")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Sales & Service Engineers");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Sales &amp; Service Engineers</h4>
              </div>
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Accounts Manager")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Accounts Manager");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Accounts Manager</h4>
              </div>
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Operation & Logistics Manager")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Operation & Logistics Manager");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Operation &amp; Logistics Manager</h4>
              </div>
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Social Media Executive")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Social Media Executive");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Social Media Executive</h4>
              </div>
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Regulatory Executives")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Regulatory Executives");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Regulatory Executives</h4>
              </div>
              <div
                className="service-role-card"
                onClick={() => handleSelectRole("Product Manager")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSelectRole("Product Manager");
                }}
              >
                <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
                <h4>Product Manager</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY WORK WITH US */}
      <section className="why-work">
        <div className="why-container">
          <h2>Why Work With Us</h2>

          <div className="why-grid">
            <div className="why-card">
              <i className="fa-solid fa-handshake-angle"></i>
              <h3>Supportive Work Culture</h3>
              <p>
                We foster an environment built on ethics, teamwork, mutual
                respect, and open communication. Every team member's
                contribution is valued, creating a workplace where collaboration
                drives success.
              </p>
            </div>

            <div className="why-card">
              <i className="fa-solid fa-chart-line"></i>
              <h3>Stability With Long-Term Growth</h3>
              <p>
                As a steadily growing healthcare-focused organization, we offer
                career stability along with opportunities to grow, take on
                higher responsibilities, and build a long-term professional
                future.
              </p>
            </div>

            <div className="why-card">
              <i className="fa-solid fa-graduation-cap"></i>
              <h3>Continuous Learning &amp; Skill Development</h3>
              <p>
                We encourage ongoing learning and professional development,
                helping employees enhance their expertise in advanced dental and
                healthcare technologies.
              </p>
            </div>

            <div className="why-card">
              <i className="fa-solid fa-users"></i>
              <h3>Collaborative Teamwork</h3>
              <p>
                Join a team of skilled professionals who work together to
                achieve shared goals, encouraging knowledge-sharing and
                cross-functional collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION FORM */}
      <section className="apply">
        <h2>Application Form</h2>

        <form className="apply-form" id="form" onSubmit={handleSubmit}>
          <div className="form-grid-row">
            <div className="form-field-group">
              <label>
                Full Name <span style={{ color: "#ce2017" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-field-group">
              <label>
                Email Address <span style={{ color: "#ce2017" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-grid-row">
            <div className="form-field-group">
              <label>
                Mobile Number <span style={{ color: "#ce2017" }}>*</span>
              </label>
              <input
                type="text"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-field-group">
              <label>
                City <span style={{ color: "#ce2017" }}>*</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-grid-row">
            <div className="form-field-group">
              <label>
                Role Applying For <span style={{ color: "#ce2017" }}>*</span>
              </label>
              <input
                type="text"
                name="role"
                placeholder="e.g. Territory Sales Managers"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-field-group">
              <label>
                Upload Resume <span style={{ color: "#ce2017" }}>*</span>
              </label>
              <input
                type="text"
                name="resume"
                placeholder="Paste Google Drive resume link"
                value={formData.resume}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-field-group">
            <label>Message (optional)</label>
            <textarea
              placeholder="Enter Message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button className="btn-primary" type="submit">
            Submit Application
          </button>
        </form>

        <div className="apply-alt">
          <p>Mention job-title, city and your Name (in Messages)</p>
        </div>
      </section>
    </main>
  );
}
