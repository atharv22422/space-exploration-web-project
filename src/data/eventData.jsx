// export const eventData = [
//   /* ===================== SOLAR ECLIPSE ===================== */
//   {
//     id: "solar-eclipse-2024",
//     type: "SOLAR SYSTEM | ECLIPSE",
//     title: "Total Solar Eclipse",
//     summary:
//       "A rare event where the Moon completely blocks the Sun, briefly turning day into night.",
//     description:
//       "A total solar eclipse occurs when the Moon passes directly between Earth and the Sun, fully obscuring the solar disk. This allows scientists to study the Sun’s corona and provides a breathtaking visual experience.",
//     date: "April 8, 2024",
//     visibility: "North America",
//     status: "Occurred",
//     image:
//       "https://static.toiimg.com/thumb/msid-109126932,imgsize-10936,width-1200,resizemode-4/109126932.jpg",

//     table: [
//       ["Event Type", "Total Solar Eclipse"],
//       ["Cause", "Moon blocking the Sun"],
//       ["Maximum Duration", "4 minutes"],
//       ["Scientific Value", "Solar corona observation"],
//     ],

//     keyDates: [["Apr 8, 2024", "Totality observed"]],

//     inDepth: [
//       "Total solar eclipses only occur when the Moon is perfectly aligned with Earth and the Sun.",
//       "During totality, the Sun’s outer atmosphere becomes visible.",
//       "Such eclipses are critical for solar physics research.",
//     ],

//     resources: ["NASA Eclipse Explorer", "NASA Solar System Observatory"],

//     source: "NASA Solar System Division",
//   },

//   /* ===================== METEOR SHOWER ===================== */
//   {
//     id: "perseids-2025",
//     type: "METEORS | SHOWER",
//     title: "Perseids Meteor Shower",
//     summary: "One of the brightest annual meteor showers, active every August.",
//     description:
//       "The Perseids occur as Earth passes through debris left behind by Comet Swift–Tuttle, producing fast, bright meteors and frequent fireballs.",
//     date: "Aug 12–13, 2025",
//     visibility: "Northern Hemisphere",
//     status: "Upcoming",
//     image:
//       "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar-system/skywatching/evergreen-images/Perseids_2024_Preston_Dyches.jpg",

//     table: [
//       ["Meteor Rate", "Up to 100/hour"],
//       ["Parent Comet", "109P/Swift–Tuttle"],
//       ["Speed", "59 km/s"],
//       ["Best Viewing", "After midnight"],
//     ],

//     keyDates: [["Aug 12–13, 2025", "Peak activity"]],

//     inDepth: [
//       "Perseids are known for their speed and brightness.",
//       "They leave long, glowing trails in the night sky.",
//       "Minimal moonlight improves visibility significantly.",
//     ],

//     resources: ["NASA Meteor Watch", "International Meteor Organization"],

//     source: "NASA Meteoroid Environment Office",
//   },

//   /* ===================== LUNAR ECLIPSE ===================== */
//   {
//     id: "lunar-eclipse-2025",
//     type: "ECLIPSE | LUNAR",
//     title: "Total Lunar Eclipse",
//     summary:
//       "A celestial event where the Moon turns red as it enters Earth’s shadow.",
//     description:
//       "During a total lunar eclipse, Earth blocks sunlight from reaching the Moon. The Moon appears red due to sunlight filtering through Earth’s atmosphere.",
//     date: "Mar 14–15, 2025",
//     visibility: "Asia, Europe, Australia, Africa",
//     status: "Upcoming",
//     image:
//       "https://science.nasa.gov/wp-content/uploads/2023/08/total-eclipse.png",

//     table: [
//       ["Event Type", "Total Lunar Eclipse"],
//       ["Color Effect", "Blood Moon"],
//       ["Viewing Safety", "Safe to view"],
//       ["Duration", "Several hours"],
//     ],

//     keyDates: [["Mar 14–15, 2025", "Totality phase"]],

//     inDepth: [
//       "Lunar eclipses are safe to observe without protection.",
//       "The red color is caused by Rayleigh scattering.",
//       "They provide insight into Earth’s atmospheric composition.",
//     ],

//     resources: ["NASA Moon Observatory", "Time and Date Eclipse Guide"],

//     source: "NASA Lunar Science Institute",
//   },

