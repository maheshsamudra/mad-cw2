import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "expo-router";
import { getFavouriteStories } from "../utils/favourite-stories";

const useFavouriteStories = (userCity = "") => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getFavouriteStories()
        .then((res) => {
          setData(res);
        })
        .finally(() => setIsLoading(false));
    }, [userCity]),
  );

  return { data, isLoading };
};

export default useFavouriteStories;
