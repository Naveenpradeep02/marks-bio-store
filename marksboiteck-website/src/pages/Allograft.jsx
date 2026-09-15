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
            <li>RM-CP 2.0gm</li>
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
    </main>
  );
}
