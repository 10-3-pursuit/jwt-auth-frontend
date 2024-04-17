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
    setTrip({ ...trip, [event.target.id]: event.target.value });
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
        <label
          className="flex justify-center mt-4 text-2xl font-semibold"
          htmlFor="destination"
        >
          Destination:
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
        <label htmlFor="start_date">Start Date:</label>
        {/* <div></div> */}
        <input
          id="start_date"
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleTextChange}
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />
        <label htmlFor="end_date">End Date:</label>
        <input
          id="end_date"
          type="date"
          name="end_date"
          value={end_date}
          onChange={handleTextChange}
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />
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
        {/* <label htmlFor="total_cost">Spent so far:</label>
        <input
          id="total_cost"
          value={total_cost}
          type="text"
          onChange={handleTextChange}
          placeholder="Enter amount spent so far"
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        /> */}
        <label htmlFor="climate">Climate:</label>
        <input
          id="climate"
          value={climate}
          type="text"
          onChange={handleTextChange}
          required
          placeholder="hot, cold, or tropical"
          className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
        />
        <br />
        {/* <input type="submit" />
         */}
        <div className="flex justify-between">
          <button className="bg-green-400 hover:bg-green-500 rounded-lg px-3 py-2 shadow-md w-1/2 mb-12 mr-2">
            Submit
          </button>
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
