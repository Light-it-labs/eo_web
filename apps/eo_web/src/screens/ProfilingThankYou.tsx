import React from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { EoCarousel } from "~/components/Carousel";
import { Collapsible } from "~/components/Collapsible";
import { WEB_APP_URL } from "~/configs/env";
import { CarrouselItems, faqs } from "~/copy/copy";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";


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
      <section className="flex h-auto flex-col items-center justify-center px-[20%] md:min-h-[479px]">
        <Typography
          variant="large"
          className="text-[42px] font-bold leading-[55px]"
        >
          All done!
        </Typography>

        <br />
        <Typography
          variant="base"
          font="regular"
          className="text-center text-[22px] font-normal leading-[36px]"
        >
          You’ll be able to review your your initial, personalized,
          clinician-approved
          <br /> care plan within 24 hours. When your care plan is ready, we
          will send you an email
          <br /> with a link to{" "}
          <span className="cursor-pointer underline" onClick={goToWebApp}>
            log into your account.
          </span>
          <br />
          <br />
          Have questions? We’re here. Email members@eo.care, call
          <br />
          <a href="tel:+1-877-707-0706">877-707-0706</a>, or schedule a free
          consultation.
        </Typography>
      </section>
      <section className="bg-white px-6 py-12 md:px-[50px] md:py-[100px] ">
        <Typography font="bold" variant="large" className="mb-20 text-center">
          How eo care plans work
        </Typography>
        <EoCarousel>
          {CarrouselItems.map(({ title, content, step, icon: Icon }) => (
            <article
              key={step}
              className="mx-auto my-0 flex h-auto w-auto max-w-[361px] flex-col items-center justify-center gap-2 md:flex-none md:items-start"
            >
              <div className="flex h-[70.13px] w-[70.13px] flex-row items-center justify-center rounded-full bg-electric-blue fill-gray-50">
                <Icon className="h-9 w-[37px]" />
              </div>

              <Typography className="text-[16px] uppercase leading-4 tracking-[.8px]">
                STEP {step}
              </Typography>
              <Typography font="bold" className="text-xl">
                {title}
              </Typography>
              <Typography className="text-center text-lg md:text-left">
                {content}
              </Typography>
            </article>
          ))}
        </EoCarousel>
      </section>
      <section className="px-6 py-12 md:mx-0 md:my-[100px]">
        <div className="mx-auto my-0 flex max-w-[900px] flex-col">
          <Typography
            font="bold"
            variant="large"
            className="mb-[50px] text-center"
          >
            FAQs
          </Typography>
          <div className="flex flex-col gap-6">
            {faqs.map(({ title, content }) => (
              <Collapsible key={title} title={title} active={false}>
                <Typography className="text-[18px] leading-[26px] text-gray-800">
                  {content}
                </Typography>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>
      <section className="hidden w-full bg-white px-6 py-12 md:px-[50px] md:py-[100px]">
        <div className="flex flex-col items-center">
          <Typography
            font="bold"
            className="mb-4 text-center text-[32px] leading-[40px] text-skun"
          >
            eo in your inbox
          </Typography>
          <Typography className="text-center text-skun-mid">
            Rollouts in new markets, new partnerships, research initiatives and
            special offers are all coming soon.
          </Typography>
          <div className="mt-[30px] flex w-full flex-col justify-items-end gap-4 md:w-auto md:flex-row">
            <input
              className="h-[49px] w-full rounded-[40px] border border-solid border-black bg-white py-3 pl-4 pr-2 text-black placeholder:text-gray-300 md:w-[327px]"
              placeholder="Enter your email..."
            />
            <Button variant="black" font="semiBold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      <FooterFull />
    </LayoutDefault>
  );
};
