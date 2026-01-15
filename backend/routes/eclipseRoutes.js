const express = require("express");
const router = express.Router();

const {
  getAllEclipses,
  getEclipsesByYear
} = require("../services/eclipseService");

// GET all eclipses
router.get("/", (req, res) => {
  const data = getAllEclipses();
  res.json(data);
});

// GET eclipses by year
router.get("/:year", (req, res) => {
  const year = Number(req.params.year);
  const data = getEclipsesByYear(year);

  if (!data.length) {
    return res.status(404).json({ message: "No eclipses found" });
  }

  res.json(data);
});

module.exports = router;
