import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { getAllStories, getMyStories } from "../services/firebase";

const useAllStories = (userCity = "") => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
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
