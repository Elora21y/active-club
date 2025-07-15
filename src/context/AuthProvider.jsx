import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase-init";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);
  // console.log(user);
  const updateUser = (updateInfo) => {
  return  updateProfile(auth.currentUser, updateInfo);
  };
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  const userInfo = {
    createUser,
    loginUser,
    logOut,
    user,
    setUser,
    googleLogin,
    loading,
    updateUser,
  };
  return (
    <div>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ style: { zIndex: 9999 } }}
      />
    </div>
  );
};

export default AuthProvider;
