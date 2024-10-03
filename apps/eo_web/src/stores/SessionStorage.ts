import { createJSONStorage, type StateStorage } from "zustand/middleware";

const SessionStateStorage: StateStorage = {
  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  },
  removeItem: (key: string) => sessionStorage.removeItem(key),
};

export const SessionStorage = createJSONStorage(() => SessionStateStorage);
