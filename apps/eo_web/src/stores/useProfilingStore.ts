import { create } from "zustand";
import { persist } from "zustand/middleware";





export type Channel = "cancer" | "senior" | null;

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

export interface ProfilingStore {
  symptoms: string[];
  channel?: Channel;
  type?: Type;
  introQuestionSubmissionId?: string | null;
  account: Account;
  setAccountData: (account: Account) => void;
  setChannel: (channel: Channel) => void;
  setType: (type: Type) => void;
  setIntroQuestionSubmissionId: (id: string | null) => void;
  setSymptoms: (symptoms: string[]) => void;
}

export const useProfilingStore = create<ProfilingStore>()(
  persist(
    (set) => ({
      channel: null,
      type: null,
      introQuestionSubmissionId: null,
      symptoms: [],
      setChannel(channel: Channel) {
        set({ channel });
      },
      setType(type: Type) {
        set({ type });
      },
      setIntroQuestionSubmissionId(id: string | null) {
        set({ introQuestionSubmissionId: id });
      },
      account: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        agreeReceiveNotifications: false,
        agreeTermsAndConditions: false,
      },
      setAccountData: (account: Account) => {
        set({ account });
      },
      setSymptoms: (symptoms: string[]) => {
        set({ symptoms });
      },
    }),
    {
      name: "useProfilingStore",
    },
  ),
);
