import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function MobileNav() {
  return (
    <div className="mobile-nav-links fixed-bottom py-1">
      <CustomLink
        text="Explore"
        icon="bi bi-search fs-4"
        to="/influencers/explore"
      />
      <CustomLink text="Brand" icon="bi bi-briefcase fs-4" to="/brand" />
      <CustomLink text="Influencer" icon="bi bi-person-up fs-4" to="/creator" />
      <CustomLink text="Login" icon="bi bi-person-circle fs-4" to="/login" />
    </div>
  );
}

const CustomLink = ({ to, text, icon }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      to={to}
      className={`d-flex flex-column gap-1 align-items-center ${
        isActive ? "active-link" : ""
      }`}
    >
      <i className={icon} />
      <span>{text}</span>
    </Link>
  );
};
