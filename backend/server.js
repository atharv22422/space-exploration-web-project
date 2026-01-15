import express from "express";
import cors from "cors";
import eclipsesRoute from "./routes/eclipses.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Astro backend running");
});

app.use("/api/eclipses", eclipsesRoute);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

