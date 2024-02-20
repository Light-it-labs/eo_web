import { create } from "zustand";
import { persist } from "zustand/middleware";





export interface SurveyStorageState {
  phase: string;
  email: string;

  setPhase(phase: string): void;

  setEmail(email: string): void;
}

export const useSurveyStore = create<SurveyStorageState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      phase: "",
      email: "",
      setEmail: (email: string) => set({ email }),
      setPhase: (phase: string) => set({ phase }),
    }),
    {
      name: "useSurveyStore",
    },
  ),
);
