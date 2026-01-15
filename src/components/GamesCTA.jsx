import styles from "./GamesCTA.module.css";
import { Link } from "react-router-dom";

const GamesSos = () => {
  return (
    <section className={styles.hero}>
      <img
        src="https://www.nasa.gov/wp-content/uploads/2023/01/kidsclub-nebula-copy-1.jpg"
        alt="Astronauts in spacesuits"
        className={styles.backgroundImage}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>Explore Space Through Games</h1>

        <p className={styles.description}>
          From orbital challenges to cosmic survival scenarios, dive into games
          that turn real space concepts into fun, interactive experiences
        </p>

        <Link to="/learn-more">
          <button className={styles.button}>
            Play Now <span className={styles.arrow}>→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default GamesSos;
