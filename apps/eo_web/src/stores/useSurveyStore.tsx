import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Flows, type FlowType } from "~/stores/useProfilingStore";


export interface SurveyStorageState {
  phase: string;
  email: string;
  flow: FlowType;

  setPhase(phase: string): void;

  setEmail(email: string): void;

  setFlow(flows: FlowType): void;
}

export const useSurveyStore = create<SurveyStorageState>()(
  persist(
    (set, _get) => ({
      phase: "",
      email: "",
      flow: Flows.marketing_site,
      setEmail: (email: string) => set({ email }),
      setPhase: (phase: string) => set({ phase }),
      setFlow: (flow: FlowType) => set({ flow }),
    }),
    {
      name: "useSurveyStore",
    },
  ),
);
