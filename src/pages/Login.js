import React, { useRef,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function Login() {
  /* const [loading, setLoading] = useState("");
  const [error, setError] = useState(""); */

  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const pass = passRef.current.value;
    
    async function Login(){
      setLoading(true);
      $.ajax({
        url: "http://127.0.0.1:8000/api/login",
        dataType: "json",
        cache: false,
        type: "POST",
        data: JSON.stringify({"email":email,"password":pass}),
        contentType: "application/json",
        crossDomain: true,
        success: function(jsondata){
          try{
            const detail = jsondata.detail;
            const access_token = jsondata.result;
            const exp = jsondata.exp;
            const curr_page = jsondata.curr_page + 1;
            
            if (access_token){
              Cookies.set("jwt_token",access_token.access_token,{expires:7});
            }
            else{
              setError(detail);
              setTimeout(() => setError(""), 3000);
            }
          }catch(error){
            setError(error);
            setError(() => setError(""),3000);
          }
        },
        complete: function(){
          setLoading(false);
        }
      }) 
      
    }
    Login();
  }


  return (
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
        className="mt-3 w-100 d-flex flex-column gap-4 align-items-center justify-content-center container"
        style={{
          height: "70vh",
        }}
      >
        <div className="d-flex flex-column align-items-center gap-3 justify-content-center ">
          <h1>Welcome Back</h1>
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
          className="d-flex flex-column gap-3 form-signup"
        >
          <input
            required
            type="email"
            className="form-control"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            required
            type="password"
            className="form-control"
            placeholder="Password"
            ref={passRef}
          />
          <button
            disabled={loading}
            type="submit"
            className="btn btn-dark fw-bold py-2"
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <Link className="text-center" to="/forget-password">
          Forget Password?
        </Link>
      </div>
    </>
  );
}
