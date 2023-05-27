import React, { useState, useEffect } from "react";
import { useSignUp } from "../../context/SignUpContext";
import { nanoid } from "nanoid";

export default function Faq({ setFaqsLimit, submit, faq }) {
  const [focus, setFocus] = useState(false);
  const [userFaq, setUserFaq] = useState([]);
  const [question, setQuestion] = useState(faq ? faq.question : "");
  const [answer, setAnswer] = useState(faq ? faq.answer : "");

  const { setFaqs } = useSignUp();

  useEffect(() => {
    setUserFaq({ id: nanoid(), question, answer });
  }, [question, answer]);

  useEffect(() => {
    submit && setFaqs((prev) => [...prev, userFaq]);
  }, [submit, setFaqs, userFaq]);

  return (
    <div
      className="d-flex flex-column gap-2"
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        borderLeft: `10px solid ${focus ? "lightblue" : "pink"}`,
      }}
    >
      <div className="d-flex justify-content-between ">
        <h3 className="fw-bold">FAQ</h3>
        <button
          type="button"
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "inherit",
          }}
          onClick={() => setFaqsLimit((prev) => prev - 1)}
        >
          <i className="bi bi-x-lg text-dark" />
        </button>
      </div>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        type="text"
        className="form-control"
        required
        placeholder="E.g. What brands have you worked with?"
      />
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        className="form-control"
        placeholder="I have worked with FashionNova, HiSmile and more."
        rows="5"
        required
      />
    </div>
  );
}
