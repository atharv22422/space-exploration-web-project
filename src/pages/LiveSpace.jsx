import Dashboard from "../components/DashBoard";
import Footer from "../components/Footer";
import Herobanner from "../components/Herobanner";
import styles from "./LiveSpace.module.css";
import LiveNavbar from "../components/LiveNavbar";

function LiveSpace() {
  return (
    <>
      <div className={styles.page}>
        <LiveNavbar />
        <Dashboard />
        <Footer />
      </div>
    </>
  );
}

export default LiveSpace;
