import React, { useContext, useState } from "react";

const BrandSignUpProvider = React.createContext();

export function useBrandSignUp() {
  return useContext(BrandSignUpProvider);
}

export default function BrandSignUpContext({ children }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [name, setName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [about, setAbout] = useState("default");

  const value = {
    currentLevel,
    setCurrentLevel,
    name,
    setName,
    brandName,
    setBrandName,
    email,
    setEmail,
    password,
    setPassword,
    about,
    setAbout,
  };

  return (
    <BrandSignUpProvider.Provider value={value}>
      {children}
    </BrandSignUpProvider.Provider>
  );
}
