import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SecMissions.module.css"; // reuse same CSS

export default function SecMissions() {
  const [view, setView] = useState("list");

  /* =======================
     SPACE MISSIONS DATA
  ======================= */
  const missions = [
    {
      id: "artemis-ii",
      type: "HUMAN SPACEFLIGHT | LUNAR MISSION",
      title: "Artemis II",
      description:
        "NASA’s first crewed mission under the Artemis program, designed to test deep-space systems and prepare for sustained human presence on the Moon.",
      date: "Planned: 2025",
      agency: "NASA",
      image:
        "http://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Artemis_II_Orion_Solar_Array_Wings_Installed_%28jsc2025e016293%29.jpg/500px-Artemis_II_Orion_Solar_Array_Wings_Installed_%28jsc2025e016293%29.jpg",
    },
    {
      id: "perseverance",
      type: "PLANETARY SCIENCE | ROVER MISSION",
      title: "Mars Perseverance Rover",
      description:
        "A robotic rover exploring Mars to study its geology, search for signs of ancient life, and collect samples for future return to Earth.",
      date: "Launched: Jul 30, 2020",
      agency: "NASA",
      image:
        "https://science.nasa.gov/wp-content/uploads/2017/12/pia26344-perseverance-selfie-at-cheyava-mars2020home-1920x640-1.jpg?resize=1536,512",
    },
    {
      id: "jwst",
      type: "SPACE ASTRONOMY | SPACE TELESCOPE",
      title: "James Webb Space Telescope",
      description:
        "A next-generation space observatory studying the universe in infrared light to understand galaxy formation and exoplanets.",
      date: "Launched: Dec 25, 2021",
      agency: "NASA / ESA / CSA",
      image:
        "https://science.nasa.gov/wp-content/uploads/2024/05/jwst_artist_concept_0.png",
    },
  ];

  /* =======================
     MISSION FILTER SIDEBAR
  ======================= */
  const missionFilters = [
    [
      "Human Spaceflight",
      [
        "Orbital Flights",
        "Space Station Expeditions",
        "Lunar Missions",
        "Deep Space / Mars Missions",
        "Commercial Crew & Resupply",
        "Space Tourism",
      ],
    ],
    [
      "Planetary Science & Exploration",
      [
        "Flyby Missions",
        "Orbiter Missions",
        "Lander Missions",
        "Rover Missions",
        "Atmospheric Probes",
        "Sample Return Missions",
      ],
    ],
    [
      "Space Astronomy & Astrophysics",
      [
        "Space Telescopes",
        "Observatory Spacecraft",
        "Sounding Rockets & Balloons",
        "Astrophysics Experiments",
      ],
    ],
    [
      "Earth Science & Observation",
      [
        "Earth Observation Satellites",
        "Weather Monitoring",
        "Climate Change Research",
        "Disaster Monitoring",
      ],
    ],
    [
      "Technology Development",
      [
        "Mission Demonstrations",
        "Experimental Spacecraft",
        "New Propulsion Systems",
        "Autonomous Navigation Tests",
      ],
    ],
  ];

  return (
    <div className={styles.page}>
      {/* =======================
          SIDEBAR
      ======================= */}
      <aside className={styles.sidebar}>
        {missionFilters.map(([title, items]) => (
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
            Showing <strong>1–{missions.length}</strong> of{" "}
            <strong>{missions.length}</strong> space missions
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
          {missions.map((m) => (
            <Link
              key={m.id}
              to={`/missions/${m.id}`}
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div className={styles.text}>
                  <span className={styles.type}>{m.type}</span>
                  <h3>{m.title}</h3>
                  <p>{m.description}</p>
                  <span className={styles.date}>
                    {m.date} • {m.agency}
                  </span>
                </div>
                <img src={m.image} alt={m.title} />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
