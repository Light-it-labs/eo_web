import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@eo/ui";

import { ROUTES } from "~/router";
import { useProfileStore } from "~/stores/useProfileStore";

export const Header = () => {
  const profile = useProfileStore((state) => state.profile);

  const setProfile = useProfileStore((state) => state.setProfile);
  const setSession = useProfileStore((state) => state.setSession);

  const navigate = useNavigate();

  const logout = () => {
    setProfile(null);
    setSession(null);
    navigate(ROUTES.login);
    toast.success("Logout successful");
  };
  return (
    <header className="border-1 flex h-[93px] w-full flex-row items-center justify-between border bg-white px-10 shadow-lg">
      <div></div>
      <img
        src="https://assets-global.website-files.com/641990da28209a736d8d7c6a/641990da28209a61b68d7cc2_eo-logo%201.svg"
        alt="Leters EO"
        className="h-11 w-20"
      />
      <div>
        {profile && (
          <Button variant="outline" onClick={() => logout()}>
            Log out
          </Button>
        )}
      </div>
    </header>
  );
};
