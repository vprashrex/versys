import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import SignUpIndicator from "./SignUpIndicator";

export default function Summarize() {
  const { summarize, setSummarize, setCurrentLevel, currentLevel } =
    useSignUp();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setCurrentLevel((prev) => prev + 1);
  }

  useEffect(() => {
    // set influencer data in  //
    // await addInfluencerData(data) //
    navigate(`/create-page/${currentLevel.toString()}`);
  }, [currentLevel, navigate]);

  return (
    <form onSubmit={handleSubmit} className="width-60-form">
      <SignUpIndicator />
      <div className="d-flex flex-column">
        <h3 className="fw-bold">
          Summarize yourself, this is your title shown on your profile
        </h3>
        <textarea
          required
          rows="5"
          value={summarize}
          onChange={(e) => setSummarize(e.target.value)}
          placeholder="Eg. Fitness Content Creator & Student Athlete"
          className="my-3 py-2 form-control"
          minLength="10"
        />
        <button className="btn btn-dark w-100 py-2 my-4" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}
