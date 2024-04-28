import { useEffect, useState } from "react";
import { formatDate } from "../Helpers/helpers";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { ArrowBigUpDash } from "lucide-react";
import { Trash2 } from "lucide-react";

// import TripForm from "./TripForm";

const API = import.meta.env.VITE_BASE_URL;
const EntriesIndex = () => {
  const navigate = useNavigate();
  const { tripID } = useParams();
  const [entries, setEntries] = useState([]);

  // work on making this nice in the future
  // const handleScrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const fetchEntries = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}/api/entries/${tripID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setEntries(data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = (entryId) => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/entries/${entryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setEntries(entries.filter((entry) => entry.id !== entryId));
        } else {
          throw new Error("Failed to delete entry");
        }
      })
      .catch((error) => console.error("Error deleting entry:", error));
  };

  return (
    <div className="">
      <div className="text-center mt-10  text-4xl font-semibold bg-slate-100 py-2 mx-6">
        <h1>Entries</h1>
      </div>
      <div className="flex justify-between mx-6 mb-24 mt-10">
        <Link to={`/trips/${tripID}/entries/new`}>
          <button className=" border-2 p-3 rounded-lg w-24 md:w-48 bg-green-500 hover:bg-green-600 text-white">
            Add Entry
          </button>
        </Link>
        <button
          onClick={() => navigate(-1)}
          className=" border-2 p-3 rounded-lg w-24 md:w-48 bg-slate-400 hover:bg-slate-500 text-white"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 m-6">
        {entries.map(({ id, entry_date, entry, total_spent }) => (
          <div
            className="pt-8 pb-12 rounded-2xl shadow-2xl border-2
          border-slate-200 p-2 "
            key={id}
          >
            <div className="flex justify-end ">
              <Trash2
                className="mb-2 hover:text-red-400"
                onClick={() => handleDelete(id)}
              />
            </div>
            <div className="flex justify-between">
              <p>Total Spent: ${total_spent}</p>
              <p>Date: {formatDate(entry_date)}</p>
            </div>
            <div className="flex justify-center">
              <p className="line-clamp-1">{entry}</p>
            </div>

            <div className="flex justify-center mt-4">
              <Link to={`/trips/${tripID}/entries/${id}`}>
                <button
                  type="button"
                  className="text-white bg-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 border-2 border-black-500 mb-2 ml-3 p-1 hover:bg-blue-500"
                >
                  View Entry
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntriesIndex;
