import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LiveSpace from "./pages/LiveSpace";
import CosmicActivity from "./pages/CosmicActivity";
import SpaceEvents from "./pages/SpaceEvents";
import Games from "./pages/Games";
import InfoGraphics from "./pages/InfoGraphics";
import SpaceForEarth from "./pages/SpaceForEarth";
import SpaceMissions from "./pages/SpaceMissions";
import AboutUs from "./pages/AboutUs";
import WhatsUp from "./pages/WhatsUp";
import ExploreTab from "./pages/ExploreTab";
import LearnMoreSection from "./pages/LearnMoreSection";
import FeaturedNews from "./pages/FeaturedNews";
import FeatureBlogs from "./pages/FeatureBlogs";
import ImageOfTheDay from "./pages/ImageOfTheDay";
import JoinPage from "./pages/JoinPage";
import Event from "./pages/Event";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-space" element={<LiveSpace />} />
        <Route path="/space-events" element={<SpaceEvents />} />
        <Route path="/missions" element={<SpaceMissions />} />
        <Route path="/cosmic-activity" element={<CosmicActivity />} />
        <Route path="/space-for-earth" element={<SpaceForEarth />} />
        <Route path="/infographics" element={<InfoGraphics />} />
        <Route path="/games" element={<Games />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/whats-up" element={<WhatsUp />} />
        <Route path="/explore-tab" element={<ExploreTab />} />
        <Route path="/learn-more" element={<LearnMoreSection />} />
        <Route path="/feature-news" element={<FeaturedNews />} />
        <Route path="/feature-blogs" element={<FeatureBlogs />} />
        <Route path="/image-of-day" element={<ImageOfTheDay />} />
        <Route path="/join-page" element={<JoinPage />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/missions/:id" element={<Event />} />
        <Route path="/cosmic-activity/:id" element={<Event />} />
      </Routes>
    </Router>
  );
}

export default App;
