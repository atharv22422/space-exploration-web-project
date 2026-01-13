import styles from "./lightbox.module.css";

function Lightbox({ src, alt, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.close} onClick={onClose}>
        ✕
      </button>

      <img
        src={src}
        alt={alt}
        className={styles.image}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default Lightbox;