//   /* ===================== AURORA ===================== */
//   {
//     id: "aurora-borealis",
//     type: "ATMOSPHERIC | AURORA",
//     title: "Aurora Borealis",
//     summary:
//       "A natural light display caused by solar particles interacting with Earth’s magnetic field.",
//     description:
//       "Auroras occur when charged particles from the Sun collide with gases in Earth’s atmosphere, producing shimmering curtains of light.",
//     date: "Ongoing",
//     visibility: "High Latitude Regions",
//     status: "Ongoing",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaEff17WkyTp7tk3GdG2YEqawQ6xdNcrIRmdTWpYSqPkLmBwOktj9CQZ7SrKb3M42zr1otf",

//     table: [
//       ["Primary Colors", "Green, Red, Purple"],
//       ["Cause", "Solar wind interaction"],
//       ["Best Locations", "Polar regions"],
//       ["Activity Cycle", "Solar cycle dependent"],
//     ],

//     keyDates: [["Ongoing", "Active during solar maximum"]],

//     inDepth: [
//       "Auroras are strongest during geomagnetic storms.",
//       "Different gases create different colors.",
//       "They are visible near the magnetic poles.",
//     ],

//     resources: ["NOAA Aurora Forecast", "NASA Space Weather"],

//     source: "NOAA Space Weather Prediction Center",
//   },

//   /* ===================== SOLAR STORM ===================== */
//   {
//     id: "solar-storm-g3",
//     type: "SOLAR ACTIVITY | SOLAR STORM",
//     title: "Strong Solar Storm (G3)",
//     summary:
//       "A geomagnetic storm caused by a coronal mass ejection impacting Earth.",
//     description:
//       "This G3-class storm disturbed Earth’s magnetosphere and had the potential to affect satellites, navigation systems, and power infrastructure.",
//     date: "Observed: Jan 14, 2026",
//     visibility: "High Latitudes",
//     status: "Observed",
//     image:
//       "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001434/GSFC_20171208_Archive_e001434~orig.jpg",

//     table: [
//       ["Storm Level", "G3 (Strong)"],
//       ["Cause", "Coronal Mass Ejection"],
//       ["Potential Impact", "Power & GPS disruption"],
//       ["Observed By", "NASA / NOAA"],
//     ],

//     keyDates: [["Jan 14, 2026", "Storm detected"]],

//     inDepth: [
//       "Solar storms are driven by solar magnetic activity.",
//       "Strong storms can induce electrical currents on Earth.",
//       "Monitoring helps protect modern infrastructure.",
//     ],

//     resources: ["NOAA Space Weather Center", "NASA Solar Dynamics Observatory"],

//     source: "NASA & NOAA Space Weather Reports",
//   },

//   /* ===================== GAMMA RAY BURST ===================== */
//   {
//     id: "grb-260112a",
//     type: "HIGH-ENERGY | GAMMA-RAY BURST",
//     title: "Short Gamma-Ray Burst (GRB 260112A)",
//     summary: "A brief but extremely powerful burst of gamma radiation.",
//     description:
//       "GRB 260112A was detected by space observatories and is believed to be caused by the merger of two neutron stars.",
//     date: "Detected: Jan 12, 2026",
//     visibility: "Deep Space",
//     status: "Detected",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gamma_ray_burst.jpg/500px-Gamma_ray_burst.jpg",

//     table: [
//       ["Burst Type", "Short-duration GRB"],
//       ["Duration", "< 2 seconds"],
//       ["Origin", "Neutron star merger"],
//       ["Detected By", "Fermi / Swift"],
//     ],

//     keyDates: [["Jan 12, 2026", "Burst detected"]],

//     inDepth: [
//       "Gamma-ray bursts are the most energetic explosions known.",
//       "Short GRBs originate from compact object mergers.",
//       "They help test theories of extreme physics.",
//     ],

//     resources: ["NASA Fermi Telescope", "Swift Observatory"],

//     source: "NASA Astrophysics Data System",
//   },

//   /* ===================== ARTEMIS II ===================== */
//   {
//     id: "artemis-ii",
//     type: "HUMAN SPACEFLIGHT | LUNAR MISSION",
//     title: "Artemis II",
//     summary: "NASA’s first crewed Artemis mission to test deep-space systems.",
//     description:
//       "Artemis II will carry astronauts around the Moon to validate spacecraft systems and prepare for future lunar landings.",
//     date: "Planned: 2025",
//     visibility: "Cislunar Space",
//     status: "Planned",
//     image:
//       "http://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Artemis_II_Orion_Solar_Array_Wings_Installed_%28jsc2025e016293%29.jpg",

//     table: [
//       ["Mission Type", "Crewed lunar flyby"],
//       ["Spacecraft", "Orion"],
//       ["Launch Vehicle", "SLS"],
//       ["Agency", "NASA"],
//     ],

