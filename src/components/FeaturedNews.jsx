import styles from "./FeaturedNews.module.css";
import { Link } from "react-router-dom";

function FeaturedNews() {
  return (
    <section className={styles.featured}>
      {/* Header */}
      <div className={styles.header}>
        <h2>Featured News</h2>
        <Link to="/Feature-news">
          <span className={styles.filter}>
            Recently Published <span className={styles.arrow}>➜</span>
          </span>
        </Link>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {/* Left Big Card */}
        <Link to="/Feature-news">
          <article className={`${styles.card} ${styles.large}`}>
            <img
              src="https://www.nasa.gov/wp-content/uploads/2026/01/boosters.jpg?resize=1348,2000"
              alt="Artemis Mission"
            />
            <div className={styles.overlay}>
              <span className={styles.type}>ARTICLE</span>
              <span className={styles.read}>7 MIN READ</span>
              <h3>
                Final Steps Underway for NASA’s First Crewed Artemis Moon
                Mission
              </h3>
            </div>
          </article>
        </Link>

        {/* Middle Card */}
        <Link to="/Feature-news">
          <article className={`${styles.card} ${styles.medium}`}>
            <img
              src="https://assets.science.nasa.gov/dynamicimage/assets/science/missions/pandora/news/2026/Pandora_ArtistsConcept.jpg?w=900&h=450&fit=crop&crop=faces%2Cfocalpoint"
              alt="Pandora Satellite"
            />
            <div className={styles.overlay}>
              <span className={styles.type}>ARTICLE</span>
              <span className={styles.read}>6 MIN READ</span>
              <h3>
                NASA’s Pandora Satellite, CubeSats to Explore Exoplanets, Beyond
              </h3>
            </div>
          </article>
        </Link>

        {/* Right Stack */}

        <div className={styles.stack}>
          <Link to="/Feature-news">
            <article className={styles.cardSmall}>
              <img
                src="https://www.nasa.gov/wp-content/uploads/2026/01/dragonfly-tdt-setup-092025.jpg"
                alt="Dragonfly"
              />
              <div className={styles.overlay}>
                <span className={styles.read}>6 MIN READ</span>
                <h4>Flight Engineers Give NASA’s Dragonfly Lift</h4>
              </div>
            </article>
          </Link>

          <Link to="/Feature-news">
            <article className={styles.cardSmall}>
              <img
                src="https://images-assets.nasa.gov/image/jsc2025e087964/jsc2025e087964~large.jpg?w=1536&h=1023&fit=crop&crop=faces%2Cfocalpoint"
                alt="Gateway"
              />
              <div className={styles.overlay}>
                <span className={styles.read}>1 MIN READ</span>
                <h4>NASA Starts Up Gateway’s Power System for First Time</h4>
              </div>
            </article>
          </Link>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottom}>
        <Link to="/feature-blogs">
          <div className={styles.mini}>
            <img
              src="https://images-assets.nasa.gov/image/iss073e0850593/iss073e0850593~large.jpg?w=1920&h=1280&fit=clip&crop=faces%2Cfocalpoint"
              alt=""
            />
            <div>
              <span>3 MIN READ</span>
              <p>Expedition 74 Preps for Crew Departure</p>
            </div>
          </div>
        </Link>
        <Link to="/feature-blogs">
          <div className={styles.mini}>
            <img
              src="https://images-assets.nasa.gov/image/iss050e058812/iss050e058812~large.jpg?w=1920&h=1277&fit=clip&crop=faces%2Cfocalpointhttps://images-assets.nasa.gov/image/jsc2025e087964/jsc2025e087964~large.jpg?w=1920&h=1279&fit=clip&crop=faces%2Cfocalpoint"
              alt=""
            />
            <div>
              <span>2 MIN READ</span>
              <p>Space Station Research Informs New Cancer Therapy</p>
            </div>
          </div>
        </Link>

        <Link to="/feature-blogs">
          <div className={styles.mini}>
            <img
              src="https://images-assets.nasa.gov/image/iss073e0850593/iss073e0850593~large.jpg?w=1920&h=1280&fit=clip&crop=faces%2Cfocalpoint"
              alt=""
            />
            <div>
              <span>6 MIN READ</span>
              <p>NASA’s Hubble Examines Cloud-9</p>
            </div>
          </div>
        </Link>

        <Link to="/feature-blogs">
          <div className={styles.mini}>
            <img
              src="https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar-system/skywatching/2026/january/0110.png?w=1920&h=1080&fit=clip&crop=faces%2Cfocalpoint"
              alt=""
            />
            <div>
              <span>3 MIN READ</span>
              <p>What’s Up: January 2026 Skywatching Tips</p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedNews;
