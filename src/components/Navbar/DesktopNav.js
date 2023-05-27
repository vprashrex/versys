import React from "react";
import { Link } from "react-router-dom";

export default function DesktopNav() {
  return (
    <nav className="desktop-nav py-4 container d-flex align-items-center justify-content-between">
      <div className="fs-4">Logo</div>
      <div className="links-list  d-flex align-items-center gap-5">
        <Link to={"/influencers/any/all"}>Explore</Link>
        <button
          className="btn "
          onClick={() => window.location.replace("#how-it-works")}
        >
          <strong>How It Works</strong>
        </button>
        <Link to="/login">Login</Link>
        <Link to="/brand">Join as Brand</Link>
        <Link to="/creator">Join as Influencer</Link>
      </div>
    </nav>
  );
}
