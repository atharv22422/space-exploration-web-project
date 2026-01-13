import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Missions.module.css"; // reuse same layout CSS

export default function SecCosmic() {
  const [view, setView] = useState("list");

  /* =======================
     COSMIC INFO DATA
  ======================= */
  const cosmicEvents = [
    {
      id: 1,
      type: "SOLAR ACTIVITY | SOLAR STORM",
      title: "Strong Solar Storm (G3)",
      description:
        "A geomagnetic storm caused by a coronal mass ejection impacting Earth's magnetosphere.",
      date: "Observed: Jan 14, 2026",
      visibility: "High Latitudes",
      image:
        "https://www.nasa.gov/wp-content/uploads/2024/10/50999379344-b7db5dd107-o-1.jpg?resize=1536,1024",
    },
    {
      id: 2,
      type: "ATMOSPHERIC | AURORA",
      title: "Aurora Borealis Intensification",
      description:
        "Enhanced auroral activity due to increased solar wind pressure.",
      date: "Ongoing",
      visibility: "Northern Hemisphere",
      image:
        "https://www.nasa.gov/wp-content/uploads/2024/10/50999379344-b7db5dd107-o-1.jpg?resize=1536,1024",
    },
    {
      id: 3,
      type: "HIGH-ENERGY | GAMMA-RAY BURST",
      title: "Short Gamma-Ray Burst (GRB 260112A)",
      description:
        "A brief but intense burst of gamma radiation detected by space observatories.",
      date: "Detected: Jan 12, 2026",
      visibility: "Deep Space",
      image:
        "https://www.nasa.gov/wp-content/uploads/2024/10/50999379344-b7db5dd107-o-1.jpg?resize=1536,1024",
    },
    {
      id: 4,
      type: "SOLAR ACTIVITY | SOLAR FLARE",
      title: "X-Class Solar Flare",
      description:
        "An extremely powerful solar flare capable of disrupting radio communications.",
      date: "Observed: Jan 10, 2026",
      visibility: "Sun-facing Earth",
      image:
        "https://www.nasa.gov/wp-content/uploads/2024/10/50999379344-b7db5dd107-o-1.jpg?resize=1536,1024",
    },
  ];

  /* =======================
     COSMIC INFO FILTER SIDEBAR
  ======================= */
  const cosmicFilters = [
    [
      "Solar Activity",
      [
        "Solar Flare (C / M / X Class)",
        "Coronal Mass Ejection (CME)",
        "Solar Storm",
        "Sunspot Activity",
        "Solar Wind Enhancement",
      ],
    ],
    [
      "Auroral Phenomena",
      [
        "Aurora Borealis",
        "Aurora Australis",
        "Auroral Substorm",
        "Geomagnetic Storm",
      ],
    ],
    [
      "High-Energy & Deep Space",
      [
        "Gamma-Ray Burst (GRB)",
        "Fast Radio Burst (FRB)",
        "Supernova",
        "Nova",
        "Gravitational Wave Event",
      ],
    ],
    [
      "Cosmic Radiation & Particles",
      [
        "Solar Energetic Particle (SEP) Event",
        "Cosmic Ray Increase",
        "Radiation Storm",
      ],
    ],
    [
      "Space Weather Impacts",
      [
        "Satellite Disruption",
        "Radio Blackout",
        "GPS Degradation",
        "Power Grid Disturbance",
      ],
    ],
  ];

  return (
    <div className={styles.page}>
      {/* =======================
          SIDEBAR
      ======================= */}
      <aside className={styles.sidebar}>
        {cosmicFilters.map(([title, items]) => (
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
            Showing <strong>1–{cosmicEvents.length}</strong> of{" "}
            <strong>{cosmicEvents.length}</strong> cosmic events
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
          {cosmicEvents.map((e) => (
            <Link
              key={e.id}
              to={`/cosmic-activity/${e.id}`}
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div className={styles.text}>
                  <span className={styles.type}>{e.type}</span>
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
