import { generateHeatmapGrid } from "../../data/heatmapGrid";


export default function Dashboard() {
  const data = generateHeatmapGrid(new Date());

  const avgVisibility = Math.round(
    data.reduce((sum, d) => sum + d.value, 0) / data.length
  );

  return (
    <div style={{ padding: 16, background: "#0b0b0f" }}>
      <h3>Global Visibility</h3>
      <p style={{ fontSize: 36 }}>{avgVisibility}%</p>
      <p>Based on Sun & Moon conditions</p>
    </div>
  );
}
