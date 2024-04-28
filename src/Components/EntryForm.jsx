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
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-136 grid gap-2 pt-2 rounded-2xl shadow-2xl border-2
          border-slate-200 px-4 mt-24 bg-slate-200"
        >
          <h2 className="text-center mt-2 text-3xl font-semibold ">
            Create an Entry
          </h2>
          <div className="flex justify-center mt-4 text-2xl font-semibold ">
            <label
              className="flex justify-center mt-4 text-2xl font-semibold mr-10"
              htmlFor="entry_date"
            >
              Date:
            </label>
            <input
              id="entry_date"
              value={entry.entry_date}
              type="date"
              name="entry_date"
              onChange={handleTextChange}
              required
              className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
            />
          </div>
          <label
            className="text-center mt-6 text-2xl font-semibold"
            htmlFor="entry"
          >
            Entry:
          </label>
          <div className="rounded-lg  text-center text-2xl">
            <textarea
              style={{ resize: "none" }}
              id="entry"
              value={entry.entry}
              type="text"
              name="entry"
              onChange={handleTextChange}
              placeholder="Record entry"
              required
              className="rounded-lg mx-14  shadow-md w-3/4 h-60 p-2 border-2 border-black  hover:bg-white bg-zinc-100 "
            />
          </div>
          <div>
            <label
              className="flex justify-center mt-4 text-2xl font-semibold"
              htmlFor="total_spent"
            >
              Amount Spent Today:
            </label>
          </div>
          <div className="flex justify-center">
            <input
              id="total_spent"
              value={entry.total_spent}
              type="number"
              name="total_spent"
              onChange={handleTextChange}
              required
              // className="mt-10 w-10"
              className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3 w-20 text-center text-2xl font-semibold "
            />
          </div>

          <br />
          <div className="flex justify-between">
            <input
              type="submit"
              className="bg-green-400 hover:bg-green-500 rounded-lg px-3 py-2 shadow-md w-1/2 mb-10 ml-2"
            />
            <button
              onClick={() => navigate(-1)}
              className="bg-red-400 hover:bg-red-500 rounded-lg px-3 py-2 shadow-md w-1/2 mb-10 ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EntryForm;
