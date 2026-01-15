import { Link, useLocation } from "react-router-dom";
import CroppedImage from "../assets/CroppedImage.png";
import styles from "./SecNavbar.module.css";

function SecNavbar() {
  const location = useLocation();

  // Map routes to labels
  const routeLabels = {
    "/live-space": "Live Space",
    "/space-events": "Space Events",
    "/missions": "Missions",
    "/cosmic-activity": "Cosmic Activity",
    "/space-for-earth": "Space for Earth",
    "/event": "event",
  };

  const currentLabel = routeLabels[location.pathname] || "Live Space";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {/* Logo → Home */}
        <Link to="/" className={styles.logoLink}>
          <img
            src={CroppedImage}
            alt="SpaceX Logo"
            className={styles.spacexLogo}
          />
        </Link>

        <nav className={styles.nav}>
          <span className={styles.activeLabel}>{currentLabel}</span>
        </nav>
      </div>
    </header>
  );
}

export default SecNavbar;
