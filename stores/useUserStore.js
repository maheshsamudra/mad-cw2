import { create } from "zustand";
import cities from "../constants/cities";

const useUserStore = create((set) => ({
  user: null,
  userReady: false,
  isLoggedIn: false,
  userCity: cities?.[0],
  setUser: (user) =>
    set(() => {
      return {
        user,
        isLoggedIn: !!user?.uid,
        userReady: true,
      };
    }),
  setUserCity: (userCity) =>
    set(() => {
      return {
        userCity,
      };
    }),
}));

export default useUserStore;
