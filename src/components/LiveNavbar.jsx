import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CroppedImage from "../assets/CroppedImage.png";
import styles from "./LiveNavbar.module.css";

function LiveNavbar() {
  const location = useLocation();

  const [hideHeader, setHideHeader] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lastScrollY = useRef(0);

  const routeLabels = {
    "/live-space": "Live Space",
    "/space-events": "Space Events",
    "/missions": "Missions",
    "/cosmic-activity": "Cosmic Activity",
    "/space-for-earth": "Space for Earth",
    "/event": "Event",
    "/about-us": "About Us",
    "/whats-up": "what's Up",
    "/explore-tab": "Explore tab",
    "/feature-news": "Feature news",
    "/feature-blogs": "Feature blogs",
    "/join-page": "Join page",
    "/image-of-day": "Image of day",
    "/learn-more": "Learn more",
    "/games": "Games",
    "/infographics": "Infographics",
  };

  const currentLabel = routeLabels[location.pathname] || "Live Space";

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      setScrolled(currentScroll > 40);

      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        setHideHeader(true);
      } else {
        setHideHeader(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} 
        ${hideHeader ? styles.hide : ""} 
        ${scrolled ? styles.scrolled : ""}
      `}
    >
      <div className={styles.left}>
        {/* LOGO WITH RED DOT */}
        <div className={styles.withDot}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={CroppedImage}
              alt="SpaceX Logo"
              className={styles.spacexLogo}
            />
          </Link>
        </div>

        {/* LABEL WITH RED DOT */}
        <nav className={styles.nav}>
          <div className={styles.withDot}>
            <span className={styles.redDot} />
            <span className={styles.activeLabel}>{currentLabel}</span>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default LiveNavbar;
