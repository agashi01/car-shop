import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AfterRegister({ page }) {
  return (
    
    <div className="div-box">
      <div>
        <p>You have been registered successfully!</p>
      </div>
      <div className="can-signIn">
        <p>You can sign in now</p>
        <button
          type="btn"
          className="btn2"
          onClick={(e) => {
            e.preventDefault();
            page("signIn");
          }}
        >
          Sign in 
        </button>
      </div>
    </div>
  );
}
