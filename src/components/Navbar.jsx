import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import CroppedImage from "../assets/CroppedImage.png";
import styles from "./Navbar.module.css";

function Navbar() {
  const [hideHeader, setHideHeader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${hideHeader ? styles.hide : ""} ${
        scrolled ? styles.scrolled : ""
      }`}
    >
      <div className={styles.left}>
        <Link to="/" className={styles.logoLink}>
          <img src={CroppedImage} alt="Logo" className={styles.spacexLogo} />
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
