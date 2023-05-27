import React, { useContext, useEffect, useState } from "react";

const AuthProvider = React.createContext();

export function useAuth() {
  return useContext(AuthProvider);
}

export function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentSession, setCurrentSession] = useState();

  // useEffect(() => {
  //   // set current user data from session //
  //   setCurrentUser()
  // }, [currentSession])

  async function login(email, pass) {
    //
  }

  async function signUp(user, data) {
    // try {
    //   // await fetchReq //
    //   // await setCurrentSession(() => {
    // }) //
    // } catch (error) {
    // }
  }

  async function addInfluencerData(data) {
    // try {
    //   // await fetchReq //
    //   // await setCurrentSession(() => {
    // }) //
    // } catch (error) {
    // }
  }

  const value = {
    currentUser,
    currentSession,
    setCurrentSession,
    setCurrentUser,
    login,
    signUp,
    addInfluencerData,
  };

  return (
    <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
  );
}
