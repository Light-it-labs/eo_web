import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  email: string;
}

export interface UserStoreState {
  user: User | null;
  setUser(user: User): void;
}

export const useUserStore = create<UserStoreState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => {
        set(() => ({ user }));
      },
    }),
    {
      name: "useUserStore",
    },
  ),
);
