import React from "react";
import styles from "./Imageofday.module.css";

const Imageofday = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.textContent}>
          <span className={styles.today}>Today</span>

          <h2 className={styles.heading}>Image Of The Day</h2>

          <h3 className={styles.title}>
            Best of 2025: Artemis II SLS (Space Launch System) Projected on
            Washington Monument
          </h3>

          <p className={styles.description}>
            Images depicting NASA’s Space Launch System (SLS) rocket are
            projected onto the Washington Monument as part of an event to kick
            off the nation’s 250th birthday year, Wednesday, Dec. 31, 2025, in
            Washington.
          </p>

          <a href="#" className={styles.archiveLink}>
            Browse Image Archive <span>●</span>
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.imageWrapper}>
          <img
            src="https://www.nasa.gov/wp-content/uploads/2026/01/55016654116-5bdeaacd9f-o-1.jpg?resize=400,278"
            alt="Image of the Day"
          />
          <a href="#" className={styles.viewImage}>
            View image <span>●</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Imageofday;
