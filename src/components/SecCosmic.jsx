import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SecCosmic.module.css"; // reuse same layout CSS

export default function SecCosmic() {
  const [view, setView] = useState("list");

  /* =======================
     COSMIC INFO DATA
  ======================= */
  const cosmicEvents = [
    {
      id: "solar-storm-g3",
      type: "SOLAR ACTIVITY | SOLAR STORM",
      title: "Strong Solar Storm (G3)",
      description:
        "A geomagnetic storm caused by a coronal mass ejection impacting Earth's magnetosphere.",
      date: "Observed: Jan 14, 2026",
      visibility: "High Latitudes",
      image:
        "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001434/GSFC_20171208_Archive_e001434~orig.jpg?w=400&h=344&fit=crop&crop=faces%2Cfocalpoint",
    },

    {
      id: "grb-260112a",
      type: "HIGH-ENERGY | GAMMA-RAY BURST",
      title: "Short Gamma-Ray Burst (GRB 260112A)",
      description:
        "A brief but intense burst of gamma radiation detected by space observatories.",
      date: "Detected: Jan 12, 2026",
      visibility: "Deep Space",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gamma_ray_burst.jpg/500px-Gamma_ray_burst.jpg",
    },
    {
      id: "x-class-solar-flare-2026",
      type: "SOLAR ACTIVITY | SOLAR FLARE",
      title: "X-Class Solar Flare",
      description:
        "An extremely powerful solar flare capable of disrupting radio communications.",
      date: "Observed: Jan 10, 2026",
      visibility: "Sun-facing Earth",
      image:
        "https://cdn.mos.cms.futurecdn.net/uqRSZnQLgaPw8Mx7csKQsX-970-80.jpg.webp",
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