//     keyDates: [["2025", "Planned launch"]],

//     inDepth: [
//       "Artemis II builds on Artemis I’s uncrewed success.",
//       "It will validate life-support systems in deep space.",
//       "The mission is key to sustained lunar exploration.",
//     ],

//     resources: ["NASA Artemis Program"],

//     source: "NASA Human Exploration Program",
//   },

//   /* ===================== PERSEVERANCE ===================== */
//   {
//     id: "perseverance",
//     type: "PLANETARY SCIENCE | ROVER MISSION",
//     title: "Mars Perseverance Rover",
//     summary: "A robotic rover exploring Mars for signs of ancient life.",
//     description:
//       "Perseverance studies Mars’ geology, collects rock samples, and searches for biosignatures in Jezero Crater.",
//     date: "Launched: Jul 30, 2020",
//     visibility: "Mars",
//     status: "Operational",
//     image:
//       "https://science.nasa.gov/wp-content/uploads/2017/12/pia26344-perseverance-selfie-at-cheyava-mars2020home-1920x640-1.jpg",

//     table: [
//       ["Landing Site", "Jezero Crater"],
//       ["Mission Goal", "Search for life"],
//       ["Power Source", "MMRTG"],
//       ["Agency", "NASA"],
//     ],

//     keyDates: [["Feb 18, 2021", "Mars landing"]],

//     inDepth: [
//       "Perseverance collects samples for future return missions.",
//       "It carries advanced scientific instruments.",
//       "The rover also tests oxygen production on Mars.",
//     ],

//     resources: ["NASA Mars Exploration Program"],

//     source: "NASA Jet Propulsion Laboratory",
//   },

//   /* ===================== JWST ===================== */
//   {
//     id: "jwst",
//     type: "SPACE ASTRONOMY | SPACE TELESCOPE",
//     title: "James Webb Space Telescope",
//     summary: "A next-generation observatory studying the universe in infrared.",
//     description:
//       "JWST enables unprecedented studies of early galaxies, exoplanets, and stellar evolution using infrared observations.",
//     date: "Launched: Dec 25, 2021",
//     visibility: "Deep Space",
//     status: "Operational",
//     image:
//       "https://science.nasa.gov/wp-content/uploads/2024/05/jwst_artist_concept_0.png",

//     table: [
//       ["Orbit", "Sun–Earth L2"],
//       ["Primary Mirror", "6.5 meters"],
//       ["Operators", "NASA / ESA / CSA"],
//     ],

//     keyDates: [
//       ["Dec 25, 2021", "Launch"],
//       ["Jul 12, 2022", "First images released"],
//     ],

//     inDepth: [
//       "JWST succeeds the Hubble Space Telescope.",
//       "It observes infrared light to see through cosmic dust.",
//       "The telescope studies the universe’s earliest epochs.",
//     ],

//     resources: ["NASA JWST Mission Page", "ESA Webb Telescope"],

//     source: "NASA Goddard Space Flight Center",
//   },

//   {
//     id: "x-class-solar-flare-2026", // ✅ Unique string ID for routing
//     type: "SOLAR ACTIVITY | SOLAR FLARE",
//     title: "X-Class Solar Flare",
//     summary:
//       "An extremely powerful solar flare capable of disrupting radio communications and affecting satellites.",
//     description:
//       "X-Class solar flares are the most intense type of solar flares. They release massive amounts of energy, potentially causing radio blackouts, GPS disruptions, and impacts on power grids on Earth. Scientists monitor these events to understand the Sun’s activity and prepare mitigation strategies for technological systems.",
//     date: "Observed: Jan 10, 2026",
//     visibility: "Sun-facing Earth",
//     status: "Observed",
//     image:
//       "https://cdn.mos.cms.futurecdn.net/uqRSZnQLgaPw8Mx7csKQsX-970-80.jpg.webp",

//     table: [
//       ["Flare Class", "X-Class (Extreme)"],
//       ["Cause", "Sudden release of magnetic energy in the Sun's atmosphere"],
//       [
//         "Potential Impact",
//         "Radio communication disruption, satellite effects, geomagnetic storms",
//       ],
//       ["Observed By", "NASA / NOAA Solar Observatories"],
//     ],

//     keyDates: [
//       ["Jan 10, 2026", "Flare detected"],
//       ["Jan 11, 2026", "Peak radiation observed"],
//     ],

