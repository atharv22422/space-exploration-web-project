import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

/* Read JSON file */
const dataPath = path.resolve("data/yearsData.json");

const eclipses = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

/* GET all eclipse events */
router.get("/", (req, res) => {
  res.json(eclipses);
});

/* GET single eclipse by ID */
router.get("/:id", (req, res) => {
  const event = eclipses.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: "Eclipse not found" });
  }

  res.json(event);
});

export default router;
