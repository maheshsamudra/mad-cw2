import { useState, useEffect } from "react";
import { getAllStories } from "../services/firebase";
import useUserStore from "../stores/useUserStore";

const useAllStories = (userCity = "", refresh = "") => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoading(true);
    getAllStories(userCity)
      .then((res) => {
        setData(res);
      })
      .finally(() => setIsLoading(false));
  }, [userCity, isLoggedIn, refresh]);

  return { data, isLoading };
};

export default useAllStories;
