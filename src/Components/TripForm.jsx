import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;
const TripForm = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  const [trip, setTrip] = useState({
    user_id: user.id,
    destination: "",
    first_time: "",
    start_date: "",
    end_date: "",
    budget: "",
    total_cost: "",
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

  return (
    <div className="relative">
      <div
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dvmczcg3f/image/upload/v1711646017/books_being_books_jpg_ufdxkr.jpg')",
          backgroundSize: "cover",
        }}
      ></div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="destination">Destination:</label>
        <input
          id="destination"
          value={trip.destination}
          type="text"
          onChange={handleTextChange}
          placeholder="Enter Destination"
          required
        />

        <label htmlFor="first_time">First Time?</label>
        <input
          id="first_time"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={trip.first_time}
        />
        <label htmlFor="start_date">Start Date:</label>
        <input
          id="start_date"
          type="date"
          name="start_date"
          value={trip.start_date}
          onChange={handleTextChange}
        />
        <label htmlFor="end_date">End Date:</label>
        <input
          id="end_date"
          type="date"
          name="end_date"
          value={trip.end_date}
          onChange={handleTextChange}
        />
        <label htmlFor="budget">Budget:</label>
        <input
          id="budget"
          name="budget"
          type="number"
          value={trip.budget}
          onChange={handleTextChange}
        />
        <label htmlFor="total_cost">Cost:</label>
        <input
          id="total_cost"
          value={trip.total_cost}
          type="text"
          onChange={handleTextChange}
          required
        />
        <label htmlFor="climate">Climate:</label>
        <input
          id="climate"
          value={trip.climate}
          type="text"
          onChange={handleTextChange}
          required
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default TripForm;
