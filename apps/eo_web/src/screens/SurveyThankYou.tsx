import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";


export const SeniorSurveyThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate("/");
  }

<<<<<<<< HEAD:apps/eo_web/src/screens/SurveyThankYou.tsx
  const { postCancerSurveyFormSubmission } = useApi();
========
  const { postSeniorSurveyFormSubmission } = useApi();
>>>>>>>> main:apps/eo_web/src/screens/Senior/SeniorSurveyThankYou.tsx

  const { mutate } = useMutation({
    mutationFn: postSeniorSurveyFormSubmission,
    mutationKey: ["postSeniorSurveyFormSubmission", submission_id],
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
<<<<<<<< HEAD:apps/eo_web/src/screens/SurveyThankYou.tsx
          className="font-nunito text-center text-[28px] font-light leading-[40px]"
========
          className="text-center font-nunito text-[28px] font-light leading-[40px]"
>>>>>>>> main:apps/eo_web/src/screens/Senior/SeniorSurveyThankYou.tsx
        >
          We receive your feedback! <br />
          <br />
          Thank you! <br />
          <br />
          Have a question? We’re here to help.
          Email support@eo.care, call 877.707.0706, or schedule a free consultation.
          <br />
          Have questions? We’re here to help. Email <a href="mailto:support@eo.care">support@eo.care</a>, call&nbsp;
          <a href="tel:+1-877-707-0706">877.707.0706</a>, or&nbsp;
          <span className="underline">schedule a free consultation</span>.
        </Typography>
      </div>
    </LayoutDefault>
  );
};
