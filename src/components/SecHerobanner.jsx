import styles from "./SecHerobanner.module.css";
import { Link, useLocation } from "react-router-dom";

const EventHerobanner = () => {
  // Hero content object inside the component
  const heroContent = {
    "/cosmic-activity": {
      title: "NASA’s Pandora Satellite, Explore Exoplanets",
      description:
        "Astronauts train for a variety of missions, including performing research on the International Space Station, launching from American soil, and preparing for Artemis Moon missions.",
      backgroundImage:
        "https://cdn.pixabay.com/photo/2011/12/15/11/37/galaxy-11188_960_720.jpg",
      buttonText: "Explore Live Space",
      link: "/cosmic-activity",
    },
    "/space-events": {
      title: "Upcoming Meteor Showers & Celestial Events",
      description:
        "Stay updated with all the major space events happening around the globe. Track meteor showers, eclipses, and more.",
      backgroundImage:
        "https://cdn.pixabay.com/photo/2016/07/19/04/40/moon-1527501_960_720.jpg",
      buttonText: "See Events",
      link: "/space-events",
    },
    "/missions": {
      title: "Missions Across the Cosmos",
      description:
        "Explore detailed information about past, present, and upcoming missions by NASA and other space agencies.",
      backgroundImage:
        "https://cdn.pixabay.com/photo/2012/11/28/11/28/rocket-launch-67723_960_720.jpg",
      buttonText: "View Missions",
      link: "/missions",
    },
    // Add more routes here if needed
  };

  const location = useLocation();
  const content = heroContent[location.pathname];

  // Fallback if route is not defined
  if (!content) return null;

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <img
        src={content.backgroundImage}
        alt={content.title}
        className={styles.backgroundImage}
      />

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.description}>{content.description}</p>

        <Link to="/live-space">
          <button className={styles.button}>
            {content.buttonText} <span className={styles.arrow}>→</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EventHerobanner;
