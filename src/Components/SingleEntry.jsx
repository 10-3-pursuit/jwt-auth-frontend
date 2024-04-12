import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDate, getClimateColor } from "../Helpers/helpers";

const API = import.meta.env.VITE_BASE_URL;

const SingleEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    <div>
      <div>
        <p>Spent Today: ${total_spent}</p>
      </div>
      <div className="flex justify-end">
        <h1>{formatDate(entry_date)}</h1>
      </div>

      <div>
        <p>{entry}</p>
      </div>
      <div className="flex justify-between mx-8">
        <button onClick={() => navigate(-1)} className="border-4 mt-20">
          Back
        </button>
        <button onClick={() => navigate("/trips")} className="border-4 mt-20">
          Home
        </button>
      </div>
    </div>
  );
};

export default SingleEntry;
