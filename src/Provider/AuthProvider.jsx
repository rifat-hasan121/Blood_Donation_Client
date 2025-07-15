import React, { createContext, useEffect, useState } from "react";
import app from "../../firebase.config";
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
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserWithLoginGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const createUserWithGithub = () => {
    return signInWithPopup(auth, provider);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const profile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUser = (newData) => {
    setUser((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     console.log("current user", currentUser?.email);
  //     setUser(currentUser);
  //     // if (currentUser.email) {
        

  //     //   // get jwt token
  //     //   await axios.post(
  //     //     `${import.meta.env.VITE_API_URI}/jwt`,
  //     //     {
  //     //       email: currentUser?.email,
  //     //     },
  //     //     { withCredentials: true }
  //     //   );
  //     // } else {
  //     //   setUser(currentUser);
  //     //   await axios.get(`${import.meta.env.VITE_API_URI}/logout`, {
  //     //     withCredentials: true,
  //     //   });
  //     // }

  //     setLoading(false);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        console.log("current user", currentUser?.email);

        if (currentUser?.email) {
          try {
            // get jwt token
            await axios.post(
              `${import.meta.env.VITE_API_URI}/jwt`,
              { email: currentUser.email },
              { withCredentials: true }
            );

            // fetch user role
            const res = await axios.get(
              `${import.meta.env.VITE_API_URI}/users/role/${currentUser.email}`
            );

            console.log("User role fetched:", res.data);

            setUser({
              email: currentUser.email,
              displayName: currentUser.displayName || "User",
              photoURL: currentUser.photoURL || "https://img.daisyui.com",
              uid: currentUser.uid,
              role: res.data.role,
            });
          } catch (error) {
            console.error("Error during auth setup:", error);
            setUser(null);
          }
        } else {
          setUser(null);
          await axios.get(`${import.meta.env.VITE_API_URI}/logout`, {
            withCredentials: true,
          });
        }

        setLoading(false);
      });

      return () => {
        unsubscribe();
      };
    }, []);
  const authData = {
    user,
    setUser,
    updateUser,
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

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
