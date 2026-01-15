import styles from "./EventHerobanner.module.css";
import { useParams } from "react-router-dom";
import { eventData } from "../data/eventData"; // same data as EventBody

const EventHerobanner = () => {
  const { id } = useParams();

  // Find the event/mission/cosmic item based on URL ID
  const data = eventData.find((item) => item.id === id);

  if (!data) return null; // fallback if ID is invalid

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <img
        src={data.image}
        alt={data.title}
        className={styles.backgroundImage}
      />

      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Hero Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.description}>{data.summary}</p>
      </div>
    </section>
  );
};

export default EventHerobanner;
