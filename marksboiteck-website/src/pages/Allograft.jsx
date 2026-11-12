import React from "react";
import "../styles/allograft.css";

export default function Allograft() {
  return (
    <main className="allograft-page-main graft-page">
      <section className="graft-banner">
        <div>
          <p className="graft-eyebrow">Rocky Mountain Tissue Bank · USA</p>
          <h1>Allograft</h1>
          <p className="graft-banner-description">
            40+ Years of Clinical Success, Most Researched and Scientifically
            Proved Results.
          </p>
          <p className="graft-banner-note">(Not For Profit Organization)</p>
        </div>
      </section>

      <section className="graft-row">
        <div className="graft-media">
          <img
            src="/assets/imgs/Rectangle 251.webp"
            alt="Rocky Mountain Allograft Pack"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="graft-copy">
          <h2>Indications</h2>
          <p>
            Our Processing provides you the greatest assurance of allograft
            quality and safety.
          </p>
          <ul>
            <li>Sinus Augmentation</li>
            <li>Sinus Lift</li>
            <li>On-Lay Grafts</li>
            <li>Periodontal Defects</li>
            <li>Segmental Osteotomies</li>
            <li>Tunnel Grafting</li>
            <li>Socket Preservation</li>
            <li>Block Grafting</li>
          </ul>
        </div>
      </section>

      {/* PRODUCT BLOCK 1 */}
      <section className="graft-row">
        <div className="graft-copy">
          <h2>Cancellous particulate vials</h2>
          <p>
            Irradiated Allogenic Cancellous Bone and Marrow Particulate Randomly
            sized.
          </p>
          <ul>
            <li>RM-Canpar 0.25gm</li>
            <li>RM-Canpar 0.50gm</li>
            <li>RM-Canpar 1.0gm</li>
            <li>RM-Canpar 2.0gm</li>
            <li>RM-Canpar 3.0gm</li>
          </ul>
        </div>
        <div className="graft-media">
          <img
            src="/assets/imgs/allograft-cancellous-particulate.png"
            className="allograft-material-image"
            alt="Cancellous Particulate Vials"
            loading="lazy"
          />
        </div>
      </section>

      {/* PRODUCT BLOCK 2 */}
      <section className="graft-row">
        <div className="graft-media">
          <img
            src="/assets/imgs/allograft-bone-blocks.png"
            className="allograft-material-image"
            alt="Cortical Cancellous Bone Blocks"
            loading="lazy"
          />
        </div>
        <div className="graft-copy">
          <h2>Cortical / cancellous bone blocks</h2>
          <p>Irradiated Allogenic Cortical/Cancellous Bone Blocks.</p>
          <ul>
            <li>5 × 10 × 10 mm RM-BB</li>
            <li>5 × 10 × 20 mm RM-BB</li>
            <li>5 × 10 × 30 mm RM-BB</li>
            <li>10 × 10 × 10 mm RM-BB</li>
            <li>10 × 10 × 20 mm RM-BB</li>
            <li>10 × 10 × 30 mm RM-BB</li>
          </ul>
        </div>
      </section>

      {/* PRODUCT BLOCK 3 */}
      <section className="graft-row">
        <div className="graft-copy">
          <h2>Cortical particulate vials – bone blocks</h2>
          <p>
            Irradiated Allogenic Crushed Cortical Particulate Randomly sized 2-3
            mm
          </p>
          <ul>
            <li>RM-CP 0.5gm</li>
            <li>RM-CP 1.0gm</li>
          </ul>
        </div>
        <div className="graft-media">
          <img
            src="/assets/imgs/allograft-cortical-particulate.png"
            className="allograft-material-image"
            alt="Rocky Mountain cortical bone particulate"
            loading="lazy"
          />
        </div>
      </section>

      {/* RMTB TABLES & MANDATORY COMPLIANCE (EXACT CONTENT) */}
      <section className="rmtb-content-section" id="rmtb-compliance">
        <div className="rmtb-cards-container">
          {/* DOSAGE TABLE CARD */}
          <div className="rmtb-card rmtb-dosage-card">
            <div className="rmtb-table-wrapper">
              <table className="rmtb-dosage-table">
                <thead>
                  <tr>
                    <th colSpan="2">Periodontal Defects Graft Amount</th>
                    <th colSpan="2">Extraction Sites Graft Amount</th>
                    <th>Sinus Grafts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="purple-row">
                    <td>Central Incisor</td>
                    <td className="amount-cell">0.25g</td>
                    <td>Central Incisor</td>
                    <td className="amount-cell">0.5g</td>
                    <td rowSpan="6" className="sinus-cell">
                      Each Sinus 1 to 3g
                    </td>
                  </tr>
                  <tr className="white-row">
                    <td>Lateral Incisor</td>
                    <td className="amount-cell">0.25g</td>
                    <td>Lateral Incisor</td>
                    <td className="amount-cell">0.25g</td>
                  </tr>
                  <tr className="purple-row">
                    <td>Canine</td>
                    <td className="amount-cell">0.25g</td>
                    <td>Canine</td>
                    <td className="amount-cell">0.5g</td>
                  </tr>
                  <tr className="white-row">
                    <td>1st & 2nd Premolar</td>
                    <td className="amount-cell">0.25g</td>
                    <td>1st & 2nd Premolar</td>
                    <td className="amount-cell">0.5g</td>
                  </tr>
                  <tr className="purple-row">
                    <td>1st & 2nd Molar</td>
                    <td className="amount-cell">0.5g</td>
                    <td>1st & 2nd Molar</td>
                    <td className="amount-cell">1g</td>
                  </tr>
                  <tr className="white-row">
                    <td>3rd Molar</td>
                    <td className="amount-cell">0.5g</td>
                    <td>3rd Molar</td>
                    <td className="amount-cell">1g</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="rmtb-logo-container">
              <img
                src="/assets/imgs/rmtb-v.webp"
                alt="RMTB"
                className="rmtb-card-logo"
              />
            </div>
          </div>

          {/* CONVERSION TABLE CARD */}
          <div className="rmtb-card rmtb-conversion-card">
            <div className="rmtb-conversion-inner">
              <div className="rmtb-bank-title">Rocky Mountain Tissue Bank</div>
              <div className="rmtb-table-wrapper">
                <table className="rmtb-conversion-table">
                  <thead>
                    <tr>
                      <th colSpan="2">Changing Grams to CC's</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="white-row">
                      <td>0.25g</td>
                      <td>0.5cc</td>
                    </tr>
                    <tr className="orange-row">
                      <td>0.5g</td>
                      <td>0.7 – 1.0cc</td>
                    </tr>
                    <tr className="white-row">
                      <td>1g</td>
                      <td>1.2 – 2.0cc</td>
                    </tr>
                    <tr className="orange-row">
                      <td>1 to 3g</td>
                      <td>2.5 – 5cc</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rmtb-logo-container">
              <img
                src="/assets/imgs/rmtb-o.webp"
                alt="RMTB"
                className="rmtb-card-logo"
              />
            </div>
          </div>
        </div>

        {/* INSTRUCTIONS FOR USE & STORAGE WITH COMPLIANCE – MANDATORY REQUIREMENTS */}
        <div className="rmtb-compliance-section">
          <h2 className="rmtb-compliance-title">
            INSTRUCTIONS FOR USE & STORAGE WITH COMPLIANCE – MANDATORY REQUIREMENTS
          </h2>
          <div className="rmtb-compliance-text">
            <p>
              In the Rocky Mountain Tissue Bank processing protocol, every effort is made to ensure the safety of our tissue. However, current technologies may not preclude the transmission of infectious agents.
            </p>
            <p>
              The use of this tissue is limited to hospitals, physicians, dentists or other qualified medical professionals.
            </p>
            <p>
              Allograft has been irradiated with between 25 kGy and 38 kGy of irradiation.
            </p>
            <p>Do Not Re-sterilize.</p>
            <p>
              It is the responsibility of the transplant facility and/or the clinician to maintain the allograft in the appropriate storage conditions prior to transplantation.
            </p>
            <p>
              The Particulate grafts transport tube should be opened and inner sterilized vial placed in sterile surgical field; or the Bone Block outer pouch is opened and inner pouch is placed in sterile field.
            </p>
            <p>
              Once the container seal has been compromised, the tissue shall be either transplanted or discarded.
            </p>
            <p>No Special Handling is required.</p>
            <p>
              No additional preparation is necessary for transplantation, such as diluting or reconstitution.
            </p>
            <p>For Single Patient Use Only.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
