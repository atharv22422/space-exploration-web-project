import styles from "./Footer.module.css";
import zoomedRemovebg from "../assets/zoomedRemovebg.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* LEFT BRAND */}
        <div className={styles.brand}>
          <Link to="/">
            <img src={zoomedRemovebg} className={styles.spacexLogo} />
          </Link>

          <h2>Discover the Cosmos, One Click at a Time</h2>

          <p>
            Stay connected with the universe through real-time space events,
            stunning visuals, and interactive insights. From satellites to
            skywatching tips, SpaceScope brings the cosmos closer to you.
          </p>
          <Link to="/join-page">
            <a href="#" className={styles.join}>
              Join us
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={styles.arrow}
              >
                <circle cx="16" cy="16" r="12" className={styles.arrowCircle} />
                <path
                  d="M8 16.956h12.604l-3.844 4.106 1.252 1.338L24 16l-5.988-6.4-1.252 1.338 3.844 4.106H8v1.912z"
                  className={styles.arrowIcon}
                />
              </svg>
            </a>
          </Link>
        </div>

        {/* LINKS */}
        <div className={styles.links}>
          <ul>
            <li>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/space-events" className={styles.navLink}>
                Space Events
              </Link>
            </li>
            <li>
              <Link to="/feature-news" className={styles.navLink}>
                News
              </Link>
            </li>
            <li>
              <Link to="/live-space" className={styles.navLink}>
                ORIVIS+ LIVE
              </Link>
            </li>
            <li>
              <Link to="/space-missions" className={styles.navLink}>
                Missions
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link to="/space-for-earth" className={styles.navLink}>
                agriculture monitoring
              </Link>
            </li>
            <li>
              <Link to="/space-for-earth" className={styles.navLink}>
                climate analysis
              </Link>
            </li>
            <li>
              <Link to="/space-for-earth" className={styles.navLink}>
                crop monitoring
              </Link>
            </li>
            <li>
              <Link to="/space-for-earth" className={styles.navLink}>
                disaster prediction
              </Link>
            </li>
            <li>
              <Link to="/space-missions" className={styles.navLink}>
                pollution tracking
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className={styles.divider}></div>
    </footer>
  );
}
