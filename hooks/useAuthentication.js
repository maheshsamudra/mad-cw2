import { useEffect } from "react";
import { firebaseAuth, getMyRedeems, getMyStories } from "../services/firebase";

import { onAuthStateChanged } from "firebase/auth";

import useUserStore from "../stores/useUserStore";

const useAuthentication = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const setMyStories = useUserStore((state) => state.setMyStories);
  const setMyRedeems = useUserStore((state) => state.setMyRedeems);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    getMyStories().then((res) => {
      setMyStories(res);
    });

    getMyRedeems().then((res) => setMyRedeems(res));
  }, [user]);
};

export default useAuthentication;
