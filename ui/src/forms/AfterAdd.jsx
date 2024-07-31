import React from "react";

// eslint-disable-next-line react/prop-types
export default function AfterAdd({ page }) {
  return (
    <div>
      <div>
        <p>Your car has been created and published!</p>
      </div>
      <div className="can-signIn">
        <button
          type="btn"
          className="btn2"
          onClick={(e) => {
            e.preventDefault();
            page("home");
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}
