import React from "react";
import usePlatform from "../../hooks/usePlatform";
import Influencer from "./Influencer";
import { Link } from "react-router-dom";

export default function PlatformInf({ platform }) {
  const influencers = usePlatform(platform);
  return (
    <div className="featured-con container my-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="fw-bold">{platform}</h3>
          <p
            style={{
              color: "gray",
            }}
          >
            Hire {platform} influencers
          </p>
        </div>
        <Link to={"/influencers/" + platform + "/all"}>See All</Link>
      </div>
      <div className="influencers-con gap-3 d-flex overflow-x-scroll">
        {influencers.map((user, i) => {
          return i <= 3 && <Influencer user={user} key={i} />;
        })}
      </div>
    </div>
  );
}
