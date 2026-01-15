import React, { useState } from "react";
import styles from "./Imageofday.module.css";
import Lightbox from "./ZoomIn";
import { Link } from "react-router-dom";

const Imageofday = () => {
  // State for lightbox
  const [lightboxImage, setLightboxImage] = useState(null);

  // Open lightbox
  const openLightbox = (src) => setLightboxImage(src);

  // Close lightbox
  const closeLightbox = () => setLightboxImage(null);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.textContent}>
          <span className={styles.today}>Today</span>

          <h2 className={styles.heading}>Image Of The Day</h2>

          <h3 className={styles.title}>
            Best of 2025: Artemis II SLS (Space Launch System) Projected on
            Washington Monument
          </h3>

          <p className={styles.description}>
            Images depicting NASA’s Space Launch System (SLS) rocket are
            projected onto the Washington Monument as part of an event to kick
            off the nation’s 250th birthday year, Wednesday, Dec. 31, 2025, in
            Washington.
          </p>
          <Link to="/image-of-day" className={styles.archiveLink}>
            Browse Image Archive
            <span className={styles.arrowWrapper}>
              <svg
                width="24"
                height="24"
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
            </span>
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className={styles.imageWrapper}>
          <img
            src="https://www.nasa.gov/wp-content/uploads/2026/01/55016654116-5bdeaacd9f-o-1.jpg?resize=400,278"
            alt="Image of the Day"
            onClick={() =>
              openLightbox(
                "https://www.nasa.gov/wp-content/uploads/2026/01/55016654116-5bdeaacd9f-o-1.jpg?resize=400,278"
              )
            }
            style={{ cursor: "pointer" }}
          />

          <a
            href="#"
            className={styles.viewImage}
            onClick={(e) => {
              e.preventDefault();
              openLightbox(
                "https://www.nasa.gov/wp-content/uploads/2026/01/55016654116-5bdeaacd9f-o-1.jpg?resize=400,278"
              );
            }}
          >
            View image <span>●</span>
          </a>
        </div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lightboxImage && (
        <Lightbox src={lightboxImage} alt="Preview" onClose={closeLightbox} />
      )}
    </section>
  );
};

export default Imageofday;
