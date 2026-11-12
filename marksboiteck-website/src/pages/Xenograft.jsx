import React from "react";
import "../styles/xenograft.css";

export default function Xenograft() {
  return (
    <main className="xenograft-page-main graft-page">
      <section className="graft-banner">
        <div>
          <h1 className="graft-title">Xenograft</h1>
        </div>
      </section>

      <section className="graft-row">
        <div className="graft-media">
          <img
            src="/assets/imgs/image 101.webp"
            alt="NovoBone xenograft granules box and vial"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="graft-copy">
          <div className="graft-copy-group">
            <h2>
              <span>Use and characteristics</span>
            </h2>
            <ul>
              <li>Sinus lift</li>
              <li>Crestal volume augmentation</li>
              <li>Periodontal regeneration</li>
              <li>Alveolar regeneration</li>
              <li>Post-extraction regeneration</li>
            </ul>
          </div>

          <div className="graft-copy-group">
            <h2>
              <span>Features</span>
            </h2>
            <ul>
              <li>Compliant with the Regulation (EU) 2017/745 (MDR)</li>
              <li>
                Treated at low temperature for the removal of the protein
                component
              </li>
              <li>100% resorbable</li>
            </ul>
            <p>The production and sales chain are entirely Italian.</p>
          </div>
        </div>
      </section>

      <section className="graft-row">
        <div className="graft-copy">
          <h2>
            <span>
              Novobone is available in the following formats (GRANULES, 1 vial):
            </span>
          </h2>
          <ul>
            <li>0.5 g, granules diameter: 0.2-0.6mm VOL: 1cc</li>
            <li>1 g, granules diameter: 0.2-0.6mm VOL: 2cc</li>
            <li>2 g, granules diameter: 0.2-0.6mm VOL: 4cc</li>
            <li>3 g, granules diameter: 0.2-0.6mm VOL: 6cc</li>
            <li>5 g, granules diameter: 0.2-0.6mm VOL: 10cc</li>
          </ul>
        </div>

        <div className="graft-media">
          <img
            src="/assets/imgs/image 102.webp"
            alt="NovoBone granules"
            loading="lazy"
          />
        </div>
      </section>

      {/* COLLAGEN MEMBRANE */}
      <section className="graft-row" id="collagen">
        <div className="graft-media">
          <img
            src="/assets/imgs/t-barrier.webp"
            alt="T-Barrier collagen membrane and product box"
            loading="lazy"
          />
        </div>

        <div className="graft-copy">
          <div className="graft-copy-group">
            <h2>
              <span>T-Barrier Collagen resorbable equine collagen</span>
            </h2>
            <ul>
              <li>Perfect biocompatibility</li>
              <li>Complete resorption after 6-8 weeks</li>
              <li>Easy to apply</li>
            </ul>
          </div>

          <div className="graft-copy-group">
            <h2>
              <span>Membrane sizes</span>
            </h2>
            <ul>
              <li>23 x 23 x 0.25 mm</li>
              <li>10 x 10 x 1 mm</li>
              <li>10 x 20 x 0.25 mm</li>
              <li>15 x 20 x 0.25 mm</li>
              <li>20 x 30 x 0.25 mm</li>
              <li>30 x 40 x 0.25 mm</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TITANIUM BARRIER */}
      <section className="graft-row">
        <div className="graft-copy">
          <div className="graft-copy-group">
            <h2>
              <span>
                T-Barrier Titanium is a titanium safety barrier for GBR materials
              </span>
            </h2>
            <ul>
              <li>Easy to model</li>
              <li>Biocompatible and safe</li>
              <li>Easy to cut</li>
              <li>Easy to apply and fix onto the defected site</li>
            </ul>
          </div>

          <div className="graft-copy-group">
            <h2>
              <span>Membrane sizes</span>
            </h2>
            <ul>
              <li>24×29×0.13mm</li>
            </ul>
          </div>
        </div>
        <div className="graft-media">
          <img
            src="/assets/imgs/titanium-membrane-1.webp"
            alt="Titanium barrier"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
