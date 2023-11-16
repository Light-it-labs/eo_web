import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const AthleteSurveyThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { postAthleteSurveyFormSubmission } = useApi();

  const { mutate } = useMutation({
    mutationFn: postAthleteSurveyFormSubmission,
    mutationKey: ["postAthleteSurveyFormSubmission", submission_id],
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
      <div className="flex h-full flex-col items-center justify-center px-[20%]">
        <Typography
          variant="large"
          className="font-nunito text-[45px] font-bold leading-[55px]"
        >
          All done!
        </Typography>
        <br />
        <Typography
          variant="base"
          font="regular"
          className="text-center font-nunito text-[28px] font-light leading-[40px]"
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
