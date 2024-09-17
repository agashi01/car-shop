import React from "react";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function AfterAdd({ page }) {
  return (
    <div className="div-box">
      <div>
        <p>Your car has been created and published!</p>
      </div>
      <div>
        <p>You Can Go Home</p>
        <button
          type="btn"
          className="btn2"
          onClick={(e) => {
            e.preventDefault();
            page("home");
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
