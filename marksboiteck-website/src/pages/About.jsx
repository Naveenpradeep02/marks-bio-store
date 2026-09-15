import React from "react";
import "../styles/about.css";

export default function About() {
  return (
    <main className="about-page-main">
      <h1 className="sr-only">About Marks Biotech</h1>

      {/* PARTNERS SECTION */}
      <section id="about-partners" className="about-partners-section">
        <div className="partners-top">
          <div className="image-box">
            <img
              src="/assets/imgs/ai-driven-dental.webp"
              alt="Doctor"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          <div className="text-box">
            <h2>
              <span>Partners of Choice in Dental Industry in India.</span>
            </h2>
            <p>
              We specialize in Dental Implantology &amp; Advanced Speciality
              Products and solutions both consumables and Navigation &amp;
              Robotic Equipments help clinicians enhance Treatment outcome. We
              have deep understanding of the industry and identify and exceed
              clinician expectations with around 3 Decades offering quality
              products and services at both Value for Money an Premium Products
              Transforming Patient Life.
            </p>
            <p>
              We collaborate with leading global manufacturers, regulatory
              bodies, universities, and dental academies to bring the latest
              innovations in dentistry to clinicians across the region.
            </p>
          </div>
        </div>
      </section>

      {/* CORE OFFERINGS */}
      <section id="about-core" className="about-core-section">
        <div className="core-header">
          <h2>CORE OFFERINGS</h2>
          <p>
            We bring cutting-edge innovations to dental practices with a strong
            focus on
          </p>
        </div>

        <div className="core-cards">
          <div className="card">
            <img
              src="/assets/imgs/Group.webp"
              alt="Implantology"
              loading="lazy"
            />
            <h4>Implantology</h4>
            <p>
              Comprehensive dental implant solutions, including advanced systems
              and regenerative products.
            </p>
          </div>

          <div className="card">
            <img
              src="/assets/imgs/Group (1).webp"
              alt="Robotic & Digital Navigation"
              loading="lazy"
            />
            <h4>Robotic &amp; Digital Navigation</h4>
            <p>
              Precision-driven robotic navigation systems designed for
              predictable implant placement.
            </p>
          </div>

          <div className="card">
            <img
              src="/assets/imgs/Group (2).webp"
              alt="Digital Dentistry & Clinical Support"
              loading="lazy"
            />
            <h4>Digital Dentistry &amp; Clinical Support</h4>
            <p>
              Integrated digital workflows, training programs, and chairside
              clinical support.
            </p>
          </div>

          <div className="card">
            <img
              src="/assets/imgs/skin-regeneration_10938186 1.webp"
              alt="Bone Regeneration"
              loading="lazy"
            />
            <h4>Bone Regeneration</h4>
            <p>
              Advanced biomaterials and regenerative techniques to enhance bone
              healing and stability.
            </p>
          </div>
        </div>
      </section>

      {/* COVERAGE SECTION */}
      <section id="about-coverage" className="about-partners-section2">
        <div className="partners-bottom">
          <div className="image-box1">
            <img
              src="/assets/imgs/Indiamapontransparentbackground_PremiumVector 1.webp"
              alt="India Map Coverage"
              loading="lazy"
            />
          </div>

          <div className="coverage-text">
            <h3>
              <span>100 + CITIES IN COVERAGE LIST</span>
            </h3>
            <p>
              We deliver products and services to 100+ cities across India
              through a robust network of direct sales teams, channel partners,
              and trained technical specialists — ensuring prompt support and
              fast delivery.
            </p>
          </div>
        </div>
      </section>

      {/* LEARNING FOR LIFE */}
      <section id="about-learning" className="about-core-section1">
        <div className="learning-section">
          <div className="learning-text">
            <h3>
              <span>Learning for Life</span>
            </h3>

            <p>
              We upskill and enrich customer experience by providing education
              powered by KOLs, specialists, and through education partnerships.
            </p>

            <h5>PROGRAMS INCLUDE:</h5>
            <ul>
              <li>Guided Surgery &amp; Dynamic Navigation</li>
              <li>Implantology Fundamentals to Advanced Techniques</li>
              <li>Bone Regeneration &amp; Biomaterial Protocols</li>
              <li>Digital Dentistry Integration</li>
              <li>Full-arch Implant Rehabilitation Training</li>
              <li>Robotic-assisted Surgical Workflows</li>
            </ul>
          </div>

          <div className="mega-images1">
            <img
              src="/assets/imgs/Group 263.webp"
              loading="lazy"
              alt="Learning programs"
            />
          </div>
        </div>
      </section>

      {/* EMPOWER / VISION & MISSION */}
      <div id="about-mission" className="container">
        <div className="empower-section">
          <div className="empower-content">
            <div className="empower-image">
              <img
                src="/assets/imgs/Rectangle 31.webp"
                alt="Our Story"
                loading="lazy"
              />
            </div>

            <div className="vision-mission">
              <div className="vision-box">
                <h4>Vision</h4>
                <p>
                  To become a leading dental and healthcare solutions provider
                  in South Asia, connecting clinicians, hospitals,
                  manufacturers, and regulatory bodies—transforming patient
                  outcomes through innovation and collaboration.
                </p>
              </div>

              <div className="mission-box">
                <h4>Mission</h4>
                <p>
                  Deliver products that genuinely improve patient quality of
                  life. Support clinicians with advanced, reliable technologies.
                  Continuously enhance our services, training, and customer
                  engagement. Build long-term growth partnerships with every
                  customer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MARKET ENTRY */}
      <section id="about-market" className="device-section1">
        <div className="market-section">
          <div className="market-image">
            <img
              src="/assets/imgs/Rectangle 237.webp"
              alt="India Gate"
              loading="lazy"
            />
          </div>

          <div className="market-text">
            <h3>New Market Entry Support Service</h3>
            <ul>
              <li>
                Product Registration With Ministry of Health Authorities For
                Licenses
              </li>
              <li>Imports &amp; Registration Of Plant And Products</li>
              <li>Create A Regulatory Strategy</li>
              <li>Pre-Screening Of Documents</li>
              <li>Timeline Management</li>
              <li>Global Clinical Trials</li>
              <li>FDC Approvals</li>
              <li>CE Mark Approvals</li>
            </ul>
          </div>
        </div>

        <div className="market-text1">
          <img
            src="/assets/imgs/Distribution.webp"
            alt="Distribution Network"
            className="market-distribution-image"
            loading="lazy"
          />
          <h4>
            Identification Of Right Channel Partners For Our Clients For South
            Asia Markets
          </h4>
          <ul>
            <li>
              Work with Channel Partners in branding and marketing campaigns
              including Clinical Training &amp; Education of products and skill
              enhancement
            </li>
            <li>Post Market Surveillance</li>
          </ul>
        </div>
      </section>

      {/* DEVICE REGISTRATION */}
      <section id="about-device" className="device-section">
        <div className="device-box">
          <div className="device-left">
            <h2>Device Registration &amp; New market Entry</h2>

            <h4>DEVICE REGISTRATION :</h4>
            <ul>
              <li>India CDSCO Medical Device Registration and Approvals</li>
              <li>In Country Representation</li>
            </ul>

            <p>
              Indian Market Entry for Medical Devices Requires to Obtain
              Registration and Approvals from the Registration Agencies and in
              India is the CDSCO (Central Drug Standard Control Organisations).
            </p>

            <p>
              Based on the Product Classifications Registration Requirements and
              Work Related May Vary to Make Permanent Technical and Clinical
              Submission or Leveraging Existing Registration and Approvals for
              Availing Faster Entry to New Markets Launches.
            </p>
          </div>

          <div className="device-right">
            <img
              src="/assets/imgs/colored-logo (6) 1.webp"
              alt="Ashoka Emblem"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* STORY OF MARKS BIOTECH */}
      <section id="about-story" className="about-story-founder-section">
        <div className="story-box">
          <div className="story-text">
            <h2>The Story of Marks Biotech</h2>

            <p>
              Marks Biotech Inc., has grown as a dedicated provider of advanced
              dental products and solutions, with a focus on supporting dental
              professionals across India since 2018.
            </p>

            <p>
              Headquartered in Chennai, Tamil Nadu, with Multiple Branch Offices
              and Warehouses across India. Marks Biotech Inc. specializes in
              dental consumables, oral care products, rehabilitation solutions,
              and digital technology-enabled systems spanning multiple dental
              disciplines — including Maxillofacial Surgery, Periodontics,
              Prosthodontics, Endodontics, Oral Radiology and works closely with
              Dental Technicians.
            </p>
            <p>
              Marks Biotech Inc. operates in the broader context of India's
              expanding MedTech and dental technology sector, where digital
              innovations — including AI, digital diagnostics, and guided
              workflows — play an increasingly important role in improving
              clinical outcomes.
            </p>
          </div>

          <div className="story-image">
            <img
              src="/assets/imgs/about-img.webp"
              alt="Leadership Team"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOUNDER PROFILE */}
      <section id="about-founder" className="about-founder-box">
        <div className="founder-text">
          <h3>FOUNDER PROFILE</h3>

          <p className="intro">
            With over 30 years of leadership experience across FMCG,
            Pharmaceuticals, Medical Devices, and Dental Devices, Mr. Mani
            Krishnan brings deep expertise in business development, clinical
            partnerships, and product innovation.
          </p>

          <h4>CAREER HIGHLIGHTS:</h4>

          <ul>
            <li>20+ years dedicated to the dental industry</li>
            <li>Former Director – Nobel Biocare India &amp; South Asia</li>
            <li>Senior leader at Dentsply India</li>
            <li>Regional Head at Becton Dickinson (BD India)</li>
            <li>
              Proven track record of building scalable healthcare businesses
            </li>
            <li>
              Recognized for ethical leadership and long-term partnerships
            </li>
            <li>
              Master's Degree in Commerce &amp; Advanced PG Diploma in Marketing
              &amp; International Business
            </li>
          </ul>
        </div>

        <div className="founder-image">
          <img
            src="/assets/imgs/Rectangle 244.webp"
            alt="Founder"
            loading="lazy"
          />
          <p className="founder-name">FOUNDER, MARKS BIOTECH INC.</p>
        </div>
      </section>

      {/* TEAM / CONSULTANTS */}
      <section id="about-team" className="team-vision-section">
        <div className="team-section">
          <h2>Non Executive Consultant</h2>

          <div className="team-cards">
            {/* Dr Prabhu Vinayagam */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-face team-card-front">
                  <img
                    src="/assets/imgs/Prabhu 4.webp"
                    alt="Dr. Prabhu Vinayagam"
                    loading="lazy"
                  />
                  <h4>Dr. Prabhu Vinayagam</h4>
                  <span>
                    Ex–Managing Director, JCI Asia Pacific Office At Singapore
                  </span>
                </div>
                <div className="team-card-face team-card-back">
                  <h4>Dr. Prabhu Vinayagam</h4>
                  <p>
                    Dr. Prabhu Vinayagam is a Distinguished C-level Healthcare
                    Executive with Extensive Leadership experience across the
                    Asia Pacific Region. He holds a Bachelor of Medicine and
                    Bachelor of Surgery (MBBS) from Maulana Azad Medical College
                    (MAMC), a Diploma in Anesthesiology (DA), and an MBA in
                    Marketing and Operations from SP Jain School of Global
                    Management, Singapore. He served as the Managing Director of
                    Joint Commission International (JCI) – Asia Pacific.
                  </p>
                </div>
              </div>
            </div>

            {/* Mr V Sourirajan */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-face team-card-front">
                  <img
                    src="/assets/imgs/Mr V Sourirajan.webp"
                    alt="Mr. V. Sourirajan"
                    loading="lazy"
                  />
                  <h4>Mr. V. Sourirajan</h4>
                  <span>
                    Healthcare Expert with 35 years over Pharma, Medical
                    Devices, Medical Equipment &amp; Diagnostic Industry.
                  </span>
                </div>
                <div className="team-card-face team-card-back">
                  <h4>Mr. V. Sourirajan</h4>
                  <p>
                    A Healthcare Industry Veteran with nearly four Decades of
                    Commercial Leadership Across India and South Asia. Former
                    Business Director at Becton Dickinson &amp; Co, India with
                    Multi-business-unit P&amp;L Ownership and a Tenure on the BD
                    India Leadership Team.
                  </p>
                </div>
              </div>
            </div>

            {/* Mr N Mahesh Kumar */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-face team-card-front">
                  <img
                    src="/assets/imgs/Mahesh New.webp"
                    alt="Mr. N. Mahesh Kumar"
                    loading="lazy"
                  />
                  <h4>Mr. N. Mahesh Kumar</h4>
                  <span>
                    Entrepreneur | FMCG &amp; Paper Industry Leader | Director
                  </span>
                </div>
                <div className="team-card-face team-card-back">
                  <h4>Mr. N. Mahesh Kumar</h4>
                  <p>
                    N. Mahesh Kumar is a Seasoned Entrepreneur with over 30
                    years of Leadership Experience in the FMCG Products and
                    Paper Industries. With a Strong Academic Foundation in
                    Commerce and Economics, he brings deep Expertise in
                    Financial Management, Cash Flow Optimization, Risk
                    Mitigation, and Sustainable Business Structuring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
