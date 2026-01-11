import React, { useRef, useEffect } from "react";
import Globe from "react-globe.gl";

function Events() {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        color: "#111",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Space Events</h1>
      <p>This globe will show event visibility.</p>

      <div style={{ height: "500px" }}>
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="#f5f7fa"
        />
      </div>
    </div>
  );
}

export default Events;
