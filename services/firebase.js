import { initializeApp, getApps, getApp } from "firebase/app";

import {
  getReactNativePersistence,
  initializeAuth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  getDoc,
  doc,
  deleteDoc,
  limit,
  updateDoc,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { getFirestore } from "firebase/firestore";
import cities from "../constants/cities";
import useUserStore from "../stores/useUserStore";

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

export const db = getFirestore(app);

export const register = async (email, password, displayName) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password)
    .then(async (userCredential) => {
      await updateProfile(userCredential.user, {
        displayName,
      })
        .then(() => null)
        .catch(() => null);
      await resendVerificationEmail();
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
};

export const handleLogout = async () => {
  await signOut(firebaseAuth);
};

export const resendVerificationEmail = async () => {
  await sendEmailVerification(firebaseAuth.currentUser);
  return true;
};

export const requestPwReset = async () => {
  return await sendPasswordResetEmail(
    firebaseAuth,
    firebaseAuth.currentUser.email,
  )
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export const sendPwResetEmail = async (email) =>
  sendPasswordResetEmail(firebaseAuth, email)
    .then(() => true)
    .catch(() => false);

export const saveStory = async (data) => {
  const docRef = await addDoc(collection(db, "stories"), {
    ...data,
    userId: firebaseAuth.currentUser.uid,
    createdAt: new Date(),
  });

  return docRef.id;
};

export const updateStory = async (data) => {
  const id = data.id;
  delete data.id;

  await updateDoc(doc(db, "stories", id), {
    ...data,
    userId: firebaseAuth.currentUser.uid,
  });

  return true;
};

export const getMyStories = async () => {
  const myStories = [];

  const q = query(
    collection(db, "stories"),
    where("userId", "==", firebaseAuth.currentUser.uid),
    orderBy("createdAt", "desc"),
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myStories.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return myStories;
};

export const getAllStories = async (userCity) => {
  const allStories = [];

  const q =
    userCity === cities[0]
      ? query(
          collection(db, "stories"),
          orderBy("createdAt", "desc"),
          limit(100),
        )
      : query(
          collection(db, "stories"),
          orderBy("createdAt", "desc"),
          where("city", "==", userCity),
          limit(100),
        );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    allStories.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return allStories;
};

export const getStory = async (id) => {
  const docRef = doc(db, "stories", id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      id: docSnap.id,
    };
  } else {
    return null;
  }
};

export const deleteStory = async (id) => {
  await deleteDoc(doc(db, "stories", id));
  return true;
};

export const getMyRedeems = async () => {
  const items = [];

  const q = query(
    collection(db, "redeems"),
    where("userId", "==", firebaseAuth.currentUser.uid),
    orderBy("createdAt", "desc"),
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    items.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return items;
};

export const redeemPoints = async (item) => {
  await addDoc(collection(db, "redeems"), {
    ...item,
    userId: firebaseAuth.currentUser.uid,
    createdAt: new Date(),
  });

  return await getMyRedeems();
};
