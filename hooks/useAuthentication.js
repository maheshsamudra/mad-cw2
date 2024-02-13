import { useEffect } from "react";
import { firebaseAuth, getMyRedeems, getMyStories } from "../services/firebase";

import { onAuthStateChanged } from "firebase/auth";

import useUserStore from "../stores/useUserStore";

const useAuthentication = () => {
  // accessing data from the central store with zustand
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const setMyStories = useUserStore((state) => state.setMyStories);
  const setMyRedeems = useUserStore((state) => state.setMyRedeems);

  useEffect(() => {
    // listening to auth state changes
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (!user?.uid) return;
    // fetching user's stories and the reward points
    getMyStories().then((res) => {
      setMyStories(res);
    });

    getMyRedeems().then((res) => setMyRedeems(res));
  }, [user]);
};

export default useAuthentication;
