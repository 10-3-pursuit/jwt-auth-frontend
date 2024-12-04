import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const Login = ({ setToggleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.id]: event.target.value });
  }
  // This function is being used in two places. It can be extracted to a helpers.js file

  async function postFetch(user) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    };

    try {
      const res = await fetch(`${URL}/api/auth/login`, options);
      const data = await res.json();

      if (!res.ok) {
        alert("Login failed");
        setUser({ username: "", password: "" });
        throw new Error("Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        await setToggleLogin(true);
        navigate("/trips");
      } else {
        console.log("JWT Login Failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  // Login Function
  async function handleSubmit(e) {
    e.preventDefault();
    if (!user.username || !user.password) {
      alert("You must enter a username and password");
      return;
    }
    postFetch(user);
  }

  //Demo User Login Function
  async function handleDemoSignIn(e) {
    e.preventDefault();
    const user = { username: "demoUser", password: "olivia123" };
    postFetch(user);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <br />

      <button
        className="border-2 rounded-md p-1 bg-violet-300 hover:bg-violet-400 mb-6"
        onClick={handleDemoSignIn}
      >
        Demo User
      </button>

      <div className="flex justify-center">
        <form
          className="w-96 grid gap-4 pt-8 pb-12 rounded-2xl shadow-2xl border-2
          border-slate-200"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center font-semibold ">Login</h2>
          <label htmlFor="username">
            <input
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
              id="username"
              value={user.username}
              type="text"
              placeholder="username"
              autoComplete="username"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password">
            <input
              className="hover:bg-slate-100 rounded py-3 shadow-md w-3/4 pl-3"
              id="password"
              value={user.password}
              type="password"
              placeholder="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </label>
          <div className="flex justify-center">
            <button className="bg-green-400 hover:bg-slate-200 rounded px-2 py-3 shadow-md w-3/4">
              Submit
            </button>
          </div>
          <p>
            No Account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
