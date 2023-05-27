import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import SignUpIndicator from "./SignUpIndicator";
import SocialButton from "./SocialButton";

export default function SocialChannels() {
  const { currentLevel, setCurrentLevel, setHandles } = useSignUp();
  const navigate = useNavigate();
  const instaRef = useRef();
  const youtubeRef = useRef();
  const twitchRef = useRef();
  const twitterRef = useRef();
  const websiteRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setHandles([
      {
        name: "Instagram",
        username: instaRef.current ? instaRef.current.value : "",
      },
      {
        name: "Youtube",
        username: youtubeRef.current ? youtubeRef.current.value : "",
      },
      {
        name: "Twitch",
        username: twitchRef.current ? twitchRef.current.value : "",
      },
      {
        name: "Twitter",
        username: twitterRef.current ? twitterRef.current.value : "",
      },
      {
        name: "Website",
        username: websiteRef.current ? websiteRef.current.value : "",
      },
    ]);
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
      <h3 className="fw-bold my-3">Add your social channels</h3>
      <div className="d-flex flex-column gap-3">
        <SocialButton icon="instagram" reference={instaRef} />
        <SocialButton icon="youtube" reference={youtubeRef} />
        <SocialButton icon="twitter" reference={twitchRef} />
        <SocialButton icon="twitch" reference={twitterRef} />
        <SocialButton icon="website" reference={websiteRef} />
        <button type="submit" className="btn btn-dark my-3">
          Continue
        </button>
      </div>
    </form>
  );
}
