import React, { useContext } from "react";
import { UserContext } from "../store/UserContext";
import { Link } from "react-router-dom";

export function Landing() {
  const handleLogout = () => {
    const loggedOutUser = {
      address: "",
      accessToken: "",
    };
    auth.setUser(loggedOutUser);
    localStorage.setItem("user", JSON.stringify(loggedOutUser));
  };
  const auth = useContext(UserContext);
  return auth.user.accessToken ? (
    <div className="landing-page">
      <h3>
        Welcomme <br></br> {auth.user.username}
      </h3>
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  ) : (
    <div>
      <h2>You are not logged in, please log in at</h2>
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Landing;
