import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

export const ProfilingOneRedirect = () => {
  const navigate = useNavigate();
  const [sentProfile, setSentProfile] = useState(false);
  const { combineProfileOne } = useElixirApi();
  const params = new URLSearchParams(window.location.search);

  if (!params.get("submission_id")) {
    navigate(ROUTES.login);
  }

  const { mutate } = useMutation({
    mutationFn: combineProfileOne,
    onSuccess: () => {
      setSentProfile(true);
      setTimeout(() => {
        navigate(ROUTES.profilingTwo);
      }, 5000);
    },
  });

  useEffect(() => {
    if (!sentProfile) {
      mutate(params.get("submission_id") || "");
    }
  }, [sentProfile]);

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large" font="bold">
          Great! Your submission was sent.
        </Typography>
        <Button
          type="button"
          className="mt-10"
          onClick={() => navigate(ROUTES.profilingTwo)}
        >
          Continue!
        </Button>
      </div>
    </LayoutDefault>
  );
};
