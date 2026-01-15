import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CroppedImage from "../assets/CroppedImage.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      // hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // add background after slight scroll
      setScrolled(currentY > 20);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} 
      ${hidden ? styles.hide : ""} 
      ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.left}>
        <Link to="/" className={styles.logoLink}>
          <img
            src={CroppedImage}
            alt="SpaceX Logo"
            className={styles.spacexLogo}
          />
        </Link>

        <nav className={styles.nav}>
          <Link to="/live-space" className={styles.nondropdown}>
            Live Space
          </Link>

          <div className={styles.dropdown}>
            <span>Explore Space</span>
            <div className={styles.menu}>
              <Link to="/space-events">Space Events</Link>
              <Link to="/missions">Missions</Link>
              <Link to="/cosmic-activity">Cosmic Activity</Link>
            </div>
          </div>

          <Link to="/space-for-earth" className={styles.nondropdown}>
            Space for Earth
          </Link>

          <div className={styles.dropdown}>
            <span>Learn Space</span>
            <div className={styles.menu}>
              <Link to="/infographics">Infographics</Link>
              <Link to="/games">Games</Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
