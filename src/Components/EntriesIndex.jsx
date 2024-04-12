import { useEffect, useState } from "react";
import { formatDate } from "../Helpers/helpers";
import { Link, useParams } from "react-router-dom";
import { ArrowBigUpDash } from "lucide-react";
import TripForm from "./TripForm";

const API = import.meta.env.VITE_BASE_URL;
const EntriesIndex = () => {
  const { tripID } = useParams();
  const [entries, setEntries] = useState([]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // must do the fetch call like this
  useEffect(() => {
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
  }, []);

  // return <div>hello</div>;
  return (
    <div>
      <div>
        {entries.map(({ id, entry_date, entry, total_spent }) => (
          <div className="border-2 border-emerald-500 mb-5" key={id}>
            <div className="flex justify-between">
              <p>Total Spent: ${total_spent}</p>
              <p>Date: {formatDate(entry_date)}</p>
            </div>
            <div className="flex justify-center">
              <p className="line-clamp-1">{entry}</p>
            </div>

            <div className="flex justify-center">
              <Link to={`/entries/single/${id}`}>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 border-2 border-black-500 mb-2 ml-3 p-1"
                >
                  View Entry
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Link to={`/entries/new/${tripID}`}>
          <button className=" border-2">Add Entry</button>
        </Link>
        <ArrowBigUpDash
          onClick={handleScrollToTop}
          id="myBtn"
          title="Go to top"
        />
      </div>
    </div>
  );
};

export default EntriesIndex;
