import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { Button, Loading, Typography, icons } from "@eo/ui";

import {
  Maladies,
  ThcProductPreferencesEnum,
  TimeToUse,
  type Schedule,
} from "~/api/PrePlanTypes";
import { useElixirApi } from "~/api/useElixirApi";
import { usePrePlan } from "~/api/usePrePlan";
import { getImageForForm } from "~/helpers/PrePlan";
import { LayoutDefault } from "~/layouts";





export const PrePlanV2 = () => {
  const [searchParams] = useSearchParams();

  const submissionId = searchParams.get("submission_id");
  const union = searchParams.get("union");

  const [jotformReturnedInformation, setJotformReturnedInformation] =
    useState(false);

  const maxRetries = 10;
  const [countFetching, setCountFetching] = useState(0);

  const { getSubmissionById } = useElixirApi();
  const { data } = useQuery({
    queryFn: () => getSubmissionById(submissionId as string),
    queryKey: ["getSubmission", submissionId],
    enabled: !!submissionId,
    onSuccess: ({ data }) => {
      if (
        data.malady === Maladies.Pain ||
        data.malady === Maladies.Anxiety ||
        data.malady === Maladies.Sleep ||
        data.malady === Maladies.Other
      ) {
        // something jotform not return information, but re-fetching it will obtain it
        setJotformReturnedInformation(true);
      }
      setCountFetching((state) => state + 1);
    },
    refetchInterval:
      jotformReturnedInformation || countFetching >= maxRetries ? false : 1500,
  });

  const jotformAnswers = data?.data;

  // hasWorkdayTimeSelected y hasNonWorkdayTimeSelected no deberian de estar aqui. Se deberia hacer en cada uno de los
  // hooks eliminando la franja horaria que la persona no tiene intencion de implementar el care plan
  const hasWorkdayTimeSelected = () => {
    return (
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayEvenings,
      ) ||
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayMornings,
      ) ||
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayAfternoons,
      ) ||
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.WorkDayBedtimes,
      )
    );
  };

  const hasNonWorkDayTimeSelected = () => {
    return (
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayEvenings,
      ) ||
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayMornings,
      ) ||
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayAfternoons,
      ) ||
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi.includes(
        TimeToUse.NonWorkDayBedtimes,
      )
    );
  };

  const { nonWorkdayPlan, workdayPlan, whyRecommended } = usePrePlan({
    avoidPresentation: jotformAnswers?.areThere || [],
    currentlyUsingCannabisProducts:
      jotformAnswers?.usingCannabisProducts === "Yes",
    openToUseThcProducts:
      jotformAnswers?.workday_allow_intoxication_nonworkday_allow_intoxi || [],
    reasonToUse: jotformAnswers?.whatBrings || [],
    symptomsWorseTimes: jotformAnswers?.symptoms_worse_times || [],
    thcTypePreferences:
      jotformAnswers?.thc_type_preferences || ThcProductPreferencesEnum.notSure,
  });

  const parseSchedulesPlan = (schedules: Schedule) => {
    let title = "";
    switch (schedules.time) {
      case "Morning":
        title = "IN THE MORNINGS";
        break;
      case "Evening":
        title = "IN THE EVENING";
        break;
      case "BedTime":
        title = "AT BEDTIME";
        break;
    }

    return {
      title: title,
      label: schedules.result,
      description: "",
      form: schedules.form,
      type: schedules.type,
    };
  };

  const scheduleWorkDay = Object.values(workdayPlan)
    .map(parseSchedulesPlan)
    .filter((schedule) => !!schedule.type);
  const scheduleNonWorkdayData = Object.values(nonWorkdayPlan)
    .map(parseSchedulesPlan)
    .filter((schedule) => !!schedule.type);

  const hasDataToShow =
    (hasWorkdayTimeSelected() ||
      jotformAnswers?.thc_type_preferences ===
        ThcProductPreferencesEnum.notPrefer ||
      hasNonWorkDayTimeSelected()) &&
    scheduleWorkDay.length &&
    scheduleNonWorkdayData.length;

  const renderPlan = (
    title: string,
    schedules: ReturnType<typeof parseSchedulesPlan>[],
  ) => {
    return (
      <section className="mt-8">
        <header>
          <Typography
            variant="large"
            font="bold"
            className="mb-8 mt-4 font-nobel "
          >
            {title}
          </Typography>
        </header>
        <main className="flex flex-col gap-14">
          {schedules.map(({ title, label, description, form }) => (
            <article className="gap-4 divide-y divide-gray-300" key={title}>
              <Typography className="text-gray-600">{title}</Typography>
              <div className="flex flex-col items-center gap-4 pt-4 md:flex-row">
                <div className="w-14">
                  <div className="flex h-10 w-10 flex-row items-center justify-center rounded-full bg-cream-300 p-2">
                    {getImageForForm(form)}
                  </div>
                </div>
                <div>
                  <Typography font="semiBold" className="font-nobel">
                    {label}
                  </Typography>
                  <Typography className="hidden md:block">
                    {description}
                  </Typography>
                </div>
              </div>
            </article>
          ))}
        </main>
      </section>
    );
  };

  return (
    <LayoutDefault>
      <div className="flex  flex-col items-center gap-0 px-2 md:gap-20">
        <div className="w-full max-w-[1211px] md:w-[90%] lg:w-4/5">
          <header>
            <Typography
              variant="large"
              font="bold"
              className="my-10 font-nobel"
            >
              Initial Recommendations:
            </Typography>
          </header>
          <section className="grid grid-cols-1 items-center  justify-center divide-x divide-solid bg-cream-200 px-0 py-7 md:px-3 lg:grid-cols-2 lg:divide-gray-400">
            <article className="md:max-w-1/2 flex flex-col items-center justify-center gap-4 md:flex-row">
              <div className="ml-4 flex h-10 w-10 flex-row items-center justify-center rounded-full bg-cream-300 p-2 md:h-14 md:w-14 md:p-3">
                <icons.CheckIcon className="h-20 w-20 stroke-[5px] md:h-14 md:w-14" />
              </div>
              <div className="flex w-[316px] flex-col p-4">
                <Typography
                  variant="large"
                  font="bold"
                  className="font-nobel text-3xl"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's included:
                </Typography>
                <Typography variant="base" font="medium">
                  Product types/forms.
                </Typography>
                <Typography variant="base" font="medium">
                  Starting doses.
                </Typography>
                <Typography variant="base" font="medium">
                  Times of uses.
                </Typography>
                <Button
                  variant="white"
                  right={<icons.ArrowRightIcon className="stroke-[4px]" />}
                  className="mt-6 h-[30px]"
                  onClick={() => {
                    window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                  }}
                >
                  <Typography font="medium">Save Recommendations</Typography>
                </Button>
              </div>
            </article>
            <article className="md:max-w-1/2 flex flex-col items-center justify-center gap-4 md:flex-row">
              <div className="ml-4 flex h-10 w-10 flex-row items-center justify-center rounded-full bg-cream-300 p-2 md:h-14 md:w-14 md:p-3">
                <icons.XMarkIcon className="h-20 w-20 stroke-[5px] md:h-14 md:w-14" />
              </div>
              <div className="flex w-[316px] flex-col p-4">
                <Typography
                  variant="large"
                  font="bold"
                  className="whitespace-nowrap font-nobel text-3xl"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's not included:
                </Typography>
                <Typography variant="base" font="medium">
                  Local dispensary inventory match.
                </Typography>
                <Typography variant="base" font="medium">
                  Clinician review & approval.
                </Typography>
                <Typography variant="base" font="medium">
                  Ongoing feedback & optimization.
                </Typography>
                <Button
                  variant="white"
                  right={<icons.ArrowRightIcon className="stroke-[4px]" />}
                  className="mt-6 h-[30px]"
                  onClick={() => {
                    window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                  }}
                >
                  <Typography font="medium">
                    Continue & Get Care Plan
                  </Typography>
                </Button>
              </div>
            </article>
          </section>
          {!jotformReturnedInformation && !hasDataToShow ? (
            <>
              {countFetching < maxRetries ? (
                <div className="relative h-[250px]">
                  <Loading />
                </div>
              ) : (
                <div>
                  <Typography className="my-4 text-justify">
                    We apologize for the inconvenience, but we are currently
                    experiencing difficulties establishing a connection. This
                    may be due to temporary network issues or ongoing
                    maintenance. Please try again later. If the problem
                    persists, kindly check your internet connection or contact
                    our support team for assistance. Thank you for your
                    patience, and we apologize for any inconvenience caused.
                    <br />
                    <br />
                    You can reach our customer support team by calling the
                    following phone number: 877-707-0706. Our representatives
                    will be delighted to assist you and address any inquiries
                    you may have. Alternatively, you can also send us an email
                    at members@eo.care. Our support team regularly checks this
                    email and will respond to you as soon as possible.
                  </Typography>
                </div>
              )}
            </>
          ) : (
            <>
              {hasDataToShow ? (
                <>
                  {(hasWorkdayTimeSelected() ||
                    jotformAnswers?.thc_type_preferences ===
                      ThcProductPreferencesEnum.notPrefer) &&
                    renderPlan(
                      jotformAnswers?.thc_type_preferences !==
                        ThcProductPreferencesEnum.notPrefer
                        ? "On Workday"
                        : "Daily Schedule",
                      scheduleWorkDay,
                    )}
                  {hasNonWorkDayTimeSelected() &&
                    renderPlan("On Non-Workdays", scheduleNonWorkdayData)}
                </>
              ) : (
                <div className="my-10">
                  <Typography className="text-justify">
                    Attention: In order to provide accurate recommendations, we
                    need more information from you. It seems that the previous
                    form was not filled out completely. To ensure we can assist
                    you effectively, please take a moment to provide all the
                    necessary details.
                    <br />
                    <br />
                    Please click the link below to return to the form and
                    complete it in its entirety:
                  </Typography>

                  <Button
                    variant="white"
                    left={
                      <icons.ArrowRightIcon className="rotate-180 stroke-[4px]" />
                    }
                    className="mx-auto my-3"
                    onClick={() => {
                      window.location.href = `/${union}/profile-onboarding?malady=${
                        jotformAnswers?.malady || "Pain"
                      }&union=${union}`;
                    }}
                  >
                    <Typography font="medium">Redirect</Typography>
                  </Button>

                  <Typography>
                    Thank you for your cooperation. We appreciate your effort in
                    providing us with the required information to serve you
                    better.
                  </Typography>
                </div>
              )}
            </>
          )}
          <section>
            <header>
              <Typography
                variant="large"
                font="bold"
                className="mb-8 mt-12 font-nobel"
              >
                Why recommended
              </Typography>
              <Typography className="mb-4 mt-4 py-2 text-justify">
                {whyRecommended}
              </Typography>
            </header>
          </section>
          <footer>
            <Typography className="mb-8 mt-4 text-justify">
              These recommendations were created using our proprietary data
              model which leverages the latest cannabis research and the wisdom
              of over 18,000 patient interactions. Note that these
              recommendations should be informed by a more complete
              understanding of your current symptoms, specific diagnoses,
              medications, or medical history, and have not been reviewed or
              approved by an eo clinician. To most responsibly define and
              maintain an optimal cannabis regimen,{" "}
              <span
                onClick={() => {
                  window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                }}
                className="poin cursor-pointer font-bold underline"
              >
                get your eo care plan now.
              </span>
            </Typography>
          </footer>
        </div>
      </div>
    </LayoutDefault>
  );
};
