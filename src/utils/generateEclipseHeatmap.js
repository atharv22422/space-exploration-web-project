
// src/utils/generateEclipseHeatmap.js

export function generateEclipseHeatmap({
  path,
  size = 256
}) {
  const data = new Uint8Array(size * size * 4);

  if (!path || path.length === 0) {
    return { data, size };
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;

      const lat = v * 180 - 90;
      const lng = u * 360 - 180;

      let maxShadow = 0;

      for (const p of path) {
        const dLat = lat - p.lat;
        const dLng = lng - p.lng;

        const dist = Math.sqrt(dLat * dLat + dLng * dLng);

        const influenceRadius = 20; // degrees
        if (dist < influenceRadius) {
          const strength =
            (1 - dist / influenceRadius) * (p.umbra || 0);

          maxShadow = Math.max(maxShadow, strength);
        }
      }

      const i = (y * size + x) * 4;
      const shadow = Math.floor(maxShadow * 255);

      data[i] = shadow;
      data[i + 1] = shadow;
      data[i + 2] = shadow;
      data[i + 3] = shadow;
    }
  }

  return { data, size };
}
