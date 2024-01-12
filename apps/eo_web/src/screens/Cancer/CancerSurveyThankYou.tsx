import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { AllDonePanel } from "~/components/AllDonePanel";
import { HowEOWorks } from "~/components/HowEOWorks";
import { FAQs } from "~/components/FAQs";
import { FooterFull } from "~/layouts/FooterFull";
import { useProfilingStore } from "~/stores/useProfilingStore";


export const CancerSurveyThankYou = () => {
  const [searchParams] = useSearchParams();

  const usePayment = useProfilingStore((s) => s.usePayment);

  const submission_id = searchParams.get("submission_id") ?? "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate("/");
  }

  const { postCancerSurveyFormSubmission } = useApi();

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
      <AllDonePanel>
        <Typography
          variant="base"
          font="regular"
          className="text-center text-[22px] font-normal leading-[36px]"
        >
          We received your feedback! <br />
          <br />
          Thank you! <br />
          <br />
          Have questions? We’re here. Email support@eo.care, call
          <br />
          <a href="tel:+1-877-707-0706">877-707-0706</a>, or schedule a free
          consultation.
        </Typography>
      </AllDonePanel>
      <HowEOWorks pilot={!usePayment} />
      <FAQs pilot={!usePayment} />
      <FooterFull />
    </LayoutDefault>
  );
};
