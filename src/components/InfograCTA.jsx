import styles from "./InfograCTA.module.css";
import { Link } from "react-router-dom";

const Learnmore = () => {
  return (
    <section className={styles.hero}>
      <img
        src="https://www.nasa.gov/wp-content/uploads/2020/09/edu_srch_create_an_infographic2.png?resize=1024,807"
        alt="Astronauts in spacesuits"
        className={styles.backgroundImage}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Space, Explained Visually</h1>

        <p className={styles.description}>
          From orbits and eclipses to missions and cosmic weather, explore space
          through clear, interactive infographics built for quick
          understanding..
        </p>

        <Link to="/learn-more">
          <button className={styles.button}>
            Learn More <span className={styles.arrow}>→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Learnmore;
