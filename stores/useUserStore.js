import { create } from "zustand";
import cities from "../constants/cities";

const useUserStore = create((set) => ({
  user: null,
  userReady: false,
  isLoggedIn: false,
  userCity: cities?.[0],
  rewardPoints: 0,
  myStories: [],
  myRedeems: [],
  setUser: (user) =>
    set(() => {
      return {
        user,
        isLoggedIn: !!user?.uid && !!user?.emailVerified,
        userReady: true,
      };
    }),
  setUserCity: (userCity) =>
    set(() => {
      return {
        userCity,
      };
    }),
  setRewardPoints: (rewardPoints) =>
    set(() => {
      return {
        rewardPoints,
      };
    }),
  setMyRedeems: (myRedeems) =>
    set(() => {
      return {
        myRedeems,
      };
    }),
  setMyStories: (myStories) =>
    set(() => {
      return {
        myStories,
      };
    }),
}));

export default useUserStore;
