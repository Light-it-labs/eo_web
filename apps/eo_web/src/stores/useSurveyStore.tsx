import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Flows, type FlowsTypes } from "~/stores/useProfilingStore";


export interface SurveyStorageState {
  phase: string;
  email: string;
  flow: FlowsTypes;

  pilot: boolean;

  setPhase(phase: string): void;

  setEmail(email: string): void;

  setFlow(flows: FlowsTypes): void;

  setPilot(pilot: boolean): void;
}

export const useSurveyStore = create<SurveyStorageState>()(
  persist(
    (set, _get) => ({
      phase: "",
      email: "",
      flow: Flows.marketing_site,
      pilot: false,
      setEmail: (email: string) => set({ email }),
      setPhase: (phase: string) => set({ phase }),
      setFlow: (flow: FlowsTypes) => set({ flow }),
      setPilot: (pilot: boolean) => set({ pilot }),
    }),
    {
      name: "useSurveyStore",
    },
  ),
);
