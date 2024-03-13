import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Flows, type FlowsTypes } from "~/stores/useProfilingStore";


export interface SurveyStorageState {
  phase: string;
  email: string;
  flow: FlowsTypes;

  setPhase(phase: string): void;

  setEmail(email: string): void;

  setFlow(flows: FlowsTypes): void;
}

export const useSurveyStore = create<SurveyStorageState>()(
  persist(
    (set, _get) => ({
      phase: "",
      email: "",
      flow: Flows.marketing_site,
      setEmail: (email: string) => set({ email }),
      setPhase: (phase: string) => set({ phase }),
      setFlow: (flow: FlowsTypes) => set({ flow }),
    }),
    {
      name: "useSurveyStore",
    },
  ),
);
