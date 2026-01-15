const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/yearsData.json");

// Load once (cache)
let eclipseData = [];

try {
  const raw = fs.readFileSync(dataPath, "utf-8");
  eclipseData = JSON.parse(raw);
} catch (err) {
  console.error("❌ Failed to load eclipse data", err);
}

// Return all data
function getAllEclipses() {
  return eclipseData;
}

// Filter by year
function getEclipsesByYear(year) {
  return eclipseData.filter(e => e.year === year);
}

module.exports = {
  getAllEclipses,
  getEclipsesByYear
};
