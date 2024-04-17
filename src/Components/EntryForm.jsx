import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useParams } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const EntryForm = () => {
  const { tripID } = useParams();

  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [entry, setEntry] = useState({
    user_id: user.id,
    trip_id: tripID,
    entry_date: "",
    entry: "",
    total_spent: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // backend
    fetch(`${API}/api/entries`, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // frontend
        navigate(`/trips/${tripID}/entries`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setEntry({ ...entry, [event.target.id]: event.target.value });
  };

  return (
    <div className="mt-24">
      <h1 className="text-center mb-10 text-3xl font-semibold ">
        Create an Entry
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-yellow-400 rounded-md w-136 p-3"
        >
          <label htmlFor="entry">Entry:</label>
          <textarea
            style={{ resize: "none" }}
            id="entry"
            value={entry.entry}
            type="text"
            name="entry"
            onChange={handleTextChange}
            placeholder="Enter entry"
            required
          />

          <label htmlFor="total_spent">Amount Spent Today:</label>
          <input
            id="total_spent"
            value={entry.total_spent}
            type="number"
            name="total_spent"
            onChange={handleTextChange}
            required
          />
          <label htmlFor="entry_date">Date:</label>
          <input
            id="entry_date"
            value={entry.entry_date}
            type="date"
            name="entry_date"
            onChange={handleTextChange}
            required
          />

          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
