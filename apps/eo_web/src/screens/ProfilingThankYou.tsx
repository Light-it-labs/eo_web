import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { AllDonePanel } from "~/components/AllDonePanel";
import { WEB_APP_URL } from "~/configs/env";


export const ProfilingThankYou = () => {
  const [searchParams] = useSearchParams();

  const { account, introQuestionSubmissionId, channel } = useProfilingStore(
    (state) => state,
  );
  const submissionId = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submissionId) {
    navigate(ROUTES.userRolSelector);
  }

  const { postCancerFormSubmission, postSeniorFormSubmission } = useApi();

  const { mutate } = useMutation({
    mutationFn:
      channel === "cancer"
        ? postCancerFormSubmission
        : postSeniorFormSubmission,
    mutationKey: ["postCancerSeniorFormSubmission", submissionId],
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

  useMount(() =>
    mutate({
      name: account.firstName,
      last_name: account.lastName,
      email: account.email,
      password: account.password,
      phone_number: account.phoneNumber,
      profiling_submission_id: submissionId,
      intro_submission_id: introQuestionSubmissionId,
      agree_receive_notifications: account.agreeReceiveNotifications,
      agree_terms_and_conditions: account.agreeTermsAndConditions,
      channel,
    }),
  );

  const goToWebApp = () => {
    window.location.href = WEB_APP_URL;
  };

  return (
    <LayoutDefault>
      <AllDonePanel>
        <Typography
          variant="base"
          font="regular"
          className="text-center text-[22px] font-normal leading-[36px]"
        >
          You’ll be able to review your initial, personalized,
          clinician-approved
          <br /> care plan within 24 hours. When your care plan is ready, we
          will send you an email
          <br /> with a link to{" "}
          <span className="cursor-pointer underline" onClick={goToWebApp}>
            log into your account.
          </span>
          <br />
          <br />
          Have questions? We’re here. Email support@eo.care, call
          <br />
          <a href="tel:+1-877-707-0706">877-707-0706</a>, or schedule a free
          consultation.
        </Typography>
      </AllDonePanel>
      <HowEOWorks />
      <FAQs />
      <FooterFull />
    </LayoutDefault>
  );
};
