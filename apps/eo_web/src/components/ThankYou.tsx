import { type HTMLAttributes } from "react";
import { Typography } from "@eo/ui";
import { AllDonePanel } from "./AllDonePanel";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading } from "~/components/Loading";

import { useMount } from "~/hooks/useMount";
import { useState } from "react";

type ThankYouProps = HTMLAttributes<HTMLElement> & {
  mutationsParams: {
    email: string;
    phase?: string;
  },
  mutationKey: string[];
  mutationFunction: (data: object) => Promise<any>;
  isProfiling?: boolean;
  mutateOnMount?: boolean;
}

export const ThankYou = ({
  children,
  mutationKey,
  mutationFunction,
  mutationsParams,
  mutateOnMount = true
}: ThankYouProps) => {
  const [isLoading, setIsLoading] = useState(mutateOnMount);

  const { mutate } = useMutation({
    mutationFn: mutationFunction,
    mutationKey: mutationKey,
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

  useMount(() => {
    if (mutateOnMount) {
      mutate(mutationsParams);
    };
  })

  return (
    isLoading ?
      <section className="flex flex-col items-center justify-center md:min-h-[479px] relative">
        <Loading />
      </section>
      :
      <AllDonePanel>
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
          </>
          }
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
  )
};
