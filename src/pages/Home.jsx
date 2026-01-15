import Aboutus from "../components/Aboutus";
import Footer from "../components/Footer";
import FeaturedNews from "../components/FeaturedNews";
import Navbar from "../components/Navbar";
import styles from "./Home.module.css";
import GamesSos from "../components/GamesCTA";
import ExploreSection from "../components/ExploreSection";
import Imageofday from "../components/Imageofday";
import Whatsup from "../components/Whatsup";
import InfograCTA from "../components/InfograCTA";
import Herobanner from "../components/Herobanner";

function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Herobanner />
      <Aboutus />
      <Whatsup />
      <FeaturedNews />
      <GamesSos />
      <ExploreSection />
      <InfograCTA />
      <Imageofday />
      <Footer />
    </div>
  );
}

export default Home;
