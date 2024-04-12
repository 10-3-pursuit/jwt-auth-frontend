import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { formatDate, getClimateColor } from "../Helpers/helpers";

const API = import.meta.env.VITE_BASE_URL;
const TripsIndex = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  const [trips, setTrips] = useState([]);

  // must do the fetch call like this
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}/api/trips`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTrips(data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, [trips]);

  const handleClick = (id) => {
    navigate(`/entries/${id}`);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="">Trips</h2>
        <button
          onClick={() => navigate("/trips/new")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded inline-block my-4 mr-4"
        >
          Add Trip
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mx-5 pt-10">
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
            entry_count,
          }) => (
            <div
              key={id}
              className="border-4 border-gray-950 mb-10 ml-3 rounded-lg"
            >
              <div className="destination">
                <h2
                  className={`${getClimateColor(
                    climate
                  )} text-2xl text-center rounded-sm px-3 mb-1`}
                >
                  {destination}
                </h2>
              </div>
              <div>Start Date:{formatDate(start_date)}</div>

              <p>End Date: {formatDate(end_date)}</p>
              <p>Budget: ${budget}</p>
              <p>Spent so far: ${total_cost}</p>
              <p className={climate}>Climate: {climate}</p>
              <p># of entries:{entry_count}</p>
              <button
                onClick={() => handleClick(id)}
                className="border-2 border-black-500 mb-2"
              >
                Click to see the entries
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TripsIndex;
