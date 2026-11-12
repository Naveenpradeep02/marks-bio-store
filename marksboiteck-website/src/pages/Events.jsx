import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/events.css";

export default function Events() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selected2025Type, setSelected2025Type] = useState("conference");
  const [selected2026Type, setSelected2026Type] = useState("conference");
  const [dbEvents, setDbEvents] = useState([]);

  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/api/events?limit=100")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const loaded = Array.isArray(data?.events)
          ? data.events
          : Array.isArray(data)
          ? data
          : [];
        if (loaded.length > 0) {
          setDbEvents(loaded);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      <section className="top-banner-careers">
        <h1>EVENTS</h1>
      </section>

      {/* RADIO INPUTS (Preserving exact CSS selector matching from events.css) */}
      <input
        type="radio"
        name="tab"
        id="year-2025"
        checked={selectedYear === "2025"}
        onChange={() => setSelectedYear("2025")}
      />
      <input
        type="radio"
        name="tab"
        id="year-2026"
        checked={selectedYear === "2026"}
        onChange={() => setSelectedYear("2026")}
      />

      <input
        type="radio"
        name="year-2025-type"
        id="y2025-workshop"
        checked={selected2025Type === "workshop"}
        onChange={() => setSelected2025Type("workshop")}
      />
      <input
        type="radio"
        name="year-2025-type"
        id="y2025-conference"
        checked={selected2025Type === "conference"}
        onChange={() => setSelected2025Type("conference")}
      />

      <input
        type="radio"
        name="year-2026-type"
        id="y2026-workshop"
        checked={selected2026Type === "workshop"}
        onChange={() => setSelected2026Type("workshop")}
      />
      <input
        type="radio"
        name="year-2026-type"
        id="y2026-conference"
        checked={selected2026Type === "conference"}
        onChange={() => setSelected2026Type("conference")}
      />

      {/* TABS */}
      <div className="tabs">
        <label htmlFor="year-2025" onClick={() => setSelectedYear("2025")}>
          2025 Events
        </label>
        <label htmlFor="year-2026" onClick={() => setSelectedYear("2026")}>
          2026 Events
        </label>
      </div>

      <div className="sub-tabs sub-2025">
        <label
          htmlFor="y2025-workshop"
          onClick={() => setSelected2025Type("workshop")}
        >
          Workshop
        </label>
        <label
          htmlFor="y2025-conference"
          onClick={() => setSelected2025Type("conference")}
        >
          Conference
        </label>
      </div>

      <div className="sub-tabs sub-2026">
        <label
          htmlFor="y2026-workshop"
          onClick={() => setSelected2026Type("workshop")}
        >
          Workshop
        </label>
        <label
          htmlFor="y2026-conference"
          onClick={() => setSelected2026Type("conference")}
        >
          Conference
        </label>
      </div>

      {/* EVENTS GRID (Dynamic Sync with Backend + Static Fallback) */}
      <div className="events-grid">
        {dbEvents && dbEvents.length > 0 ? (
          dbEvents.map((ev) => (
            <Link
              key={ev.id}
              to={`/events/${ev.id}`}
              className={`event-card ${ev.type || "workshop"} year-${ev.year || "2026"}-event`}
            >
              <div className={`event-status-bar ${ev.status || "upcoming"}`}>
                <span className="event-status">
                  {ev.status === "upcoming" ? "Upcoming" : "Completed"}
                </span>
              </div>
              <img
                src={ev.image_url || "/assets/event/11.webp"}
                loading="lazy"
                alt={ev.title}
                onError={(e) => {
                  e.currentTarget.src = "/assets/event/11.webp";
                }}
              />
              <div className="event-content">
                <div className="event-title">{ev.title}</div>
              </div>
            </Link>
          ))
        ) : (
          <>
            {/* 2025 workshop events */}
            <Link to="/events/8" className="event-card workshop year-2025-event">
              <div className="event-status-bar completed">
                <span className="event-status">Completed</span>
              </div>
              <img
                src="/assets/event/11.webp"
                loading="lazy"
                alt="Navident Advanced Sugical &amp; Prosthetic Workshop"
              />
              <div className="event-content">
                <div className="event-title">
                  Navident Advanced Sugical &amp; Prosthetic Workshop
                </div>
              </div>
            </Link>

        <Link to="/events/11" className="event-card workshop year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/14.webp"
            loading="lazy"
            alt="Future Of Dentistry One Day Navident Surgical Workshop"
          />
          <div className="event-content">
            <div className="event-title">
              Future Of Dentistry One Day Navident Surgical Workshop
            </div>
          </div>
        </Link>

        <Link to="/events/24" className="event-card workshop year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/24.webp"
            loading="lazy"
            alt="Manipal College of Dental Science"
          />
          <div className="event-content">
            <div className="event-title">
              Manipal College of Dental Science (Mangalore) Navident at
              Maxillofacial Department
            </div>
          </div>
        </Link>

        <Link to="/events/9" className="event-card workshop year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/12.webp"
            loading="lazy"
            alt="CLARONAV DENTAL Workshop"
          />
          <div className="event-content">
            <div className="event-title">
              CLARONAV DENTAL - Navident Advanced Sugical &amp; Prosthetic
              Workshop
            </div>
          </div>
        </Link>

        <Link to="/events/25" className="event-card workshop year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/25.webp"
            loading="lazy"
            alt="Expodent Delhi"
          />
          <div className="event-content">
            <div className="event-title">Expodent Delhi</div>
          </div>
        </Link>

        {/* 2025 conference events */}
        <Link to="/events/22" className="event-card conference year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/23.webp"
            loading="lazy"
            alt="IDS Cologne Germany - 2025"
          />
          <div className="event-content">
            <div className="event-title">IDS Cologne Germany - 2025</div>
          </div>
        </Link>

        <Link to="/events/10" className="event-card conference year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/13.webp"
            loading="lazy"
            alt="ISOI Conference"
          />
          <div className="event-content">
            <div className="event-title">
              Indian Society of Oral Implantologists (ISOI) Conference – Mumbai
            </div>
          </div>
        </Link>

        <Link to="/events/14" className="event-card conference year-2025-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/16.webp"
            loading="lazy"
            alt="2nd National Conference - OSICON"
          />
          <div className="event-content">
            <div className="event-title">
              OSICON 2025 – 2nd National Conference of the Osseointegration Society of India
            </div>
          </div>
        </Link>

        {/* 2026 Workshop events */}
        <Link to="/events/21" className="event-card workshop year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/19.webp"
            loading="lazy"
            alt="Digital Full Mouth Implant Lab Workshop"
          />
          <div className="event-content">
            <div className="event-title">
              Digital Full Mouth Implant Lab Workshop
            </div>
          </div>
        </Link>

        <Link to="/events/27" className="event-card workshop year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/27.webp"
            loading="lazy"
            alt="B &amp; B Dental Education Series"
          />
          <div className="event-content">
            <div className="event-title">
              B &amp; B Dental Education Series.
            </div>
          </div>
        </Link>

        <Link to="/events/26" className="event-card workshop year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/April-26-event/event-26-banner.webp"
            loading="lazy"
            alt="Full Arch Dental Implants Prosthetic Workshop"
          />
          <div className="event-content">
            <div className="event-title">
              Full Arch Dental Implants Prosthetic Workshop
            </div>
          </div>
        </Link>

        <Link to="/events/7" className="event-card workshop year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/7.webp"
            loading="lazy"
            alt="Diagnosis And Treatment Of Peri-Implantitis"
          />
          <div className="event-content">
            <div className="event-title">
              Diagnosis And Treatment Of Peri-Implantitis
            </div>
          </div>
        </Link>

        <Link to="/events/33" className="event-card workshop year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/33.png"
            loading="lazy"
            alt="Advanced Live Surgical & Prosthetic Workshop"
          />
          <div className="event-content">
            <div className="event-title">
              Advanced Live Surgical &amp; Prosthetic Workshop
            </div>
          </div>
        </Link>

        <Link to="/events/5" className="event-card workshop year-2026-event">
          <div className="event-status-bar upcoming">
            <span className="event-status">Upcoming</span>
          </div>
          <img
            src="/assets/event/5.webp"
            loading="lazy"
            alt="Digital Philosophy"
          />
          <div className="event-content">
            <div className="event-title">
              Digital Philosophy – Full-Arch Management With a Fully Digital
              Workflow
            </div>
          </div>
        </Link>

        <Link to="/events/12" className="event-card workshop year-2026-event">
          <div className="event-status-bar upcoming">
            <span className="event-status">Upcoming</span>
          </div>
          <img
            src="/assets/event/8.webp"
            loading="lazy"
            alt="Management Of The Conometric Prosthesis"
          />
          <div className="event-content">
            <div className="event-title">
              Management Of The Conometric Prosthesis
            </div>
          </div>
        </Link>

        <Link to="/events/15" className="event-card workshop year-2026-event">
          <div className="event-status-bar upcoming">
            <span className="event-status">Upcoming</span>
          </div>
          <img
            src="/assets/event/9.webp"
            loading="lazy"
            alt="Guided System Software"
          />
          <div className="event-content">
            <div className="event-title">
              Guided System Software for Dentists and Dental Technicians
            </div>
          </div>
        </Link>

        {/* 2026 Conference events */}
        <Link to="/events/18" className="event-card conference year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img src="/assets/event/20.webp" loading="lazy" alt="AEEDC Dubai" />
          <div className="event-content">
            <div className="event-title">
              AEEDC Dubai - 30 Years of Inspiration, Progress &amp; Global
              Impact
            </div>
          </div>
        </Link>

        <Link to="/events/19" className="event-card conference year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/21.webp"
            loading="lazy"
            alt="NIDACON Nagpur"
          />
          <div className="event-content">
            <div className="event-title">
              NIDACON Nagpur - Unity in Profession. Excellence in Practice.
            </div>
          </div>
        </Link>

        <Link to="/events/17" className="event-card conference year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/18.webp"
            loading="lazy"
            alt="International Digital Dentistry Congress"
          />
          <div className="event-content">
            <div className="event-title">
              International Digital Dentistry Congress
            </div>
          </div>
        </Link>

        <Link to="/events/28" className="event-card conference year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/28.png"
            loading="lazy"
            alt="ICOI - Asean Congress"
          />
          <div className="event-content">
            <div className="event-title">ICOI - Asean Congress</div>
          </div>
        </Link>

        <Link to="/events/20" className="event-card conference year-2026-event">
          <div className="event-status-bar completed">
            <span className="event-status">Completed</span>
          </div>
          <img
            src="/assets/event/31.webp"
            loading="lazy"
            alt="2nd Global Implant Summit 2026 - Trivandrum"
          />
          <div className="event-content">
            <div className="event-title">
              2nd Global Implant Summit 2026 - Trivandrum
            </div>
          </div>
        </Link>

        <Link to="/events/30" className="event-card conference year-2026-event">
          <div className="event-status-bar upcoming">
            <span className="event-status">Upcoming</span>
          </div>
          <img
            src="/assets/event/30.webp"
            loading="lazy"
            alt="ISOI - September"
          />
          <div className="event-content">
            <div className="event-title">
              ISOI - September ( National Conference Of ISOI )
            </div>
          </div>
        </Link>

        <Link to="/events/29" className="event-card conference year-2026-event">
          <div className="event-status-bar upcoming">
            <span className="event-status">Upcoming</span>
          </div>
          <img
            src="/assets/event/29.webp"
            loading="lazy"
            alt="Global Expodent Bangalore"
          />
          <div className="event-content">
            <div className="event-title">Global Expodent Bangalore</div>
          </div>
        </Link>

        <Link to="/events/32" className="event-card conference year-2026-event">
          <div className="event-status-bar upcoming">
            <span className="event-status">Upcoming</span>
          </div>
          <img
            src="/assets/event/32.webp"
            loading="lazy"
            alt="B&amp;B Dental International Meeting"
          />
          <div className="event-content">
            <div className="event-title">
              B&amp;B Dental International Meeting
            </div>
          </div>
        </Link>
          </>
        )}
      </div>
    </main>
  );
}
