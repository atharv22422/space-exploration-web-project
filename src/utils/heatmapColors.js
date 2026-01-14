export function getHeatmapColor(value) {
  if (value < 20) return [0.1, 0.2, 0.8];   // blue
  if (value < 40) return [0.1, 0.8, 0.6];   // cyan
  if (value < 60) return [0.2, 0.9, 0.2];   // green
  if (value < 80) return [1.0, 0.9, 0.1];   // yellow
  return [1.0, 0.3, 0.1];                  // red
}
