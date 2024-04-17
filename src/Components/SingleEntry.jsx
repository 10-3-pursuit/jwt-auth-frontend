import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate, getClimateColor } from "../Helpers/helpers";
import { PencilLine } from "lucide-react";
import { Home } from "lucide-react";
import { SquareChevronLeft } from "lucide-react";

const API = import.meta.env.VITE_BASE_URL;

const SingleEntry = () => {
  const navigate = useNavigate();
  const { id, tripID } = useParams();
  const [oneEntry, setOneEntry] = useState({});

  // create
  useEffect(() => {}, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${API}/api/entries/single/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setOneEntry(data);
        })
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  const { entry_date, entry, total_spent } = oneEntry;
  return (
    <div className="flex justify-center">
      <div className="mx-10 mt-24 border-2 border-black p-4 w-168 md:w-192 ">
        <div className="flex justify-end">
          <PencilLine
            size={36}
            className="m-3 hover:text-slate-400"
            onClick={() => navigate(`/trips/${tripID}/entries/${id}/edit`)}
          />
        </div>
        <div className="px-10">
          <div className="flex justify-start  mb-8">
            <h1 className="text-lg font-serif">{formatDate(entry_date)}</h1>
          </div>

          <div>
            <p className="text-lg font-serif">{entry}</p>
          </div>
          <div className="inline-block bg-green-200  px-3 mb-1 mt-8">
            <p className="text-lg font-serif">Spent Today: ${total_spent}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className=" hover:text-slate-400 mt-20  p-4"
          >
            <SquareChevronLeft size={36} />
          </button>

          <button
            onClick={() => navigate("/trips")}
            className="mt-20 p-4 hover:text-slate-400"
          >
            <Home size={36} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleEntry;
