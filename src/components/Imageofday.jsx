import React, { useState } from "react";
import styles from "./Imageofday.module.css";
import Lightbox from "../components/Lightbox";
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

          <h2 className={styles.heading}>Through the Lens of Space</h2>

          <h3 className={styles.title}>
            NASA’s Pandora Small Satellite Launched
          </h3>

          <p className={styles.description}>
            In this photo from early January 2026, teams prepare to encapsulate
            NASA’s Pandora small satellite, NASA-sponsored Star-Planet Activity
            Research CubeSat (SPARCS), and the Black Hole Coded Aperture
            Telescope (BlackCAT) CubeSat, inside a SpaceX Falcon 9 payload
            fairing. A SpaceX Falcon 9 rocket carrying NASA’s Pandora small
            satellite lifted off at 5:44 a.m. PST Sunday, Jan. 11, from Space
            Launch Complex 4 East at Vandenberg Space Force Base located on
            California’s central coast. During its initial year, Pandora will
            provide an in-depth study of at least 20 known planets orbiting
            distant stars to determine the composition of their atmospheres —
            especially the presence of hazes, clouds, and water.
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
            src="https://www.nasa.gov/wp-content/uploads/2026/01/ksc-20260111-ph-spx01-0001orig.jpg"
            alt="Image of the Day"
            onClick={() =>
              openLightbox(
                "https://www.nasa.gov/wp-content/uploads/2026/01/ksc-20260111-ph-spx01-0001orig.jpg"
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
                "https://www.nasa.gov/wp-content/uploads/2026/01/ksc-20260111-ph-spx01-0001orig.jpg"
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
