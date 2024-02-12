import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getMyStories } from "../services/firebase";
import useUserStore from "../stores/useUserStore";

const useMyStories = (refresh = 0) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) return;
      setIsLoading(true);
      getMyStories()
        .then((res) => {
          setData(res);
        })
        .finally(() => setIsLoading(false));
    }, [refresh, isLoggedIn]),
  );

  return { data, isLoading };
};

export default useMyStories;
