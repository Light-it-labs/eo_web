import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const FormThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { postCancerFormSubmission } = useElixirApi();

  const { mutate } = useMutation({
    mutationFn: postCancerFormSubmission,
    mutationKey: ["postCancerFormSubmission", submission_id],
    onError: (result) => {
      if (axios.isAxiosError(result)) {
        if (result.response?.status !== 200) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  useMount(() => mutate({ submission_id }));

  return (
    <LayoutDefault>
      <div className="flex flex-col items-center justify-center px-[20%]">
        <Typography
          variant="large"
          className="font-nunito font-bold"
          style={{
            fontFamily: "nunito",
            lineHeight: "55px",
            fontSize: "45px",
          }}
        >
          All done!
        </Typography>
        <br />
        <Typography
          variant="base"
          font="regular"
          className="text-center font-nunito"
          style={{
            fontWeight: "300px",
            fontFamily: "nunito",
            lineHeight: "40px",
            fontSize: "28px",
          }}
        >
          You’ll be able to review your initial, personalized,
          clinician-approved care plan within 24 hours.
          <br />
          When you’re care plan is ready, we will send you an email with a link to log into your account.
          <br />
          Have a question? We’re here to help.
          Email members@eo.care, call 877.707.0706, or schedule a free consultation.
          <br />
          Have questions? We’re here to help. Email <a href="mailto:members@eo.care">members@eo.care</a>, call&nbsp;
          <a href="tel:+1-877-707-0706">877.707.0706</a>, or&nbsp;
          <span className="underline">schedule a free consultation</span>.
        </Typography>
      </div>
    </LayoutDefault>
  );
};
