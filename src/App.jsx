import { useEffect, useState } from "react";

function App() {
  const [moonPhase, setMoonPhase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&daily=moon_phase&timezone=auto"
    )
      .then((res) => res.json())
      .then((data) => {
        setMoonPhase(data.daily.moon_phase[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading Moon Phase...</h2>;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🌙 Moon Phase Tracker</h1>
      <h2>Today's Moon Phase</h2>

      <p style={{ fontSize: "18px" }}>
        Phase value: <b>{moonPhase}</b>
      </p>

      <p>
        (0 = New Moon, 0.5 = Full Moon, 1 = New Moon)
      </p>
    </div>
  );
}

export default App;
