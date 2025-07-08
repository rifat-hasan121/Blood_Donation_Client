import React, { Children, createContext, useEffect, useState } from "react";import app from "../../firebase.config";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // google register/login
  const createUserWithLoginGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // github register/login
  const createUserWithGithub = () => {
    return signInWithPopup(auth, provider);
  };

  // login

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // reset password

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // update profile

  const profile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // logOut
  const logout = () => {
    return signOut(auth);
  };

  // observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    logout,
    loginUser,
    loading,
    setLoading,
    profile,
    createUserWithLoginGoogle,
    createUserWithGithub,
    resetPassword,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};
export default AuthProvider;
