import React from "react";
import "../styles/tissue.css";

export default function Tissue() {
  return (
    <main className="tissue-page-main graft-page">
      <section className="graft-banner">
        <div className="graft-banner-content">
          <h1>Tissue adhesive – Amcrylate</h1>
          <p>Wonder care for wound closure - A patient Molecule</p>
        </div>
      </section>

      {/* TEXT SECTION */}
      <section className="tissue-intro">
        <div className="tissue-prose">
          <h2>About Amcrylate</h2>
          <p>
            <strong className="tissue-mark">AMCRYLATE : </strong> is developed
            by Concord Drugs Ltd. in technical collaboration with IICT (Indian
            Institute of Chemical Technology) and with assistance of TIFAC (New
            Delhi).
          </p>
          <p>
            ISO amyl - 2 Cyanoacrylate undergoes an exothermic polymerization
            catalysed by the presence of small quantities of weak base such as
            water. This anionic polymerization provides bonding action.
          </p>
          <p>
            <strong className="tissue-mark">AMCRYLATE</strong> is superior to
            N-Butyl Cyanoacrylate since it does not become brittle and fracture
            on long lacerations.
          </p>
          <p>
            <strong className="tissue-mark">AMCRYLATE</strong> solidifies within
            5 to 10 seconds and produces less oedema formation and granuloma
            than sutures.
          </p>
          <p>
            <strong className="tissue-mark">Amcrylate</strong> is sterile,
            non-toxic, haemostatic, bacteriostatic, and biodegradable.
          </p>
        </div>
      </section>

      {/* USES SECTION */}
      <section className="tissue-uses">
        <div className="tissue-content">
          <h2 className="tissue-section-title">Amcrylate is widely used in:</h2>

          <div className="graft-row">
            <img
              src="/assets/imgs/amcrylate-pack.jpeg"
              className="tissue-product-image"
              loading="lazy"
              alt="Amcrylate tissue adhesive pack with ampoule and applicator"
            />
            <ul className="graft-list">
              <li>ENT Surgery</li>
              <li>Vascular Surgery</li>
              <li>Cosmetic Surgery</li>
              <li>Dental Surgery</li>
              <li>Periodontal Surgery</li>
              <li>Sterilization</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
