import { useState, type HTMLAttributes } from "react";
import { useMutation } from "@tanstack/react-query";

import { Typography } from "@eo/ui";

import { Loading } from "~/components/Loading";
import { useMount } from "~/hooks/useMount";
import { useProfilingStore, type Channel } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";
import { AllDonePanel } from "./AllDonePanel";

type ThankYouProps = HTMLAttributes<HTMLElement> & {
  mutationsParams: {
    email: string;
    phase?: string;
    submission_id: string;
    channel: Channel;
  };
  mutationKey: string[];
  mutationFunction: (data: object) => Promise<never>;
  isProfiling?: boolean;
  mutateOnMount?: boolean;
};

export const ThankYou = ({
  children,
  mutationKey,
  mutationFunction,
  mutationsParams,
  mutateOnMount = true,
}: ThankYouProps) => {
  const resetSurveyStore = useSurveyStore((store) => store.reset);
  const resetProfilingStore = useProfilingStore(
    (store) => store.resetProfilingStore,
  );
  const [isLoading, setIsLoading] = useState(mutateOnMount);

  const { mutate } = useMutation({
    mutationFn: mutationFunction,
    mutationKey: mutationKey,
    onSettled: () => {
      setIsLoading(false);
      resetSurveyStore();
      resetProfilingStore();
    },
  });

  useMount(() => {
    if (mutateOnMount) {
      mutate(mutationsParams);
    } else {
      resetSurveyStore();
      resetProfilingStore();
    }
  });

  return isLoading ? (
    <section className="relative flex flex-col items-center justify-center">
      <div className="h-[479px]">
        <Loading />
      </div>
    </section>
  ) : (
    <AllDonePanel>
      <Typography
        variant="base"
        font="regular"
        className="max-w-xl text-center text-[22px] font-normal leading-[36px]"
      >
        {children ?? (
          <>
            We received your feedback.
            <br />
            <br />
            Thank you.
          </>
        )}
        <br />
        <br />
        Have questions? We’re here. Email support@eo.care, call{" "}
        <a href="tel:+1-888-823-6143">888-823-6143</a>, or{" "}
        <a
          className="cursor-pointer font-new-hero text-[22px] underline"
          href="https://calendly.com/eo-care/30min?back=1"
          target="_blank"
        >
          schedule a chat
        </a>{" "}
        with a member of our team.
      </Typography>
    </AllDonePanel>
  );
};
