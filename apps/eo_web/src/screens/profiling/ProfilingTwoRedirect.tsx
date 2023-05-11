import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button, Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { useZukoAnalytic } from "~/hooks/useZukoAnalytic";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

const ZUKO_SLUG_ID =
  window.data.ZUKO_SLUG_ID_PROCESS_START || "4e9cc7ceea3e22fb";
export const ProfilingTwoRedirect = () => {
  const navigate = useNavigate();
  const [sentProfile, setSentProfile] = useState(false);
  const { combineProfileOne } = useElixirApi();
  const [params] = useSearchParams();
  const { triggerCompletionEvent } = useZukoAnalytic(ZUKO_SLUG_ID);

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

  useEffect(triggerCompletionEvent, [triggerCompletionEvent]);

  useEffect(() => {
    if (!sentProfile) {
      mutate(params.get("submission_id") || "");
    }
  }, [mutate, params, sentProfile]);

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large" font="bold" className="text-center">
          Great! We are working with your care plan. <br />
          <br /> In a few minutes we will send you by email.{" "}
          <br className="hidden md:block" /> Also you will be able to view your
          care plan in your dashboard.
        </Typography>
        <Button
          type="button"
          className="mt-10"
          onClick={() => navigate(ROUTES.home)}
        >
          Go home
        </Button>
      </div>
    </LayoutDefault>
  );
};
