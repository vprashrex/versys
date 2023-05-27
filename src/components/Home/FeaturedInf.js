import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import Influencer from "./Influencer";

export default function FeaturedInf() {
  const { featuredInfluencers } = useAppContext();
  return (
    <div className="featured-con container">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="fw-bold">Featured</h3>
          <p
            style={{
              color: "gray",
            }}
          >
            Hire top influencers across all platforms
          </p>
        </div>
        <Link to="/influencers/any/all">See All</Link>
      </div>
      <div className="influencers-con gap-3 d-flex overflow-x-scroll">
        {featuredInfluencers.map((user, i) => {
          return i <= 3 && <Influencer user={user} key={i} />;
        })}
      </div>
    </div>
  );
}
