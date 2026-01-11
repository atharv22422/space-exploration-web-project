import { useEffect, useRef } from "react";
import Globe from "globe.gl";

const EventGlobe = () => {
  const globeRef = useRef();

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .cloudsImageUrl("//unpkg.com/three-globe/example/img/earth-clouds.png")
.cloudsAltitude(0.02)
.cloudsOpacity(0.4)

      .backgroundColor("#f5f7fa")

      .pointOfView({ lat: 20, lng: 0, altitude: 2 });

    // 🔴 Dummy event data (backend will replace this later)
    const dummyEvents = [
      { lat: 28.6, lng: 77.2, size: 0.4, color: "red" },     // India
      { lat: 37.7, lng: -122.4, size: 0.3, color: "orange" }, // USA
      { lat: 51.5, lng: -0.1, size: 0.35, color: "yellow" }  // UK
    ];

    globe
      .pointsData(dummyEvents)
      .pointLat(d => d.lat)
      .pointLng(d => d.lng)
      .pointAltitude(d => d.size)
      .pointColor(d => d.color);

  }, []);

  return (
    <div
      ref={globeRef}
      style={{
        width: "100%",
        height: "100vh",
        background: "black"
      }}
    />
  );
};

export default EventGlobe;
