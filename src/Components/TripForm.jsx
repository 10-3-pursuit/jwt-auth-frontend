import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;
const TripForm = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const [trip, setTrip] = useState({
    user_id: user.id,
    destination: "",
    first_time: false,
    start_date: "",
    end_date: "",
    budget: "",

    climate: "",
  });

  const addTrip = () => {
    fetch(`${API}/api/trips`, {
      method: "POST",
      body: JSON.stringify(trip),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/trips`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    const { id, value } = event.target;
    setTrip({ ...trip, [id]: value });
  };

  const handleCheckboxChange = () => {
    setTrip({ ...trip, first_time: !trip.first_time });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTrip();
  };

  //destructure the trip object
  const {
    destination,
    first_time,
    start_date,
    end_date,
    budget,
    // total_cost,
    climate,
  } = trip;

  return (
    <div className="flex justify-center">
      <form
        className="w-96 grid gap-2 pt-4 rounded-2xl shadow-2xl border-2
          border-slate-200 px-4 mt-24"
        onSubmit={handleSubmit}
      >
        {/* Destination Input */}
        <label
          className="flex justify-center mt-2 text-2xl font-semibold"
          htmlFor="destination"
        >
          <h2 className="text-center mt-2 text-3xl font-semibold ">
            Create a Trip
          </h2>
        </label>
        <input
          id="destination"
          value={destination}
          type="text"
          onChange={handleTextChange}
          placeholder="Enter Destination"
          required
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />
        {/* First Time Checkbox */}
        <label className="flex justify-center mt-4" htmlFor="first_time">
          First Time?
          <input
            id="first_time"
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={first_time}
            className="h-6 w-6 ml-6 "
          />
        </label>
        {/* Start Date */}
        <label htmlFor="start_date">Start Date:</label>
        <input
          id="start_date"
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleTextChange}
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />
        {/* End Date */}
        <label htmlFor="end_date">End Date:</label>
        <input
          id="end_date"
          type="date"
          name="end_date"
          value={end_date}
          onChange={handleTextChange}
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />
        {/* Budget  Input */}
        <label htmlFor="budget">Budget:</label>
        <input
          id="budget"
          name="budget"
          type="number"
          value={budget}
          onChange={handleTextChange}
          placeholder="Enter your budget"
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />

        {/* Climate Dropdown*/}
        <label htmlFor="climate">Choose a Climate:</label>
        <select
          name="climate"
          id="climate"
          value={climate}
          onChange={handleTextChange}
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        >
          <option value="---">---</option>
          <option value="hot">Hot</option>
          <option value="tropical">Tropical</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
        {/* Submit button */}
        <div className="flex justify-between">
          <button className="bg-green-400 hover:bg-green-500 rounded-lg px-3 py-2 shadow-md w-1/2 mb-12 mr-2">
            Submit
          </button>
          {/* Cancel Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-red-400 hover:bg-red-500 rounded-lg px-3 py-2 shadow-md w-1/2 mb-12 ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;
