import React from "react";
import { Route, Routes, useMatch, useResolvedPath } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import DesktopNav from "./components/Navbar/DesktopNav";
import MobileNav from "./components/Navbar/MobileNav";
import Home from "./pages/Home";
import Creator from "./pages/Creator";
import CreatorSignUp from "./pages/CreatorSignUp";
import SignUpContext from "./context/SignUpContext";
import CreatePage from "./pages/CreatePage";
import Brand from "./pages/Brand";
import BrandSignUp from "./components/Brand/BrandSignUp";
import BrandSignUpContext from "./context/BrandSignUpContext";
import Login from "./pages/Login";

function App() {
  const resolvedPath = useResolvedPath("/create-page");
  const isCreatePage = useMatch({ path: resolvedPath.pathname, end: false });

  const resolvedPath1 = useResolvedPath("/login");
  const isLoginPage = useMatch({ path: resolvedPath1.pathname, end: false });
  return (
    <>
      <DesktopNav />
      <MobileNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/creator"
          element={
            <SignUpContext>
              <Creator />
            </SignUpContext>
          }
        />
        <Route
          path="/creator-signup/:username"
          element={
            <SignUpContext>
              <CreatorSignUp />
            </SignUpContext>
          }
        />
        <Route
          path="/create-page/:level"
          element={
            <SignUpContext>
              <CreatePage />
            </SignUpContext>
          }
        />
        <Route path="/brand" element={<Brand />} />
        <Route
          path="/brand-signup"
          element={
            <BrandSignUpContext>
              <BrandSignUp />
            </BrandSignUpContext>
          }
        />
      </Routes>
      {isCreatePage || isLoginPage ? "" : <Footer />}
    </>
  );
}

export default App;
