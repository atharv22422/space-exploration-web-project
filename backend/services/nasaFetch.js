import fs from "fs";
import path from "path";

const DATA_PATH = path.resolve("data/yearsData.json");

/**
 * TEMP VERSION
 * Later we replace this with live NASA parsing
 */
export function loadEclipseData() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({}));
  }

  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}
