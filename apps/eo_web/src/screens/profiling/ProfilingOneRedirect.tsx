import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const ProfilingOneRedirect = () => {
  const navigate = useNavigate();
  const [sentProfile, setSentProfile] = useState(false);
  const { combineProfileOne } = useApi();
  const [params] = useSearchParams();

  if (!params.get("submission_id")) {
    navigate(ROUTES.login);
  }

  const { mutate } = useMutation({
    mutationFn: combineProfileOne,
    onSuccess: () => {
      setTimeout(() => {
        navigate(ROUTES.prePlan);
      }, 5000);
    },
    onError: () => {
      setSentProfile(false);
    },
  });

  useEffect(() => {
    if (!sentProfile) {
      setSentProfile((sent) => {
        if (!sent) {
          mutate(params.get("submission_id") || "");
        }
        return true;
      });
    }
  }, [mutate, params, sentProfile]);

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large" font="bold">
          Great! Your submission was sent.
        </Typography>
        <Button
          type="button"
          className="mt-10"
          onClick={() => navigate(ROUTES.prePlan)}
        >
          Continue!
        </Button>
      </div>
    </LayoutDefault>
  );
};
