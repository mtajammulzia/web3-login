import React from "react";
import { Signup, Login } from "../components";

function Home() {
  return (
    <div className="home-page">
      <Login />
      <div className="separating-line" />
      <Signup />
    </div>
  );
}

export default Home;
