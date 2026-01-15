import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SunCalc from "suncalc";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateSunHeatmap } from "../../utils/generateSunHeatmap";

/* =========================
   LEGEND ROW
========================= */
function LegendRow({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
      <div
        style={{
          width: 14,
          height: 14,
          background: color,
          borderRadius: 3,
          marginRight: 8
        }}
      />
      <span>{label}</span>
    </div>
  );
}

export default function GlobeShader() {
  /* =========================
     REFS (STABLE OBJECTS)
  ========================= */
  const mountRef = useRef(null);
  const tooltipRef = useRef(null);

  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const earthRef = useRef(null);
  const eclipsePathRef = useRef(null);
  const eclipseMarkerRef = useRef(null);
const eclipseAnimRef = useRef({
  index: 0,
  progress: 0
});




  const heatTextureRef = useRef(null);
  const heatMaterialRef = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  /* =========================
     STATE
  ========================= */
  const [hour, setHour] = useState(new Date().getHours());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 10));
  const [mode, setMode] = useState("SUN"); // SUN | ECLIPSE
  const [eclipses, setEclipses] = useState([]);
  const [selectedEclipse, setSelectedEclipse] = useState(null);
  const userMarkerRef = useRef(null);
const [userImpact, setUserImpact] = useState(null);
const [eclipseRegion, setEclipseRegion] = useState(null);



  
  /* =========================
   STATE REFS (SAFE)
========================= */
const modeRef = useRef("SUN");
const selectedEclipseRef = useRef(null);

useEffect(() => {
  modeRef.current = mode;
}, [mode]);

useEffect(() => {
  selectedEclipseRef.current = selectedEclipse;
}, [selectedEclipse]);


  /* =========================
     CONSTANTS (Mumbai)
  ========================= */
  const CENTER_LAT = 19.1579;
  const CENTER_LNG = 72.9405;
  // USER LOCATION (used for eclipse intensity calculation)
const USER_LAT = 19.1579;
const USER_LNG = 72.9405;

function latLngToVector3(lat, lng, radius = 1.01) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}
function drawEclipsePath(eclipse) {
  if (!sceneRef.current || !eclipse?.path) return;

  // Remove old path if exists
  if (eclipsePathRef.current) {
    sceneRef.current.remove(eclipsePathRef.current);
    eclipsePathRef.current.geometry.dispose();
    eclipsePathRef.current.material.dispose();
    eclipsePathRef.current = null;
  }

  const points = eclipse.path.map(p =>
    latLngToVector3(p.lat, p.lng)
  );

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color: 0xff5555,
    linewidth: 2
  });

  const line = new THREE.Line(geometry, material);

  eclipsePathRef.current = line;
  sceneRef.current.add(line);
}



  /* =========================
     INIT THREE.JS (RUNS ONCE)
  ========================= */
  useEffect(() => {
    if (rendererRef.current) return;

    // Clear mount (safety)
    mountRef.current.innerHTML = "";

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 3, 5);
    scene.add(dir);

   const earthTexture = new THREE.TextureLoader().load(
  "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg",
  () => console.log("🌍 Earth texture loaded")
);

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 128),
      new THREE.MeshStandardMaterial({ map: earthTexture })
    );
    earthRef.current = earth;
    scene.add(earth);
    const userMarker = new THREE.Mesh(
  new THREE.SphereGeometry(0.02, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ffff }) // cyan
);
userMarker.visible = false;

userMarkerRef.current = userMarker;
scene.add(userMarker);

    // 🌘 Moving eclipse marker
const markerGeo = new THREE.SphereGeometry(0.018, 16, 16);
const markerMat = new THREE.MeshBasicMaterial({ color: 0xffaaaa });

const eclipseMarker = new THREE.Mesh(markerGeo, markerMat);
eclipseMarker.visible = false;

