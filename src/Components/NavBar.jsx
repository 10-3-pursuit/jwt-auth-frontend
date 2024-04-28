import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, [toggleLogin]);

  return (
    <div className=" flex justify-between bg-red-400 py-6">
      <Link to="/">
        <div className="flex items-center flex-row ml-5 text-white font-semibold">
          <Plane size={36} />
          <h1 className="text-3xl">JourneeJots</h1>
        </div>
      </Link>

      {!toggleLogin ? (
        <div className="ml-auto mr-5">
          <Link to={"/login"}>
            <span className="bg-white p-3 rounded-lg hover:bg-blue-400">
              Login
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex item-center ml-auto mr-5 pt-2">
          {user && (
            <span>
              Welcome, {user.username.toUpperCase()}!{" "}
              <Link onClick={handleLogout}>
                <span className="bg-white p-3 rounded-lg hover:bg-yellow-400 ml-3">
                  Logout
                </span>
              </Link>
            </span>
          )}
          {/* <div>
            <Link onClick={handleLogout}>
              <span className="bg-white p-3 rounded-lg hover:bg-yellow-400">
                Logout
              </span>
            </Link>
          </div> */}
        </div>
      )}
      <hr />
    </div>
  );
};

export default NavBar;
