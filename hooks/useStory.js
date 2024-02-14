import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { getStory } from "../services/firebase";

const useStory = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      setIsLoading(true);
      getStory(id)
        .then((res) => {
          setData(res);
        })
        .finally(() => setIsLoading(false));
    }, [id]),
  );

  return { data, isLoading };
};

export default useStory;
