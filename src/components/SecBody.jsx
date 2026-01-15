import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SecBody.module.css"; // reuse same CSS

export default function SecBody() {
  const [view, setView] = useState("list");

  /* =======================
     EVENTS DATA
  ======================= */
  const events = [
    {
      id: "solar-eclipse-2024",
      category: "SOLAR SYSTEM | ECLIPSE",
      title: "Total Solar Eclipse",
      description:
        "A total solar eclipse occurs when the Moon completely blocks the Sun.",
      date: "April 8, 2024",
      visibility: "North America",
      image:
        "https://static.toiimg.com/thumb/msid-109126932,imgsize-10936,width-400,resizemode-4/109126932.jpg",
    },
    {
      id: "perseids-2025",
      category: "METEORS | SHOWER",
      title: "Perseids Meteor Shower",
      description: "One of the brightest meteor showers of the year.",
      date: "Aug 12–13, 2025",
      visibility: "Northern Hemisphere",
      image:
        "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar-system/skywatching/evergreen-images/Perseids_2024_Preston_Dyches.jpg",
    },
    {
      id: "lunar-eclipse-2025",
      category: "ECLIPSE | LUNAR",
      title: "Total Lunar Eclipse",
      description: "The Moon passes completely into Earth’s shadow.",
      date: "Mar 14–15, 2025",
      visibility: "Asia, Europe, Australia, Africa",
      image:
        "https://science.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png",
    },
  ];

  /* =======================
     EVENT FILTER SIDEBAR
  ======================= */
  const eventFilters = [
    [
      "Solar System Events",
      [
        "Solar Eclipse (Total)",
        "Solar Eclipse (Partial)",
        "Solar Eclipse (Annular)",
        "Solar Eclipse (Hybrid)",
        "Lunar Eclipse (Total / Blood Moon)",
        "Lunar Eclipse (Partial)",
        "Lunar Eclipse (Penumbral)",
        "Planetary Conjunction",
        "Planetary Opposition",
        "Planetary Transit",
        "Occultation",
        "New Moon",
        "Full Moon",
        "Supermoon",
        "Blue Moon",
        "Micromoon",
        "Equinox",
        "Solstice",
        "Perihelion",
        "Aphelion",
      ],
    ],
    [
      "Transient & Small Body Events",
      [
        "Meteor Shower",
        "Meteor Outburst",
        "Fireball",
        "Periodic Comet",
        "Great Comet",
        "Asteroid Close Approach",
        "Near-Earth Object (NEO)",
      ],
    ],
    [
      "High-Energy & Deep Space",
      [
        "Supernova",
        "Gamma-Ray Burst (GRB)",
        "Nova",
        "Fast Radio Burst (FRB)",
        "Gravitational Wave Event",
      ],
    ],
    [
      "Atmospheric Optical Phenomena",
      [
        "Aurora Borealis",
        "Aurora Australis",
        "Solar Halo",
        "Lunar Halo",
        "Sun Dog (Parhelion)",
        "Fata Morgana",
        "Crepuscular Rays",
      ],
    ],
    [
      "Man-Made & Orbital Events",
      [
        "ISS Pass",
        "Satellite Pass",
        "Rocket Launch",
        "Rocket Reentry",
        "Spacecraft Mission Event",
      ],
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
            Showing <strong>1–{events.length}</strong> of{" "}
            <strong>{events.length}</strong> results
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
              to={`/event/${e.id}`} // ✅ Correct
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
