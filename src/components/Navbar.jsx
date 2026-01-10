import { Link } from "react-router-dom";
import logoRemovebg from "../assets/logoRemovebg.png";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img
          src={logoRemovebg}
          alt="SpaceX Logo"
          className={styles.spacexLogo}
        />

        <nav className={styles.nav}>
          <Link to="/live">Live Space</Link>

          <div className={styles.dropdown}>
            <span>Explore Space</span>
            <div className={styles.menu}>
              <Link to="/events">Space Events</Link>
              <Link to="/missions">Missions</Link>
              <Link to="/cosmic">Cosmic Activity</Link>
            </div>
          </div>

          <Link to="/earth">Space for Earth</Link>

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
