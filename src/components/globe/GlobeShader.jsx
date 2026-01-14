import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
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
  const mountRef = useRef();
  const heatTextureRef = useRef();
  const heatMaterialRef = useRef();

  /* =========================
     STATE
  ========================= */
  const [hour, setHour] = useState(12); // Noon default
  const [mode, setMode] = useState("ALTITUDE");

  /* =========================
     CONSTANTS
  ========================= */
  const CENTER_LAT = 19.1579;
  const CENTER_LNG = 72.9405;
  const REGION_RADIUS_DEG = 30;

  /* =========================
     INIT SCENE (ONCE)
  ========================= */
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 3, 5);
    scene.add(dir);

    const earthTexture = new THREE.TextureLoader().load(
      "https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
    );

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 128),
      new THREE.MeshStandardMaterial({ map: earthTexture })
    );
    scene.add(earth);

    /* =========================
       HEATMAP TEXTURE (ONCE)
    ========================= */
    const { data, size } = generateSunHeatmap({
      centerLat: CENTER_LAT,
      centerLng: CENTER_LNG,
      date: new Date()
    });

    heatTextureRef.current = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat
    );
    heatTextureRef.current.needsUpdate = true;

    /* =========================
       HEATMAP MATERIAL
    ========================= */
    heatMaterialRef.current = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        heatmap: { value: heatTextureRef.current },
        mode: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D heatmap;
        uniform int mode;

        const vec2 CENTER_UV = vec2(
          (72.9405 + 180.0) / 360.0,
          (19.1579 + 90.0) / 180.0
        );

        const float RADIUS = 0.08;

        vec3 altitudeColor(float v) {
          if (v < 0.2) return vec3(0.05,0.15,0.7);
          if (v < 0.4) return vec3(0.1,0.7,0.6);
          if (v < 0.6) return vec3(0.2,0.9,0.2);
          if (v < 0.8) return vec3(1.0,0.9,0.1); // YELLOW (FIXED)
          return vec3(1.0,0.3,0.1);
        }

        void main() {
          float d = distance(vUv, CENTER_UV);
          if (d > RADIUS) discard;

          vec2 localUV = (vUv - CENTER_UV) / RADIUS * 0.5 + 0.5;
          vec4 tex = texture2D(heatmap, clamp(localUV,0.0,1.0));
          if (tex.a < 0.05) discard;

          float v = tex.r;

          if (mode == 1 && (v < 0.6 || v > 0.8)) discard; // Golden
          if (mode == 2 && (v < 0.35 || v > 0.6)) discard; // Twilight
          if (mode == 3 && v > 0.35) discard;              // Night

          vec3 color =
            mode == 0 ? altitudeColor(v) :
            mode == 1 ? vec3(1.0,0.75,0.3) :
            mode == 2 ? vec3(0.3,0.6,0.9) :
                        vec3(0.05,0.08,0.2);

          gl_FragColor = vec4(color, 0.35);
        }
      `
    });

    const heatSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.01, 128, 128),
      heatMaterialRef.current
    );
    scene.add(heatSphere);

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  /* =========================
     UPDATE HEATMAP (FAST)
  ========================= */
  useEffect(() => {
    if (!heatTextureRef.current) return;

    const date = new Date();
    date.setHours(hour, 0, 0, 0);

    const { data } = generateSunHeatmap({
      centerLat: CENTER_LAT,
      centerLng: CENTER_LNG,
      date
    });

    heatTextureRef.current.image.data.set(data);
    heatTextureRef.current.needsUpdate = true;
  }, [hour]);

  useEffect(() => {
    if (!heatMaterialRef.current) return;

    heatMaterialRef.current.uniforms.mode.value =
      mode === "ALTITUDE" ? 0 :
      mode === "GOLDEN" ? 1 :
      mode === "TWILIGHT" ? 2 : 3;
  }, [mode]);

  /* =========================
     JSX
  ========================= */
  return (
    <>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />

      {/* TIME SLIDER */}
      <div style={{
        position:"fixed", top:20, left:"50%", transform:"translateX(-50%)",
        background:"rgba(0,0,0,0.75)", padding:12, borderRadius:8, color:"#fff"
      }}>
        Time (Mumbai): <b>{hour}:00</b>
        <input
          type="range"
          min="0"
          max="23"
          value={hour}
          onChange={e => setHour(+e.target.value)}
          style={{ width: 240, display:"block", marginTop:6 }}
        />
      </div>

      {/* MODE BUTTONS */}
      <div style={{ position:"fixed", top:20, right:20 }}>
        {["ALTITUDE","GOLDEN","TWILIGHT","NIGHT"].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              margin:4,
              padding:"6px 10px",
              background: mode===m ? "#fff" : "#222",
              color: mode===m ? "#000" : "#fff",
              borderRadius:4
            }}
          >
            {m}
          </button>
        ))}
      </div>

      {/* LEGEND */}
      <div style={{
        position:"fixed", bottom:20, left:20,
        background:"rgba(0,0,0,0.75)", padding:12, borderRadius:8, color:"#fff"
      }}>
        <strong>{mode} MODE</strong>
        {mode==="ALTITUDE" && (
          <>
            <LegendRow color="#0d2ca6" label="Low Sun" />
            <LegendRow color="#33e833" label="Medium Sun" />
            <LegendRow color="#ffe600" label="High Sun" />
          </>
        )}
        {mode==="GOLDEN" && <LegendRow color="#ffbf4d" label="Golden Hour" />}
        {mode==="TWILIGHT" && <LegendRow color="#4da0cc" label="Twilight" />}
        {mode==="NIGHT" && <LegendRow color="#0d1433" label="Night" />}
      </div>
    </>
  );
}

