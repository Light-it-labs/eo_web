import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const SurveyThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { postCancerSurveyFormSubmission } = useElixirApi();

  const { mutate } = useMutation({
    mutationFn: postCancerSurveyFormSubmission,
    mutationKey: ["postCancerSurveyFormSubmission", submission_id],
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
          We receive your feedback! <br />
          <br />
          Thank you! <br />
          <br />
          Have questions? We’re here. Email members@eo.care, call{" "}
          <a href="tel:+1-877-707-0706">877-707-0706</a>, or schedule a free
          consultation.
        </Typography>
      </div>
    </LayoutDefault>
  );
};