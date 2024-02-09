import { initializeApp, getApps, getApp } from "firebase/app";
// import { initializeAuth } from "firebase/auth";

import { getReactNativePersistence, initializeAuth ,sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut} from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1ZbSz0QGxPidrTaMYHFscDXnY2gvSteo",
  authDomain: "mad-cw2-4a647.firebaseapp.com",
  projectId: "mad-cw2-4a647",
  storageBucket: "mad-cw2-4a647.appspot.com",
  messagingSenderId: "585903002840",
  appId: "1:585903002840:web:3222364a969c1dbbb333ad",
};

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const firebaseAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;

export const firestoreDb = getFirestore();


export const register = async (email, password, displayName) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        updateProfile(userCredential.user, {
          displayName,
        })
            .then(() => null)
            .catch(() => null);
      })
      .catch((error) => {
        const errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/email-already-in-use") {
          errorMessage = "Email is already used. Please try a different email.";
        }
        return { errorCode, errorMessage };
      });
};

export const login = async (email, password) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = "Invalid credentials. Please try again.";
        return {
          errorCode,
          errorMessage,
        };
      });
}

export const handleLogout = async () => {
    await signOut(firebaseAuth)
}

export const sendPwResetEmail = async (email) =>
    sendPasswordResetEmail(firebaseAuth, email)
        .then(() => true)
        .catch(() => false);
