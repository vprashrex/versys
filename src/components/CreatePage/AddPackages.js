import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import Package from "./Package";
import SignUpIndicator from "./SignUpIndicator";

export default function AddPackages() {
  const [submit, setSubmit] = useState("");

  const { setCurrentLevel, currentLevel, packages } = useSignUp();
  const [packagesLimit, setPackagesLimit] = useState(
    packages.length > 0 ? packages.length : 3
  );
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmit(Math.floor(Math.random() * 90093));

    setCurrentLevel((prev) => prev + 1);
  }

  useEffect(() => {
    // set influencer data in  //
    // await addInfluencerData(data) //
    navigate(`/create-page/${currentLevel.toString()}`);
  }, [currentLevel, navigate]);

  return (
    <form onSubmit={handleSubmit} className="width-100-form">
      <SignUpIndicator />
      <div>
        <h3 className="fw-bold">Add your packages</h3>
        <p>
          These are services brands can purchase from you. This can be anything
          from a shoutout on your social media to original content creation.
        </p>
        <div className="add-packages">
          {packages.length > 0 &&
            packages.map((package1, i) => {
              return (
                <Package
                  setPackagesLimit={setPackagesLimit}
                  isFromSecond={i !== 0 ? true : false}
                  num={(i + 1).toString()}
                  key={package1.id}
                  package1={package1}
                />
              );
            })}
          {new Array(packagesLimit).fill("").map((pg, i) => {
            return (
              <Package
                key={i}
                submit={submit}
                setPackagesLimit={setPackagesLimit}
                isFromSecond={packages.length + i !== 0 ? true : false}
                num={
                  packages
                    ? (packages.length + (i + 1)).toString()
                    : (i + 1).toString()
                }
              />
            );
          })}
        </div>
        {packagesLimit < 10 && (
          <div className="text-end my-2 w-100 ">
            <button
              type="button"
              onClick={() => setPackagesLimit((prev) => prev + 1)}
              className="btn"
            >
              <i className="bi bi-plus" /> Add Package
            </button>
          </div>
        )}
        <button type="submit" className="btn btn-dark w-100 py-2">
          Continue
        </button>
      </div>
    </form>
  );
}
