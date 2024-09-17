import React from "react";
import Logo from "../Logo.jsx";
import { Link, Outlet } from "react-router-dom";

export default function AppLogo(setPage, logo) {
  <>
    <div className="onclick-logo" onClick={() => setPage("home")}>
      <Logo logo={logo} />
    </div>
    <Outlet/>
  </>;
}
