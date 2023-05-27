import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useSignUp } from "../../context/SignUpContext";
import ErrorCon from "../ErrorCon";
import SignUpIndicator from "./SignUpIndicator";

import $ from 'jquery';

export default function SelectNiches() {
  const [error, setError] = useState("");

  const { influencersCategory } = useAppContext();
  const { setCurrentLevel, currentLevel, niches, setNiches,user_id } = useSignUp();
  const navigate = useNavigate();


  async function forwardNiches(){
    $.ajax({
      url: "http://127.0.0.1:8000/api/niches",
      dataType: 'json',
      cache: false,
      type: 'POST',
      data: JSON.stringify({"niches":niches,"user_id":user_id,"curr_page":currentLevel.toString()}),
      contentType: "application/json",
      crossDomain: true,
      success: function(){
        setCurrentLevel((prev) => prev + 1);
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (niches.length === 0) {
      setError("Please select at least one niches");
      return setTimeout(() => setError(""), 2000);
    }
    forwardNiches();
  }

  useEffect(() => {
    // set influencer data in  //
    // await addInfluencerData(data) //
    navigate(`/create-page/${currentLevel.toString()}`);
  }, [currentLevel, navigate]);

  function handleChange(e) {
    const isAlreadySelected = niches.some(
      (niche) => niche.name === e.target.value
    );
    if (isAlreadySelected) {
      return setNiches((prev) =>
        prev.filter((niche) => niche.name !== e.target.value)
      );
    }
    setNiches((prev) => [
      ...prev,
      {
        name: e.target.value,
      },
      
    ]);
  }

  return (
    <>
      <ErrorCon error={error} />
      <form onSubmit={handleSubmit} className="width-60-form">
        <SignUpIndicator />
        <div>
          <h3 className="fw-bold">Select the niches that match your content</h3>
          <div onChange={handleChange} className="niches-container my-4">
            {influencersCategory.map((influencer) => {
              return (
                <div key={influencer.id}>
                  <input
                    value={influencer.name}
                    type="checkbox"
                    id={influencer.id}
                    checked={niches.some(
                      (niche) => niche.name === influencer.name
                    )}
                  />
                  <label className="py-3 border" htmlFor={influencer.id}>
                    {influencer.name}
                  </label>
                </div>
              );
            })}
          </div>
          <button className="btn btn-dark w-100">Continue</button>
        </div>
      </form>
    </>
  );
}
