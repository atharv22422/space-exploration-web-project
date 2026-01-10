import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Donki API endpoint for solar flares
    const apiUrl = "https://services.swpc.noaa.gov/json/solar_flares.json";

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>Solar Flares Data 🌞</h1>
      {data ? (
        <div>
          <h2>Latest Solar Flares:</h2>
          <ul>
            {data.map((flare, index) => (
              <li key={index}>
                <strong>Time:</strong> {flare.time} <br />
                <strong>Class:</strong> {flare.class_type} <br />
                <strong>Region:</strong> {flare.region}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading solar flares data...</p>
      )}
    </div>
  );
}

export default App;
