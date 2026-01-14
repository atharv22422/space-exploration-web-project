import SunCalc from "suncalc";

export function generateSunHeatmap({
  centerLat,
  centerLng,
  date,
  size = 256,
  radiusDeg = 30
}) {
  const data = new Uint8Array(size * size * 4);

  // Sun altitude at center
  const centerAlt =
    SunCalc.getPosition(date, centerLat, centerLng).altitude;

  let i = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const lat = centerLat + ((y / size) - 0.5) * radiusDeg;
      const lng = centerLng + ((x / size) - 0.5) * radiusDeg;

      const sunAlt =
        SunCalc.getPosition(date, lat, lng).altitude;

      // relative difference
      let diff = sunAlt - centerAlt;

      let v = diff * 1.1 + 0.5;
      v = Math.max(0.05, Math.min(0.95, v));

      const dx = (x / size) - 0.5;
      const dy = (y / size) - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const edge = 0.45;
      const fade = 0.08;
      let alpha = 1.0 - smoothstep(edge, edge + fade, dist);

      data[i++] = v * 255;
      data[i++] = 0;
      data[i++] = 0;
      data[i++] = Math.max(0, alpha) * 255;
    }
  }

  return { data, size };
}

function smoothstep(a, b, x) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
