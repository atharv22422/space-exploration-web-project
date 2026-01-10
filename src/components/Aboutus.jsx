import styles from "./Aboutus.module.css";

function Aboutus() {
  const placeholderImg1 =
    "https://images.unsplash.com/photo-1581091215368-6b9e31c9b1b2?auto=format&fit=crop&w=600&q=60";
  const placeholderImg2 =
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=60";
  const placeholderImg3 =
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=60";

  return (
    <>
      <section className={styles.aboutBMC}>
        <div className={styles.section}>
          <div className={styles.text}>
            <h1 className={styles.heading}> Mission of our website</h1>

            <p className={styles.intro}>
              SpaceScope is a centralized, interactive hub for exploring
              space-related information in an educational and engaging way.
              Real-time data, interactive 3D visualizations, and intuitive
              dashboards make complex space phenomena accessible for everyone.
              Real-time data, interactive 3D visualizations, and intuitive
              dashboards make complex space phenomena accessible for everyone.
            </p>
          </div>
          <div className={styles.imageWrapper}>
            <img
              src="https://www.spacex.com/assets/images/mission/mission_feature.webp"
              alt="Mission Overview"
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images-assets.nasa.gov/image/NHQ202512200002/NHQ202512200002~large.jpg?w=1536&h=1283&fit=crop&crop=faces%2Cfocalpoint"
              alt="Mission Overview"
            />
          </div>
          <div className={styles.text}>
            <h1 className={styles.heading}> Mission of our website</h1>

            <p className={styles.intro}>
              SpaceScope is a centralized, interactive hub for exploring
              space-related information in an educational and engaging way.
              Real-time data, interactive 3D visualizations, and intuitive
              dashboards make complex space phenomena accessible for everyone.
              Real-time data, interactive 3D visualizations, and intuitive
              dashboards make complex space phenomena accessible for everyone.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutus;
