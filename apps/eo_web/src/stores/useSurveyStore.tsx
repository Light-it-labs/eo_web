import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

import { Flows, type Channel, type FlowType } from "~/stores/useProfilingStore";

export interface SurveyStorageState {
  phase: string;
  email: string;
  flow: FlowType;
  channel?: Channel;

  setChannel(channel: Channel): void;

  setPhase(phase: string): void;

  setEmail(email: string): void;

  setFlow(flows: FlowType): void;

  reset: () => void;
}

const initialState = {
  phase: "",
  email: "",
  flow: Flows.marketing_site,
  channel: undefined,
} as const;

const storage: StateStorage = {
  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  },
  removeItem: (key: string) => sessionStorage.removeItem(key),
};

export const useSurveyStore = create<SurveyStorageState>()(
  persist(
    (set, _get) => ({
      ...initialState,
      setChannel: (channel: Channel) => set({ channel }),
      setEmail: (email: string) => set({ email }),
      setPhase: (phase: string) => set({ phase }),
      setFlow: (flow: FlowType) => set({ flow }),
      reset: () => {
        set({ ...initialState, flow: _get().flow });
      },
    }),
    {
      name: "useSurveyStore",
      storage: createJSONStorage(() => storage),
    },
  ),
);
