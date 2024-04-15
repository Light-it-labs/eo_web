import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { AllDonePanel } from "~/components/AllDonePanel";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { Loading } from "~/components/Loading";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { Flows } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";
import { Footer } from "~/layouts/Footer";


export const CancerSurveyThankYou = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const { email, phase, flow } = useSurveyStore();

  const submission_id = searchParams.get("submission_id") ?? "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate("/");
  }

  const { postCancerSurveyFormSubmission } = useApi();

  const { mutate } = useMutation({
    mutationFn: postCancerSurveyFormSubmission,
    mutationKey: ["postCancerSurveyFormSubmission", submission_id],
    onSuccess: () => {
      setIsLoading(false);
    },
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

  useMount(() => mutate({ email, phase, submission_id }));

  if (isLoading) {
    return (
      <LayoutDefault>
        <Loading />
      </LayoutDefault>
    );
  }

  return (
    <LayoutDefault>
      <AllDonePanel>
        <Typography
          variant="base"
          font="regular"
          className="max-w-xl text-center text-[22px] font-normal leading-[36px]"
        >
          We received your feedback! <br />
          <br />
          Thank you! <br />
          <br />
          Have questions? We’re here. Email support@eo.care, call{" "}
          <a href="tel:+1-888-823-6143">888-823-6143</a>, or{" "}
          <a
            className="cursor-pointer font-new-hero text-[22px] underline"
            href="https://calendly.com/eo-care/30min?back=1"
            target="_blank"
          >
            schedule a video chat
          </a>{" "}
          with a member of our team.
        </Typography>
      </AllDonePanel>
      <HowEOWorks pilot={flow === Flows.cancer_pilot} />
      <FAQs channel="cancer" flow={flow} />
      {['c_org', 'cancer_pilot', 'twist_out_cancer', 'cancer_support_community', 'employer_center', 'resource_center_1', 'resource_center_2', 'inova'].includes(flow)
        ? <Footer flow={flow} />
        : <FooterFull />}
    </LayoutDefault>
  );
};
