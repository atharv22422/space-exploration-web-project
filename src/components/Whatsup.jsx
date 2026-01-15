import styles from "./Whatsup.module.css";
import { Link } from "react-router-dom";

export default function Whatsup() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.label}>FEATURED VIDEO</span>
          <h1 className={styles.title}>What's Up?</h1>
          <p className={styles.description}>
            In January, skywatchers can observe Jupiter at its biggest and
            brightest all year. The Moon and stars join the show, making it an
            excellent month for night-sky viewing.
          </p>

          <Link to="/whats-up" className={styles.link}>
            Skywatching Tips
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className={styles.arrow}
            >
              <circle cx="16" cy="16" r="16" className={styles.arrowCircle} />
              <path
                d="M8 16.956h12.604l-3.844 4.106 1.252 1.338L24 16l-5.988-6.4-1.252 1.338 3.844 4.106H8v1.912z"
                className={styles.arrowIcon}
              />
            </svg>
          </Link>
        </div>

        {/* RIGHT VIDEO */}
        <div className={styles.rightbox}>
          <div className={styles.right}>
            <iframe
              src="https://www.youtube.com/embed/j3Ps1YbTjmk"
              title="What's Up: January 2026 Skywatching Tips from NASA"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
