import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  email: string;
}
export interface Session {
  app_release: null | unknown;
  app_version: null | unknown;
  device: null | unknown;
  device_type: null | unknown;
  ios_version: null | unknown;
  token: string;
  vendor_id: null | unknown;
}

export interface UserStoreState {
  profile: Profile | null;
  setProfile(profile: Profile): void;
  session: Session | null;
  setSession(session: Session | null): void;
}

export const useProfileStore = create<UserStoreState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile | null) => {
        set(() => ({ profile }));
      },
      session: null,
      setSession: (session) => {
        set(() => ({ session }));
      },
    }),
    {
      name: "useProfileStore",
    },
  ),
);
