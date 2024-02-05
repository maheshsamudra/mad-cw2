import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  userReady: false,
  isLoggedIn: false,
  setUser: (user) =>
    set(() => {
      return {
        user,
        isLoggedIn: !!user?.uid,
        userReady: true,
      };
    }),
}));

export default useUserStore;
