import { distanceKm } from "../utils/distance";
import SunCalc from "suncalc";

const USER_LOCATION = {
  lat: 19.1579,
  lng: 72.9405
};

const RADIUS_KM = 3000; // regional coverage
const STEP = 2;        // performance vs resolution tradeoff

/* ======================================================
   GENERATE SOLAR HEATMAP GRID (PHYSICALLY BASED)
====================================================== */
export function generateHeatmapGrid(date = new Date()) {
  const grid = [];

  for (let lat = -90; lat <= 90; lat += STEP) {
    for (let lng = -180; lng <= 180; lng += STEP) {
      const dist = distanceKm(
        USER_LOCATION.lat,
        USER_LOCATION.lng,
        lat,
        lng
      );

      // ❌ outside region
      if (dist > RADIUS_KM) continue;

      /* =========================================
         🌍 LOCAL SOLAR TIME (longitude-based)
         Earth rotates ~15° per hour
         → 1° ≈ 4 minutes
         NOTE: This is PHYSICAL solar time,
         NOT civil timezone time.
      ========================================= */
      const timeOffsetMs = lng * 4 * 60 * 1000;
      const localDate = new Date(date.getTime() + timeOffsetMs);

      /* =========================================
         🌞 SUN ALTITUDE
      ========================================= */
      const sunPos = SunCalc.getPosition(localDate, lat, lng);
      const sunAltDeg = sunPos.altitude * (180 / Math.PI);

      /*
        ALTITUDE → VISIBILITY MAPPING

        +10°  → strong daylight
         0°   → sunset/sunrise
        -6°   → civil twilight
        -12°  → nautical twilight
        -18°  → astronomical twilight
        -60°  → deep night
      */

      // Clamp only extremes (keep gradient alive)
      const clampedAlt = Math.max(-60, Math.min(10, sunAltDeg));

      /* =================================================
         OPTION A (recommended UX):
         Higher value = MORE sunlight
      ================================================= */
      const value =
        ((clampedAlt + 60) / 70) * 100; // 0 → night, 100 → day

      /*
         OPTION B (your original logic – keep if legend matches):
         const value = ((-clampedAlt + 10) / 70) * 100;
      */

      grid.push({
        lat,
        lng,
        value
      });
    }
  }

  return grid;
}

/* ======================================================
   SUN STATE CATEGORIZATION (EVENT-BASED)
====================================================== */
export function getSunState(date, lat, lng) {
  const t = SunCalc.getTimes(date, lat, lng);

  if (date < t.dawn) return "Night";
  if (date < t.sunrise) return "Astronomical Twilight";
  if (date < t.sunriseEnd) return "Civil Twilight";
  if (date < t.goldenHourEnd) return "Golden Hour (Morning)";
  if (date < t.goldenHour) return "Daylight";
  if (date < t.sunsetStart) return "Golden Hour (Evening)";
  if (date < t.sunset) return "Civil Twilight";
  if (date < t.dusk) return "Nautical Twilight";
  if (date < t.night) return "Astronomical Twilight";

  return "Night";
}
