import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Channel = "senior" | "cancer";

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
        set({ ...get(), ...defaultState });
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
      ...defaultState,
    }),
    {
      name: "useProfilingStore",
    },
  ),
);
