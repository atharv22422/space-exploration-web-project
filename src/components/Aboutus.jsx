import { useState } from "react";
import { Link } from "react-router-dom";

import Lightbox from "../components/Lightbox";
import styles from "./Aboutus.module.css";

function Aboutus() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (src) => setLightboxImage(src);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <section className={styles.aboutBMC}>
      {/* ===== ABOUT HEADER SECTION ===== */}
      <header className={styles.aboutHeader}>
        <Link to="/about-us" className={styles.aboutusLink}>
          <div className={styles.aboutus}>
            About Us
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={styles.arrow}
            >
              <circle cx="20" cy="20" r="18" className={styles.arrowCircle} />
              <g transform="scale(1.2)">
                <path
                  d="M8 16.956h12.604l-3.844 4.106 1.252 1.338L24 16l-5.988-6.4-1.252 1.338 3.844 4.106H8v1.912z"
                  className={styles.arrowIcon}
                />
              </g>
            </svg>
          </div>
        </Link>
      </header>

      {/* ===== SECTION 1 : INTRO / MISSION ===== */}
      <div className={styles.section}>
        <div className={styles.text}>
          <h1 className={styles.heading}>Connecting Curiosity to the Cosmos</h1>

          <p className={styles.intro}>
            At SpaceScope, our mission is to make space exploration accessible,
            engaging, and meaningful. We transform complex astronomical data
            into intuitive experiences that inspire curiosity, learning, and
            discovery across all ages.
          </p>

          <ul className={styles.list}>
            <li>Real-time space events and live mission data</li>
            <li>Interactive 3D visualizations and heat maps</li>
            <li>Educational tools and gamified learning</li>
            <li>A growing global space-learning community</li>
          </ul>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src="https://www.spacex.com/assets/images/mission/mission_feature.webp"
            alt="Mission Overview"
            onClick={() =>
              openLightbox(
                "https://www.spacex.com/assets/images/mission/mission_feature.webp"
              )
            }
          />
        </div>
      </div>

      {/* ===== SECTION 2 : VISION ===== */}
      <div className={styles.section}>
        <div className={styles.imageWrapper}>
          <img
            src="https://images-assets.nasa.gov/image/NHQ202512200002/NHQ202512200002~large.jpg"
            alt="Vision of Discovery"
            onClick={() =>
              openLightbox(
                "https://images-assets.nasa.gov/image/NHQ202512200002/NHQ202512200002~large.jpg"
              )
            }
          />
        </div>

        <div className={styles.text}>
          <h1 className={styles.heading}>Lighting the Path to Discovery</h1>

          <p className={styles.intro}>
            We envision a world where space is no longer distant or abstract,
            but a shared source of inspiration and understanding. SpaceScope
            aims to become the central hub for astronomical discovery—accessible
            anywhere, anytime.
          </p>

          <ul className={styles.list}>
            <li>Bridge education and real-world space science</li>
            <li>Empower institutions and learners globally</li>
            <li>Encourage curiosity-driven exploration</li>
            <li>Build the future of space education</li>
          </ul>
        </div>
      </div>

      {/* ===== SECTION 3 : MANIFESTO ===== */}
      <section className={styles.aboutSection}>
        <p className={styles.aboutText}>
          Space is not distant—it is constantly in motion around us.
          <strong>
            At SpaceScope, we simplify the vastness of the universe into
            experiences that inform, inspire, and educate.
          </strong>
          By combining real-time space data, immersive visualizations, and
          thoughtful learning tools, we make complex cosmic phenomena accessible
          to everyone.
          <strong>
            Our goal is to connect curiosity with understanding and bring the
            universe closer to those who seek to explore it.
          </strong>
        </p>
      </section>

      {/* ===== LIGHTBOX ===== */}
      {lightboxImage && (
        <Lightbox src={lightboxImage} alt="Preview" onClose={closeLightbox} />
      )}
    </section>
  );
}

export default Aboutus;
