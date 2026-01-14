import SunCalc from "suncalc";

const DEG = Math.PI / 180;

export function calculateVisibility(date, lat, lng) {
  const sun = SunCalc.getPosition(date, lat, lng);
  const moon = SunCalc.getMoonIllumination(date);

  let score = 100;

  // Sun too high = bad
  if (sun.altitude > -6 * DEG) {
    score -= 50;
  }

  // Moon brightness reduces visibility
  score -= moon.fraction * 30;

  return Math.max(0, Math.min(100, Math.round(score)));
}
