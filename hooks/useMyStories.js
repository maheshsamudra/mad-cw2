import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { db, firebaseAuth, getMyStories } from "../services/firebase";
import useUserStore from "../stores/useUserStore";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const useMyStories = (refresh = 0) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) return;
      setIsLoading(true);

      const q = query(
        collection(db, "stories"),
        where("userId", "==", firebaseAuth.currentUser.uid),
        orderBy("createdAt", "desc"),
      );

      // const querySnapshot = await getDocs(q);

      onSnapshot(q, (querySnapshot) => {
        const myStories = [];

        querySnapshot.forEach((doc) => {
          myStories.push({ ...doc.data(), id: doc.id });
        });

        setData(myStories);
        setIsLoading(false);
      });

      // getMyStories()
      //   .then((res) => {
      //     setData(res);
      //   })
      //   .finally(() => setIsLoading(false));
    }, [refresh, isLoggedIn]),
  );

  return { data, isLoading };
};

export default useMyStories;
