import { useEffect } from "react";
import { firebaseAuth } from "../services/firebase";

import useUserStore from "../stores/useUserStore";
import { useRouter } from "expo-router";

const useProtectedPage = () => {
  const router = useRouter();
  const userReady = useUserStore((state) => state.userReady);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!userReady) return;

    if (!isLoggedIn) {
      router.push("/auth/register");
    }
  }, [isLoggedIn, userReady]);
};

export default useProtectedPage;
