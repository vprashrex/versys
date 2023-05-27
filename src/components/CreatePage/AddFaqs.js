import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Faq from "./Faq";
import { useSignUp } from "../../context/SignUpContext";
import SignUpIndicator from "./SignUpIndicator";

export default function AddFaqs() {
  const { currentLevel, setCurrentLevel, faqs } = useSignUp();
  const navigate = useNavigate();

  const [faqsLimit, setFaqsLimit] = useState(faqs.length > 0 ? faqs.length : 1);
  const [submit, setSubmit] = useState("");

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
    <form onSubmit={handleSubmit} className="width-60-form">
      <SignUpIndicator />
      <div>
        <h3 className="fw-bold">
          Add FAQ's to answer questions about you and your services
        </h3>
        <div
          className="d-flex flex-column gap-3 mt-4"
          style={{ maxHeight: "400px", overflowY: "scroll" }}
        >
          {faqs.length > 0 &&
            faqs.map((faq, i) => {
              return <Faq faq={faq} setFaqsLimit={setFaqsLimit} key={faq.id} />;
            })}
          {new Array(faqsLimit).fill("").map((pg, i) => {
            return <Faq key={i} submit={submit} setFaqsLimit={setFaqsLimit} />;
          })}
          {faqsLimit < 10 && (
            <div className="text-end my-2 w-100 ">
              <button
                type="button"
                onClick={() => setFaqsLimit((prev) => prev + 1)}
                className="btn"
              >
                <i className="bi bi-plus" /> Add FAQ
              </button>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-dark mt-4 py-2 w-100">
          Continue
        </button>
      </div>
      <button type="submit" className="btn text-dark my-2 w-100">
        Skip for now
      </button>
    </form>
  );
}
