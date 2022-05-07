import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <Link to="/home">
        <button className="button">
          <span> Lets go!</span>
        </button>
      </Link>
    </div>
  );
}
