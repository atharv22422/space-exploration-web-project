import styles from "./EventHerobanner.module.css";
import { Link } from "react-router-dom";

const EventHerobanner = () => {
  return (
    <section className={styles.hero}>
      <img
        src="https://www.nasa.gov/wp-content/uploads/2024/10/50999379344-b7db5dd107-o-1.jpg?resize=1536,1024"
        alt="Astronauts in spacesuits"
        className={styles.backgroundImage}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>
          NASA’s Pandora Satellite, Explore Exoplanets
        </h1>

        <p className={styles.description}>
          Astronauts train for a variety of missions, including performing
          research on the International Space Station, launching from American
          soil on spacecraft built by commercial companies, and preparing for
          missions to the Moon with Artemis.
        </p>

        <Link to="/live-space">
          <button className={styles.button}>
            Learn More <span className={styles.arrow}>→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EventHerobanner;
