import styles from "./FeaturedNews.module.css";
import { Link } from "react-router-dom";

function FeaturedNews() {
  return (
    <section className={styles.featured}>
      <section className={styles.featured}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Featured News</h2>
          <Link to="/feature-news">
            <span className={styles.filter}>
              Recently Published <span className={styles.arrow}>➜</span>
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {/* Left Big Card */}
          <Link to="/feature-news">
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
          <Link to="/feature-news">
            <article className={`${styles.card} ${styles.medium}`}>
              <img
                src="https://assets.science.nasa.gov/dynamicimage/assets/science/missions/pandora/news/2026/Pandora_ArtistsConcept.jpg?w=900&h=450&fit=crop&crop=faces%2Cfocalpoint"
                alt="Pandora Satellite"
              />
              <div className={styles.overlay}>
                <span className={styles.type}>ARTICLE</span>
                <span className={styles.read}>6 MIN READ</span>
                <h3>
                  NASA’s Pandora Satellite, CubeSats to Explore Exoplanets,
                  Beyond
                </h3>
              </div>
            </article>
          </Link>

          {/* Right Stack */}

          <div className={styles.stack}>
            <Link to="/feature-news">
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

            <Link to="/feature-news">
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

        {/* ================= HERO ================= */}
        <div className={styles.hero}>
          <img
            src="	https://www.nasa.gov/wp-content/uploads/2025/09/nasa-meatball-1.jpg?resize=1536,864"
            alt="Hero"
          />

          <div className={styles.heroContent}>
            <span className={styles.meta}>Movies · 4 min read</span>
            <h1>NASA Releases Global Temperature Data</h1>
            <p>
              Global temperatures in 2025 were cooler than 2024, with average
              temperatures of 2.14 degrees Fahrenheit (1.19 degrees Celsius)
              above the 1951 to 1980 average.
            </p>
          </div>
        </div>

        {/* ================= MUST READ ================= */}
        <div className={styles.head}>
          <h2>Must Read</h2>
        </div>

        <div className={styles.mustReadGrid}>
          <article className={styles.mustCard}>
            <img
              src="https://www.nasa.gov/wp-content/uploads/2025/09/ksc-20250929-ph-csh01-side-by-side.jpg?w=900 "
              alt=""
            />
            <h3>
              NASA Draws Closer to Artemis II Rocket Completion with Newest
              Addition
            </h3>
            <span>News · 6 min read</span>
          </article>

          <article className={styles.mustCard}>
            <img
              src="	https://www.nasa.gov/wp-content/uploads/2025/06/jsc2025e056603.jpg?w=900"
              alt=""
            />
            <h3>NASA’s Artemis Science Team Inaugurates Flight Control Room</h3>
            <span>Music · 5 min read</span>
          </article>

          <article className={styles.mustCard}>
            <img
              src="	https://www.nasa.gov/wp-content/uploads/2025/09/53102021042-c1b05a5420-o-66d8b6.jpg?w=900 "
              alt=""
            />
            <h3>Artemis II Crew Members Name Their Orion Spacecraft</h3>
            <span>Sports · 4 min read</span>
          </article>
        </div>
      </section>
    </section>
  );
}

export default FeaturedNews;
