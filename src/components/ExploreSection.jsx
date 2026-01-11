import styles from "./ExploreSection.module.css";
import { Link } from "react-router-dom";

function ExploreSection() {
  const exploreItems = [
    {
      title: "space events",
      img: "https://www.nasa.gov/wp-content/uploads/2023/02/15404646465-7920e6d9b7-o.jpg?resize=1536,1022",
      link: "/space-events",
    },
    {
      title: "space missions",
      img: "https://www.nasa.gov/wp-content/uploads/2022/12/51476067951-e10dfb6875-o-1.jpg?resize=1536,1024",
      link: "/space-missions",
    },
    {
      title: "cosmic events",
      img: "https://science.nasa.gov/wp-content/uploads/2023/09/banner-earthaction-2500x2500-v1.jpg?resize=1536,1536",
      link: "/cosmic-activity",
    },
    {
      title: "games",
      img: "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
      link: "/games",
    },
    {
      title: "infographics",
      img: "https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2023/06/s/solar-system-illustration-16x9-1.jpg?w=1536&h=864&fit=crop&crop=faces%2Cfocalpoint",
      link: "/infographics",
    },
  ];

  return (
    <section className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Explore Our Universe</h2>
        <Link to="/explore-tab" className={styles.link}>
          <span>Discover More ➜</span>
        </Link>
      </div>

      {/* CARDS */}
      <div className={styles.cards}>
        {exploreItems.map((item, i) => (
          <Link
            key={i}
            to={item.link}
            className={styles.card}
            aria-label={`Explore ${item.title}`}
          >
            <img src={item.img} alt={item.title} />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ExploreSection;
