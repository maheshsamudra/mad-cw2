import { useEffect } from "react";
import { firebaseAuth } from "../services/firebase";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import useUserStore from "../stores/useUserStore";
import { usePathname, useRootNavigationState, useRouter } from "expo-router";

const publicPages = ["auth"];

const useAuthentication = () => {
  const setUser = useUserStore((state) => state.setUser);
  const userReady = useUserStore((state) => state.userReady);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const currentPage = usePathname();

  const router = useRouter();

  useEffect(() => {
    if (!userReady || !currentPage) return;

    // console.log(rootNavigationState);

    if (!isLoggedIn && !publicPages.includes(currentPage)) {
      setTimeout(() => {
        router.push("/auth/login");
      });
    } else if (isLoggedIn && publicPages.includes(currentPage)) {
      setTimeout(() => {
        router.push("/");
      })
    }
  }, [isLoggedIn, userReady, currentPage]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(null);
    });
  }, []);
};

export default useAuthentication;
