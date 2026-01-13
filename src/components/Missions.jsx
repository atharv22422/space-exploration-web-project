import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Missions.module.css"; // reuse same CSS

export default function EventsExplorer() {
  const [view, setView] = useState("list");

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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
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
        "Rainbow",
        "Fogbow",
        "Solar Halo",
        "Lunar Halo",
        "Sun Dog (Parhelion)",
        "Light Pillar",
        "Mirage",
        "Fata Morgana",
        "Green Flash",
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
            <Link key={e.id} to={`/event/${e.id}`} className={styles.cardLink}>
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
