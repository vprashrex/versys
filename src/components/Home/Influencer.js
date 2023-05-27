import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function Influencer({ user }) {
  function truncateStr(str, len) {
    if (str.length > len) return str.slice(0, len) + "...";
    return str;
  }

  return (
    <Link to={"/" + user.username} className="influencer">
      <div className="img-container">
        <img src={user.coverImg.url} alt="Influencer" />
      </div>
      <div className="info d-flex flex-column">
        <strong
          style={{
            fontSize: "0.8rem",
          }}
        >
          {user.name}
        </strong>
        <span
          style={{
            fontSize: "0.8rem",
          }}
        >
          {user.address}
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-between mt-1">
        <span
          className="influencer-handle"
          style={{
            fontSize: "0.7rem",
          }}
        >
          {user.packages[0].handle}
        </span>
        <strong>{formatCurrency(user.packages[0].price)}</strong>
      </div>
      <p>{truncateStr(user.heading, 45)}</p>
      <div className="overlay"></div>
    </Link>
  );
}
