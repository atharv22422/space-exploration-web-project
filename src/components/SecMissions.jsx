import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Missions.module.css"; // reuse same CSS

export default function SecBody() {
  const [view, setView] = useState("list");

  // ✅ GET ID FROM URL
  const { id } = useParams();

  /* =======================
     EVENTS DATA
  ======================= */
  const events = [
    {
      id: 1,
      category: "SOLAR SYSTEM | ECLIPSE",
      title: "Total Solar Eclipse",
      description:
        "A total solar eclipse occurs when the Moon completely blocks the Sun, casting a shadow on Earth.",
      date: "April 8, 2024",
      visibility: "North America",
      image:
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864",
    },
    {
      id: 2,
      category: "METEORS | SHOWER",
      title: "Perseids Meteor Shower",
      description:
        "One of the brightest meteor showers of the year, caused by debris from Comet Swift–Tuttle.",
      date: "Aug 12–13, 2025",
      visibility: "Northern Hemisphere",
      image:
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864",
    },
    {
      id: 3,
      category: "ATMOSPHERIC | AURORA",
      title: "Aurora Borealis",
      description:
        "Natural light display produced by charged solar particles interacting with Earth's magnetic field.",
      date: "Ongoing",
      visibility: "High Latitude Regions",
      image:
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864",
    },
  ];

  /* =======================
     SELECTED EVENT (BY ID)
  ======================= */
  const selectedEvent = id ? events.find((e) => e.id === Number(id)) : null;

  /* =======================
     EVENT FILTER SIDEBAR
  ======================= */
  const eventFilters = [
    [
      "Solar System Events",
      [
        "Solar Eclipse (Total)",
        "Solar Eclipse (Partial)",
        "Lunar Eclipse",
        "Planetary Conjunction",
        "Full Moon",
        "Supermoon",
      ],
    ],
    [
      "Transient & Small Body Events",
      ["Meteor Shower", "Fireball", "Comet", "Asteroid Close Approach"],
    ],
    [
      "Atmospheric Optical Phenomena",
      ["Aurora Borealis", "Solar Halo", "Sun Dog"],
    ],
  ];

  return (
    <div className={styles.page}>
      {/* =======================
          SIDEBAR
      ======================= */}
      <aside className={styles.sidebar}>
        {eventFilters.map(([title, items]) => (
          <div key={title} className={styles.filterGroup}>
            <h4>{title}</h4>
            {items.map((item) => (
              <label key={item}>
                <input type="checkbox" /> {item}
              </label>
            ))}
          </div>
        ))}
        <button className={styles.reset}>RESET FILTERS</button>
      </aside>

      {/* =======================
          MAIN CONTENT
      ======================= */}
      <main className={styles.main}>
        {/* TOP BAR */}
        <div className={styles.topBar}>
          <div>
            Showing <strong>{events.length}</strong> results
            {selectedEvent && (
              <>
                {" "}
                • Viewing: <strong>{selectedEvent.title}</strong>
              </>
            )}
          </div>

          <div className={styles.viewToggle}>
            <button
              className={view === "list" ? styles.active : ""}
              onClick={() => setView("list")}
            >
              ☰
            </button>
            <button
              className={view === "grid" ? styles.active : ""}
              onClick={() => setView("grid")}
            >
              ⬚
            </button>
          </div>
        </div>

        {/* RESULTS */}
        <div className={view === "grid" ? styles.grid : styles.list}>
          {events.map((e) => (
            <Link
              key={e.id}
              to={`/missions/${e.id}`} // ✅ FIXED LINK
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div className={styles.text}>
                  <span className={styles.type}>{e.category}</span>
                  <h3>{e.title}</h3>
                  <p>{e.description}</p>
                  <span className={styles.date}>
                    {e.date} • {e.visibility}
                  </span>
                </div>
                <img src={e.image} alt={e.title} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
