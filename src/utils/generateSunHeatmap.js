import SunCalc from "suncalc";

export function generateSunHeatmap({
  centerLat,
  centerLng,
  date,
  size = 256,
  radiusDeg = 45,
  eclipsePath = null
}) {
  const data = new Uint8Array(size * size * 4);
  let i = 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Convert pixel to lat/lng coordinates around Mumbai
      const lat = centerLat + ((y / size) - 0.5) * radiusDeg;
      const lng = centerLng + ((x / size) - 0.5) * radiusDeg;
      
      let r = 0, g = 0, b = 0, a = 0;

      if (!eclipsePath) {
        // SUN MODE: Calculate sun altitude
        const sunAlt = SunCalc.getPosition(date, lat, lng).altitude * (180 / Math.PI); // Convert to degrees
        
        // Normalize altitude (-90 to 90 degrees) to 0-1 range
        // Below horizon: 0, Horizon: 0.5, Zenith: 1
        let intensity = (sunAlt + 90) / 180;
        intensity = Math.max(0, Math.min(1, intensity));
        
        // Store intensity in red channel
        r = Math.floor(intensity * 255);
        a = intensity > 0.1 ? 200 : 0; // Alpha based on intensity
      } else {
        // ECLIPSE MODE: Calculate shadow from eclipse path
        let shadowIntensity = 0;
        
        // Find closest point in eclipse path
        for (const point of eclipsePath) {
          const distance = Math.sqrt(
            Math.pow(lat - point.lat, 2) + 
            Math.pow(lng - point.lng, 2)
          );
          
          // If within 15 degrees of eclipse path
          if (distance < 15) {
            // Calculate shadow intensity (umbra value * proximity factor)
            const proximity = 1 - (distance / 15);
            const shadow = point.umbra * proximity;
            shadowIntensity = Math.max(shadowIntensity, shadow);
          }
        }
        
        // Store shadow intensity
        r = Math.floor(shadowIntensity * 255);
        g = 0;
        b = 0;
        a = shadowIntensity > 0 ? 200 : 0;
      }

      data[i++] = r;
      data[i++] = g;
      data[i++] = b;
      data[i++] = a;
    }
  }

  return { data, size };
}