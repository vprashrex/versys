import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useSignUp } from "../../context/SignUpContext";

export default function Package({
  num,
  isFromSecond,
  setPackagesLimit,
  submit,
  package1,
}) {
  const [focus, setFocus] = useState(false);
  const [platform, setPlatform] = useState(
    package1 ? package1.platform : "user-generated-content"
  );
  const [heading, setHeading] = useState(package1 ? package1.heading : "");
  const [description, setDescription] = useState(
    package1 ? package1.description : ""
  );
  const [price, setPrice] = useState(package1 ? package1.price : 0);
  const [userPackage, setUserPackage] = useState([]);

  const { setPackages } = useSignUp();

  useEffect(() => {
    setUserPackage({ id: nanoid(), platform, heading, description, price });
  }, [platform, heading, description, price]);

  useEffect(() => {
    submit && setPackages((prev) => [...prev, userPackage]);
  }, [submit, setPackages, userPackage]);

  const { handles } = useSignUp();
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
        <strong>Package {num}</strong>
        {isFromSecond && (
          <button
            onClick={() => setPackagesLimit((prev) => prev - 1)}
            type="button"
            style={{
              border: "none",
              outline: "none",
              backgroundColor: "inherit",
            }}
          >
            <i className="bi bi-x-lg text-dark" />
          </button>
        )}
      </div>
      <select
        defaultValue={platform}
        onChange={(e) => setPlatform(e.target.value)}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        className="form-select"
      >
        {handles.map((handle) => {
          return (
            handle.username !== "" && (
              <option value={handle.name} key={handle.name}>
                {handle.name}
              </option>
            )
          );
        })}
        <option value="user-generated-content">User Generated Content</option>
      </select>
      <input
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        onBlur={() => setFocus(false)}
        required
        onFocus={() => setFocus(true)}
        type="text"
        className="form-control"
        placeholder="What is this package offering"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={() => setFocus(false)}
        required
        onFocus={() => setFocus(true)}
        placeholder="What is included in this pacakge? How many posts or photots? What will the buyer be getting?"
        className="form-control"
        rows="5"
      />
      <input
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
        onBlur={() => setFocus(false)}
        required
        type="number"
        onFocus={() => setFocus(true)}
        placeholder="price"
        className="form-control"
      />
      <small
        style={{
          fontSize: "0.8rem",
        }}
        className="ms-auto"
      >
        Our Company takes a 9% fee
      </small>
    </div>
  );
}
