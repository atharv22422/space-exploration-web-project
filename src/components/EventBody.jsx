import { useParams } from "react-router-dom";
import styles from "./EventBody.module.css";
import { eventData } from "../data/eventData";

function EventBody() {
  const { id } = useParams();

  const event = eventData.find((e) => e.id === id);

  if (!event) {
    return (
      <section className={styles.page}>
        <h2>Event not found</h2>
      </section>
    );
  }

  return (
    <section className={styles.page}>
      {/* TOP INFO */}
      <div className={styles.topInfo}>
        <div className={styles.summary}>
          <p>{event.summary}</p>
        </div>

        <div className={styles.meta}>
          <div>
            <span>Type</span>
            <strong>{event.type}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{event.status}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>{event.date}</strong>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className={styles.heroSection}>
        <img src={event.image} alt={event.title} />
        <div className={styles.heroOverlay} />
      </div>

      {/* DETAILS */}
      <div className={styles.details}>
        <h2>{event.title}</h2>
        <p className={styles.description}>{event.description}</p>

        <table className={styles.table}>
          <tbody>
            {event.table.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* KEY DATES */}
      <div className={styles.keyDates}>
        <h3>Key Dates</h3>
        <ul>
          {event.keyDates.map(([d, l]) => (
            <li key={d}>
              <strong>{d}</strong> — {l}
            </li>
          ))}
        </ul>
      </div>

      {/* IN DEPTH */}
      <div className={styles.inDepth}>
        <h2>In Depth</h2>
        {event.inDepth.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* RESOURCES */}
      <div className={styles.resources}>
        <h3>Additional Resources</h3>
        <ul>
          {event.resources.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </div>

      {/* SOURCE */}
      <div className={styles.source}>
        <h3>Key Source</h3>
        <p>{event.source}</p>
      </div>
    </section>
  );
}

export default EventBody;
