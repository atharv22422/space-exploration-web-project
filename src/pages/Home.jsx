import Aboutus from "../components/Aboutus";
import Footer from "../components/Footer";
import FeaturedNews from "../components/FeaturedNews";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import ExploreSection from "../components/ExploreSection";
import Imageofday from "../components/Imageofday";
import Whatsup from "../components/Whatsup";
import Learnmore from "../components/Learnmore";

function Home() {
  const heroSlides = [
    {
      video:
        "https://sxcontent9668.azureedge.us/cms-assets/assets/Mars_Rotation_Web_HB_d96299f9de.mp4",
      title: "Explore Space.",
      subtitle: "See Mars in real time.",
    },
    {
      video:
        "https://sxcontent9668.azureedge.us/cms-assets/assets/Space_X_Falcon_Heavy_UAS_Landing_DESKTOP_compress_b4568daf9c_5e2026727a.mp4",
      title: "Track Space Events.",
      subtitle: "Stay updated with cosmic happenings.",
    },
    {
      video:
        "https://sxcontent9668.azureedge.us/cms-assets/assets/Starlink_12_10_20250428_Deploy_website_DESKTOP_14fe7e072c.mp4",
      title: "Track Space Events.",
      subtitle: "Stay updated with cosmic happenings.",
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
    <div className={styles.home}>
      <Navbar />

      <section className={styles.hero}>
        <div
          className={styles.slider}
          style={{ transform: `translateX(-${active * 100}vw)` }}
        >
          {heroSlides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              <video autoPlay muted loop playsInline className={styles.video}>
                <source src={slide.video} type="video/mp4" />
              </video>

              <div className={styles.overlay} />

              <div className={styles.content}>
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Aboutus />
      <Whatsup />
      <FeaturedNews />
      <Learnmore />
      <ExploreSection />
      <Learnmore />
      <Imageofday />

      <Footer />
    </div>
  );
}

export default Home;
