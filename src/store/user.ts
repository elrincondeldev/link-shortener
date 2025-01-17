import { create } from "zustand";

export interface User {
  username: string | null;
  setUsername: (username: string | null) => void;
}

export const useUserStore = create<User>((set) => ({
  username: "",
  setUsername: (username: string | null) => set({ username }),
}));
