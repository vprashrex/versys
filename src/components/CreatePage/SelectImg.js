import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import defaultimg from "../../assets/imgs/input-img.png";
import ErrorCon from "../ErrorCon";
import SignUpIndicator from "./SignUpIndicator";

export default function SelectImg() {
  const [error, setError] = useState("");

  const {
    setCurrentLevel,
    currentLevel,
    profileImg,
    setProfileImg,
    coverImg,
    setCoverImg,
    contentImg1,
    setContentImg1,
    contentImg2,
    setContentImg2,
    contentImg3,
    setContentImg3,
  } = useSignUp();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!coverImg) {
      setError("Profile and cover photo is required");
      return setTimeout(() => setError(""), 1000);
    }
    if (!profileImg) {
      setError("Profile and cover photo is required");
      return setTimeout(() => setError(""), 1000);
    }

    setCurrentLevel((prev) => prev + 1);
  }

  useEffect(() => {
    // set influencer data in  //
    // await addInfluencerData(data) //
    navigate(`/create-page/${currentLevel.toString()}`);
  }, [currentLevel, navigate]);

  return (
    <>
      <ErrorCon error={error} />
      <form className="width-100-form" onSubmit={handleSubmit}>
        <SignUpIndicator />
        <div>
          <h3 className="fw-bold">
            Add up to 5 images of you and your content
          </h3>
        </div>
        <div className="img-container">
          <div className="d-flex justify-content-center align-items-center w-100">
            <label htmlFor="profile-img">
              <img
                width="100px"
                style={{ aspectRatio: "1/1" }}
                className="rounded-circle"
                alt="IMG"
                src={profileImg ? URL.createObjectURL(profileImg) : defaultimg}
              />
            </label>
            <input
              accept="image/*"
              onChange={(e) => setProfileImg(e.target.files[0])}
              type="file"
              style={{ display: "none" }}
              id="profile-img"
            />
          </div>
          <div className="img-container-grid">
            <div className="first-part position-relative">
              {coverImg && (
                <strong
                  className="bg-light rounded-pill px-2 py-1 position-absolute"
                  style={{
                    left: ".5rem",
                    top: ".5rem",
                    boxShadow: "rgba(120, 120, 170, 0.2) 0 2px 10px 0",
                  }}
                >
                  Cover Photo
                </strong>
              )}
              <label htmlFor="cover-img" className="h-100 w-100">
                <img
                  width="100%"
                  height="100%"
                  alt="IMG"
                  src={coverImg ? URL.createObjectURL(coverImg) : defaultimg}
                />
              </label>
              <input
                onChange={(e) => setCoverImg(e.target.files[0])}
                accept="image/*"
                type="file"
                style={{ display: "none" }}
                id="cover-img"
              />
            </div>
            <div className="second-part">
              <div className="d-flex gap-2 w-100">
                <div className="w-50 position-relative">
                  {contentImg1 && (
                    <button
                      type="button"
                      onClick={() => setContentImg1()}
                      className="btn bg-light rounded-circle position-absolute"
                      style={{ right: "0.3rem", top: ".3rem" }}
                    >
                      <i className="bi bi-trash text-danger " />
                    </button>
                  )}
                  <label htmlFor="content-img-1" className="h-100 w-100">
                    <img
                      width="100%"
                      height="100%"
                      style={{
                        aspectRatio: "1/1",
                      }}
                      alt="IMG"
                      src={
                        contentImg1
                          ? URL.createObjectURL(contentImg1)
                          : defaultimg
                      }
                    />
                  </label>
                  <input
                    onChange={(e) => setContentImg1(e.target.files[0])}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id="content-img-1"
                  />
                </div>
                <div className="w-50 position-relative">
                  {contentImg2 && (
                    <button
                      type="button"
                      onClick={() => setContentImg2()}
                      className="btn bg-light rounded-circle position-absolute"
                      style={{ right: "0.3rem", top: ".3rem" }}
                    >
                      <i className="bi bi-trash text-danger " />
                    </button>
                  )}
                  <label htmlFor="content-img-2" className="h-100 w-100">
                    <img
                      width="100%"
                      height="100%"
                      style={{
                        aspectRatio: "1/1",
                        borderTopRightRadius: "10px",
                      }}
                      alt="IMG"
                      src={
                        contentImg2
                          ? URL.createObjectURL(contentImg2)
                          : defaultimg
                      }
                    />
                  </label>
                  <input
                    onChange={(e) => setContentImg2(e.target.files[0])}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    id="content-img-2"
                  />
                </div>
              </div>
              <div className="w-100 position-relative">
                {contentImg3 && (
                  <button
                    type="button"
                    onClick={() => setContentImg3()}
                    className="btn bg-light rounded-circle position-absolute"
                    style={{ right: "0.3rem", top: ".3rem" }}
                  >
                    <i className="bi bi-trash text-danger " />
                  </button>
                )}
                <label htmlFor="content-img-3" className="w-100">
                  <img
                    width="100%"
                    height="100%"
                    style={{ aspectRatio: "2/1" }}
                    alt="IMG"
                    src={
                      contentImg3
                        ? URL.createObjectURL(contentImg3)
                        : defaultimg
                    }
                  />
                </label>
                <input
                  onChange={(e) => setContentImg3(e.target.files[0])}
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id="content-img-3"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-dark w-100 my-5">Continue</button>
      </form>
    </>
  );
}
