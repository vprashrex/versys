import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../context/SignUpContext";
import useDebounceValue from "../../hooks/useDebounceValue";
import ErrorCon from "../ErrorCon";
import SignUpIndicator from "./SignUpIndicator";
import $ from 'jquery';

export default function Location() {
  const [searchCity, setSearchCity] = useState("");
  const [fetchCities, setFetchCities] = useState([]);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);

  const { user_id } = useSignUp();

  const { setLocation, setCurrentLevel, currentLevel } = useSignUp();
  const debounceQuery = useDebounceValue(searchCity, 500);
  const navigate = useNavigate();

  async function getCities() {
    const options = {
      headers: {
        "X-Api-Key": "cBu2zoUOWXABbrunTSFz7A==2WY2x5s9T9O90mh6",
      },
      contentType: "application/json",
    };
    const res = await fetch(
      `https://api.api-ninjas.com/v1/city?name=${debounceQuery}&limit=30`,
      options
    );
    const data = await res.json();
    setCities(data);
    return data;
  }

  useEffect(() => {
    (async () => {
      setFetchCities([]);
      if (debounceQuery.length >= 3) {
        const data = await getCities();
        setFetchCities(data);
      }
    })();
  }, [debounceQuery]);

  async function forwardLocation(location){
    $.ajax({
      url: "http://127.0.0.1:8000/api/location",
      dataType: 'json',
      cache: false,
      type:"POST",
      data:JSON.stringify({"location":location,"user_id":user_id,"curr_page":currentLevel.toString()}),
      contentType: "application/json",
      crossDomain: true,
      success: function(){
        try{
          setLocation(location);
          setCurrentLevel((prev) => prev + 1);
        }catch(error){
          setError(error);
          setTimeout(() => setError(""), 3000)
        }
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !cities.some((city) => city.name + ", " + city.country === searchCity)
    ) {
      setError("Select city from dropdowm");
      return setTimeout(() => setError(""), 1000);
    }

    forwardLocation(searchCity);
    //
    //
  }

  useEffect(() => {
    // set influencer data in  //
    // await addInfluencerData(data) //
    navigate(`/create-page/${currentLevel.toString()}`);
  }, [currentLevel, navigate]);

  return (
    <>
      <ErrorCon error={error} />
      <form onSubmit={handleSubmit} className="width-60-form">
        <SignUpIndicator />
        <div className="d-flex flex-column">
          <h3 className="fw-bold">Where are you located</h3>
          <input
            required
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            type="text"
            placeholder="City - Enter first 3 letters and select from dropdown"
            className="my-3 py-2 form-control"
          />
          {fetchCities.length > 0 && (
            <div
              className="border"
              style={{
                overflowY: "scroll",
                height: "150px",
              }}
            >
              {fetchCities.map((cities) => {
                return (
                  <button
                    onClick={() => {
                      setSearchCity(cities.name + ", " + cities.country);
                      setFetchCities([]);
                    }}
                    type="button"
                    className="btn text-dark border-bottom d-flex w-100"
                    key={cities.country}
                  >
                    <strong>{cities.name}</strong>,<span>{cities.country}</span>
                  </button>
                );
              })}
            </div>
          )}
          <button type="submit" className="btn btn-dark py-2 mt-3">
            Continue
          </button>
        </div>
      </form>
    </>
  );
}