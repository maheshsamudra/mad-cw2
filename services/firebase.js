import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export const auth = getAuth();

//
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export default app;

export const firestoreDb = getFirestore();
