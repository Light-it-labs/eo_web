import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { LayoutDefault } from "~/layouts/LayoutDefault";
import { ROUTES } from "~/router";
import { useProfileStore } from "~/stores/useProfileStore";

export const Home = () => {
  const profile = useProfileStore((state) => state.profile);
  const navigate = useNavigate();
  useEffect(() => {
    if (!profile?.zip) {
      navigate(ROUTES.zipCodeValidation);
    }
  });

  return (
    <LayoutDefault>
      <br />
    </LayoutDefault>
  );
};
