import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Inline Minimal Links */}
      <div className={styles.links}>
        <a href="/about">About</a>
        <span className={styles.separator}>•</span>
        <a href="/contact">Contact</a>
        <span className={styles.separator}>•</span>
        <a href="/privacy">Privacy</a>
      </div>

      {/* Copyright Statement */}
      <p className={styles.bottomText}>
        © 2026 SpaceScope. Built for educational & research purposes.
      </p>
    </footer>
  );
}

export default Footer;
