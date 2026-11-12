import { pool } from "../src/config/db.js";

async function syncCatalog() {
  console.log("=== STARTING MARKS BIOTECH & BNB IMPLANT CATALOG SYNC ===");
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. BRANDS
    console.log("Seeding Brands...");
    const brandsData = [
      {
        name: "B&B Dental (Italy)",
        logo_url: "/assets/imgs/logo.png",
        description: "Renowned European dental implantology manufacturer from Bologna, Italy, specializing in DURAVIT dental implants, Conexa connection prosthetics, and surgical kits.",
      },
      {
        name: "Rocky Mountain Tissue Bank (USA)",
        logo_url: "/assets/imgs/rmtb-o.webp",
        description: "FDA-registered and AATB-accredited tissue bank in Colorado, USA, providing irradiated allograft cancellous & cortical particulate and bone blocks.",
      },
      {
        name: "NovoBone (Italy)",
        logo_url: "/assets/imgs/Novobone.webp",
        description: "Italian biomedical manufacturer producing 100% resorbable deproteinized bovine bone mineral xenografts under strict MDR (EU 2017/745) standards.",
      },
      {
        name: "T-Barrier (Italy)",
        logo_url: "/assets/imgs/Collagen13.webp",
        description: "Premium equine collagen barrier membranes and biocompatible titanium mesh for guided bone and tissue regeneration (GBR/GTR).",
      },
      {
        name: "Amcrylate (India)",
        logo_url: "/assets/imgs/amcrylate-pack.jpeg",
        description: "Medical-grade Isoamyl 2-cyanoacrylate surgical tissue adhesive developed with IICT & TIFAC for rapid sutureless wound closure.",
      },
      {
        name: "Claronav / MicronMapper (Canada)",
        logo_url: "/assets/imgs/micronmaper.webp",
        description: "Global pioneers in real-time dynamic optical surgical navigation (Navident) and sub-10 micron passive stereophotogrammetry (MicronMapper).",
      },
    ];

    const brandMap = {}; // name -> id
    for (const b of brandsData) {
      const [existing] = await conn.query("SELECT id FROM brands WHERE name = ?", [b.name]);
      if (existing.length > 0) {
        brandMap[b.name] = existing[0].id;
        await conn.query("UPDATE brands SET logo_url = ?, description = ? WHERE id = ?", [
          b.logo_url,
          b.description,
          existing[0].id,
        ]);
      } else {
        const [res] = await conn.query(
          "INSERT INTO brands (name, logo_url, description) VALUES (?, ?, ?)",
          [b.name, b.logo_url, b.description]
        );
        brandMap[b.name] = res.insertId;
      }
    }
    // Also map legacy name "Rocky Mountain" to the new one
    brandMap["Rocky Mountain"] = brandMap["Rocky Mountain Tissue Bank (USA)"];
    console.log("Brands ready:", brandMap);

    // 2. CATEGORIES
    console.log("Seeding Categories hierarchy...");
    const categoryTree = [
      {
        name: "Dental Implants & Systems",
        description: "Premium B&B Dental Italian implant fixtures, surgical protocols, and customized subperiosteal frames.",
        children: [
          "DURAVIT EV Implants",
          "DURAVIT 3P Universal Implants",
          "DURAVIT Wide Molar Implants",
          "DURAVIT Pterygo Implants",
          "DURAVIT Slim Implants",
          "DURAVIT Mini Implants",
          "Customized Subperiosteal Implants",
        ],
      },
      {
        name: "Prosthetics & Abutments",
        description: "Precision Conexa cold-weld conical prosthetic components, Ti-Bases, straight & angled abutments.",
        children: ["Conexa Conical Connection Prosthetics"],
      },
      {
        name: "Surgical Kits & Instrumentation",
        description: "Ergonomic autoclavable cassettes, step drills, depth stops, and guided surgery sleeves.",
        children: ["Surgical Kits & Guided Boxes"],
      },
      {
        name: "Regenerative Biomaterials",
        description: "Allograft bone, bovine xenografts, equine collagen membranes, titanium mesh, and surgical tissue adhesives.",
        children: [
          "Allograft Cancellous Particulate",
          "Allograft Cortical / Cancellous Blocks",
          "Allograft Cortical Particulate",
          "Bovine Xenograft Granules",
          "Resorbable Collagen Membranes",
          "Titanium Safety Mesh",
          "Surgical Tissue Adhesives",
        ],
      },
      {
        name: "Dynamic Navigation & 3D Photogrammetry",
        description: "Navident dynamic robotic surgical navigation and MicronMapper full-arch stereophotogrammetry systems.",
        children: [
          "Navident Dynamic Surgical Tracking",
          "MicronMapper 3D Photogrammetry",
        ],
      },
    ];

    const categoryMap = {}; // name -> id
    for (const parent of categoryTree) {
      let parentId;
      const [existingParent] = await conn.query(
        "SELECT id FROM categories WHERE name = ? AND parent_id IS NULL",
        [parent.name]
      );
      if (existingParent.length > 0) {
        parentId = existingParent[0].id;
        await conn.query("UPDATE categories SET description = ? WHERE id = ?", [
          parent.description,
          parentId,
        ]);
      } else {
        const [pRes] = await conn.query(
          "INSERT INTO categories (name, parent_id, description) VALUES (?, NULL, ?)",
          [parent.name, parent.description]
        );
        parentId = pRes.insertId;
      }
      categoryMap[parent.name] = parentId;

      for (const childName of parent.children) {
        const [existingChild] = await conn.query(
          "SELECT id FROM categories WHERE name = ? AND parent_id = ?",
          [childName, parentId]
        );
        if (existingChild.length > 0) {
          categoryMap[childName] = existingChild[0].id;
        } else {
          const [cRes] = await conn.query(
            "INSERT INTO categories (name, parent_id, description) VALUES (?, ?, ?)",
            [childName, parentId, `${childName} - ${parent.name}`]
          );
          categoryMap[childName] = cRes.insertId;
        }
      }
    }
    console.log("Categories hierarchy ready. Top categories mapped:", Object.keys(categoryMap).length);

    // 3. PRODUCTS CATALOG
    const productsData = [
      // -------------------------------------------------------------
      // DENTAL IMPLANTS (B&B Dental Italy)
      // -------------------------------------------------------------
      {
        name: "DURAVIT EV Implant System",
        brandName: "B&B Dental (Italy)",
        categoryName: "DURAVIT EV Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "DURAVIT EV",
        slug: "duravit-ev-implant-system",
        sku: "BB-DUR-EV-SYS",
        price: 12500.0,
        stock: 150,
        description:
          "Conical connection dental implant engineered with self-tapping progressive threads for high primary stability in both soft and dense bone. Features the proprietary Conexa connection with internal hexagon, eliminating bacterial micro-leakage and crestal bone resorption.",
        specifications: {
          Connection: "Conexa Conical Internal Hex (Cold-Weld Seal)",
          Material: "Medical Grade 4 Pure Titanium / Grade 5 ELI",
          "Surface Treatment": "Dual-acid etched and sandblasted microrough surface",
          Sterilization: "Gamma radiation (sterile blister pack)",
          "Primary Indication": "Immediate & delayed placement in soft/dense bone",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/2.webp", "/uploads/products/2.webp"],
        variants: [
          { attributeName: "Diameter", value: "Ø 3.5 mm x 10 mm", sku: "BB-EV-35-10", price: 12500, stock: 40 },
          { attributeName: "Diameter", value: "Ø 4.0 mm x 10 mm", sku: "BB-EV-40-10", price: 12500, stock: 50 },
          { attributeName: "Diameter", value: "Ø 4.5 mm x 10 mm", sku: "BB-EV-45-10", price: 12500, stock: 35 },
          { attributeName: "Diameter", value: "Ø 5.0 mm x 10 mm", sku: "BB-EV-50-10", price: 12500, stock: 25 },
        ],
      },
      {
        name: "DURAVIT 3P Universal Implants",
        brandName: "B&B Dental (Italy)",
        categoryName: "DURAVIT 3P Universal Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "DURAVIT 3P",
        slug: "duravit-3p-universal-implants",
        sku: "BB-DUR-3P-SYS",
        price: 11500.0,
        stock: 180,
        description:
          "Triple-pitch thread geometry providing accelerated insertion speed, high primary stability, and versatile single-stage or two-stage surgical protocols across all jaw bone densities.",
        specifications: {
          Connection: "Internal Hexagonal Connection (2.42mm hex)",
          "Thread Geometry": "Triple-lead progressive pitch for fast insertion",
          "Surface Treatment": "Sandblasted and double acid-etched",
          Material: "Medical Grade 4 Titanium",
          "Surgical Protocol": "Single-stage or Two-stage placement",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/1.webp", "/uploads/products/1.webp"],
        variants: [
          { attributeName: "Diameter", value: "Ø 3.75 mm x 10 mm", sku: "BB-3P-375-10", price: 11500, stock: 60 },
          { attributeName: "Diameter", value: "Ø 4.25 mm x 10 mm", sku: "BB-3P-425-10", price: 11500, stock: 70 },
          { attributeName: "Diameter", value: "Ø 4.75 mm x 10 mm", sku: "BB-3P-475-10", price: 11500, stock: 50 },
        ],
      },
      {
        name: "DURAVIT Wide Implants",
        brandName: "B&B Dental (Italy)",
        categoryName: "DURAVIT Wide Molar Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "DURAVIT Wide",
        slug: "duravit-wide-implants",
        sku: "BB-DUR-WIDE",
        price: 13500.0,
        stock: 90,
        description:
          "Specially engineered for immediate post-extraction molar sites. The wide coronal body maximizes bone-to-implant contact and eliminates the need for extensive bone augmentation in wide extraction sockets.",
        specifications: {
          Connection: "Conexa Conical / Internal Hex",
          "Apex Design": "Flat anatomical protection apex",
          "Neck Diameter": "Wide neck 5.5mm and 6.0mm",
          "Primary Indication": "Immediate post-extraction molar placement",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/3.webp", "/uploads/products/3.webp"],
        variants: [
          { attributeName: "Neck Diameter", value: "Ø 5.5 mm x 10 mm", sku: "DURAVIT-WIDE-55-10", price: 13500, stock: 45 },
          { attributeName: "Neck Diameter", value: "Ø 6.0 mm x 10 mm", sku: "DURAVIT-WIDE-60-10", price: 13500, stock: 45 },
        ],
      },
      {
        name: "DURAVIT Pterygo Implants",
        brandName: "B&B Dental (Italy)",
        categoryName: "DURAVIT Pterygo Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "DURAVIT Pterygo",
        slug: "duravit-pterygo-implants",
        sku: "BB-DUR-PTERYGO",
        price: 16500.0,
        stock: 60,
        description:
          "Extra-long bicortical anchorage implants dedicated to pterygoid and pyramidal process fixation in severely resorbed posterior maxilla cases without requiring invasive sinus bone augmentation.",
        specifications: {
          Connection: "Conexa Conical Connection",
          Lengths: "20 mm and 22 mm",
          Anchorage: "Bicortical pterygomaxillary pillar",
          "Torque Resistance": "High insertion torque (>60 Ncm)",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/4.webp", "/uploads/products/4.webp"],
        variants: [
          { attributeName: "Length", value: "Ø 3.75 mm x 20 mm", sku: "DURAVIT-PTERYGO-20", price: 16500, stock: 30 },
          { attributeName: "Length", value: "Ø 3.75 mm x 22 mm", sku: "DURAVIT-PTERYGO-22", price: 16500, stock: 30 },
        ],
      },
      {
        name: "DURAVIT Slim Implants",
        brandName: "B&B Dental (Italy)",
        categoryName: "DURAVIT Slim Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "DURAVIT Slim",
        slug: "duravit-slim-implants",
        sku: "BB-DUR-SLIM",
        price: 12000.0,
        stock: 80,
        description:
          "Narrow 3.0mm diameter implant designed specifically for reduced interdental spaces, maxillary lateral incisors, mandibular incisors, and narrow alveolar ridges.",
        specifications: {
          Diameter: "3.0 mm Narrow Profile",
          Material: "High-strength Medical Grade 5 ELI Titanium Alloy",
          Connection: "Internal Hex Conical Connection",
          "Primary Indication": "Incisor restorations & narrow bone ridges",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/5.webp", "/uploads/products/5.webp"],
        variants: [
          { attributeName: "Length", value: "Ø 3.0 mm x 10 mm", sku: "DURAVIT-SLIM-30-10", price: 12000, stock: 25 },
          { attributeName: "Length", value: "Ø 3.0 mm x 11.5 mm", sku: "DURAVIT-SLIM-30-115", price: 12000, stock: 30 },
          { attributeName: "Length", value: "Ø 3.0 mm x 13 mm", sku: "DURAVIT-SLIM-30-13", price: 12000, stock: 25 },
        ],
      },
      {
        name: "DURAVIT Mini Implants",
        brandName: "B&B Dental (Italy)",
        categoryName: "DURAVIT Mini Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "DURAVIT Mini",
        slug: "duravit-mini-implants",
        sku: "BB-DUR-MINI",
        price: 8500.0,
        stock: 70,
        description:
          "Monolithic one-piece small diameter implant with integrated ball abutment, optimized for minimally invasive flapless overdenture stabilization in thin ridges.",
        specifications: {
          "Body Type": "One-piece monolithic body",
          "Attachment Head": "Integrated spherical ball abutment (Ø 2.5 mm)",
          Procedure: "Minimally invasive flapless placement",
          Indication: "Immediate overdenture retention and stabilization",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/6.webp", "/uploads/products/6.webp"],
        variants: [
          { attributeName: "Size", value: "Ø 2.4 mm x 10 mm", sku: "BB-MINI-24-10", price: 8500, stock: 25 },
          { attributeName: "Size", value: "Ø 2.4 mm x 13 mm", sku: "BB-MINI-24-13", price: 8500, stock: 25 },
          { attributeName: "Size", value: "Ø 2.4 mm x 15 mm", sku: "BB-MINI-24-15", price: 8500, stock: 20 },
        ],
      },
      {
        name: "Customized Subperiosteal Implants",
        brandName: "B&B Dental (Italy)",
        categoryName: "Customized Subperiosteal Implants",
        mainCategory: "Dental Implants & Systems",
        typeName: "Subperiosteal",
        slug: "customized-subperiosteal-implants",
        sku: "BB-SUB-CUSTOM",
        price: 65000.0,
        stock: 20,
        description:
          "Patient-specific 3D printed titanium subperiosteal mesh frames manufactured via Direct Metal Laser Sintering (DMLS) directly from CBCT scans for severe jawbone atrophy without grafting.",
        specifications: {
          Manufacturing: "Direct Metal Laser Sintering (DMLS) 3D Titanium Printing",
          Material: "Medical Grade 23 Ti-6Al-4V ELI",
          Design: "Patient-specific CAD custom design from CBCT & optical scan",
          Fixation: "Mini osteosynthesis fixation screws",
          Abutments: "Pre-angled multi-unit abutment pillars integrated",
          Indication: "Extreme maxillary or mandibular ridge atrophy",
        },
        images: ["/assets/imgs/di-2.webp", "/uploads/products/di-2.webp"],
        variants: [
          { attributeName: "Arch Type", value: "Full-Arch Maxilla Custom Frame", sku: "BB-SUB-MAX-FA", price: 65000, stock: 10 },
          { attributeName: "Arch Type", value: "Full-Arch Mandible Custom Frame", sku: "BB-SUB-MAND-FA", price: 65000, stock: 10 },
        ],
      },

      // -------------------------------------------------------------
      // PROSTHETICS (B&B Dental Italy)
      // -------------------------------------------------------------
      {
        name: "Conexa Prosthetics & Abutments",
        brandName: "B&B Dental (Italy)",
        categoryName: "Conexa Conical Connection Prosthetics",
        mainCategory: "Prosthetics & Abutments",
        typeName: "Conexa Prosthetics",
        slug: "conexa-connection-prosthetics",
        sku: "BB-CONEXA-PROSTH",
        price: 4500.0,
        stock: 250,
        description:
          "High-precision conical cold-welding prosthetic range with internal hex. Delivers a zero-microgap hermetic bacterial seal, preventing peri-implantitis and screw loosening.",
        specifications: {
          "Connection Seal": "Conical cold-welding with internal hexagon",
          Compatibility: "DURAVIT EV, 3P, Wide, Slim implant systems",
          Tolerance: "Sub-micron precision machining",
          Range: "Straight abutments, angled abutments, Ti-Bases, Multi-Unit",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/di-1.webp", "/uploads/products/di-1.webp"],
        variants: [
          { attributeName: "Abutment Type", value: "Straight Titanium Abutment (G/H 2mm)", sku: "BB-CON-STR-2", price: 4200, stock: 60 },
          { attributeName: "Abutment Type", value: "Angled 15° Titanium Abutment", sku: "BB-CON-ANG-15", price: 4800, stock: 50 },
          { attributeName: "Abutment Type", value: "Angled 25° Titanium Abutment", sku: "BB-CON-ANG-25", price: 4800, stock: 50 },
          { attributeName: "Abutment Type", value: "CAD/CAM Ti-Base Engaging", sku: "BB-CON-TIBASE-ENG", price: 4500, stock: 50 },
          { attributeName: "Abutment Type", value: "Multi-Unit Abutment (MUA) Straight", sku: "BB-CON-MUA-STR", price: 5500, stock: 40 },
        ],
      },

      // -------------------------------------------------------------
      // SURGICAL KITS (B&B Dental Italy)
      // -------------------------------------------------------------
      {
        name: "B&B Surgical Kits & Guided Boxes",
        brandName: "B&B Dental (Italy)",
        categoryName: "Surgical Kits & Guided Boxes",
        mainCategory: "Surgical Kits & Instrumentation",
        typeName: "Surgical Cassette",
        slug: "bb-surgical-kits-guided-boxes",
        sku: "BB-SURG-KIT-BOX",
        price: 85000.0,
        stock: 25,
        description:
          "Fully autoclavable ergonomic surgical cassettes equipped with precision multi-step drills, physical depth-stop keys, torque ratchets, parallel pins, and guided surgery sleeves.",
        specifications: {
          "Cassette Material": "High-temperature autoclavable medical polymer",
          "Drill Coating": "DLC (Diamond-Like Carbon) low-friction wear coating",
          "Included Tools": "Step drills, countersinks, drivers, torque ratchet 10-70 Ncm, depth keys",
          Workflow: "Freehand and fully guided surgical protocols",
          Origin: "Made in Bologna, Italy (B&B Dental)",
        },
        images: ["/assets/imgs/di-2.webp", "/uploads/products/di-2.webp"],
        variants: [
          { attributeName: "Kit Configuration", value: "Universal Dental Implant Surgical Kit", sku: "BB-SURG-KIT-UNIV", price: 85000, stock: 15 },
          { attributeName: "Kit Configuration", value: "Complete 3D Guided Surgery Cassette", sku: "BB-SURG-KIT-GUIDED", price: 110000, stock: 10 },
        ],
      },

      // -------------------------------------------------------------
      // REGENERATIVE BIOMATERIALS (Marks Biotech)
      // -------------------------------------------------------------
      {
        name: "Rocky Mountain Allograft — Cancellous Particulate Vials",
        brandName: "Rocky Mountain Tissue Bank (USA)",
        categoryName: "Allograft Cancellous Particulate",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Cancellous Particulate",
        slug: "rocky-mountain-allograft-cancellous-particulate",
        sku: "RM-CANPAR-MASTER",
        price: 4500.0,
        stock: 200,
        description:
          "100% human donor cancellous bone and marrow particulate, gamma-irradiated for complete sterility while preserving osteoconductive trabecular matrix. Proven over 40+ years of clinical use.",
        specifications: {
          "Tissue Source": "Human Donor Allogenic Cancellous Bone & Marrow",
          Processing: "Sterilized by low-dose Gamma Irradiation",
          Accreditation: "AATB Accredited, FDA Registered (Tissue Bank USA)",
          Storage: "Ambient room temperature (no cold storage required)",
          "Shelf Life": "5 Years from date of processing",
          Indications: "Sinus lift, socket preservation, ridge augmentation, periodontal defects",
        },
        images: ["/assets/imgs/Rectangle 253.webp", "/uploads/products/Rectangle 253.webp"],
        variants: [
          { attributeName: "Size", value: "0.25 gm", sku: "RM-CANPAR-025", price: 4500, stock: 40 },
          { attributeName: "Size", value: "0.50 gm", sku: "RM-CANPAR-050", price: 7500, stock: 60 },
          { attributeName: "Size", value: "1.0 gm", sku: "RM-CANPAR-100", price: 12000, stock: 50 },
          { attributeName: "Size", value: "2.0 gm", sku: "RM-CANPAR-200", price: 21000, stock: 30 },
          { attributeName: "Size", value: "3.0 gm", sku: "RM-CANPAR-300", price: 29000, stock: 20 },
        ],
      },
      {
        name: "Rocky Mountain Allograft — Cortical/Cancellous Bone Blocks",
        brandName: "Rocky Mountain Tissue Bank (USA)",
        categoryName: "Allograft Cortical / Cancellous Blocks",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Bone Blocks",
        slug: "rocky-mountain-allograft-cortical-cancellous-blocks",
        sku: "RM-BB-MASTER",
        price: 18000.0,
        stock: 80,
        description:
          "Structural irradiated human allogenic cortical/cancellous bone blocks engineered for severe 3D horizontal and vertical alveolar ridge reconstruction.",
        specifications: {
          "Tissue Composition": "Composite Cortical (outer support) + Cancellous (inner revascularization)",
          Processing: "Sterile irradiated allograft",
          Fixation: "Lag screws / titanium osteosynthesis fixation",
          Accreditation: "AATB Accredited, FDA Registered",
          Indications: "Severe horizontal and vertical alveolar ridge atrophy",
        },
        images: [
          "/assets/imgs/Rectangle 252.webp",
          "/uploads/products/Rectangle 252.webp",
          "/assets/imgs/allograft-bone-blocks.png",
        ],
        variants: [
          { attributeName: "Dimensions", value: "5 × 10 × 10 mm", sku: "RM-BB-5x10x10", price: 18000, stock: 15 },
          { attributeName: "Dimensions", value: "5 × 10 × 20 mm", sku: "RM-BB-5x10x20", price: 26000, stock: 15 },
          { attributeName: "Dimensions", value: "5 × 10 × 30 mm", sku: "RM-BB-5x10x30", price: 34000, stock: 15 },
          { attributeName: "Dimensions", value: "10 × 10 × 10 mm", sku: "RM-BB-10x10x10", price: 28000, stock: 15 },
          { attributeName: "Dimensions", value: "10 × 10 × 20 mm", sku: "RM-BB-10x10x20", price: 42000, stock: 10 },
          { attributeName: "Dimensions", value: "10 × 10 × 30 mm", sku: "RM-BB-10x10x30", price: 55000, stock: 10 },
        ],
      },
      {
        name: "Rocky Mountain Allograft — Cortical Particulate Vials",
        brandName: "Rocky Mountain Tissue Bank (USA)",
        categoryName: "Allograft Cortical Particulate",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Cortical Particulate",
        slug: "rocky-mountain-allograft-cortical-particulate",
        sku: "RM-CP-MASTER",
        price: 5500.0,
        stock: 100,
        description:
          "Irradiated allogenic crushed cortical particulate (2-3 mm granule size), delivering long-term volume space maintenance and slow bone remodeling.",
        specifications: {
          "Tissue Type": "100% Allogenic Cortical Bone Particulate",
          "Granule Size": "2 - 3 mm randomly sized",
          Accreditation: "AATB Accredited, FDA Registered",
          "Resorption Rate": "Slow resorption for maximum volume retention",
          Indications: "Onlay grafting, sinus floor elevation, external contouring",
        },
        images: [
          "/assets/imgs/allograft-cortical-particulate.png",
          "/uploads/products/allograft-cortical-particulate.png",
        ],
        variants: [
          { attributeName: "Size", value: "0.5 gm", sku: "RM-CP-050", price: 5500, stock: 35 },
          { attributeName: "Size", value: "1.0 gm", sku: "RM-CP-100", price: 9500, stock: 40 },
          { attributeName: "Size", value: "2.0 gm", sku: "RM-CP-200", price: 17000, stock: 25 },
        ],
      },
      {
        name: "NovoBone Xenograft Granules",
        brandName: "NovoBone (Italy)",
        categoryName: "Bovine Xenograft Granules",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Bovine Xenograft",
        slug: "novobone-xenograft-granules",
        sku: "NB-XENO-GRAN",
        price: 3800.0,
        stock: 150,
        description:
          "Deproteinized bovine bone mineral, thermally treated at low temperature to preserve the natural interconnective crystalline hydroxyapatite matrix. 100% resorbable and compliant with MDR EU 2017/745.",
        specifications: {
          Origin: "Bovine Bone Mineral (Cattle from certified disease-free herds)",
          Processing: "Low-temperature thermal purification (zero residual proteins)",
          "Pore Structure": "Interconnected macro- and micro-pores (65-80% porosity)",
          Compliance: "MDR (EU 2017/745) Class III Medical Device",
          "Origin Country": "Produced and packaged entirely in Italy",
        },
        images: ["/assets/imgs/image 102.webp", "/uploads/products/image 102.webp", "/assets/imgs/Novobone.webp"],
        variants: [
          { attributeName: "Weight / Volume", value: "0.5 g (1.0 cc) — 0.2-0.6mm", sku: "NB-GRAN-05", price: 3800, stock: 30 },
          { attributeName: "Weight / Volume", value: "1.0 g (2.0 cc) — 0.2-0.6mm", sku: "NB-GRAN-10", price: 6500, stock: 40 },
          { attributeName: "Weight / Volume", value: "2.0 g (4.0 cc) — 0.2-0.6mm", sku: "NB-GRAN-20", price: 11500, stock: 35 },
          { attributeName: "Weight / Volume", value: "3.0 g (6.0 cc) — 0.2-0.6mm", sku: "NB-GRAN-30", price: 16500, stock: 25 },
          { attributeName: "Weight / Volume", value: "5.0 g (10.0 cc) — 0.2-0.6mm", sku: "NB-GRAN-50", price: 25000, stock: 20 },
        ],
      },
      {
        name: "T-Barrier Collagen — Resorbable Equine Collagen Membrane",
        brandName: "T-Barrier (Italy)",
        categoryName: "Resorbable Collagen Membranes",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Collagen Membrane",
        slug: "t-barrier-collagen-membrane",
        sku: "TB-COL-MEM",
        price: 4200.0,
        stock: 140,
        description:
          "Resorbable equine pericardium collagen barrier membrane. Delivers exceptional tensile tear resistance, full barrier protection for 6-8 weeks, and complete physiological resorption without immune response.",
        specifications: {
          Origin: "Equine Pericardium Type I & III Collagen",
          "Resorption Period": "6 - 8 weeks complete physiological biodegradation",
          Handling: "High tensile strength, easily draped and suturable",
          Packaging: "Sterile double peel-pack pouch",
          "Origin Country": "Made in Italy",
        },
        images: ["/assets/imgs/Collagen13.webp", "/uploads/products/Collagen13.webp", "/assets/imgs/Collagen.webp"],
        variants: [
          { attributeName: "Membrane Size", value: "10 × 10 × 1 mm", sku: "TB-COL-10x10", price: 4200, stock: 25 },
          { attributeName: "Membrane Size", value: "10 × 20 × 0.25 mm", sku: "TB-COL-10x20", price: 6200, stock: 25 },
          { attributeName: "Membrane Size", value: "15 × 20 × 0.25 mm", sku: "TB-COL-15x20", price: 7800, stock: 30 },
          { attributeName: "Membrane Size", value: "23 × 23 × 0.25 mm", sku: "TB-COL-23x23", price: 9500, stock: 30 },
          { attributeName: "Membrane Size", value: "20 × 30 × 0.25 mm", sku: "TB-COL-20x30", price: 11500, stock: 15 },
          { attributeName: "Membrane Size", value: "30 × 40 × 0.25 mm", sku: "TB-COL-30x40", price: 15500, stock: 15 },
        ],
      },
      {
        name: "T-Barrier Titanium Safety Mesh",
        brandName: "T-Barrier (Italy)",
        categoryName: "Titanium Safety Mesh",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Titanium Mesh",
        slug: "t-barrier-titanium-safety-mesh",
        sku: "TB-TITAN-MESH",
        price: 14500.0,
        stock: 60,
        description:
          "Biocompatible Grade 1 pure titanium safety mesh designed for Guided Bone Regeneration (GBR). Features optimal microporosity for vascular nutrient diffusion while preserving mechanical stability against flap collapse.",
        specifications: {
          Material: "Pure Grade 1 Medical Titanium (ISO 5832-2)",
          Thickness: "0.13 mm ultra-thin profile",
          Handling: "Easily trimmed, molded, and fixed with micro-screws",
          Biocompatibility: "Non-reactive, prevents soft tissue compression",
          "Origin Country": "Made in Italy",
        },
        images: [
          "/assets/imgs/titanium-membrane-1.webp",
          "/uploads/products/titanium-membrane-1.webp",
          "/uploads/products/image 101.webp",
        ],
        variants: [
          { attributeName: "Mesh Dimensions", value: "24 × 29 × 0.13 mm (Standard)", sku: "TB-TIT-24x29", price: 14500, stock: 30 },
          { attributeName: "Mesh Dimensions", value: "34 × 25 × 0.13 mm (Macro)", sku: "TB-TIT-34x25", price: 17500, stock: 30 },
        ],
      },
      {
        name: "Amcrylate Surgical Tissue Adhesive",
        brandName: "Amcrylate (India)",
        categoryName: "Surgical Tissue Adhesives",
        mainCategory: "Regenerative Biomaterials",
        typeName: "Tissue Adhesive",
        slug: "amcrylate-surgical-tissue-adhesive",
        sku: "AMCRYL-TISSUE-ADH",
        price: 2400.0,
        stock: 160,
        description:
          "Medical-grade Isoamyl 2-cyanoacrylate surgical liquid adhesive for sutureless wound closure and periodontal dressing. Solidifies in 5-10 seconds, forming a flexible, sterile, waterproof, and bacteriostatic barrier.",
        specifications: {
          "Active Compound": "Isoamyl 2-cyanoacrylate monomer",
          "Polymerization Time": "5 to 10 seconds on contact with tissue fluid",
          Properties: "Haemostatic, bacteriostatic, water-resistant, biodegradable",
          Advantage: "Significantly less tissue inflammation & no brittleness compared to N-butyl cyanoacrylate",
          Collaboration: "Indian Institute of Chemical Technology (IICT) & TIFAC",
          Indications: "Dental extraction sockets, periodontal flaps, mucosal lacerations, skin incisions",
        },
        images: ["/assets/imgs/amcrylate-pack.jpeg", "/uploads/products/amcrylate-pack.jpeg", "/assets/imgs/tissue-img1.webp"],
        variants: [
          { attributeName: "Pack Size", value: "Box of 5 Ampoules (0.25 ml each)", sku: "AMCRYL-PK5-025", price: 2400, stock: 90 },
          { attributeName: "Pack Size", value: "Box of 10 Ampoules (0.25 ml each)", sku: "AMCRYL-PK10-025", price: 4200, stock: 70 },
        ],
      },

      // -------------------------------------------------------------
      // DYNAMIC NAVIGATION & PHOTOGRAMMETRY (Marks Biotech)
      // -------------------------------------------------------------
      {
        name: "Navident 3.0 Dynamic Tracking System",
        brandName: "Claronav / MicronMapper (Canada)",
        categoryName: "Navident Dynamic Surgical Tracking",
        mainCategory: "Dynamic Navigation & 3D Photogrammetry",
        typeName: "Dynamic Navigation",
        slug: "navident-3-dynamic-tracking-system",
        sku: "CLARO-NAVIDENT-30",
        price: 1850000.0,
        stock: 10,
        description:
          "Dynamic computer-guided surgical navigation system providing real-time 3D optical tracking of drill position, angle, and apex depth relative to patient CBCT anatomy with sub-millimeter clinical accuracy.",
        specifications: {
          "Tracking Technology": "High-frequency Optical Stereoscopic Micrometric Sensors",
          Accuracy: "Sub-millimeter real-time tip tracking (< 0.5 mm)",
          Compatibility: "Universal compatibility with all implant kits and handpieces",
          Software: "Navident 3.0 Planning & Live Guidance Suite",
          Origin: "Claronav (Toronto, Canada)",
        },
        images: ["/assets/imgs/navident-1.webp", "/uploads/products/navident-1.webp"],
        variants: [
          { attributeName: "Cart System", value: "Navident 3.0 Mobile Cart Workstation", sku: "NAVI-30-CART", price: 1850000, stock: 5 },
          { attributeName: "Cart System", value: "Navident 3.0 Portable Rig Unit", sku: "NAVI-30-PORTABLE", price: 1650000, stock: 5 },
        ],
      },
      {
        name: "Navident 4.0 EVO Surgical Navigation",
        brandName: "Claronav / MicronMapper (Canada)",
        categoryName: "Navident Dynamic Surgical Tracking",
        mainCategory: "Dynamic Navigation & 3D Photogrammetry",
        typeName: "Dynamic Navigation EVO",
        slug: "navident-4-evo-surgical-system",
        sku: "CLARO-NAVIDENT-40-EVO",
        price: 2450000.0,
        stock: 8,
        description:
          "Next-generation surgical navigation powered by high-frame-rate stereoscopic cameras, instantaneous touchless trace registration, and comprehensive guidance for zygomatic, pterygoid, and full-arch cases.",
        specifications: {
          Registration: "Touchless trace registration in under 60 seconds",
          Sensor: "EVO High-Speed Ultra-Wide Optical Tracker",
          "Advanced Protocols": "Zygomatic, Pterygoid, and Edentulous Full-Arch Navigation",
          Display: "Ultra-HD Medical Touchscreen on Articulated Arm",
          Origin: "Claronav (Toronto, Canada)",
        },
        images: ["/assets/imgs/navident.webp", "/uploads/products/navident.webp", "/uploads/products/3.0.webp"],
        variants: [
          { attributeName: "System Edition", value: "Navident EVO Surgical Cart Edition", sku: "NAVI-40-EVO-CART", price: 2450000, stock: 5 },
          { attributeName: "System Edition", value: "Navident EVO Zygomatic Specialized Package", sku: "NAVI-40-EVO-ZYGO", price: 2750000, stock: 3 },
        ],
      },
      {
        name: "MicronMapper 3D Photogrammetry Scanner",
        brandName: "Claronav / MicronMapper (Canada)",
        categoryName: "MicronMapper 3D Photogrammetry",
        mainCategory: "Dynamic Navigation & 3D Photogrammetry",
        typeName: "Photogrammetry Scanner",
        slug: "micronmapper-photogrammetry",
        sku: "CLARO-MICRONMAPPER",
        price: 1650000.0,
        stock: 12,
        description:
          "High-precision 3D photogrammetric optical scanner for instant full-arch implant position capture. Eliminates intraoral scanning errors and traditional impression distortion for guaranteed passive fit.",
        specifications: {
          "Measurement Precision": "Sub-10 micron passive stereophotogrammetric resolution",
          "Capture Speed": "Under 15 seconds full-arch capture",
          "Export Formats": "Direct open STL / PLY export to Exocad, 3Shape, and Blender",
          "Included Accessories": "MicronMapper sensor, 6x precision scan flags, calibration artifact",
          Origin: "Claronav (Toronto, Canada)",
        },
        images: ["/assets/imgs/micronmaper.webp", "/uploads/products/micronmaper.webp"],
        variants: [
          { attributeName: "Package", value: "Complete MicronMapper Full-Arch Scanner Suite", sku: "MM-COMPLETE-SUITE", price: 1650000, stock: 7 },
          { attributeName: "Package", value: "MicronMapper Pro Kit with 12x Scan Flags", sku: "MM-PRO-KIT-12", price: 1850000, stock: 5 },
        ],
      },
    ];

    // Remove old products to ensure clean catalog with NO unwanted / dummy content
    console.log("Cleaning old product records...");
    await conn.query("SET FOREIGN_KEY_CHECKS = 0");
    await conn.query("DELETE FROM product_images");
    await conn.query("DELETE FROM product_variants");
    await conn.query("DELETE FROM products");

    console.log(`Inserting ${productsData.length} genuine clinical products...`);
    for (const p of productsData) {
      const brandId = brandMap[p.brandName] || null;
      const categoryId = categoryMap[p.categoryName] || categoryMap[p.mainCategory] || null;

      const [res] = await conn.query(
        `INSERT INTO products 
         (name, brand_id, category_id, category, type_name, slug, sku, price, description, specifications, stock, status, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', NOW(), NOW())`,
        [
          p.name,
          brandId,
          categoryId,
          p.mainCategory,
          p.typeName,
          p.slug,
          p.sku,
          p.price,
          p.description,
          JSON.stringify(p.specifications),
          p.stock,
        ]
      );
      const productId = res.insertId;

      // Insert Variants
      if (p.variants && p.variants.length > 0) {
        for (let i = 0; i < p.variants.length; i++) {
          const v = p.variants[i];
          await conn.query(
            `INSERT INTO product_variants 
             (product_id, attribute_name, value, sku, price, stock, sort_order, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
            [productId, v.attributeName, v.value, v.sku, v.price, v.stock, i]
          );
        }
      }

      // Insert Images
      if (p.images && p.images.length > 0) {
        for (let j = 0; j < p.images.length; j++) {
          await conn.query(
            `INSERT INTO product_images 
             (product_id, image_path, alt_text, sort_order, created_at)
             VALUES (?, ?, ?, ?, NOW())`,
            [productId, p.images[j], `${p.name} - Official Product Image`, j]
          );
        }
      }

      console.log(`✓ [ID ${productId}] ${p.name} (${p.variants.length} variants, ${p.images.length} images)`);
    }

    await conn.query("SET FOREIGN_KEY_CHECKS = 1");
    await conn.commit();
    console.log("=== CATALOG SYNC COMPLETED SUCCESSFULLY ===");
  } catch (err) {
    await conn.rollback();
    console.error("FATAL Catalog sync failed:", err);
    throw err;
  } finally {
    conn.release();
    process.exit(0);
  }
}

syncCatalog();
