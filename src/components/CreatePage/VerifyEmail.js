import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import ErrorCon from "../ErrorCon";
import $ from 'jquery';

export default function VerifyEmail() {
  const [error, setError] = useState("");
  const { email, currentLevel, setCurrentLevel,otp_code,setOtp} = useSignUp();
  const codeRef = useRef();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
    

  async function handleSubmit(e) {
    e.preventDefault();

    async function forwardEmail(){
      $.ajax({
        url: "http://127.0.0.1:8000/api/verify_otp",
        dataType: 'json',
        cache: false,
        type: "POST",
        data: JSON.stringify({"email":email,"otp":otp_code}),
        contentType: "application/json",
        crossDomain: true,
        success: function(jsondata){
          try{
            const otp_error = jsondata.otp_error;
  
            if (otp_error){
              setError("Invalid otp try again!");
              setTimeout(()=> setError(""),3000);
            }
            else{
              setCurrentLevel((prev) => prev + 1);
            }
          }
          catch(error){
            return setError(error);
          }
        }
      })
    }  
    forwardEmail();

    
  }

  useEffect(() => {
    // set influencer data in  //
    // await addInfluencerData(data) //
    navigate(`/create-page/${currentLevel.toString()}`);
  }, [currentLevel, navigate]);

  async function handleResend() {
    setLoading(true)
    async function resentOTP(){
      $.ajax({
        url: "http://127.0.0.1:8000/api/resentEmail",
        dataType: 'json',
        cache: false,
        type: "POST",
        data: JSON.stringify({"email":email}),
        contentType: "application/json",
        crossDomain: true,
        success: function(){
          setLoading(false)
        },
        complete: function(){
          setLoading(false)
        }
      })

    }
    resentOTP();
  }
  return (
    <>
      <ErrorCon error={error} />
      <form onSubmit={handleSubmit} className="width-60-form">
        <h3 className="fw-bold">Verify your email</h3>
        <p>
          We sent an email to {email}. Check your inbox and enter the 6-digit
          code to verify your email.
        </p>
        <input
          ref={codeRef}
          value={otp_code}
          required
          type="text"
          className="form-control"
          placeholder="6-Digit Code"
          pattern="^[0-9]{6}$"
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="btn btn-dark w-100 py-2 my-4" type="submit">
          Continue
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn text-dark w-100 text-center"
        >
          I didn't receive an email
        </button>
      </form>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Can't Find the Email?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="border rounded p-2">
                <h5 className="fw-bold">1. Check All of Your Folders</h5>
                <p>
                  Sometimes emails end up in spam or folders other than your
                  inbox. Be sure to check all of your folders for the
                  verification email
                </p>
              </div>
              <div className="border rounded mt-3 p-2">
                <h5 className="fw-bold">2. Resend Email</h5>
                <p>
                  If you still can't find the email, try resending it using the
                  button below.
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={handleResend}
                type="button"
                className="btn btn-dark w-100"
              >
                {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Resend Email"
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
