import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getMyStories } from "../services/firebase";

const useMyStories = (refresh = "") => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getMyStories()
        .then((res) => {
          setData(res);
        })
        .finally(() => setIsLoading(false));
    }, []),
  );

  return { data, isLoading };
};

export default useMyStories;
