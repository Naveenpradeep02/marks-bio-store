// Canonical product catalog for the Marksbiotech site.
// Shopify-style shape: each product has a title, description, vendor,
// category (productType), and a `variants` array (size/weight/volume + sku)
// so it can be dropped into a Shopify product importer or used directly
// by the React pages. No pricing exists anywhere in the original codebase,
// so `price` is left null rather than invented — fill in before import.
//
// This consolidates and corrects data that was previously duplicated,
// inconsistently, across Allograft.jsx / Xenograft.jsx / Tissue.jsx /
// AllProducts.jsx / Header.jsx. Notably: AllProducts.jsx claimed the
// Allograft came in "0.5cc, 1.0cc, 2.0cc vials" — that size set does not
// exist anywhere in the actual product; the real variants (gram-based
// particulate vials and mm-based bone blocks) are used here instead.

export const productLines = {
  DENTAL_IMPLANTS: "Dental Implants",
  PROSTHETICS: "Prosthetics",
  REGENERATIVE: "Regenerative Products",
  ROBOTIC_NAVIGATION: "Robotic Navigation",
  PHOTOGRAMMETRY: "Photogrammetry",
  SURGICAL_KITS: "Surgical Kits",
};

const products = [
  // ---------------------------------------------------------------------
  // REGENERATIVE PRODUCTS
  // ---------------------------------------------------------------------
  {
    id: "allograft-cancellous-particulate",
    name: "Rocky Mountain Allograft — Cancellous Particulate Vials",
    vendor: "Rocky Mountain Tissue Bank (USA)",
    category: productLines.REGENERATIVE,
    description:
      "Irradiated Allogenic Cancellous Bone and Marrow Particulate, randomly sized. 40+ years of clinical success from a not-for-profit, AATB-accredited, FDA-registered tissue bank.",
    image: "/assets/imgs/Rectangle 253.webp",
    indications: [
      "Sinus Augmentation",
      "Sinus Lift",
      "On-Lay Grafts",
      "Periodontal Defects",
      "Segmental Osteotomies",
      "Tunnel Grafting",
      "Socket Preservation",
      "Block Grafting",
    ],
    optionName: "Size",
    variants: [
      { sku: "RM-CANPAR-025", size: "0.25gm", price: null },
      { sku: "RM-CANPAR-050", size: "0.50gm", price: null },
      { sku: "RM-CANPAR-100", size: "1.0gm", price: null },
      { sku: "RM-CANPAR-200", size: "2.0gm", price: null },
      { sku: "RM-CANPAR-300", size: "3.0gm", price: null },
    ],
    internalLink: "/allograft",
  },
  {
    id: "allograft-cortical-cancellous-blocks",
    name: "Rocky Mountain Allograft — Cortical/Cancellous Bone Blocks",
    vendor: "Rocky Mountain Tissue Bank (USA)",
    category: productLines.REGENERATIVE,
    description: "Irradiated Allogenic Cortical/Cancellous Bone Blocks.",
    image: "/assets/imgs/Rectangle 252.webp",
    optionName: "Dimensions",
    variants: [
      { sku: "RM-BB-5x10x10", size: "5 × 10 × 10 mm", price: null },
      { sku: "RM-BB-5x10x20", size: "5 × 10 × 20 mm", price: null },
      { sku: "RM-BB-5x10x30", size: "5 × 10 × 30 mm", price: null },
      { sku: "RM-BB-10x10x10", size: "10 × 10 × 10 mm", price: null },
      { sku: "RM-BB-10x10x20", size: "10 × 10 × 20 mm", price: null },
      { sku: "RM-BB-10x10x30", size: "10 × 10 × 30 mm", price: null },
    ],
    internalLink: "/allograft",
  },
  {
    id: "allograft-cortical-particulate",
    name: "Rocky Mountain Allograft — Cortical Particulate Vials",
    vendor: "Rocky Mountain Tissue Bank (USA)",
    category: productLines.REGENERATIVE,
    description:
      "Irradiated Allogenic Crushed Cortical Particulate, randomly sized 2-3 mm.",
    image: "/assets/imgs/Rectangle 255.webp",
    optionName: "Size",
    variants: [
      { sku: "RM-CP-050", size: "0.5gm", price: null },
      { sku: "RM-CP-100", size: "1.0gm", price: null },
      { sku: "RM-CP-200", size: "2.0gm", price: null },
    ],
    internalLink: "/allograft",
  },
  {
    id: "novobone-xenograft",
    name: "NovoBone Xenograft Granules",
    vendor: "NovoBone (Italy)",
    category: productLines.REGENERATIVE,
    description:
      "Deproteinized bovine bone mineral, treated at low temperature to remove the protein component. 100% resorbable. MDR (EU 2017/745) compliant; produced and sold entirely in Italy.",
    image: "/assets/imgs/image 102.webp",
    indications: [
      "Sinus lift",
      "Crestal volume augmentation",
      "Periodontal regeneration",
      "Alveolar regeneration",
      "Post-extraction regeneration",
    ],
    optionName: "Weight / Volume",
    variants: [
      { sku: "NB-GRAN-05", weight: "0.5 g", granuleDiameter: "0.2-0.6mm", volume: "1cc", price: null },
      { sku: "NB-GRAN-1", weight: "1 g", granuleDiameter: "0.2-0.6mm", volume: "2cc", price: null },
      { sku: "NB-GRAN-2", weight: "2 g", granuleDiameter: "0.2-0.6mm", volume: "4cc", price: null },
      { sku: "NB-GRAN-3", weight: "3 g", granuleDiameter: "0.2-0.6mm", volume: "6cc", price: null },
      { sku: "NB-GRAN-5", weight: "5 g", granuleDiameter: "0.2-0.6mm", volume: "10cc", price: null },
    ],
    internalLink: "/xenograft",
  },
  {
    id: "t-barrier-collagen",
    name: "T-Barrier Collagen — Resorbable Equine Collagen Membrane",
    vendor: "Italy",
    category: productLines.REGENERATIVE,
    description:
      "Resorbable equine pericardium collagen barrier membrane. Perfect biocompatibility, complete resorption after 6-8 weeks, easy to apply.",
    image: "/assets/imgs/Collagen13.webp",
    optionName: "Membrane Size",
    variants: [
      { sku: "TB-COL-23x23", size: "23 x 23 x 0.25 mm", price: null },
      { sku: "TB-COL-10x10", size: "10 x 10 x 1 mm", price: null },
      { sku: "TB-COL-10x20", size: "10 x 20 x 0.25 mm", price: null },
      { sku: "TB-COL-15x20", size: "15 x 20 x 0.25 mm", price: null },
      { sku: "TB-COL-20x30", size: "20 x 30 x 0.25 mm", price: null },
      { sku: "TB-COL-30x40", size: "30 x 40 x 0.25 mm", price: null },
    ],
    internalLink: "/xenograft#collagen",
  },
  {
    id: "t-barrier-titanium",
    name: "T-Barrier Titanium",
    vendor: "Italy",
    category: productLines.REGENERATIVE,
    description:
      "Titanium safety barrier for GBR (guided bone regeneration) materials. Easy to model, cut, and fix onto the defect site; biocompatible and safe.",
    image: "/assets/imgs/image 103.webp",
    optionName: null,
    variants: [], // no published sizes for this item
    internalLink: "/xenograft",
  },
  {
    id: "amcrylate-tissue-adhesive",
    name: "Amcrylate Tissue Adhesive",
    vendor: "Concord Drugs Ltd. (with IICT & TIFAC, India)",
    category: productLines.REGENERATIVE,
    description:
      "Isoamyl 2-cyanoacrylate surgical tissue adhesive for wound closure. Solidifies in 5-10 seconds, sterile, non-toxic, haemostatic, bacteriostatic, and biodegradable — less oedema/granuloma than sutures and does not become brittle on long lacerations like N-Butyl Cyanoacrylate.",
    image: "/assets/imgs/tissue-img1.webp",
    indications: [
      "ENT Surgery",
      "Vascular Surgery",
      "Cosmetic Surgery",
      "Dental Surgery",
      "Periodontal Surgery",
      "Sterilization",
    ],
    optionName: null,
    variants: [], // no published sizes for this item
    internalLink: "/tissue",
  },

  // ---------------------------------------------------------------------
  // DENTAL IMPLANTS (no published size/weight variant data — see note)
  // ---------------------------------------------------------------------
  {
    id: "duravit-ev",
    name: "DURAVIT EV Implant System",
    vendor: "Made in Italy",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "Conical connection implant with self-tapping progressive threads for high primary stability in soft and dense bone.",
    image: "/assets/imgs/2.webp",
    features: [
      "Conexa conical internal hex connection",
      "Micro-grooves for crestal bone preservation",
      "Self-cutting apical cutting flutes",
      "Available in 3.5 to 5.0mm diameters",
    ],
    optionName: "Diameter",
    variants: [], // diameter range only ("3.5 to 5.0mm"); no discrete SKUs published
    externalLink: "https://bnbimplant.in/uniqueimplant#design1",
  },
  {
    id: "duravit-3p",
    name: "DURAVIT 3P Universal Implants",
    vendor: "Made in Italy",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "Triple-pitch thread geometry providing immediate bone anchoring and versatile single-stage or two-stage surgical protocols.",
    image: "/assets/imgs/1.webp",
    features: [
      "Triple lead thread for fast insertion",
      "Dual-acid etched & sandblasted surface",
      "Internal hex connection compatibility",
      "High mechanical fatigue resistance",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://bnbimplant.in/uniqueimplant#design2",
  },
  {
    id: "duravit-wide",
    name: "DURAVIT Wide Implants",
    vendor: "Made in Italy",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "Designed for immediate post-extraction molar sites, maximizing bone-to-implant contact and reducing the need for bone grafting.",
    image: "/assets/imgs/3.webp",
    features: [
      "Wide neck diameter (5.5mm & 6.0mm)",
      "Flat apex for anatomical protection",
      "Immediate loading optimized",
      "Molar post-extraction specific",
    ],
    optionName: "Neck Diameter",
    variants: [
      { sku: "DURAVIT-WIDE-55", size: "5.5mm", price: null },
      { sku: "DURAVIT-WIDE-60", size: "6.0mm", price: null },
    ],
    externalLink: "https://bnbimplant.in/uniqueimplant#design3",
  },
  {
    id: "duravit-pterygo",
    name: "DURAVIT Pterygo Implants",
    vendor: "Made in Italy",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "Extra-long implants dedicated to pterygoid and tuberosity anchoring in severely atrophic maxilla cases without sinus lift.",
    image: "/assets/imgs/4.webp",
    features: [
      "Lengths up to 20mm and 22mm",
      "Bicortical pterygomaxillary anchorage",
      "High torque resistance",
      "Eliminates complex sinus grafting",
    ],
    optionName: "Length",
    variants: [
      { sku: "DURAVIT-PTERYGO-20", size: "20mm", price: null },
      { sku: "DURAVIT-PTERYGO-22", size: "22mm", price: null },
    ],
    externalLink: "https://bnbimplant.in/uniqueimplant#design4",
  },
  {
    id: "duravit-slim",
    name: "DURAVIT Slim Implants",
    vendor: "Made in Italy",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "Narrow diameter implants (3.0mm) designed for limited interdental spaces, lateral incisors, and narrow alveolar ridges.",
    image: "/assets/imgs/5.webp",
    features: [
      "3.0mm narrow diameter profile",
      "High-grade titanium alloy strength",
      "Narrow ridge preservation",
      "Aesthetic emergence profile",
    ],
    optionName: "Diameter",
    variants: [{ sku: "DURAVIT-SLIM-30", size: "3.0mm", price: null }],
    externalLink: "https://bnbimplant.in/uniqueimplant#design5",
  },
  {
    id: "duravit-mini",
    name: "DURAVIT Mini Implants",
    vendor: "Made in Italy",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "One-piece small diameter implants with integrated ball abutment for minimally invasive overdenture stabilization.",
    image: "/assets/imgs/6.webp",
    features: [
      "One-piece monolithic design",
      "Ball attachment head built-in",
      "Minimally invasive flapless protocol",
      "Immediate full denture stabilization",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://bnbimplant.in/uniqueimplant#design6",
  },
  {
    id: "subperiosteal",
    name: "Customized Subperiosteal Implants",
    vendor: "Custom 3D Titanium",
    category: productLines.DENTAL_IMPLANTS,
    description:
      "Patient-specific 3D printed titanium subperiosteal frames designed directly from CBCT scans for severe bone resorption.",
    image: "/assets/imgs/di-2.webp",
    features: [
      "Direct-metal laser sintered (DMLS) titanium",
      "Designed to exact patient bone anatomy",
      "For extreme jaw atrophy without bone graft",
      "Integrated multi-unit abutment posts",
    ],
    optionName: null,
    variants: [], // custom per-patient — not a fixed size catalog
    externalLink: "https://bnbimplant.in/subperiosteal",
  },

  // ---------------------------------------------------------------------
  // PROSTHETICS
  // ---------------------------------------------------------------------
  {
    id: "conexa",
    name: "Prosthetics — Conexa Connection",
    vendor: "Precision Engineered",
    category: productLines.PROSTHETICS,
    description:
      "Hermetic seal conical connection with internal hexagon, eliminating bacterial leakage and micro-movements for lasting bone stability.",
    image: "/assets/imgs/di-1.webp",
    features: [
      "Conical cold-welding stability",
      "Zero micro-gap bacterial seal",
      "Complete range of straight & angled abutments",
      "CAD/CAM digital scanbodies and ti-bases",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://bnbimplant.in/conexaconnection",
  },

  // ---------------------------------------------------------------------
  // ROBOTIC NAVIGATION
  // ---------------------------------------------------------------------
  {
    id: "navident-3",
    name: "Navident 3.0 Dynamic Tracking",
    vendor: "Claronav (Canada)",
    category: productLines.ROBOTIC_NAVIGATION,
    description:
      "Dynamic computer-guided surgical navigation offering live optical tracking of the drill tip relative to patient CBCT in real-time.",
    image: "/assets/imgs/navident-1.webp",
    features: [
      "Live depth, angle, and position display",
      "Immediate drill feedback without physical guides",
      "Micron-level surgical placement accuracy",
      "Supports all implant systems & handpieces",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://navident.in/",
  },
  {
    id: "navident-4",
    name: "Navident 4.0 EVO Surgical System",
    vendor: "Claronav (Canada)",
    category: productLines.ROBOTIC_NAVIGATION,
    description:
      "Next-generation dynamic robotic navigation system with high-speed stereoscopic cameras, touchless trace registration, and smart UI.",
    image: "/assets/imgs/3.0.webp",
    features: [
      "EVO high-frame-rate optical tracker",
      "Trace registration in under 60 seconds",
      "Full-arch edentulous & zygomatic guidance",
      "Integrated surgical report generation",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://navidentevo.in/",
  },

  // ---------------------------------------------------------------------
  // PHOTOGRAMMETRY
  // ---------------------------------------------------------------------
  {
    id: "micronmapper",
    name: "MicronMapper Photogrammetry",
    vendor: "Digital Precision",
    category: productLines.PHOTOGRAMMETRY,
    description:
      "High-precision 3D photogrammetric scanner for instant full-arch implant position capture, eliminating traditional impression distortions.",
    image: "/assets/imgs/di-1.webp",
    features: [
      "Sub-10 micron passive stereo accuracy",
      "Captures full arch in seconds",
      "Direct export to Exocad and 3Shape",
      "Guaranteed passive fit for full-arch bridges",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://micronmapper.in/",
  },

  // ---------------------------------------------------------------------
  // SURGICAL KITS
  // ---------------------------------------------------------------------
  {
    id: "surgical-kits",
    name: "B&B Surgical Kits & Guided Boxes",
    vendor: "Made in Italy",
    category: productLines.SURGICAL_KITS,
    description:
      "Ergonomic autoclavable surgical cassettes containing precision step drills, stoppers, torque ratchets, and guided surgery sleeves.",
    image: "/assets/imgs/di-2.webp",
    features: [
      "Color-coded intuitive drilling sequence",
      "Physical depth-stop drill accessories",
      "Fully guided surgery drill sleeves",
      "Medical-grade autoclavable polymer tray",
    ],
    optionName: null,
    variants: [],
    externalLink: "https://bnbimplant.in/surgicalkit",
  },
];

export default products;
