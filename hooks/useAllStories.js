import { useState, useEffect } from "react";
import { db, getAllStories } from "../services/firebase";
import useUserStore from "../stores/useUserStore";
import cities from "../constants/cities";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const useAllStories = (userCity = "", refresh = "") => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoading(true);

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

    // const querySnapshot = await getDocs(q);
    //
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   allStories.push({
    //     ...doc.data(),
    //     id: doc.id,
    //   });
    // });

    onSnapshot(q, (querySnapshot) => {
      const allStories = [];
      querySnapshot.forEach((doc) => {
        allStories.push({ ...doc.data(), id: doc.id });
      });

      setData(allStories);
      setIsLoading(false);
    });

    // getAllStories(userCity)
    //   .then((res) => {
    //     setData(res);
    //   })
    //   .finally(() => setIsLoading(false));
  }, [userCity, isLoggedIn, refresh]);

  return { data, isLoading };
};

export default useAllStories;
