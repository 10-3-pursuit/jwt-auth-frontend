import { useEffect, useState } from "react";
import { formatDate, getClimateColor } from "../Helpers/helpers";
const API = import.meta.env.VITE_BASE_URL;
const TripsIndex = () => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    fetch(`${API}/api/trips`).then((res) =>
      res.json().then((data) => setTrips(data))
    );
  }, []);

  return (
    <div>
      <h1>Destinations</h1>
      <div>
        {trips.map(
          ({
            id,
            destination,
            first_time,
            start_date,
            end_date,
            budget,
            total_cost,
            climate,
          }) => (
            <div id={id}>
              <h2>{destination}</h2>
              <p>Start Date:{formatDate(start_date)}</p>
              <p>End Date: {formatDate(end_date)}</p>
              <p>Budget: ${budget}</p>
              <p>Total Cost: ${total_cost}</p>
              <p className={getClimateColor(climate)}>Climate: {climate}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TripsIndex;
