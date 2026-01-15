class ComprehensiveAstroVisualizer {
  constructor() {
    this.map2d = null;
    this.currentEvent = null;
    this.selectedLocation = null;
    this.events = [];
    this.currentDate = new Date();
    this.mapPin = null;
    this.visibilityLayer = null;
    this.jsonData = COMPREHENSIVE_ASTRO_DATA;
    this.eventCategories = {
      moon_phase: { color: "#9c27b0", icon: "🌙" },
      lunar_eclipse: { color: "#f44336", icon: "🔴" },
      solar_eclipse: { color: "#ff9800", icon: "☀️" },
      meteor_shower: { color: "#2196f3", icon: "✨" },
      planetary: { color: "#4caf50", icon: "🪐" },
      comet: { color: "#ff9800", icon: "☄️" },
      aurora: { color: "#00bcd4", icon: "🌌" },
      star_gazing: { color: "#e91e63", icon: "⭐" },
      zodiacal_light: { color: "#673ab7", icon: "💫" },
      eclipse_season: { color: "#ff5722", icon: "⏳" },
    };

    this.init();
  }

  async init() {
    this.initUI();
    this.init2DMap();
    await this.loadAllAstronomicalEvents();

    if (this.events.length > 0) {
      this.selectEvent(this.events[0]);
    }

    setTimeout(() => this.selectInitialLocation(), 1000);

    setTimeout(() => {
      document.getElementById("loadingOverlay").style.display = "none";
    }, 800);
  }

  initUI() {
    // View toggle
    document
      .getElementById("view2d")
      .addEventListener("click", () => this.switchView("2d"));
    document
      .getElementById("view3d")
      .addEventListener("click", () => this.switchView("3d"));

    // Search functionality
    const searchInput = document.getElementById("searchInput");
    let searchTimeout;

    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();

      if (query.length < 2) {
        document.getElementById("searchResults").style.display = "none";
        return;
      }

      searchTimeout = setTimeout(() => this.searchLocation(query), 300);
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.searchLocation(e.target.value.trim());
      }
    });

    // Time controls
    document
      .getElementById("prevEvent")
      .addEventListener("click", () => this.navigateEvents(-1));
    document
      .getElementById("nextEvent")
      .addEventListener("click", () => this.navigateEvents(1));

    // Click outside to close search results
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-box")) {
        document.getElementById("searchResults").style.display = "none";
      }
    });
  }

  switchView(viewType) {
    const map2dElem = document.getElementById("map2d");
    const globe3dElem = document.getElementById("globe3d");
    const view2dBtn = document.getElementById("view2d");
    const view3dBtn = document.getElementById("view3d");

    view2dBtn.classList.remove("active");
    view3dBtn.classList.remove("active");

    if (viewType === "2d") {
      map2dElem.style.display = "block";
      globe3dElem.style.display = "none";
      view2dBtn.classList.add("active");
      // Recreate visibility zones when switching back to 2D
      if (this.currentEvent) {
        this.createVisibilityZones(this.currentEvent);
      }
    } else {
      // Simple 3D placeholder
      map2dElem.style.display = "none";
      globe3dElem.style.display = "block";
      globe3dElem.innerHTML =
        '<div style="display: flex; justify-content: center; align-items: center; height: 100%; color: #a0b0c5; font-size: 18px; text-align: center; padding: 20px;">3D Globe View<br/><small style="font-size: 14px; color: #4a90e2;">Interactive 3D visualization of astronomical events<br/>Coming in next update...</small></div>';
      view3dBtn.classList.add("active");
    }
  }

  async loadAllAstronomicalEvents() {
    try {
      this.events = [];
      const now = new Date();

      // Load current moon phase
      const currentMoon = SunCalc.getMoonIllumination(now);
      this.events.push({
        id: "moon_current",
        title: "Current Moon",
        date: new Date(now),
        type: "moon_phase",
        description: `${(currentMoon.fraction * 100).toFixed(1)}% illuminated`,
        phase: currentMoon.phase,
        illumination: currentMoon.fraction,
        isCurrent: true,
      });

      // Load all categories of events
      const categories = [
        "moon_phases",
        "solar_eclipses",
        "lunar_eclipses",
        "meteor_showers",
        "planetary_events",
        "comets",
        "special_events",
      ];

      categories.forEach((category) => {
        if (this.jsonData.astronomicalEvents[category]) {
          this.jsonData.astronomicalEvents[category].forEach((event) => {
            const eventDate = new Date(event.date);
            // Only add future events or recent past events
            if (
              eventDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            ) {
              this.events.push({
                ...event,
                date: eventDate,
                category: category.replace("_", " "),
              });
            }
          });
        }
      });

      // Generate additional moon phases for next 6 months
      this.generateFutureMoonPhases(6);

      // Sort all events by date
      this.events.sort((a, b) => a.date - b.date);

      // Limit to 50 events for performance
      if (this.events.length > 50) {
        this.events = this.events.slice(0, 50);
      }

      this.renderEventsList();
    } catch (error) {
      console.error("Error loading events:", error);
      this.loadFallbackEvents();
    }
  }

  generateFutureMoonPhases(months) {
    const date = new Date();
    for (let i = 0; i < months * 4; i++) {
      date.setDate(date.getDate() + 7);
      const illumination = SunCalc.getMoonIllumination(date);
      const phase = illumination.phase;

      let phaseName = "";
      if (phase < 0.03 || phase > 0.97) phaseName = "New Moon";
      else if (phase < 0.22) phaseName = "Waxing Crescent";
      else if (phase < 0.28) phaseName = "First Quarter";
      else if (phase < 0.47) phaseName = "Waxing Gibbous";
      else if (phase < 0.53) phaseName = "Full Moon";
      else if (phase < 0.72) phaseName = "Waning Gibbous";
      else if (phase < 0.78) phaseName = "Last Quarter";
      else phaseName = "Waning Crescent";

      // Add special names for full moons
      let fullMoonName = "";
      if (phaseName === "Full Moon") {
        const monthNames = [
          "Wolf Moon",
          "Snow Moon",
          "Worm Moon",
          "Pink Moon",
          "Flower Moon",
          "Strawberry Moon",
          "Buck Moon",
          "Sturgeon Moon",
          "Harvest Moon",
          "Hunter's Moon",
          "Beaver Moon",
          "Cold Moon",
        ];
        const month = date.getMonth();
        fullMoonName = ` (${monthNames[month]})`;
      }

      this.events.push({
        id: `moon_${date.toISOString()}`,
        title: phaseName + fullMoonName,
        date: new Date(date),
        type: "moon_phase",
        description: `${(illumination.fraction * 100).toFixed(1)}% illuminated`,
        phase: phase,
        illumination: illumination.fraction,
      });
    }
  }

  loadFallbackEvents() {
    const currentMoon = SunCalc.getMoonIllumination(new Date());
    this.events = [
      {
        id: "current",
        title: "Current Moon",
        date: new Date(),
        type: "moon_phase",
        description: `${(currentMoon.fraction * 100).toFixed(1)}% illuminated`,
        phase: currentMoon.phase,
        illumination: currentMoon.fraction,
        isCurrent: true,
      },
    ];
    this.renderEventsList();
  }

  renderEventsList() {
    const eventsList = document.getElementById("eventsList");
    eventsList.innerHTML = "";

    this.events.forEach((event) => {
      const eventElem = document.createElement("div");
      eventElem.className = `event-item event-type-${event.type.split("_")[0]}`;

      // Add active class to current event if it's the first one
      if (event.isCurrent && !this.currentEvent) {
        eventElem.classList.add("active");
      }

      // Get event type styling
      const eventType = this.eventCategories[event.type] || {
        color: "#4a5a75",
        icon: "⭐",
      };

      // Determine display date
      const now = new Date();
      const eventDate = new Date(event.date);
      const diffDays = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

      let dateText = eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (diffDays === 0) dateText = "Today";
      else if (diffDays === 1) dateText = "Tomorrow";
      else if (diffDays === -1) dateText = "Yesterday";
      else if (diffDays < 0 && diffDays >= -7)
        dateText = `${Math.abs(diffDays)} days ago`;
      else if (diffDays > 0 && diffDays <= 7) dateText = `In ${diffDays} days`;

      eventElem.innerHTML = `
        <div class="event-title">
          <span style="font-size: 16px;">${eventType.icon}</span>
          ${event.title}
        </div>
        <div class="event-date">
          ${dateText}
          ${
            eventDate.getFullYear() !== now.getFullYear()
              ? `, ${eventDate.getFullYear()}`
              : ""
          }
        </div>
        <div class="event-desc">${event.description}</div>
        ${
          event.peak_rate
            ? `<div style="color: #4a90e8; font-size: 11px; margin-top: 3px;">Peak: ${event.peak_rate} meteors/hr</div>`
            : ""
        }
      `;

      eventElem.addEventListener("click", () => {
        document
          .querySelectorAll(".event-item")
          .forEach((el) => el.classList.remove("active"));
        eventElem.classList.add("active");
        this.selectEvent(event);
      });

      eventsList.appendChild(eventElem);
    });
  }

  selectEvent(event) {
    this.currentEvent = event;

    // Update current date display
    const eventDate = new Date(event.date);
    const now = new Date();
    const diffDays = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

    let dateDisplay = eventDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (diffDays === 0) dateDisplay = "Today";
    else if (diffDays === 1) dateDisplay = "Tomorrow";
    else if (diffDays === -1) dateDisplay = "Yesterday";
    else if (diffDays < 0) dateDisplay = `${Math.abs(diffDays)} days ago`;
    else if (diffDays > 0) dateDisplay = `In ${diffDays} days`;

    document.getElementById("currentDate").textContent = dateDisplay;

    // Create visibility zones for this event
    this.createVisibilityZones(event);

    // Update details for selected location
    if (this.selectedLocation) {
      this.updateLocationDetails(
        this.selectedLocation.lat,
        this.selectedLocation.lon
      );
    }
  }

  navigateEvents(direction) {
    if (!this.currentEvent || this.events.length === 0) return;

    const currentIndex = this.events.findIndex((e) => e === this.currentEvent);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = this.events.length - 1;
    if (newIndex >= this.events.length) newIndex = 0;

    this.selectEvent(this.events[newIndex]);
  }

  createVisibilityZones(event) {
    // Clear any existing overlays
    if (this.visibilityLayer) {
      this.map2d.removeLayer(this.visibilityLayer);
    }

    this.showLoading(`Generating visibility zones for ${event.title}...`);

    // Create a GeoJSON layer for visibility zones
    const zones = this.calculateVisibilityZones(event);

    this.visibilityLayer = L.geoJSON(zones, {
      style: (feature) => {
        const zoneType = feature.properties.zone;
        let color, opacity, weight;

        switch (zoneType) {
          case "perfect":
            color = "#1e3a8a"; // Dark blue
            opacity = 0.7;
            weight = 1;
            break;
          case "good":
            color = "#3b82f6"; // Medium blue
            opacity = 0.5;
            weight = 0.5;
            break;
          case "limited":
            color = "#93c5fd"; // Light blue
            opacity = 0.4;
            weight = 0;
            break;
          case "none":
          default:
            color = "#dbeafe"; // Very light blue
            opacity = 0.2;
            weight = 0;
        }

        return {
          fillColor: color,
          color: color,
          weight: weight,
          opacity: opacity,
          fillOpacity: opacity,
        };
      },
      onEachFeature: (feature, layer) => {
        if (feature.properties && feature.properties.description) {
          layer.bindTooltip(feature.properties.description);
        }
      },
    }).addTo(this.map2d);

    this.updateLegend();
    this.hideLoading();
  }

  calculateVisibilityZones(event) {
    const zones = {
      type: "FeatureCollection",
      features: [],
    };

    // Calculate zones based on event type
    if (event.type === "solar_eclipse" || event.type === "lunar_eclipse") {
      // For eclipses, create concentric zones
      zones.features = this.createEclipseZones(event);
    } else if (event.type === "meteor_shower") {
      // For meteor showers, create hemisphere-based zones
      zones.features = this.createMeteorShowerZones(event);
    } else if (event.type === "aurora") {
      // For aurora, create latitude-based zones
      zones.features = this.createAuroraZones(event);
    } else {
      // For other events, create generic visibility zones
      zones.features = this.createGenericZones(event);
    }

    return zones;
  }

  createEclipseZones(event) {
    const features = [];
    const centerLat = event.path?.centerLat || 0;
    const centerLon = event.path?.centerLon || 0;
    const radius = event.path?.radius || 1000; // km

    // Zone 1: Perfect visibility (within 500km of center)
    features.push(
      this.createCircleZone(
        centerLat,
        centerLon,
        radius * 0.5,
        "perfect",
        "Total eclipse visible (within path of totality)"
      )
    );

    // Zone 2: Good visibility (500-1500km from center)
    features.push(
      this.createCircleZone(
        centerLat,
        centerLon,
        radius * 1.5,
        "good",
        "Partial eclipse visible",
        radius * 0.5
      )
    );

    // Zone 3: Limited visibility (1500-3000km from center)
    features.push(
      this.createCircleZone(
        centerLat,
        centerLon,
        radius * 3,
        "limited",
        "Penumbral/Partial eclipse barely visible",
        radius * 1.5
      )
    );

    return features;
  }

  createCircleZone(
    lat,
    lon,
    outerRadius,
    zoneType,
    description,
    innerRadius = 0
  ) {
    const points = 64; // Number of points for smooth circle
    const coords = [];

    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * 2 * Math.PI;
      const dx = Math.cos(angle) * outerRadius;
      const dy = Math.sin(angle) * outerRadius;

      // Convert km to degrees (approx)
      const newLat = lat + dy / 111.32;
      const newLon = lon + dx / (111.32 * Math.cos((lat * Math.PI) / 180));

      coords.push([newLon, newLat]);
    }

    // Create hole if innerRadius > 0
    let geometry;
    if (innerRadius > 0) {
      const innerCoords = [];
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * 2 * Math.PI;
        const dx = Math.cos(angle) * innerRadius;
        const dy = Math.sin(angle) * innerRadius;

        const newLat = lat + dy / 111.32;
        const newLon = lon + dx / (111.32 * Math.cos((lat * Math.PI) / 180));

        innerCoords.push([newLon, newLat]);
      }

      geometry = {
        type: "Polygon",
        coordinates: [coords, innerCoords.reverse()], // Outer ring, then inner ring (hole)
      };
    } else {
      geometry = {
        type: "Polygon",
        coordinates: [coords],
      };
    }

    return {
      type: "Feature",
      geometry: geometry,
      properties: {
        zone: zoneType,
        description: description,
      },
    };
  }

  createMeteorShowerZones(event) {
    const features = [];
    const bestViewing = event.best_viewing?.toLowerCase() || "both";

    // Northern Hemisphere zone
    if (bestViewing.includes("northern") || bestViewing.includes("both")) {
      features.push({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-180, 0],
              [-180, 90],
              [180, 90],
              [180, 0],
              [-180, 0],
            ],
          ],
        },
        properties: {
          zone: bestViewing.includes("northern") ? "perfect" : "good",
          description: bestViewing.includes("northern")
            ? "Best viewing: Northern Hemisphere"
            : "Good viewing: Northern Hemisphere",
        },
      });
    }

    // Southern Hemisphere zone
    if (bestViewing.includes("southern") || bestViewing.includes("both")) {
      features.push({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-180, 0],
              [-180, -90],
              [180, -90],
              [180, 0],
              [-180, 0],
            ],
          ],
        },
        properties: {
          zone: bestViewing.includes("southern") ? "perfect" : "good",
          description: bestViewing.includes("southern")
            ? "Best viewing: Southern Hemisphere"
            : "Good viewing: Southern Hemisphere",
        },
      });
    }

    return features;
  }

  createAuroraZones(event) {
    const features = [];

    // High latitude zone (60-90 degrees)
    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, 60],
            [-180, 90],
            [180, 90],
            [180, 60],
            [-180, 60],
          ],
        ],
      },
      properties: {
        zone: "perfect",
        description: "High aurora probability (60-90° latitude)",
      },
    });

    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, -60],
            [-180, -90],
            [180, -90],
            [180, -60],
            [-180, -60],
          ],
        ],
      },
      properties: {
        zone: "perfect",
        description: "High aurora probability (60-90° latitude)",
      },
    });

    // Medium latitude zone (45-60 degrees)
    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, 45],
            [-180, 60],
            [180, 60],
            [180, 45],
            [-180, 45],
          ],
        ],
      },
      properties: {
        zone: "good",
        description: "Medium aurora probability (45-60° latitude)",
      },
    });

    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, -45],
            [-180, -60],
            [180, -60],
            [180, -45],
            [-180, -45],
          ],
        ],
      },
      properties: {
        zone: "good",
        description: "Medium aurora probability (45-60° latitude)",
      },
    });

    return features;
  }

  createGenericZones(event) {
    // Default zones for other events
    const features = [];

    // Perfect zone (tropical regions for most events)
    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, -30],
            [-180, 30],
            [180, 30],
            [180, -30],
            [-180, -30],
          ],
        ],
      },
      properties: {
        zone: "perfect",
        description: "Excellent viewing conditions",
      },
    });

    // Good zone (temperate regions)
    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, 30],
            [-180, 60],
            [180, 60],
            [180, 30],
            [-180, 30],
          ],
        ],
      },
      properties: {
        zone: "good",
        description: "Good viewing conditions",
      },
    });

    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, -30],
            [-180, -60],
            [180, -60],
            [180, -30],
            [-180, -30],
          ],
        ],
      },
      properties: {
        zone: "good",
        description: "Good viewing conditions",
      },
    });

    // Limited zone (polar regions)
    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, 60],
            [-180, 90],
            [180, 90],
            [180, 60],
            [-180, 60],
          ],
        ],
      },
      properties: {
        zone: "limited",
        description: "Limited viewing conditions",
      },
    });

    features.push({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, -60],
            [-180, -90],
            [180, -90],
            [180, -60],
            [-180, -60],
          ],
        ],
      },
      properties: {
        zone: "limited",
        description: "Limited viewing conditions",
      },
    });

    return features;
  }

  updateLegend() {
    const legendItems = document.getElementById("legendItems");

    const zones = [
      { type: "perfect", label: "Perfect/Total Visibility", color: "#1e3a8a" },
      { type: "good", label: "Good/Partial Visibility", color: "#3b82f6" },
      { type: "limited", label: "Limited Visibility", color: "#93c5fd" },
      { type: "none", label: "Not Visible", color: "#dbeafe" },
    ];

    legendItems.innerHTML = zones
      .map(
        (zone) => `
          <div class="legend-item">
            <div class="legend-color" style="background-color: ${zone.color}"></div>
            <span>${zone.label}</span>
          </div>
        `
      )
      .join("");
  }

  calculateGreatCircleDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  init2DMap() {
    this.map2d = L.map("map2d", {
      center: [20, 0],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
      minZoom: 1,
      maxZoom: 8,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      maxBoundsViscosity: 1.0,
    });

    // Dark theme map tiles - use a lighter theme for better visibility
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      noWrap: true,
    }).addTo(this.map2d);

    // Add zoom control
    L.control.zoom({ position: "bottomright" }).addTo(this.map2d);

    // Map click event
    this.map2d.on("click", (e) => {
      this.selectLocation(e.latlng.lat, e.latlng.lng);
    });

    // Initialize legend
    this.updateLegend();
  }

  addPinToMaps(lat, lon) {
    if (this.mapPin) {
      this.mapPin.remove();
    }

    const pinIcon = L.divIcon({
      className: "custom-pin",
      html: `
        <div style="position: relative; width: 24px; height: 24px;">
          <div style="position: absolute; width: 24px; height: 24px; background: #4a90e2; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px rgba(74, 144, 226, 0.8);"></div>
          <div style="position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid white;"></div>
        </div>
      `,
      iconSize: [24, 32],
      iconAnchor: [12, 32],
    });

    this.mapPin = L.marker([lat, lon], { icon: pinIcon }).addTo(this.map2d);
    this.map2d.setView([lat, lon], this.map2d.getZoom());
  }

  async selectLocation(lat, lon, name = null) {
    this.selectedLocation = { lat, lon, name };

    // Format coordinates
    const latStr =
      lat >= 0 ? `${lat.toFixed(2)}°N` : `${Math.abs(lat).toFixed(2)}°S`;
    const lonStr =
      lon >= 0 ? `${lon.toFixed(2)}°E` : `${Math.abs(lon).toFixed(2)}°W`;
    document.getElementById("coordinates").textContent = `${latStr}, ${lonStr}`;

    // Get location name if not provided
    if (!name) {
      name = await this.getLocationName(lat, lon);
    }
    document.querySelector(".location-title").textContent = name;

    // Get timezone
    const timezone = this.getTimezone(lon);
    document.getElementById("timezoneInfo").textContent = timezone;

    // Update details and add pin
    this.updateLocationDetails(lat, lon);
    this.addPinToMaps(lat, lon);
  }

  async getLocationName(lat, lon) {
    try {
      // Check for exact match
      const exactMatch = this.jsonData.locations.find(
        (loc) => Math.abs(loc.lat - lat) < 0.1 && Math.abs(loc.lon - lon) < 0.1
      );

      if (exactMatch) {
        return exactMatch.name;
      }

      // Find nearest city
      let nearestCity = null;
      let minDistance = Infinity;

      this.jsonData.locations.forEach((city) => {
        const distance = this.calculateGreatCircleDistance(
          lat,
          lon,
          city.lat,
          city.lon
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestCity = city;
        }
      });

      // If within 500km, show the city name
      if (nearestCity && minDistance < 500) {
        return nearestCity.name;
      }

      // Otherwise return coordinates
      return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
    } catch (error) {
      console.error("Error getting location name:", error);
      return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
    }
  }

  getTimezone(lon) {
    // Find timezone based on longitude
    const timezone = this.jsonData.timezones.find(
      (tz) => lon >= tz.lon && lon < tz.lonEnd
    );

    return timezone ? timezone.name : "UTC";
  }

  async updateLocationDetails(lat, lon) {
    if (!this.currentEvent) return;

    const detailsContent = document.getElementById("detailsContent");

    // Get event-specific details
    switch (this.currentEvent.type) {
      case "moon_phase":
        detailsContent.innerHTML = this.getMoonDetails(lat, lon);
        break;
      case "solar_eclipse":
      case "lunar_eclipse":
        detailsContent.innerHTML = this.getEclipseDetails(lat, lon);
        break;
      case "meteor_shower":
        detailsContent.innerHTML = this.getMeteorShowerDetails(lat, lon);
        break;
      case "planetary":
        detailsContent.innerHTML = this.getPlanetaryDetails(lat, lon);
        break;
      case "comet":
        detailsContent.innerHTML = this.getCometDetails(lat, lon);
        break;
      case "aurora":
        detailsContent.innerHTML = this.getAuroraDetails(lat, lon);
        break;
      default:
        detailsContent.innerHTML = this.getGenericEventDetails(lat, lon);
    }
  }

  getMoonDetails(lat, lon) {
    const eventDate = new Date(this.currentEvent.date);
    const moonIllumination = SunCalc.getMoonIllumination(eventDate);
    const moonPosition = SunCalc.getMoonPosition(eventDate, lat, lon);
    const altitude = (moonPosition.altitude * 180) / Math.PI;
    const phaseName = this.getMoonPhaseName(moonIllumination.phase);

    // Calculate viewing quality
    let qualityScore = 0;
    let qualityText = "";

    if (altitude > 30) {
      qualityScore = 90;
      qualityText =
        "Excellent - High altitude, minimal atmosphere interference";
    } else if (altitude > 15) {
      qualityScore = 70;
      qualityText = "Good - Clear viewing conditions";
    } else if (altitude > 0) {
      qualityScore = 40;
      qualityText = "Fair - Low on horizon, atmospheric distortion likely";
    } else {
      qualityScore = 10;
      qualityText = "Poor - Below horizon, not visible";
    }

    return `
      <div class="detail-card">
        <div class="card-title">Moon Phase</div>
        <div class="card-value">${phaseName}</div>
        <div class="card-subvalue">${(moonIllumination.fraction * 100).toFixed(
          1
        )}% illuminated</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          Altitude: ${altitude.toFixed(1)}°<br>
          ${altitude <= 0 ? "Currently below horizon" : "Visible above horizon"}
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Viewing Conditions</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          qualityScore
        )}">
          ${qualityScore}/100
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${qualityText}<br>
          Best viewing time: Local night hours<br>
          Moonrise: ${this.calculateMoonrise(lat, lon)}
        </div>
      </div>
    `;
  }

  getEclipseDetails(lat, lon) {
    const eventDate = new Date(this.currentEvent.date);
    const distance = this.currentEvent.path
      ? this.calculateGreatCircleDistance(
          lat,
          lon,
          this.currentEvent.path.centerLat || 0,
          this.currentEvent.path.centerLon || 0
        )
      : 0;

    let visibilityScore = 0;
    let visibilityText = "";

    if (this.currentEvent.type === "solar_eclipse") {
      if (distance < 100) {
        visibilityScore = 95;
        visibilityText = "In path of totality/annularity";
      } else if (distance < 500) {
        visibilityScore = 70;
        visibilityText = "Partial eclipse visible";
      } else if (distance < 1500) {
        visibilityScore = 40;
        visibilityText = "Partial eclipse near horizon";
      } else {
        visibilityScore = 10;
        visibilityText = "Not visible from this location";
      }
    } else {
      // lunar eclipse
      const localTime = eventDate.getUTCHours() + lon / 15;
      const isNight = localTime > 18 || localTime < 6;

      if (isNight && distance < 200) {
        visibilityScore = 90;
        visibilityText = "Excellent - Total eclipse visible";
      } else if (isNight && distance < 500) {
        visibilityScore = 60;
        visibilityText = "Good - Partial eclipse visible";
      } else if (isNight) {
        visibilityScore = 30;
        visibilityText = "Fair - Penumbral eclipse visible";
      } else {
        visibilityScore = 10;
        visibilityText = "Poor - Daytime or not visible";
      }
    }

    return `
      <div class="detail-card">
        <div class="card-title">${
          this.currentEvent.subtype
            ? this.currentEvent.subtype.charAt(0).toUpperCase() +
              this.currentEvent.subtype.slice(1)
            : ""
        } Eclipse</div>
        <div class="card-value">${this.currentEvent.title}</div>
        <div class="card-subvalue">${this.currentEvent.description}</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${
            this.currentEvent.magnitude
              ? `Magnitude: ${this.currentEvent.magnitude}<br>`
              : ""
          }
          ${
            this.currentEvent.duration
              ? `Duration: ${this.currentEvent.duration}<br>`
              : ""
          }
          Distance from center: ${Math.round(distance)} km
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Visibility Assessment</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          visibilityScore
        )}">
          ${Math.round(visibilityScore)}%
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${visibilityText}<br>
          Local time: ${eventDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}<br>
          ${
            this.currentEvent.visibility_regions
              ? `Visible in: ${this.currentEvent.visibility_regions.join(", ")}`
              : ""
          }
        </div>
      </div>
    `;
  }

  getMeteorShowerDetails(lat, lon) {
    const eventDate = new Date(this.currentEvent.date);
    const hemisphere = lat > 0 ? "Northern" : "Southern";
    const isBestHemisphere =
      this.currentEvent.best_viewing?.includes(hemisphere) ||
      this.currentEvent.best_viewing?.includes("Both");

    let visibilityScore = isBestHemisphere ? 80 : 50;
    let visibilityText = isBestHemisphere
      ? "Excellent - In optimal hemisphere for viewing"
      : "Moderate - Not in optimal hemisphere";

    // Adjust for latitude (better at mid-latitudes)
    const absLat = Math.abs(lat);
    if (absLat > 60) visibilityScore -= 20; // Too far north/south
    else if (absLat < 20) visibilityScore -= 10; // Near equator

    return `
      <div class="detail-card">
        <div class="card-title">Meteor Shower</div>
        <div class="card-value">${this.currentEvent.title}</div>
        <div class="card-subvalue">${this.currentEvent.description}</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          Constellation: ${this.currentEvent.constellation}<br>
          Peak rate: ${
            this.currentEvent.peak_rate || "Unknown"
          } meteors/hour<br>
          Best viewing: ${this.currentEvent.best_viewing || "Both hemispheres"}
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Viewing Conditions</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          visibilityScore
        )}">
          ${visibilityScore}/100
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${visibilityText}<br>
          Your hemisphere: ${hemisphere} Hemisphere<br>
          Best time: After midnight local time<br>
          Moon phase: ${this.getMoonPhaseAtTime(eventDate)}
        </div>
      </div>
    `;
  }

  getPlanetaryDetails(lat, lon) {
    const eventDate = new Date(this.currentEvent.date);
    let visibilityScore = 85;
    let visibilityText = "Excellent viewing conditions";

    // Planets are generally well-visible worldwide
    const localTime = eventDate.getUTCHours() + lon / 15;
    const isNight = localTime > 18 || localTime < 6;

    if (!isNight) {
      visibilityScore = 30;
      visibilityText = "Daytime - Wait for nightfall";
    }

    return `
      <div class="detail-card">
        <div class="card-title">Planetary Event</div>
        <div class="card-value">${this.currentEvent.title}</div>
        <div class="card-subvalue">${this.currentEvent.description}</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${
            this.currentEvent.planets
              ? `Planets: ${this.currentEvent.planets.join(", ")}<br>`
              : ""
          }
          ${
            this.currentEvent.separation
              ? `Separation: ${this.currentEvent.separation}<br>`
              : ""
          }
          ${
            this.currentEvent.magnitude
              ? `Magnitude: ${this.currentEvent.magnitude}`
              : ""
          }
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Observation Details</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          visibilityScore
        )}">
          ${visibilityScore}/100
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${visibilityText}<br>
          Local time: ${eventDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}<br>
          Visible to: Naked eye/Telescope<br>
          Direction: Look ${lat > 0 ? "South" : "North"} after sunset
        </div>
      </div>
    `;
  }

  getCometDetails(lat, lon) {
    const eventDate = new Date(this.currentEvent.date);
    let visibilityScore = 60;
    let visibilityText = "May require binoculars/telescope";

    if (this.currentEvent.magnitude <= 4) {
      visibilityScore = 80;
      visibilityText = "Potentially visible to naked eye";
    } else if (this.currentEvent.magnitude <= 6) {
      visibilityScore = 50;
      visibilityText = "Binoculars recommended";
    } else {
      visibilityScore = 30;
      visibilityText = "Telescope required";
    }

    return `
      <div class="detail-card">
        <div class="card-title">Comet</div>
        <div class="card-value">${this.currentEvent.title}</div>
        <div class="card-subvalue">${this.currentEvent.description}</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${
            this.currentEvent.magnitude
              ? `Magnitude: ${this.currentEvent.magnitude}<br>`
              : ""
          }
          ${
            this.currentEvent.constellation
              ? `Constellation: ${this.currentEvent.constellation}<br>`
              : ""
          }
          ${
            this.currentEvent.period
              ? `Orbital period: ${this.currentEvent.period}`
              : ""
          }
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Viewing Guide</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          visibilityScore
        )}">
          ${visibilityScore}/100
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${visibilityText}<br>
          Best time: Pre-dawn hours<br>
          Look toward: ${
            this.currentEvent.constellation || "East"
          } constellation<br>
          Dark sky required: Yes
        </div>
      </div>
    `;
  }

  getAuroraDetails(lat, lon) {
    const absLat = Math.abs(lat);
    let visibilityScore = 0;
    let visibilityText = "";

    if (absLat > 65) {
      visibilityScore = 90;
      visibilityText = "Excellent - Within auroral oval";
    } else if (absLat > 55) {
      visibilityScore = 70;
      visibilityText = "Good - Frequent aurora sightings";
    } else if (absLat > 45) {
      visibilityScore = 40;
      visibilityText = "Moderate - Occasional during strong geomagnetic storms";
    } else {
      visibilityScore = 10;
      visibilityText = "Rare - Only during extreme solar events";
    }

    return `
      <div class="detail-card">
        <div class="card-title">Aurora Forecast</div>
        <div class="card-value">${this.currentEvent.title}</div>
        <div class="card-subvalue">${this.currentEvent.description}</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${
            this.currentEvent.regions
              ? `Regions: ${this.currentEvent.regions.join(", ")}<br>`
              : ""
          }
          ${
            this.currentEvent.kp_index
              ? `KP Index: ${this.currentEvent.kp_index}<br>`
              : ""
          }
          Latitude: ${lat.toFixed(2)}°
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Aurora Probability</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          visibilityScore
        )}">
          ${visibilityScore}%
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          ${visibilityText}<br>
          Best viewing: September to March<br>
          Time: 10 PM to 2 AM local time<br>
          Conditions: Clear, dark sky away from city lights
        </div>
      </div>
    `;
  }

  getGenericEventDetails(lat, lon) {
    const eventDate = new Date(this.currentEvent.date);
    const now = new Date();
    const daysDiff = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

    let visibilityScore = 70;
    let timing = "";

    if (daysDiff > 0) {
      timing = `In ${daysDiff} day${daysDiff !== 1 ? "s" : ""}`;
    } else if (daysDiff === 0) {
      timing = "Today";
      visibilityScore = 85;
    } else {
      timing = `${Math.abs(daysDiff)} day${
        Math.abs(daysDiff) !== 1 ? "s" : ""
      } ago`;
      visibilityScore = 30;
    }

    return `
      <div class="detail-card">
        <div class="card-title">Astronomical Event</div>
        <div class="card-value">${this.currentEvent.title}</div>
        <div class="card-subvalue">${this.currentEvent.description}</div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          Event type: ${this.currentEvent.type.replace("_", " ")}<br>
          Date: ${eventDate.toLocaleDateString()}<br>
          Time: ${eventDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      
      <div class="detail-card">
        <div class="card-title">Viewing Information</div>
        <div class="card-value" style="color: ${this.getQualityColor(
          visibilityScore
        )}">
          ${visibilityScore}/100
        </div>
        <div style="margin-top: 10px; font-size: 13px; color: #a0b0c5;">
          Timing: ${timing}<br>
          Best viewing: Worldwide<br>
          Equipment: ${this.getRecommendedEquipment()}<br>
          Notes: Check local weather conditions
        </div>
      </div>
    `;
  }

  // Helper methods
  calculateMoonrise(lat, lon) {
    // Simplified moonrise calculation
    const times = SunCalc.getMoonTimes(new Date(), lat, lon);
    return times.rise
      ? times.rise.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No moonrise today";
  }

  getMoonPhaseAtTime(date) {
    const illumination = SunCalc.getMoonIllumination(date);
    if (illumination.fraction < 0.1) return "New Moon (dark)";
    if (illumination.fraction < 0.4) return "Crescent";
    if (illumination.fraction < 0.6) return "Quarter";
    if (illumination.fraction < 0.9) return "Gibbous";
    return "Full Moon (bright)";
  }

  getRecommendedEquipment() {
    switch (this.currentEvent.type) {
      case "solar_eclipse":
        return "Solar filters required";
      case "lunar_eclipse":
        return "Naked eye";
      case "meteor_shower":
        return "Naked eye, reclining chair";
      case "comet":
        return this.currentEvent.magnitude <= 6 ? "Binoculars" : "Telescope";
      case "planetary":
        return "Telescope for details, naked eye for conjunctions";
      default:
        return "Naked eye";
    }
  }

  getQualityColor(score) {
    if (score >= 80) return "#4CAF50";
    if (score >= 60) return "#8BC34A";
    if (score >= 40) return "#FFC107";
    if (score >= 20) return "#FF9800";
    return "#F44336";
  }

  getMoonPhaseName(phase) {
    if (phase < 0.03 || phase > 0.97) return "New Moon";
    if (phase < 0.22) return "Waxing Crescent";
    if (phase < 0.28) return "First Quarter";
    if (phase < 0.47) return "Waxing Gibbous";
    if (phase < 0.53) return "Full Moon";
    if (phase < 0.72) return "Waning Gibbous";
    if (phase < 0.78) return "Last Quarter";
    return "Waning Crescent";
  }

  searchLocation(query) {
    if (!query.trim()) {
      document.getElementById("searchResults").style.display = "none";
      return;
    }

    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = "";

    const searchTerm = query.toLowerCase();
    const filtered = this.jsonData.locations.filter((location) =>
      location.name.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-result-item" style="color: #a0b0c5; text-align: center; cursor: default;">
          No locations found
        </div>
      `;
    } else {
      filtered.forEach((location) => {
        const item = document.createElement("div");
        item.className = "search-result-item";
        item.innerHTML = `
          <div class="search-result-name">${location.name}</div>
          <div class="search-result-coords">${location.lat.toFixed(
            2
          )}°, ${location.lon.toFixed(2)}°</div>
        `;

        item.addEventListener("click", () => {
          this.selectLocation(location.lat, location.lon, location.name);
          resultsContainer.style.display = "none";
          document.getElementById("searchInput").value = "";
        });

        resultsContainer.appendChild(item);
      });
    }

    resultsContainer.style.display = "block";
  }

  selectInitialLocation() {
    // Select a location with good astronomical viewing
    const goodLocations = [
      { lat: 19.82, lon: -155.47, name: "Mauna Kea Observatory, Hawaii" },
      { lat: -29.26, lon: -70.73, name: "La Silla Observatory, Chile" },
      { lat: 35.68, lon: 139.76, name: "Tokyo, Japan" },
      { lat: 40.71, lon: -74.01, name: "New York, USA" },
    ];

    const randomLocation =
      goodLocations[Math.floor(Math.random() * goodLocations.length)];
    this.selectLocation(
      randomLocation.lat,
      randomLocation.lon,
      randomLocation.name
    );
  }

  showLoading(text = "Loading...") {
    document.getElementById("loadingText").textContent = text;
    document.getElementById("loadingOverlay").style.display = "flex";
    document.getElementById("progressFill").style.width = "0%";
  }

  hideLoading() {
    setTimeout(() => {
      document.getElementById("loadingOverlay").style.display = "none";
    }, 300);
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  window.app = new ComprehensiveAstroVisualizer();
});
