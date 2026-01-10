import styles from "./Footer.module.css";
import zoomedRemovebg from "../assets/zoomedRemovebg.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* LEFT BRAND */}
        <div className={styles.brand}>
          <img src={zoomedRemovebg} className={styles.spacexLogo} />

          <h2>National Aeronautics and Space Administration</h2>

          <p>
            NASA explores the unknown in air and space, innovates for the
            benefit of humanity, and inspires the world through discovery.
          </p>

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
        </div>

        {/* LINKS */}
        <div className={styles.links}>
          <ul>
            <li>Home</li>
            <li>News & Events</li>
            <li>Multimedia</li>
            <li>NASA+ LIVE</li>
            <li>Missions</li>
          </ul>

          <ul>
            <li>Humans in Space</li>
            <li>Earth</li>
            <li>The Solar System</li>
            <li>The Universe</li>
            <li>Science</li>
          </ul>

          <ul>
            <li>Aeronautics</li>
            <li>Technology</li>
            <li>Learning Resources</li>
            <li>About NASA</li>
            <li>NASA en Español</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className={styles.social}>
          <h4>Follow NASA</h4>

          <div className={styles.icons}>
            <span>f</span>
            <span>📷</span>
            <span>𝕏</span>
            <span>▶</span>
          </div>

          <p className={styles.p}>More NASA Social Accounts</p>
          <p className={styles.p}>NASA Newsletters</p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className={styles.divider}></div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        <div className={styles.bottomLinks}>
          <span>Sitemap</span>
          <span>For Media</span>
          <span>Privacy Policy</span>
          <span>FOIA</span>
          <span>No FEAR Act</span>
          <span>Office of the IG</span>
          <span>Budget & Annual Reports</span>
          <span>Agency Financial Reports</span>
          <span>Contact NASA</span>
          <span>Accessibility</span>
        </div>

        <div className={styles.meta}>
          <span>Page Last Updated: Jan 09, 2026</span>
          <span>Page Editor: Nikki Welch</span>
          <span>Responsible NASA Official: Abigail Bowman</span>
        </div>
      </div>
    </footer>
  );
}