eclipseMarkerRef.current = eclipseMarker;
scene.add(eclipseMarker);


    /* ===== INITIAL HEATMAP ===== */
    const date = new Date(
      `${dateStr}T${hour.toString().padStart(2, "0")}:00:00+05:30`
    );

    const { data, size } = generateSunHeatmap({
      centerLat: CENTER_LAT,
      centerLng: CENTER_LNG,
      date
    });

    const heatTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat
    );
    heatTexture.needsUpdate = true;
    heatTextureRef.current = heatTexture;

    const heatMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        heatmap: { value: heatTexture },
        eclipseMode: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D heatmap;
  uniform int eclipseMode;

  const vec2 CENTER_UV = vec2(
    (72.9405 + 180.0) / 360.0,
    (19.1579 + 90.0) / 180.0
  );

  // 🔧 Controls Mumbai region size
  const float RADIUS = 0.08;

  vec3 sunColor(float v) {
    if (v < 0.2) return vec3(0.05,0.15,0.7);
    if (v < 0.4) return vec3(0.1,0.7,0.6);
    if (v < 0.6) return vec3(0.2,0.9,0.2);
    if (v < 0.8) return vec3(1.0,0.9,0.1);
    return vec3(1.0,0.3,0.1);
  }

  void main() {
    // 🌍 Distance from Mumbai (UV space)
    float d = distance(vUv, CENTER_UV);

    // ✅ Soft mask instead of discard
    float mask = 1.0 - smoothstep(RADIUS * 0.7, RADIUS, d);

    if (mask <= 0.001) discard;

    // 🔄 Map to local heatmap UV
    vec2 uv = (vUv - CENTER_UV) / RADIUS * 0.5 + 0.5;
    vec4 tex = texture2D(heatmap, clamp(uv, 0.0, 1.0));

    if (tex.a < 0.05) discard;

    float v = tex.r;

    if (eclipseMode == 0) {
      gl_FragColor = vec4(sunColor(v), 0.35 * mask);
    } else {
      float shadow = smoothstep(0.2, 0.8, v);
      gl_FragColor = vec4(vec3(0.05), shadow * 0.45 * mask);
    }
  }
