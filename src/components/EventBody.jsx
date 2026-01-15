import styles from "./EventBody.module.css";
import EventHerobanner from "../components/EventHerobanner";

function EventBody() {
  return (
    <section className={styles.page}>
      {/* ================= TOP INFO ================= */}
      <div className={styles.topInfo}>
        <div className={styles.summary}>
          <p>
            Designed to collect and analyze particles from space and to
            investigate their origin and composition, this mission provides
            insight into the formation and evolution of our solar system.
          </p>
        </div>

        <div className={styles.meta}>
          <div>
            <span>Type</span>
            <strong>Orbiter</strong>
          </div>
          <div>
            <span>Launch Date</span>
            <strong>Aug 28, 1987</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>Operational</strong>
          </div>
        </div>
      </div>

      {/* ================= VISUAL TRACKER ================= */}
      <div className={styles.tracker}>
        <div className={styles.imageSection}>
          <img
            src="https://www.nasa.gov/wp-content/uploads/2026/01/55016654116-5bdeaacd9f-o-1.jpg?resize=400,278"
            alt="ACE Launch"
          />
        </div>
      </div>

      {/* ================= MAIN DETAILS ================= */}
      <div className={styles.details}>
        <h2>ACE</h2>
        <p className={styles.description}>
          Advanced Composition Explorer (ACE) studies energetic particles from
          the Sun, interstellar space, and other cosmic sources. It provides
          real-time space weather data and helps scientists understand solar
          activity and its effects on Earth.
        </p>

        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Advanced Composition Explorer (ACE)</td>
            </tr>
            <tr>
              <td>Operator</td>
              <td>NASA</td>
            </tr>
            <tr>
              <td>Spacecraft Type</td>
              <td>Orbiter</td>
            </tr>
            <tr>
              <td>Launch Vehicle</td>
              <td>Delta II 7920-10</td>
            </tr>
            <tr>
              <td>Launch Site</td>
              <td>Cape Canaveral Space Force Station</td>
            </tr>
            <tr>
              <td>Mission Duration</td>
              <td>Extended</td>
            </tr>
            <tr>
              <td>Orbit</td>
              <td>Sun–Earth L1 Lagrange Point</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= KEY DATES ================= */}
      <div className={styles.keyDates}>
        <h3>Key Dates</h3>
        <ul>
          <li>
            <strong>Aug 28, 1997</strong> — Launch
          </li>
          <li>
            <strong>Jan 21, 1998</strong> — Began operational phase
          </li>
          <li>
            <strong>Present</strong> — Mission ongoing
          </li>
        </ul>
      </div>

      {/* ================= IMAGE ================= */}
      <div className={styles.imageSection}>
        <img
          src="https://www.nasa.gov/wp-content/uploads/2026/01/55016654116-5bdeaacd9f-o-1.jpg?resize=400,278"
          alt="ACE Launch"
        />
      </div>

      {/* ================= IN DEPTH ================= */}
      <div className={styles.inDepth}>
        <h2>In Depth: ACE</h2>

        <p>
          NASA’s Advanced Composition Explorer (ACE) spacecraft was designed to
          study spaceborne energetic particles from the Sun–Earth L1 Lagrange
          point, about 870,000 miles (1.4 million kilometers) from Earth.
        </p>

        <p>
          Specifically, the spacecraft was launched to investigate the matter
          ejected from the Sun to establish the composition and interaction
          between the Sun, Earth, and the Milky Way galaxy.
        </p>

        <p>
          In addition, ACE also provides real-time space weather data and
          advanced warning of geomagnetic storms. ACE’s nine instruments have a
          collecting power that is 10 to 10,000 times greater than anything
          previously flown.
        </p>

        <p>
          After launch, the spacecraft’s Delta II launch vehicle second stage
          reignited after four hours to insert the satellite into a 110 ×
          850,000-mile (177 × 1.37 million-kilometer) orbit.
        </p>

        <p>
          After reaching apogee later that day, ACE inserted itself into its
          Lissajous orbit around the L1 point. The spacecraft was declared
          operational on Jan. 21, 1998.
        </p>

        <p>
          As of 2015, it continued to provide near-real-time 24/7 coverage of
          solar wind parameters and to measure solar energetic particle
          intensities.
        </p>

        <p>
          With the exception of the SEPICA instrument (data from which was no
          longer received after Feb. 4, 2005), all instruments on ACE remain
          operational.
        </p>
      </div>

      {/* ================= ADDITIONAL RESOURCES ================= */}
      <div className={styles.resources}>
        <h3>Additional Resources</h3>
        <ul>
          <li>
            <a href="#">
              ACE Real-Time Solar Wind Data – NOAA Space Weather Prediction
              Center
            </a>
          </li>
          <li>
            <a href="#">
              National Space Science Data Center Master Catalog: ACE
            </a>
          </li>
          <li>
            <a href="#">NASA Science Missions: ACE</a>
          </li>
          <li>
            <a href="#">Caltech ACE Site</a>
          </li>
          <li>
            <a href="#">ACE brochure, 2nd edition</a>
          </li>
        </ul>
      </div>

      {/* ================= KEY SOURCE ================= */}
      <div className={styles.source}>
        <h3>Key Source</h3>
        <p>
          Siddiqi, Asif A.{" "}
          <em>
            Beyond Earth: A Chronicle of Deep Space Exploration, 1958–2016.
          </em>{" "}
          NASA History Program Office, 2018.
        </p>
      </div>
    </section>
  );
}

export default EventBody;
