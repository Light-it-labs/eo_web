import { create } from "zustand";
import { persist } from "zustand/middleware";

import { SessionStorage } from "~/stores/SessionStorage";

export const Channels = {
  senior: "senior",
  cancer: "cancer",
} as const;
export type Channel = keyof typeof Channels;

export interface Account {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  agreeReceiveNotifications: boolean;
  agreeTermsAndConditions: boolean;
}

export type Type = "Patient" | "Caregiver" | null;

export const Flows = {
  c_org: "c_org",
  marketing_site: "marketing_site",
  cancer_pilot: "cancer_pilot",
  employer_center: "employer_center",
  cancer_support_community: "cancer_support_community",
  twist_out_cancer: "twist_out_cancer",
  resource_center_1: "resource_center_1",
  resource_center_2: "resource_center_2",
  inova: "inova",
  uva: "uva",
  imerman: "imerman",
  unite_for_her: "unite_for_her",
  mass_retirees: "mass_retirees",
  // we don't use stupid cancer anymore, but we still need to show faqs and how EO works in the surveys for the current users
  stupid_cancer: "stupid_cancer",
  // these are not real flows, because these came from resource_center_1 or resource_center_2
  // but we save these values in the same place that flows
  cancer_buddy: "cancer_buddy",
  realm_of_caring: "realm_of_caring",
  friend_family: "friend_family",
  northwell_health: "northwell_health",
  private_health_management: "private_health_management",
  memorial_sloan_kettering_cancer_center:
    "memorial_sloan_kettering_cancer_center",
  new_england_cancer_specialists: 'new_england_cancer_specialists'
} as const;

export type FlowType = keyof typeof Flows;

export interface ProfilingStore {
  symptoms: string[];
  channel: Channel | null;
  type: Type | null;
  state: string | null;
  introQuestionSubmissionId?: string | null;
  usePayment: boolean;
  origin: string;
  experience: string;
  account: Account;
  flow: FlowType;
  referredBy: string;
  setAccountData: (account: Account) => void;
  setChannel: (channel: Channel) => void;
  setType: (type: Type) => void;
  setIntroQuestionSubmissionId: (id: string | null) => void;
  setSymptoms: (symptoms: string[]) => void;
  setState: (state: string | null) => void;
  setUsePayment: (usePayment: boolean) => void;
  resetProfilingStore: () => void;
  setOrigin: (origin: string) => void;
  setExperience: (experience: string) => void;
  setFlow: (flow: FlowType) => void;
  setReferredBy: (referredBy: string) => void;
}

const defaultState = {
  channel: null,
  type: null,
  introQuestionSubmissionId: null,
  symptoms: [],
  state: null,
  origin: "",
  experience: "",
  account: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    agreeReceiveNotifications: false,
    agreeTermsAndConditions: false,
  },
  usePayment: true,
  flow: Flows.marketing_site,
  referredBy: "",
};

export const useProfilingStore = create<ProfilingStore>()(
  persist(
    (set, get) => ({
      setChannel(channel: Channel) {
        set({ channel });
      },
      setType(type: Type) {
        set({ type });
      },
      setIntroQuestionSubmissionId(id: string | null) {
        set({ introQuestionSubmissionId: id });
      },
      setAccountData: (account: Account) => {
        set({ account });
      },
      setSymptoms: (symptoms: string[]) => {
        set({ symptoms });
      },
      setState: (state: string | null) => {
        set({ state });
      },
      setUsePayment: (usePayment: boolean) => {
        set({ usePayment });
      },
      resetProfilingStore: () => {
        const currentState: ProfilingStore = get();
        set({
          ...currentState,
          ...defaultState,
          // We don't remove the flow and usePayment because it's needed to render components and they aren't PHI
          flow: currentState.flow,
          usePayment: currentState.usePayment,
        });
      },
      setOrigin: (origin: string) => {
        set({ origin });
      },
      setExperience: (experience: string) => {
        set({ experience });
      },
      setFlow: (flow: FlowType) => {
        set({ flow });
      },
      setReferredBy: (referredBy: string) => {
        set({ referredBy });
      },
      ...defaultState,
    }),
    {
      name: "useProfilingStore",
      storage: SessionStorage,
    },
  ),
);