`

    });

    heatMaterialRef.current = heatMaterial;

    const heatSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 128, 128),
      heatMaterial
    );
    scene.add(heatSphere);

    /* ===== TOOLTIP ===== */
    renderer.domElement.addEventListener("mousemove", e => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const hits = raycaster.current.intersectObject(earth);

      if (hits.length) {
     const p = hits[0].point.clone().normalize();

        const lat = Math.asin(p.y) * (180 / Math.PI);
        const lng = Math.atan2(p.x, p.z) * (180 / Math.PI);

        const d = new Date(
          `${dateStr}T${hour.toString().padStart(2, "0")}:00:00+05:30`
        );
        const alt =
          SunCalc.getPosition(d, lat, lng).altitude * (180 / Math.PI);

        tooltipRef.current.style.display = "block";
        tooltipRef.current.style.left = e.clientX + 12 + "px";
        tooltipRef.current.style.top = e.clientY + 12 + "px";
        tooltipRef.current.innerHTML = `Sun altitude: <b>${alt.toFixed(
          1
        )}°</b>`;
      } else {
        tooltipRef.current.style.display = "none";
      }
    });
   renderer.domElement.addEventListener("click", e => {

  // ✅ Only allow clicking in ECLIPSE mode
  if (modeRef.current !== "ECLIPSE") return;

  mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.current.setFromCamera(mouse.current, camera);
  const hits = raycaster.current.intersectObject(earthRef.current);

  if (!hits.length) return;

  const p = hits[0].point.normalize();

  // 📍 Place user marker
  userMarkerRef.current.position
    .copy(p.clone().multiplyScalar(1.02));
  userMarkerRef.current.visible = true;

  // 🌍 Convert to lat/lng
  const lat = Math.asin(p.y) * (180 / Math.PI);
  const lng = Math.atan2(p.z, p.x) * (180 / Math.PI) - 180;

  // 🌘 Compute eclipse impact
  if (selectedEclipseRef.current) {
    const impact = computeImpactFromPoint(
      lat,
      lng,
      selectedEclipseRef.current
    );
    setUserImpact(impact);
  }
});


    const animate = () => {
  requestAnimationFrame(animate);

  // 🌘 Eclipse animation
  if (
  modeRef.current === "ECLIPSE" &&
  selectedEclipseRef.current &&
  eclipseMarkerRef.current
) {
const path = selectedEclipseRef.current.path;
    const anim = eclipseAnimRef.current;

    const p1 = path[anim.index];
    const p2 = path[anim.index + 1];

    if (p1 && p2) {
      anim.progress += 0.01; // speed

      if (anim.progress >= 1) {
        anim.progress = 0;
        anim.index = (anim.index + 1) % (path.length - 1);
      }

      const v1 = latLngToVector3(p1.lat, p1.lng, 1.02);
      const v2 = latLngToVector3(p2.lat, p2.lng, 1.02);

      const pos = v1.clone().lerp(v2, anim.progress);
      eclipseMarkerRef.current.position.copy(pos);
    }
  }

  controls.update();
  renderer.render(scene, camera);
};

    animate();

    return () => {
      renderer.dispose();
      renderer.domElement.remove();
      rendererRef.current = null;
    };
  }, []);

  /* =========================
     UPDATE HEATMAP
  ========================= */
  useEffect(() => {
    if (!heatTextureRef.current) return;

    const date = new Date(
      `${dateStr}T${hour.toString().padStart(2, "0")}:00:00+05:30`
    );

    const { data } = generateSunHeatmap({
      centerLat: CENTER_LAT,
      centerLng: CENTER_LNG,
      date
    });
heatTextureRef.current.dispose();

heatTextureRef.current = new THREE.DataTexture(
  data,
  heatTextureRef.current.image.width,
  heatTextureRef.current.image.height,
  THREE.RGBAFormat
);
heatTextureRef.current.needsUpdate = true;

heatMaterialRef.current.uniforms.heatmap.value =
  heatTextureRef.current;


    heatMaterialRef.current.uniforms.eclipseMode.value =
      mode === "ECLIPSE" ? 1 : 0;
  }, [hour, dateStr, mode]);

  /* =========================
     FETCH ECLIPSE DATA
  ========================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/eclipses")
      .then(res => res.json())
      .then(data => setEclipses(data))
      .catch(console.error);
  }, []);
  // 🌍 Convert lat/lng to human-readable region
function getRegionFromLatLng(lat, lng) {
  if (lat > 50 && lng < -20) return "Greenland / Arctic region";
  if (lat > 15 && lng < -30) return "North America";
  if (lat > 35 && lng > -10 && lng < 40) return "Europe";
  if (lat > -35 && lat < 35 && lng > -20 && lng < 50) return "Africa";
  if (lng > 60 && lng < 150) return "Asia";
  if (lng > -90 && lng < -30 && lat < 15) return "South America";
  if (lat < -40) return "Southern Ocean / Antarctica";

  return "Open ocean region";
}
function formatToIST(utcString) {
  if (!utcString) return "—";

  const date = new Date(utcString);

  return date.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function canISeeFromMyCity(visibility) {
  if (visibility >= 70) {
    return {
      text: "Yes, clearly visible from your city",
      color: "#4caf50", // green
      emoji: "✅"
    };
  }

  if (visibility >= 40) {
    return {
      text: "Partially visible from your city",
      color: "#ff9800", // orange
      emoji: "⚠️"
    };
  }

  if (visibility >= 10) {
    return {
      text: "Barely visible (very subtle)",
      color: "#ffd54f", // yellow
      emoji: "👀"
    };
  }

  return {
    text: "Not visible from your city",
    color: "#f44336", // red
    emoji: "❌"
  };
}


  function getVisibilityText(v) {
  if (v >= 90) return "Near-total eclipse visible";
  if (v >= 60) return "Strong partial eclipse";
  if (v >= 30) return "Mild partial eclipse";
  return "Eclipse barely noticeable";
}
  function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(a));
}
function computeImpactFromPoint(lat, lng, eclipse) {
  let closest = null;
  let minDist = Infinity;

  eclipse.path.forEach(p => {
    const d = distanceKm(lat, lng, p.lat, p.lng);
    if (d < minDist) {
      minDist = d;
      closest = p;
    }
  });

  if (!closest) return null;

  const level =
    closest.umbra >= 0.9 ? "Total / Near Total" :
    closest.umbra >= 0.6 ? "Strong Partial" :
    closest.umbra >= 0.3 ? "Weak Partial" :
    "Not Visible";

  return {
  lat: lat.toFixed(2),
  lng: lng.toFixed(2),
  distanceKm: Math.round(minDist),
  umbra: closest.umbra,
  level,
  visibility: Math.round(closest.umbra * 100) // ✅ ADD THIS
};

}


function computeLocalEclipseIntensity(eclipse) {
  if (!eclipse?.path) return null;

  let closest = null;
  let minDist = Infinity;

  eclipse.path.forEach(p => {
    const d = distanceKm(USER_LAT, USER_LNG, p.lat, p.lng);
    if (d < minDist) {
      minDist = d;
      closest = p;
    }
  });

  if (!closest) return null;

  const level =
    closest.umbra >= 0.9 ? "Total / Near Total" :
    closest.umbra >= 0.6 ? "Strong Partial" :
    closest.umbra >= 0.3 ? "Weak Partial" :
    "Not Visible";

  const message =
    closest.umbra >= 0.9
      ? "Sun almost completely covered."
      : closest.umbra >= 0.6
      ? "Large portion of Sun covered."
      : closest.umbra >= 0.3
      ? "Small portion of Sun covered."
      : "Eclipse not noticeable.";

  return {
  distanceKm: Math.round(minDist),
  umbra: closest.umbra,
  level,
  message,
  visibility: Math.round(closest.umbra * 100) // ✅ ADD
};

}

function getEclipsePathRegion(eclipse) {
  if (!eclipse?.path || eclipse.path.length === 0) return null;

  // Average path location
  const avg = eclipse.path.reduce(
    (acc, p) => {
      acc.lat += p.lat;
      acc.lng += p.lng;
      return acc;
    },
    { lat: 0, lng: 0 }
  );

  avg.lat /= eclipse.path.length;
  avg.lng /= eclipse.path.length;

  return getRegionFromLatLng(avg.lat, avg.lng);
}

function handleSelectEclipse(e) {
  setSelectedEclipse(e);
  setMode("ECLIPSE");
  setDateStr(e.date);

  if (e.maxTimeUTC) {
    const utcHour = new Date(e.maxTimeUTC).getUTCHours();
    setHour((utcHour + 5) % 24);
  }

  // Draw red eclipse path
  drawEclipsePath(e);

  // 🔁 RESET ECLIPSE ANIMATION
  eclipseAnimRef.current.index = 0;
  eclipseAnimRef.current.progress = 0;

  // 👁️ SHOW MOVING ECLIPSE MARKER
  if (eclipseMarkerRef.current) {
    eclipseMarkerRef.current.visible = true;
  }

  // Local impact (already working)
  const impact = computeLocalEclipseIntensity(e);
  console.log("📍 Local Eclipse Impact:", impact);
  const region = getEclipsePathRegion(e);
setEclipseRegion(region);

}

  /* =========================
     JSX
  ========================= */
  return (
    <>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />

      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          display: "none",
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "6px 8px",
          borderRadius: 4,
          fontSize: 12
        }}
      />

      {/* MODE TOGGLE */}
      <div style={{ position: "fixed", top: 20, right: 20 }}>
        {["SUN", "ECLIPSE"].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              margin: 4,
              padding: "6px 12px",
              background: mode === m ? "#fff" : "#222",
              color: mode === m ? "#000" : "#fff",
              borderRadius: 6
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* TIME + DATE */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.75)",
          padding: 12,
          borderRadius: 10,
          color: "#fff"
        }}
      >
        <div><b>IST</b> {hour}:00</div>
        <input
          type="range"
          min="0"
          max="23"
          value={hour}
          onChange={e => setHour(+e.target.value)}
          style={{ width: 260 }}
        />
        <input
          type="date"
          value={dateStr}
          onChange={e => setDateStr(e.target.value)}
          style={{ marginTop: 6, width: "100%" }}
        />
      </div>

      {/* ECLIPSE TIMELINE */}
      {mode === "ECLIPSE" && (
        <div
          style={{
            position: "fixed",
            top: 90,
            right: 20,
            width: 260,
            background: "rgba(0,0,0,0.75)",
            padding: 12,
            borderRadius: 10,
            color: "#fff"
          }}
        >
          <strong>Eclipse Events</strong>
          {eclipses.map(e => (
            <div
              key={e.id}
              onClick={() => handleSelectEclipse(e)}
              style={{
                marginTop: 8,
                padding: 8,
                cursor: "pointer",
                borderRadius: 6,
                background:
                  selectedEclipse?.id === e.id
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(255,255,255,0.05)"
              }}
            >
              <div style={{ fontWeight: "bold" }}>{e.name}</div>
              <div style={{ fontSize: 11 }}>{e.date}</div>
            </div>
          ))}
        </div>
      )}
      {mode === "ECLIPSE" && selectedEclipse && (
  <div
    style={{
      position: "fixed",
      top: 340,
      right: 20,
      width: 260,
      background: "rgba(0,0,0,0.75)",
      padding: 12,
      borderRadius: 10,
      color: "#fff",
      fontSize: 13
    }}
  >
    <strong>Your Location Impact</strong>

    {(() => {
      const r = computeLocalEclipseIntensity(selectedEclipse);
      if (!r) return <div>No data</div>;

      return (
        <>
          <div style={{ marginTop: 6 }}>
            🌘 <b>{r.level}</b>
          </div>

          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 6 }}>
            {r.message}
          </div>

          <hr style={{ opacity: 0.2, margin: "8px 0" }} />

          <div style={{ fontSize: 12 }}>
            📍 Distance from path: {r.distanceKm} km
          </div>
          <div style={{ fontSize: 12 }}>
            🌑 Eclipse strength (umbra): {r.umbra}
          </div>
          {eclipseRegion && (
  <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 6 }}>
    🌍 Eclipse path over: <b>{eclipseRegion}</b>
  </div>
)}

        </>
      );
    })()}
  </div>
)}


      {/* LEGEND */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          background: "rgba(0,0,0,0.75)",
          padding: 12,
          borderRadius: 8,
          color: "#fff"
        }}
      >
        <strong>{mode} MODE</strong>
        
        {mode === "SUN" ? (
          <>
            <LegendRow color="#0d2ca6" label="Low Sun" />
            <LegendRow color="#33e833" label="Medium Sun" />
            <LegendRow color="#ffe600" label="High Sun" />
            <LegendRow color="#ff4d1a" label="Very High Sun" />
          </>
        ) : (
         <>
    <LegendRow color="#ff5555" label="Eclipse Path (Maximum)" />
    <LegendRow color="#000000" label="Very High Eclipse" />
    <LegendRow color="#222222" label="Strong Partial Eclipse" />
    <LegendRow color="#444444" label="Weak Partial Eclipse" />
    <LegendRow color="#666666" label="Not Visible" />
  </>
        )}
       {mode === "ECLIPSE" && userImpact && (
        
  <div
    style={{
      marginTop: 12,
      fontSize: 13,
      lineHeight: 1.5
    }}
  >
    <hr style={{ opacity: 0.25 }} />

    {/* TITLE */}
    <div style={{ fontWeight: "bold", marginBottom: 6 }}>
      🌘 Eclipse Visibility (Mumbai)
    </div>

    {/* VISIBILITY BAR */}
    <div
      style={{
        background: "#222",
        borderRadius: 6,
        overflow: "hidden",
        height: 10,
        marginBottom: 6
      }}
    >
      <div
        style={{
          width: `${userImpact.visibility}%`,
          height: "100%",
          background:
            userImpact.visibility > 80
              ? "#ff3b3b"
              : userImpact.visibility > 50
              ? "#ff9933"
              : "#ffd633"
        }}
      />
    </div>

    {/* VISIBILITY % */}
    <div style={{ fontSize: 14 }}>
      <b>{userImpact.visibility}%</b> of the Sun covered
    </div>

    {/* HUMAN EXPLANATION */}
    <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>
      {userImpact.visibility > 80
        ? "Near-total eclipse visible"
        : userImpact.visibility > 50
        ? "Strong partial eclipse"
        : userImpact.visibility > 20
        ? "Mild partial eclipse"
        : "Eclipse barely noticeable"}
    </div>

    <hr style={{ opacity: 0.2, margin: "8px 0" }} />

    {/* DISTANCE */}
    <div style={{ fontSize: 12 }}>
      📍 Distance from eclipse path:
      <br />
      <b>{userImpact.distanceKm} km</b>
    </div>

    {/* TECH DATA (OPTIONAL, SMALL) */}
    <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>
      Umbra factor: {userImpact.umbra}
    </div>
    <div style={{ fontSize: 12, marginTop: 6, opacity: 0.9 }}>
  🕒 <b>Maximum Eclipse (IST)</b>
  <br />
  {formatToIST(selectedEclipse.maxTimeUTC)}
</div>

  </div>
)}


      </div>
    </>
  );
}