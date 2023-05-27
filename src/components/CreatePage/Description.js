import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import SignUpIndicator from "./SignUpIndicator";

export default function Description() {
  const { description, setDescription, setCurrentLevel, currentLevel } =
    useSignUp();
  const navigate = useNavigate();

  function handleSubmit(e) {
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
        <h3 className="fw-bold">Describe yourself and your content</h3>
        <textarea
          required
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Who are you and what type of content do you create? Who is your audience? Be specific as this will help you show up in searches."
          className="my-3 py-2 form-control"
          minLength="100"
        />
        <button className="btn btn-dark w-100 py-2 my-4" type="submit">
          Continue
        </button>
      </div>
    </form>
  );
}
