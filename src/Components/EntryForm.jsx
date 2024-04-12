import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";\
import { useParams } from "react-router-dom";
const API = import.meta.env.VITE_BASE_URL;

const EntryForm = () => {
  const {tripId} = useParams()
  console.log(API);
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [entry, setEntry] = useState({
    user_id: user.id,
    trip_id:tripId,
    entry_date: "",
    entry: "",
    total_spent: 0,
  });

  const addEntry = () => {
    fetch(`${API}/api/entries`, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/api/entries`);
      })
      .catch((error) => console.error("catch", error));
  };

  const handleTextChange = (event) => {
    setEntry({ ...entry, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addEntry();
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

        <label htmlFor="total_spent">Spent Today:</label>
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
  );
};

export default EntryForm;
