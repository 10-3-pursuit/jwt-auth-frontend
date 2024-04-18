import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { formatDate, getClimateColor } from "../Helpers/helpers";
import { Trash2, MapPin, MapPinOff } from "lucide-react";

const API = import.meta.env.VITE_BASE_URL;
const TripsIndex = () => {
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
  }, [user]);

  const handleClick = (id) => {
    navigate(`/trips/${id}/entries`);
  };

  const handleDelete = (tripId) => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/trips/${tripId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted trip from the state
          setTrips(trips.filter((trip) => trip.id !== tripId));
        } else {
          throw new Error("Failed to delete trip");
        }
      })
      .catch((error) => console.error("Error deleting trip:", error));
  };

  return (
    <div>
      <div className="text-center mt-12 text-4xl font-semibold bg-slate-100 py-2 mx-6">
        <h1>Trips</h1>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/trips/new")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded inline-block my-4 mr-6 mt-14 w-1/6"
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
            // total_cost,
            climate,
            entry_count,
          }) => (
            <div
              key={id}
              className="border-4 border-gray-950 mb-10 ml-3 rounded-lg"
            >
              <div>
                <h2
                  className={`${getClimateColor(
                    climate
                  )} text-2xl flex items-center rounded-sm px-3`}
                >
                  {destination}
                  <div className="flex ml-auto">
                    <h3 className="mr-2">
                      {first_time ? (
                        <span>
                          <MapPinOff size={24} />
                        </span>
                      ) : (
                        <MapPin size={24} />
                      )}
                    </h3>

                    <Trash2
                      className="hover:text-white"
                      size={24}
                      onClick={() => handleDelete(id)}
                    />
                  </div>
                </h2>
              </div>
              <div className="p-2">
                <div>Start Date:{formatDate(start_date)}</div>

                <p>End Date: {formatDate(end_date)}</p>
                <p>Budget: ${budget}</p>
                {/* <p>Spent so far: ${total_cost}</p> */}
                <p className={climate}>Climate: {climate}</p>
                <p># of entries:{entry_count}</p>
                <div className="flex justify-center mt-2 pb-2">
                  <button
                    onClick={() => handleClick(id)}
                    className="bg-green-300  rounded p-1 hover:bg-slate-200 w-1/3 mr-8"
                  >
                    Entries
                  </button>

                  <button
                    onClick={() => navigate(`/trips/${id}`)}
                    className="bg-orange-300 rounded p-1 hover:bg-slate-200 w-1/3"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TripsIndex;
