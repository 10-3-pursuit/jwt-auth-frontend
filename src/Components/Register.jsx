import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Register = ({ setToggleLogin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    country: "",
  });

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/register`, options);

      if (!res.ok) throw new Error("Registration failed");
      const data = await res.json();

      if (data.token) {
        // in case there is an old token in the browser, remove it
        localStorage.removeItem("token");
        // set the new user's JWT token in the browser
        localStorage.setItem("token", data.token);
        setToggleLogin(true);
        navigate("/trips");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div className="flex justify-center mt-24">
      <form
        onSubmit={handleSubmit}
        className="w-96 grid gap-4 pt-8 pb-12 rounded-2xl shadow-2xl border-2
          border-slate-200 text-center "
      >
        <h1 className="text-2xl font-semibold">Register</h1>
        <label htmlFor="username">
          <input
            id="username"
            value={user.username}
            type="text"
            placeholder="username"
            onChange={handleChange}
            className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
          />
        </label>

        <label htmlFor="email">
          <input
            id="email"
            value={user.email}
            type="email"
            placeholder="email"
            onChange={handleChange}
            className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
          />
        </label>

        <label htmlFor="password">
          <input
            id="password"
            value={user.password}
            type="password"
            placeholder="password"
            onChange={handleChange}
            className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
          />
        </label>
        <label htmlFor="country">
          <input
            id="country"
            value={user.country}
            type="country"
            placeholder="country"
            onChange={handleChange}
            className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
          />
        </label>
        <div className="flex justify-center">
          <button className="bg-green-400 hover:bg-green-500 rounded px-2 py-3 shadow-md w-3/4">
            Submit
          </button>
        </div>
        <p className="text-center">
          Already have an account?
          <Link
            className=" text-blue-500 text-1xl text-center font-semibold"
            to="/login"
          >
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
