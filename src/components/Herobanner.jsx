import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Herobanner.module.css";

function Herobanner() {
  const heroSlides = [
    {
      video: "https://assets.mixkit.co/videos/45032/45032-720.mp4",
      title: "Witness Space in Real Time",
      subtitle:
        "Experience the cosmos as it happens. From orbiting satellites to live solar activity, stay connected with the dynamic movements of our universe, updated in real time.",
      link: "/live-space",
    },
    {
      image:
        "https://www.cfa.harvard.edu/sites/default/files/styles/hero_image/public/2019-04/imgmt_323_cropped.jpg?itok=kPNj7tq6",
      title: "Mark Your Cosmic Calendar",
      subtitle:
        "Never miss a celestial spectacle. Track meteor showers, eclipses, and other astronomical events with detailed timelines and interactive visual previews.",
      link: "/cosmic-activity",
    },
    {
      video:
        "https://sxcontent9668.azureedge.us/cms-assets/assets/Starlink_12_10_20250428_Deploy_website_DESKTOP_14fe7e072c.mp4",
      title: "Explore Humanity’s Footprints in Space",
      subtitle:
        "Dive into past, ongoing, and upcoming space missions. Discover cosmic phenomena, planetary explorations, and groundbreaking discoveries shaping our understanding of the universe.",
      link: "/space-events",
    },
    {
      image:
        "	https://www.nasa.gov/wp-content/uploads/2025/12/iss073e0819960orig.jpg",
      title: "Earth from Above.",
      subtitle:
        "See how space technology impacts our planet. From climate monitoring to disaster prediction, explore how satellites and space data solve real-world problems.",
      link: "/space-for-earth",
    },
    {
      video: "https://assets.mixkit.co/videos/46119/46119-720.mp4",
      title: "Play, Learn, and Discover",
      subtitle:
        "Turn curiosity into knowledge. Interactive infographics, games, and educational tools make complex space concepts engaging, accessible, and fun for learners of all ages.",
      link: "/games",
    },
  ];

  const [active, setActive] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${active * 100}vw)` }}
      >
        {heroSlides.map((slide, index) => (
          <Link
            key={index}
            to={slide.link} // React Router navigation
            className={styles.slide}
            aria-label={slide.title}
          >
            {slide.video ? (
              <video autoPlay muted loop playsInline className={styles.video}>
                <source src={slide.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={slide.image}
                alt={slide.title}
                className={styles.video}
              />
            )}

            <div className={styles.overlay} />

            <div className={styles.content}>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Herobanner;
