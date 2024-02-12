import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { getAllStories, getMyStories } from "../services/firebase";
import useUserStore from "../stores/useUserStore";

const useAllStories = (userCity = "") => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useFocusEffect(
    useCallback(() => {
      if (!isLoading) return;
      setIsLoading(true);
      getAllStories(userCity)
        .then((res) => {
          setData(res);
        })
        .finally(() => setIsLoading(false));
    }, [userCity]),
  );

  return { data, isLoading };
};

export default useAllStories;
