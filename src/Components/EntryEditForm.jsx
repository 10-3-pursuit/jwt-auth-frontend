import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { formatDateToEdit } from "../Helpers/helpers";

const API = import.meta.env.VITE_BASE_URL;
const EntryEditForm = () => {
  const { user } = useOutletContext();
  const { id, tripID } = useParams();
  const navigate = useNavigate();

  const [entryToEdit, setEntryToEdit] = useState({
    user_id: user.id,
    trip_id: tripID,
    entry: "",
    total_spent: 0,
    entry_date: "",
  });

  // console.log(entryToEdit);
  const handleTextChange = (event) => {
    setEntryToEdit({ ...entryToEdit, [event.target.id]: event.target.value });
  };

  const updatedEntry = () => {
    fetch(`${API}/api/entries/single/${id}`, {
      method: "PUT",
      body: JSON.stringify(entryToEdit),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate(`/trips/${tripID}/entries/${id}`);
      })
      .catch((error) => console.log("catch", error));
  };

  useEffect(() => {
    fetch(`${API}/api/entries/single/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setEntryToEdit(data))
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updatedEntry();
  };

  // destructure the entry object
  const { entry, total_spent, entry_date } = entryToEdit;
  return (
    <div className="mt-24">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-136 grid gap-2 pt-2 rounded-2xl shadow-2xl border-2
          border-slate-200 px-4 mt-24 bg-slate-200"
        >
          <h2 className="text-center mt-2 text-3xl font-semibold ">
            Edit Your Entry
          </h2>

          <div className="flex justify-center mt-4 text-2xl font-semibold ">
            <label
              className="flex justify-center mt-4 text-2xl font-semibold mr-10 "
              htmlFor="entry_date"
            >
              Date:
            </label>
            <input
              id="entry_date"
              value={formatDateToEdit(entry_date)}
              type="date"
              name="entry_date"
              onChange={handleTextChange}
              required
              className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3"
            />
          </div>
          <label
            className="text-center mt-6 text-2xl font-semibold "
            htmlFor="entry"
          >
            Entry:
          </label>
          <div className="text-center text-2xl">
            <textarea
              style={{ resize: "none" }}
              id="entry"
              value={entry}
              type="text"
              name="entry"
              onChange={handleTextChange}
              placeholder="Enter entry"
              required
              className="mx-14 shadow-md w-3/4 h-60 p-2 border-2 border-black  hover:bg-white bg-zinc-100 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="total_spent"
              className="flex justify-center mt-4 text-2xl font-semibold"
            >
              Spent Today:
            </label>
            <div className="flex justify-center">
              <input
                id="total_spent"
                value={total_spent}
                type="number"
                name="total_spent"
                onChange={handleTextChange}
                required
                className="shadow-md border-2 border-black hover:bg-white bg-zinc-100 rounded-lg py-2 px-3 w-20 text-center text-xl font-semibold "
              />
            </div>
            <br />
          </div>

          <div className="flex justify-between">
            <input
              type="submit"
              className="bg-green-400 hover:bg-green-500 rounded-lg px-3 py-2 shadow-md w-1/2 mb-10 ml-2"
            />
            <button
              onClick={() => navigate(`/trips/${tripID}/entries/${id}`)}
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

export default EntryEditForm;
