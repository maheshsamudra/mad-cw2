import { useEffect } from "react";
import { firebaseAuth } from "../services/firebase";

import { onAuthStateChanged } from "firebase/auth";

import useUserStore from "../stores/useUserStore";

const useAuthentication = () => {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);
};

export default useAuthentication;
