import React, { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useSignUp } from "../context/SignUpContext";

import $ from "jquery";

export default function CreatorSignUp() {
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const { allInfluencers } = useAppContext();
  const { username } = useParams();

  const {
    setUserid,
    about,
    name,
    email,
    pass,
    setPass,
    setName,
    setEmail,
    setAbout,
    currentLevel
  } = useSignUp();

  async function handleSubmit(e) {
    e.preventDefault();
    
    async function forwardname(){
      setLoading(true);
      var data = {};
      data.name = name,
      data.email = email,
      data.pass = pass,
      data.about = about,
      data.username = username;
      $.ajax({
        url: "http://127.0.0.1:8000/api/influncer_info",
        dataType: 'json',
        cache: false,
        type:"POST",
        data:JSON.stringify(data),
        contentType: "application/json",
        crossDomain: true,
        success: function(jsondata){
          try{
            const alreadyExists = jsondata.already_exist;
            const userid = jsondata.id

            if (alreadyExists){
              setError("Email already exists");
              setTimeout(() => setError(""), 3000);
              setLoading(false);
            }
            else{
              setLoading(false);
              setUserid(userid)
              return navigate(`/create-page/${currentLevel}`);
            }
          }catch(error){
            return setError(error);

          }
        },
        error:function(){
          return setError(error);
        },
        complete: function(){
          setTimeout(() => setError(""),3000);
          setLoading(false);
        }
      })
    }
    forwardname();
  }

  return allInfluencers.some(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  ) ? (
    <Navigate to="/creator" />
  ) : (
    <>
      {error && (
        <div className="error-con bg-light d-flex align-items-center justify-content-center">
          <div>
            <div className="d-flex gap-2 align-items-center justify-content-center p-3">
              <i className="bi bi-x-circle text-danger fs-5" />
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}
      <div
        className="w-100 d-flex flex-column gap-4 align-items-center justify-content-center container"
        style={{
          height: "70vh",
        }}
      >
        <div className="d-flex flex-column align-items-center gap-3 justify-content-center ">
          <h1>Create Your Page</h1>
          <button className="btn btn-dark d-flex gap-2 align-items-center w-100 justify-content-center">
            <i className="bi bi-google" />
            Continue with Google
          </button>
        </div>
        <div className="separator">
          <span>or</span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3"
          style={{
            width: "400px",
          }}
        >
          <input
            required
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            required
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type="password"
            className="form-control"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <select
            required
            defaultValue={about}
            onChange={(e) => setAbout(e.target.value)}
            className="form-select"
          >
            <option value="default" disabled hidden>
              How did you hear about us
            </option>
            <option value="Facebook">Facebook</option>
            <option value="Friend/Colleague">Friend/Colleague</option>
            <option value="Google">Google</option>
            <option value="Youtube">Youtube</option>
            <option value="Instagram">Instagram</option>
          </select>
          <button type="submit" className="btn btn-dark fw-bold py-2">
            {loading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )
            }
          </button>
        </form>
        <p
          style={{
            fontSize: "0.7rem",
          }}
        >
          By signing up, you agree to our <Link to="/terms" children="Terms" />{" "}
          and <Link to="/privacy" children="Privacy Policy" />.
        </p>
      </div>
    </>
  );
}
