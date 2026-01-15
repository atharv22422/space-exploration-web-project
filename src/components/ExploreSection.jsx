import styles from "./ExploreSection.module.css";
import { Link } from "react-router-dom";

function ExploreSection() {
  const exploreItems = [
    {
      title: "space events",
      img: "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e002082/GSFC_20171208_Archive_e002082~small.jpg",
      link: "/space-events",
    },
    {
      title: "space missions",
      img: "https://www.nasa.gov/wp-content/uploads/2021/11/apollo_1_l-3_months_1_as1-0027-s66-41851-command_module_construction_at_downey_apr_18_1966.jpg?resize=400,319",
      link: "/missions",
    },
    {
      title: "cosmic events",
      img: "https://images-assets.nasa.gov/image/a-hubble-cosmic-couple_20140593234_o/a-hubble-cosmic-couple_20140593234_o~medium.jpg",
      link: "/cosmic-activity",
    },
    {
      title: "games",
      img: "https://science.nasa.gov/wp-content/uploads/2023/07/nasa-kids-science-header-background-large.webp",
      link: "/games",
    },
    {
      title: "infographics",
      img: "https://www.nasa.gov/wp-content/uploads/2023/03/icps_poster_info_black.jpg?w=819",
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
