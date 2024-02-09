import { useEffect } from "react";
import { firebaseAuth } from "../services/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import useUserStore from "../stores/useUserStore";
import { useRouter } from "expo-router";

const useGuestPage = () => {
  const router = useRouter();
  const userReady = useUserStore((state) => state.userReady);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!userReady) return;

    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, userReady]);
};

export default useGuestPage;
