import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type Channel, Flows, type FlowType } from "~/stores/useProfilingStore";


export interface SurveyStorageState {
  phase: string;
  email: string;
  flow: FlowType;
  channel?: Channel;

  setChannel(channel: Channel): void;

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
      channel: undefined,
      setChannel: (channel: Channel) => set({ channel }),
      setEmail: (email: string) => set({ email }),
      setPhase: (phase: string) => set({ phase }),
      setFlow: (flow: FlowType) => set({ flow }),
    }),
    {
      name: "useSurveyStore",
    },
  ),
);
