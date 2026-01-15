import styles from "./DashBoard.module.css";
import NotDeveloped from "./Notdeveloped";

import { useState } from "react";

export default function DashBoard() {
  const spaceEvents = [
    {
      id: "solar-eclipse-2024",
      category: "SOLAR SYSTEM | ECLIPSE",
      title: "Total Solar Eclipse",
      date: "April 8, 2024",
      image:
        "https://static.toiimg.com/thumb/msid-109126932,imgsize-10936,width-400,resizemode-4/109126932.jpg",
    },
    {
      id: "perseids-2025",
      category: "METEORS | SHOWER",
      title: "Perseids Meteor Shower",
      date: "Aug 12–13, 2025",
      image:
        "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar-system/skywatching/evergreen-images/Perseids_2024_Preston_Dyches.jpg",
    },
    {
      id: "lunar-eclipse-2025",
      category: "ECLIPSE | LUNAR",
      title: "Total Lunar Eclipse",
      date: "Mar 14–15, 2025",
      image:
        "https://science.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png",
    },
  ];

  const cosmicEvents = [
    {
      id: "solar-storm-g3",
      type: "SOLAR ACTIVITY | SOLAR STORM",
      title: "Strong Solar Storm (G3)",
      date: "Observed: Jan 14, 2026",
      image:
        "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001434/GSFC_20171208_Archive_e001434~orig.jpg",
    },
    {
      id: "grb-260112a",
      type: "HIGH-ENERGY | GAMMA-RAY BURST",
      title: "Short Gamma-Ray Burst",
      date: "Detected: Jan 12, 2026",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/6/63/Gamma_ray_burst.jpg",
    },
    {
      id: "x-class-solar-flare-2026",
      type: "SOLAR ACTIVITY | SOLAR FLARE",
      title: "X-Class Solar Flare",
      date: "Observed: Jan 10, 2026",
      image:
        "https://cdn.mos.cms.futurecdn.net/uqRSZnQLgaPw8Mx7csKQsX-970-80.jpg.webp",
    },
  ];

  const [activeTab, setActiveTab] = useState("space");

  const data =
    activeTab === "space"
      ? spaceEvents
      : activeTab === "cosmic"
      ? cosmicEvents
      : [];

  return (
    <section className={styles.page}>
      {/* ===== TOP BAR ===== */}
      <div className={styles.topBar}>
        <div className={styles.tabs}>
          <button
            className={activeTab === "space" ? styles.activeTab : ""}
            onClick={() => setActiveTab("space")}
          >
            Space Events
          </button>
          <button
            className={activeTab === "cosmic" ? styles.activeTab : ""}
            onClick={() => setActiveTab("cosmic")}
          >
            Cosmic Activity
          </button>
          <button
            className={activeTab === "weather" ? styles.activeTab : ""}
            onClick={() => setActiveTab("weather")}
          >
            Climate & Weather
          </button>
        </div>

        <div className={styles.actions}>
          <input
            type="text"
            placeholder="Search events..."
            className={styles.search}
          />
          <button className={styles.filter}>Filter</button>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      {activeTab === "weather" ? (
        // FULL WIDTH "Coming Soon" Section for Weather
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            margin: "auto", // center below top bar
            padding: "-81px 20px",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
            borderRadius: "12px",
            color: "#fff",
            textAlign: "left",
            boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          }}
        >
          <NotDeveloped />
        </div>
      ) : (
        // LEFT + RIGHT PANE for Space/Cosmic
        <div className={styles.content}>
          {/* LEFT SIDEBAR */}
          <aside className={styles.leftPane}>
            <h2 className={styles.sectionTitle}>Upcoming events</h2>
            <div className={styles.eventList}>
              {data.map((event) => (
                <div key={event.id} className={styles.eventCard}>
                  <img src={event.image} alt="" className={styles.thumb} />
                  <div className={styles.eventInfo}>
                    <span className={styles.eventType}>
                      {event.category || event.type}
                    </span>
                    <h4>{event.title}</h4>
                    <p>{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT MAP / VISUAL */}
          <div className={styles.rightPane}>
            <img
              src="https://www.nasa.gov/wp-content/uploads/2025/09/nasa-meatball-1.jpg?resize=1536,864"
              alt="Hero"
            />
          </div>
        </div>
      )}
    </section>
  );
}
