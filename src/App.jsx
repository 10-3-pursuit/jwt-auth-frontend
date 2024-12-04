import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";
import TripsIndex from "./Components/TripsIndex";
// import NewTrip from "./Components/TripForm";
// import Entries from "./Components/EntriesIndex";
import EntriesIndex from "./Components/EntriesIndex";
import SingleEntry from "./Components/SingleEntry";
import TripForm from "./Components/TripForm";
import EntryForm from "./Components/EntryForm";
import EntryEditForm from "./Components/EntryEditForm";
import TripEditForm from "./Components/TripEditForm";

// const API = import.meta.env.VITE_BASE_API;

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
          <Route path="/trips" element={<TripsIndex />} />
          <Route path="/trips/new" element={<TripForm />} />
          <Route path="/trips/:id" element={<TripEditForm />} />
          <Route path="/trips/:tripID/entries/new" element={<EntryForm />} />
          <Route
            path="/trips/:tripID/entries/:id/edit"
            element={<EntryEditForm />}
          />
          <Route path="/trips/:tripID/entries" element={<EntriesIndex />} />
          <Route path="/trips/:tripID/entries/:id" element={<SingleEntry />} />

          {/* <Route path="/trips/new" element={<NewTrip />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
