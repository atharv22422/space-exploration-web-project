import { useState, useEffect } from "react";
import styles from "./Notdeveloped.module.css";

function Notdeveloped() {
  const heroSlides = [
    {
      video: "https://assets.mixkit.co/videos/19636/19636-720.mp4",
    },
    {
      video:
        "https://sxcontent9668.azureedge.us/cms-assets/assets/Space_X_Falcon_Heavy_UAS_Landing_DESKTOP_compress_b4568daf9c_5e2026727a.mp4",
    },
    {
      video:
        "https://sxcontent9668.azureedge.us/cms-assets/assets/Starlink_12_10_20250428_Deploy_website_DESKTOP_14fe7e072c.mp4",
    },
  ];

  const [active, setActive] = useState(0);

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
          <div key={index} className={styles.slide}>
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
              <div className={styles.statusRow}>
                <span className={styles.statusDot} />
                <span className={styles.statusLabel}>COMING SOON</span>
              </div>

              <p className={styles.description}>
                This section is currently under active development. Mission
                data, visualizations, and interactive tools will be deployed
                here in an upcoming release.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Notdeveloped;
