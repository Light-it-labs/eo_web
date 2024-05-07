import { type HTMLAttributes, type ReactNode } from "react";
import { Typography } from "@eo/ui";
import { AllDonePanel } from "./AllDonePanel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSurveyStore } from "~/stores/useSurveyStore";
import { Loading } from "~/components/Loading";

import { useMount } from "~/hooks/useMount";
import { useState } from "react";
import { useProfilingStore } from "~/stores/useProfilingStore";

type ThankYouProps = HTMLAttributes<HTMLElement> & {
  mutationKey: string;
  mutationFunction: (data: object) => Promise<any>;
  exitRoute?: string;
  isProfiling?: boolean;
}

export const ThankYou = ({ children, mutationKey, mutationFunction, exitRoute = '/', isProfiling = false }: ThankYouProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const { email, phase } = useSurveyStore();
  const { account, usePayment } = useProfilingStore();

  const submission_id = searchParams.get("submission_id") ?? "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(exitRoute);
  }

  const { mutate } = useMutation({
    mutationFn: mutationFunction,
    mutationKey: [mutationKey, submission_id],
    onSuccess: () => {
      () => setIsLoading(false);
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

  useMount(() => {
    if (!isProfiling || usePayment) {

      mutate({ email: isProfiling ? account.email : email, phase, submission_id })
    };
  })

  return (
    <AllDonePanel>
      {!isLoading ?
        <Loading setIsLoading={setIsLoading} />
        : <>
          <Typography
            variant="base"
            font="regular"
            className="max-w-xl text-center text-[22px] font-normal leading-[36px]"
          >
            {children ?? <>
              We received your feedback!
              <br />
              <br />
              Thank you!
            </>}
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
        </>}
    </AllDonePanel>
  )
};
