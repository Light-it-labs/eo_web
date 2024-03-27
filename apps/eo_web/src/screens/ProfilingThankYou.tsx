import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { AllDonePanel } from "~/components/AllDonePanel";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { WEB_APP_URL } from "~/configs/env";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { ROUTES } from "~/router";
import { Flows, useProfilingStore } from "~/stores/useProfilingStore";


export const ProfilingThankYou = () => {
  const [searchParams] = useSearchParams();
  const { account, flow, channel, usePayment } = useProfilingStore();
  const submissionId = searchParams.get("submission_id") || "";
  const navigate = useNavigate();

  if (!submissionId) {
    navigate(ROUTES.userRolSelector);
  }

  const { checkoutComplete } = useApi();

  const { mutate } = useMutation({
    mutationFn: checkoutComplete,
    mutationKey: ["checkoutComplete", submissionId],
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

  useMount(() => {
    if (usePayment) {
      mutate({
        email: account.email,
        submission_id: submissionId,
      });
    }
  });

  const goToWebApp = () => {
    window.location.href = WEB_APP_URL;
  };

  return (
    <LayoutDefault>
      <AllDonePanel>
        <Typography
          variant="base"
          font="regular"
          className="max-w-3xl text-center text-[22px] font-normal leading-[36px]"
        >
          You’ll be able to review your initial, personalized,
          clinician-approved care plan within 24 hours. When your care plan is
          ready, we will send you an email with a link to{" "}
          <span className="cursor-pointer underline" onClick={goToWebApp}>
            log into your account.
          </span>
          <br />
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
      <HowEOWorks pilot={flow == Flows.cancer_pilot} />
      <FAQs channel={channel ?? undefined} flow={flow} />
      <FooterFull />
    </LayoutDefault>
  );
};
