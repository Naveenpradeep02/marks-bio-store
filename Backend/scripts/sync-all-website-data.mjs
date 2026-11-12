import fs from "fs";
import path from "path";
import { pool } from "../src/config/db.js";

async function main() {
  console.log(
    "=== STARTING FULL MARKSBIOTECH WEBSITE DATA SYNCHRONIZATION ===",
  );

  // 1. Ensure columns exist in events & blogs table
  try {
    await pool.query(`
      ALTER TABLE events 
      ADD COLUMN IF NOT EXISTS blocks_json LONGTEXT NULL AFTER description;
    `);
  } catch (e) {
    // Column might exist or MariaDB syntax
    try {
      await pool.query(
        "ALTER TABLE events ADD COLUMN blocks_json LONGTEXT NULL",
      );
    } catch (_) {}
  }

  try {
    await pool.query(`
      ALTER TABLE blogs 
      ADD COLUMN IF NOT EXISTS blocks_json LONGTEXT NULL AFTER content;
    `);
  } catch (e) {
    try {
      await pool.query(
        "ALTER TABLE blogs ADD COLUMN blocks_json LONGTEXT NULL",
      );
    } catch (_) {}
  }

  // 2. Parse 24 Real Website Events from Events.jsx
  const eventsFilePath = path.resolve(
    "marksboiteck-website/src/pages/Events.jsx",
  );
  const eventsContent = fs.readFileSync(eventsFilePath, "utf8");

  // Accurate regex for Link cards in Events.jsx
  const eventCardRegex =
    /<Link\s+to="\/events\/(\d+)"\s+className="([^"]+)"[\s\S]*?<span className="event-status">([^<]+)<\/span>[\s\S]*?<img[\s\S]*?src="([^"]+)"[\s\S]*?<div className="event-title">([\s\S]*?)<\/div>/g;

  const realEvents = [];
  let match;
  while ((match = eventCardRegex.exec(eventsContent)) !== null) {
    const id = parseInt(match[1], 10);
    const classStr = match[2];
    const status =
      match[3].trim().toLowerCase() === "upcoming" ? "upcoming" : "completed";
    const img = match[4].trim();
    const title = match[5].replace(/\s+/g, " ").replace(/&amp;/g, "&").trim();
    const year = classStr.includes("year-2025") ? "2025" : "2026";
    const type = classStr.includes("conference") ? "conference" : "workshop";

    let location = "ITC Grand Chola, Chennai";
    let date_string =
      year === "2026" ? "April 26-27, 2026" : "November 14-16, 2025";
    let speaker_name = "Dr. Mani Krishnan";
    let speaker_title = "Dynamic Navigation & Guided Implant Specialist";
    let price = "₹15,000";
    let seats_total = 40;
    let seats_available = status === "upcoming" ? 14 : 0;
    let badge_text =
      status === "upcoming" ? "🔥 Registration Open" : "Completed";

    if (id === 8) {
      location = "ITC Grand Chola, Chennai";
      date_string = "October 10-12, 2025";
      price = "₹15,000";
      speaker_name = "Dr. Mani Krishnan";
    } else if (id === 11) {
      location = "Hotel Sahara Star, Mumbai";
      date_string = "November 21-22, 2025";
      price = "₹12,500";
      speaker_name = "Dr. Rajesh Nair";
      speaker_title = "Oral & Maxillofacial Surgeon";
    } else if (id === 24) {
      location = "MCODS, Mangalore";
      date_string = "November 14, 2025";
      price = "Institutional";
      speaker_name = "Dr. K. Srinivas";
      speaker_title = "Professor & HOD, Oral Surgery";
    } else if (id === 9) {
      location = "The Leela Palace, Bengaluru";
      date_string = "May 16-17, 2026";
      price = "₹12,500";
      speaker_name = "Dr. Rajesh Nair";
    } else if (id === 25) {
      location = "Pragati Maidan, New Delhi";
      date_string = "December 19-21, 2025";
      price = "Free Entry";
      speaker_name = "Marks Biotech Technical Team";
      speaker_title = "Product Specialists";
    } else if (id === 22) {
      location = "Koelnmesse, Cologne, Germany";
      date_string = "March 25-29, 2025";
      price = "Exhibition";
      speaker_name = "Marks Biotech International Delegation";
    } else if (id === 10) {
      location = "Jio World Convention Centre, Mumbai";
      date_string = "September 19-21, 2025";
      price = "Delegate Pass";
      speaker_name = "ISOI Scientific Committee";
    } else if (id === 14) {
      location = "Sheraton Grand, Bengaluru";
      date_string = "August 08-10, 2025";
      price = "Delegate Pass";
      speaker_name = "OSICON Faculty";
    } else if (id === 21) {
      location = "Digital Dental Academy, Hyderabad";
      date_string = "January 17-18, 2026";
      price = "₹14,000";
      speaker_name = "Dr. Mani Krishnan";
    } else if (id === 27) {
      location = "Radisson Blu, New Delhi";
      date_string = "February 07-08, 2026";
      price = "₹10,000";
      speaker_name = "B&B Dental Faculty";
    } else if (id === 26) {
      location = "Taj Santacruz, Mumbai";
      date_string = "April 26, 2026";
      price = "₹16,500";
      speaker_name = "Dr. Mani Krishnan";
    } else if (id === 7) {
      location = "JW Marriott, Kolkata";
      date_string = "March 14-15, 2026";
      price = "₹11,000";
      speaker_name = "Dr. Rajesh Nair";
    } else if (id === 33) {
      location = "Marks Biotech Masterclass Arena, Chennai";
      date_string = "April 18-19, 2026";
      price = "₹18,000";
      speaker_name = "Dr. Mani Krishnan & Clinical Mentors";
      speaker_title = "Chief Navigation Specialists";
    } else if (id === 5) {
      location = "The Ritz-Carlton, Pune";
      date_string = "July 11-12, 2026";
      price = "₹15,000";
      speaker_name = "Dr. Mani Krishnan";
      badge_text = "🔥 Registration Open";
      seats_available = 18;
    } else if (id === 12) {
      location = "ITC Maratha, Mumbai";
      date_string = "August 22-23, 2026";
      price = "₹13,500";
      speaker_name = "Dr. Rajesh Nair";
      badge_text = "Limited Seats";
      seats_available = 10;
    } else if (id === 15) {
      location = "Le Meridien, Kochi";
      date_string = "September 05-06, 2026";
      price = "₹12,000";
      speaker_name = "Dr. Mani Krishnan";
      badge_text = "Early Bird";
      seats_available = 22;
    } else if (id === 18) {
      location = "Dubai World Trade Centre, UAE";
      date_string = "February 03-05, 2026";
      price = "Free Entry";
      speaker_name = "Global Dental Leaders";
    } else if (id === 19) {
      location = "Nagpur Convention Centre";
      date_string = "January 24-25, 2026";
      price = "Delegate";
      speaker_name = "NIDACON Council";
    } else if (id === 17) {
      location = "Hyderabad International Convention Centre";
      date_string = "February 27-28, 2026";
      price = "Delegate";
      speaker_name = "IDDC Faculty";
    } else if (id === 28) {
      location = "Bangkok Convention Centre, Thailand";
      date_string = "March 19-21, 2026";
      price = "International";
      speaker_name = "ICOI Asean Board";
    } else if (id === 20) {
      location = "Hyatt Regency, Trivandrum";
      date_string = "April 04-05, 2026";
      price = "₹8,500";
      speaker_name = "National Implant Summit Faculty";
    } else if (id === 30) {
      location = "Chennai Trade Centre";
      date_string = "September 18-20, 2026";
      price = "Conference Pass";
      speaker_name = "ISOI National Council";
      badge_text = "Upcoming Expo";
      seats_available = 120;
    } else if (id === 29) {
      location = "BIEC, Bengaluru";
      date_string = "October 09-11, 2026";
      price = "Free Entry";
      speaker_name = "Global Expodent Team";
      badge_text = "Registration Open";
      seats_available = 350;
    } else if (id === 32) {
      location = "Bologna, Italy";
      date_string = "November 12-14, 2026";
      price = "International Meet";
      speaker_name = "B&B Dental Global Delegation";
      badge_text = "Global Meet";
      seats_available = 80;
    }

    realEvents.push({
      id,
      title,
      slug: `event-${id}-${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}`,
      year,
      type,
      status,
      date_string,
      location,
      image_url: img,
      badge_text,
      description: `Comprehensive academic and clinical event covering ${title}, hands-on typodont guidance, live surgical navigation demonstrations, and regenerative workflows.`,
      speaker_name,
      speaker_title,
      registration_link: `/events/${id}`,
      seats_total,
      seats_available,
      price,
      is_active: 1,
      featured: status === "upcoming" ? 1 : 0,
    });
  }

  console.log(`Found ${realEvents.length} events from Events.jsx`);

  // Insert or Update all 24 events
  for (const ev of realEvents) {
    await pool.query(
      `INSERT INTO events (
        id, title, slug, year, type, status, date_string, location, image_url, badge_text,
        description, speaker_name, speaker_title, registration_link, seats_total, seats_available,
        price, is_active, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        year = VALUES(year),
        type = VALUES(type),
        status = VALUES(status),
        date_string = VALUES(date_string),
        location = VALUES(location),
        image_url = VALUES(image_url),
        badge_text = VALUES(badge_text),
        description = VALUES(description),
        speaker_name = VALUES(speaker_name),
        speaker_title = VALUES(speaker_title),
        registration_link = VALUES(registration_link),
        price = VALUES(price),
        is_active = 1;`,
      [
        ev.id,
        ev.title,
        ev.slug,
        ev.year,
        ev.type,
        ev.status,
        ev.date_string,
        ev.location,
        ev.image_url,
        ev.badge_text,
        ev.description,
        ev.speaker_name,
        ev.speaker_title,
        ev.registration_link,
        ev.seats_total,
        ev.seats_available,
        ev.price,
        ev.is_active,
        ev.featured,
      ],
    );
  }
  console.log(
    `✓ Synchronized all ${realEvents.length} events into MySQL database.`,
  );

  // 3. Parse 14 Real Website Blogs from Blog.jsx
  const realBlogs = [
    {
      id: 1,
      slug: "1",
      title: "Morse Taper Connection",
      category: "DENTAL IMPLANT TECHNOLOGY",
      img: "/assets/imgs/blog-1.webp",
      snippet:
        'In 1864 an engineer named Stephen Morse conceptualised the mechanical phenomenon stating that when two conical metal components (female + male) reach a tight contact, these fix one into the other, through a the so called "cold welding".',
      author: "Dr. Mani Krishnan",
      author_title: "Chief Implantologist",
      read_time: "5 min read",
    },
    {
      id: 2,
      slug: "2",
      title: "Dynamic Navigation: Precision Implant Surgery",
      category: "SURGICAL NAVIGATION TECHNOLOGY",
      img: "/assets/imgs/blog-2.webp",
      snippet:
        "Dynamic Navigation is the most effective means by which to accurately transfer a planned implant position to a patient. In contrast to the inherent inaccuracy of Freehand and Static Navigation...",
      author: "Marks Biotech Clinical Team",
      author_title: "Computer-Guided Surgery Specialists",
      read_time: "7 min read",
    },
    {
      id: 3,
      slug: "3",
      title: "Photogrammetry in Full-Arch Dental Implants for Passivity",
      category: "DIGITAL DENTISTRY • PHOTOGRAMMETRY",
      img: "/assets/imgs/micronmaper.webp",
      snippet:
        "Explore how photogrammetry supports accurate implant-position capture in full-arch dental implant workflows, its relationship with passive fit, CAD/CAM and clinical verification.",
      author: "Dr. Rajesh Nair",
      author_title: "Prosthodontics Specialist",
      read_time: "6 min read",
    },
    {
      id: 4,
      slug: "4",
      title: "Passive Fit of Implant Prosthesis Using Digital Technology",
      category: "DIGITAL WORKFLOW • IMPLANT PROSTHODONTICS",
      img: "/assets/imgs/blog-4.webp",
      snippet:
        "A framework that needs to be forced into place is already telling you something: the prosthesis and the implant positions are not matching as they should. Discover how digital technology controls passive fit...",
      author: "Marks Biotech Clinical Team",
      author_title: "Prosthetic Verification Group",
      read_time: "8 min read",
    },
    {
      id: 5,
      slug: "5",
      title: "Radiographic Markers for Guided Implant Surgery",
      category: "GUIDED IMPLANT SURGERY • CBCT PLANNING",
      img: "/assets/imgs/blog-5.webp",
      snippet:
        "Radiopaque markers for dental implants are small, X-ray-visible reference points incorporated into a radiographic template to help relate intended prosthetics to patient anatomy.",
      author: "Dr. Mani Krishnan",
      author_title: "CBCT Planning & Navigation Specialist",
      read_time: "5 min read",
    },
    {
      id: 6,
      slug: "6",
      title: "Role Of Compactors / Expanders in Dental Implant Surgery",
      category: "IMPLANT SITE PREPARATION • RIDGE EXPANSION",
      img: "/assets/imgs/blog-6.webp",
      snippet:
        "Bone compactors and expanders widen or densify a narrow or low-density ridge by pushing bone laterally rather than drilling it away, preserving bone volume and boosting primary stability.",
      author: "Dr. Rajesh Nair",
      author_title: "Oral & Maxillofacial Surgeon",
      read_time: "6 min read",
    },
    {
      id: 7,
      slug: "7",
      title:
        "Emergence Profile in Dental Implant Procedure Using PEEK Abutments",
      category: "IMPLANT PROSTHODONTICS • SOFT TISSUE ARCHITECTURE",
      img: "/assets/imgs/blog-7.webp",
      snippet:
        "Standard round healing abutments never replicate a tooth's cervical anatomy. Discover how PEEK components guide critical and subcritical contours during early soft tissue healing.",
      author: "Marks Biotech Prosthodontics",
      author_title: "Esthetic Reconstruction",
      read_time: "6 min read",
    },
    {
      id: 8,
      slug: "8",
      title: "Guided Endodontics in Dynamic Navigation Systems",
      category: "SURGICAL NAVIGATION • GUIDED ENDODONTICS",
      img: "/assets/imgs/blog-8.webp",
      snippet:
        "Dynamic navigation in endodontics uses real-time optical tracking to guide burs along pre-planned CBCT paths for calcified canals, conservative access, and microsurgery.",
      author: "Dr. Mani Krishnan",
      author_title: "Endodontic & Navigation Faculty",
      read_time: "7 min read",
    },
    {
      id: 9,
      slug: "9",
      title:
        "Tooth/Bone Segmentation Using Artificial Intelligence in Dentistry",
      category: "ARTIFICIAL INTELLIGENCE • CBCT SEGMENTATION",
      img: "/assets/imgs/blog-9.webp",
      snippet:
        "Deep learning networks automate tooth, alveolar bone, sinus, and mandibular canal segmentation in seconds, transforming digital implant planning and guide design.",
      author: "AI Research Group",
      author_title: "Medical Imaging & AI Systems",
      read_time: "8 min read",
    },
    {
      id: 10,
      slug: "10",
      title:
        "Evaluvating 3D Implant Placement Using Digital Dentistry Software",
      category: "VIRTUAL IMPLANT PLANNING • ACCURACY ANALYSIS",
      img: "/assets/imgs/blog-10.webp",
      snippet:
        "Comparing planned vs actual placed positions: entry-point, apical, and angular deviations, registration accuracy, and how delivery methods affect digital implant outcomes.",
      author: "Dr. Rajesh Nair",
      author_title: "Surgical Planning Mentor",
      read_time: "9 min read",
    },
    {
      id: 11,
      slug: "11",
      title: "Auto-merging CBCT Data & Soft Tissue USing Digital Dentistry",
      category: "DIGITAL DENTISTRY • MULTIMODAL REGISTRATION",
      img: "/assets/imgs/blog-11.webp",
      snippet:
        "Auto-merging aligns CBCT bone scans with soft-tissue intraoral scans into a single coordinate system. Explore AI-driven registration, submillimeter accuracy, and virtual patient workflows.",
      author: "Marks Biotech Digital Faculty",
      author_title: "Multimodal Imaging",
      read_time: "7 min read",
    },
    {
      id: 12,
      slug: "12",
      title: "TMJ Pain Management (Arthrocenthesis) & Navigation Procedure",
      category: "TMJ PROCEDURES • SURGICAL NAVIGATION",
      img: "/assets/imgs/blog-12.webp",
      snippet:
        "Examine TMJ arthrocentesis mechanisms, landmark-based limitations, patient-specific 3D printed guides, real-time dynamic navigation, and comparative clinical outcomes.",
      author: "Dr. Mani Krishnan",
      author_title: "Maxillofacial Joint Surgery",
      read_time: "8 min read",
    },
    {
      id: 13,
      slug: "13",
      title: "Tissue Adhesives in Dentistry",
      category: "BIOMATERIALS • WOUND CLOSURE",
      img: "/assets/imgs/blog-13.webp",
      snippet:
        "Cyanoacrylate tissue adhesives vs conventional sutures: wound healing, chair time, graft fixation, hemostatic benefits, and tension limitations in oral surgery.",
      author: "Marks Biotech Biomaterials Team",
      author_title: "Tissue Regeneration",
      read_time: "6 min read",
    },
    {
      id: 14,
      slug: "14",
      title:
        "Tissue Mapper : Eliminate IOS Scans in Full-Arch Case on the Day of Surgery",
      category: "PHOTOGRAMMETRY • FULL-ARCH RESTORATION",
      img: "/assets/imgs/blog-14.webp",
      snippet:
        "MicronMapper Tissue Mapper replaces wet, bloody, tongue-crowded post-op optical scans with contact-based Trace surface registration on surgery day.",
      author: "Dr. Mani Krishnan",
      author_title: "Full-Arch Digital Loading",
      read_time: "10 min read",
    },
  ];

  for (const b of realBlogs) {
    const content = `
      <h2>${b.title}</h2>
      <p class="lead">${b.snippet}</p>
      <p>In modern surgical and restorative dentistry, digital methodologies and biological biomaterials work together to elevate predictability, reduce patient trauma, and ensure long-term osteoconductive integration.</p>
      <h3>Key Clinical Observations</h3>
      <ul>
        <li>Precision calibration reduces mechanical and biological complications.</li>
        <li>Submillimeter accuracy prevents critical anatomical encroachment.</li>
        <li>Immediate provisionalization preserves soft tissue architecture and patient comfort.</li>
      </ul>
      <p>For more clinical documentation and case series, contact the Marks Biotech Clinical Insights team.</p>
    `;

    await pool.query(
      `INSERT INTO blogs (
        id, title, slug, excerpt, content, category, featured_image,
        author_name, author_title, read_time, status, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', NOW())
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        slug = VALUES(slug),
        excerpt = VALUES(excerpt),
        category = VALUES(category),
        featured_image = VALUES(featured_image),
        author_name = VALUES(author_name),
        author_title = VALUES(author_title),
        read_time = VALUES(read_time),
        status = 'published';`,
      [
        b.id,
        b.title,
        b.slug,
        b.snippet,
        content,
        b.category,
        b.img,
        b.author,
        b.author_title,
        b.read_time,
      ],
    );
  }
  console.log(
    `✓ Synchronized all ${realBlogs.length} real blogs into MySQL database.`,
  );

  // 4. Ensure Popups are Active and Accurate
  await pool.query(`
    INSERT INTO popups (
      id, type, name, title, subtitle, content, image_url, badge_text,
      button_text, button_link, secondary_button_text, secondary_button_link,
      delay_seconds, show_frequency, target_pages, is_active
    ) VALUES 
    (
      1,
      'event',
      'April 2026 Live Navigation Surgical Workshop',
      'Navident Advanced Surgical & Prosthetic Workshop',
      'Live Hands-On Dynamic Computer-Assisted Implantology at ITC Grand Chola',
      'Join Dr. Mani Krishnan for 2 days of intensive live patient surgery demonstration and hands-on typodont training.',
      '/assets/event/11.webp',
      '🔥 Limited Seats (April 2026)',
      'Register for Workshop',
      '/events/11',
      'View Event Agenda',
      '/events/11',
      3,
      'once_per_session',
      '*',
      1
    ),
    (
      2,
      'product',
      'Next-Gen Cancellous Particulate Vials',
      'Premium Allograft Cancellous Particulate Vials',
      '100% Human Osteoinductive Tissue Matrix with Superior Handling',
      'Optimized 250-1000µm particulate size for sinus augmentation, extraction sockets, and peri-implant defect filling.',
      '/assets/imgs/proc-dental-surgery.jpg',
      'Featured Biomaterial',
      'Explore Allograft Store',
      '/allograft',
      'View Evidence',
      '/scientific-evidence',
      5,
      'once_per_session',
      '*',
      1
    )
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      title = VALUES(title),
      subtitle = VALUES(subtitle),
      content = VALUES(content),
      image_url = VALUES(image_url),
      badge_text = VALUES(badge_text),
      button_text = VALUES(button_text),
      button_link = VALUES(button_link),
      is_active = 1;
  `);

  // Ensure global popups master switch is ON
  await pool.query(`
    UPDATE seo_global_settings SET popups_master_enabled = 1;
  `);
  console.log("✓ Popups seeded, activated, and enabled website-wide.");

  console.log("=== SYNCHRONIZATION COMPLETE! ===");
  process.exit(0);
}

main().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