//     inDepth: [
//       "X-Class flares are the most energetic solar events, capable of affecting Earth’s magnetosphere.",
//       "They are monitored using space-based solar observatories like NASA's Solar Dynamics Observatory.",
//       "Understanding these flares is critical for predicting space weather and protecting technological infrastructure.",
//       "These flares often accompany coronal mass ejections (CMEs) that can trigger geomagnetic storms.",
//       "Strong X-Class flares can produce high-frequency radio blackouts on Earth’s sunlit side.",
//       "They are classified based on peak X-ray flux measured in the 1–8 Å wavelength range.",
//       "X-Class flares are relatively rare, occurring typically a few times per solar cycle.",
//       "Solar physicists study these flares to improve forecasting models for space weather.",
//       "Observations help in understanding the Sun’s magnetic field dynamics.",
//       "They provide insight into extreme plasma physics conditions not reproducible on Earth.",
//     ],

//     resources: [
//       "NASA Solar Dynamics Observatory",
//       "NOAA Space Weather Prediction Center",
//       "ESA Solar Orbiter Mission",
//     ],

//     source: "NASA / NOAA Solar Activity Reports",
//   },
// ];

export const eventData = [
  /* ===================== SOLAR ECLIPSE ===================== */
  {
    id: "solar-eclipse-2024",
    type: "SOLAR SYSTEM | ECLIPSE",
    title: "Total Solar Eclipse",

    summary:
      "A rare and dramatic celestial event in which the Moon completely blocks the Sun, turning daytime skies dark for a brief period. This phenomenon offers both a spectacular visual experience and a valuable opportunity for scientific observation.",

    Subheading:
      "The April 8, 2024 total solar eclipse was one of the most significant astronomical events of the decade, drawing global attention from scientists, skywatchers, and the general public. Its wide path of totality across North America made it exceptionally accessible and scientifically important.",

    description:
      "A total solar eclipse occurs when the Moon passes precisely between Earth and the Sun, completely covering the Sun’s bright surface. During this alignment, the Sun’s outer atmosphere, known as the corona, becomes visible to the naked eye. The April 8, 2024 eclipse followed a narrow path of totality across North America, offering several minutes of darkness in some regions. Such events are rare at any given location due to the precise orbital conditions required. Beyond its visual beauty, the eclipse provided researchers with a natural laboratory to study solar behavior. Observations during eclipses help improve understanding of solar radiation and space weather.",

    date: "April 8, 2024",
    visibility: "North America",
    status: "Occurred",
    image:
      "https://static.toiimg.com/thumb/msid-109126932,imgsize-10936,width-1200,resizemode-4/109126932.jpg",

    table: [
      ["Event Type", "Total Solar Eclipse"],
      ["Cause", "Moon blocking the Sun"],
      ["Maximum Duration", "Up to 4 minutes"],
      ["Scientific Value", "Direct observation of the solar corona"],
    ],

    keyDates: [["Apr 8, 2024", "Totality observed across North America"]],

    inDepth: [
      "A total solar eclipse is the result of a rare celestial alignment involving the Sun, Moon, and Earth. Although the Sun is about 400 times larger than the Moon, it is also roughly 400 times farther away, allowing the Moon to perfectly cover the Sun during totality. This precise alignment does not occur during every new moon, as the Moon’s orbit is slightly tilted relative to Earth’s orbit. When totality is achieved, the sky darkens dramatically, temperatures can drop, and stars may become visible. These conditions make total solar eclipses among the most striking natural phenomena observable from Earth.",

      "Scientifically, total solar eclipses provide a unique opportunity to study the Sun’s corona, which is normally hidden by the Sun’s intense brightness. The corona plays a crucial role in solar wind generation and space weather phenomena that can affect Earth’s satellites, communication systems, and power grids. Instruments on the ground and in space are used together during eclipses to gather high-resolution data. The April 8, 2024 eclipse allowed coordinated observations across multiple research institutions, enhancing our understanding of solar magnetic fields and plasma behavior.",

      "Beyond science, total solar eclipses have cultural, educational, and societal significance. Millions of people traveled to experience totality, making it one of the most widely observed astronomical events in recent history. Public engagement during eclipses increases awareness of astronomy and space science. Educational institutions and space agencies use such events to promote scientific literacy and curiosity. The April 2024 eclipse demonstrated how rare cosmic events can unite scientific research and public fascination on a global scale.",
    ],

    resources: [
      "NASA Eclipse Explorer",
      "NASA Solar System Observatory",
      "NOAA Space Weather Prediction Center",
      "Time and Date Eclipse Guide",
    ],

    source:
      "NASA Solar System Division | https://science.nasa.gov/eclipses | https://eclipse.gsfc.nasa.gov | NOAA Space Weather Prediction Center (https://www.swpc.noaa.gov)",
  },
];
