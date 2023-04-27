import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Profile {
  email: string;
  zip: null | string;
}
export interface Session {
  token: string;
}

export interface ProfileStoreState {
  profile: Profile | null;
  setProfile(profile: Profile | null): void;
  session: Session | null;
  setSession(session: Session | null): void;
  setProfileZip(zip: string | null): void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set, get) => ({
      profile: null,
      setProfile: (profile: Profile | null) => {
        set(() => ({ profile }));
      },
      session: null,
      setSession: (session) => {
        set(() => ({ session }));
      },
      setProfileZip: (zip) => {
        const profile = get().profile;
        set(() => ({ profile: profile ? { ...profile, zip } : null }));
      },
    }),
    {
      name: "useProfileStore",
    },
  ),
);
