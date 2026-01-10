import styles from "./ExploreSection.module.css";

function ExploreSection() {
  return (
    <section className={styles.wrapper}>
      {/* Solar System Exploration */}
      <div className={styles.header}>
        <h2>Solar System Exploration</h2>
        <span className={styles.link}>Discover More ➜</span>
      </div>

      <div className={styles.cards}>
        {[
          {
            title: "Jupiter",
            img: "https://www.nasa.gov/wp-content/uploads/2023/02/15404646465-7920e6d9b7-o.jpg?resize=1536,1022",
          },
          {
            title: "Saturn",
            img: "https://www.nasa.gov/wp-content/uploads/2022/12/51476067951-e10dfb6875-o-1.jpg?resize=1536,1024",
          },
          {
            title: "Earth’s Moon",
            img: "https://science.nasa.gov/wp-content/uploads/2023/09/banner-earthaction-2500x2500-v1.jpg?resize=1536,1536",
          },
          {
            title: "Skywatching",
            img: "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
          },
        ].map((item, i) => (
          <div key={i} className={styles.card}>
            <img src={item.img} alt={item.title} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExploreSection;
