import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

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
import { ROUTES } from "~/router";

export const PrePlanV2 = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

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
        data.malady == Maladies.Sleep
      ) {
        // something jotform not return information, but re-fetching it will obtain it
        setJotformReturnedInformation(true);
      }
      setCountFetching((state) => state++);
    },
    refetchInterval:
      jotformReturnedInformation || countFetching < maxRetries ? false : 1500,
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
    (hasWorkdayTimeSelected() || hasNonWorkDayTimeSelected()) &&
    scheduleWorkDay.length &&
    scheduleNonWorkdayData.length;

  const renderPlan = (
    title: string,
    schedules: ReturnType<typeof parseSchedulesPlan>[],
  ) => {
    return (
      <section>
        <header>
          <Typography
            variant="large"
            font="bold"
            className="mb-8 mt-4 font-nobel"
          >
            {title}
          </Typography>
        </header>
        <main className="flex flex-col gap-14">
          {schedules.map(({ title, label, description, form }) => (
            <article className="gap-4 divide-y divide-gray-300" key={title}>
              <Typography className="text-gray-300">{title}</Typography>
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
        <div className="w-full max-w-[1211px] md:w-[90%] lg:w-3/5">
          <header>
            <Typography
              variant="large"
              font="bold"
              className="my-10 font-nobel"
            >
              Initial Recommendations:
            </Typography>
          </header>
          <section className="flex flex-col items-center justify-center gap-10 bg-cream-200 px-0 py-7 md:px-10 lg:flex-row">
            <article className="flex flex-row items-center justify-center gap-4">
              <div className="h-14 w-14 rounded-full bg-cream-300 p-3">
                <icons.CheckIcon className="stroke-[5px]" />
              </div>
              <div className="flex w-full flex-col md:w-[316px]">
                <Typography variant="large" font="bold" className="font-nobel">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's included:
                </Typography>
                <Typography variant="base" className="underline">
                  Product types/forms.
                </Typography>
                <Typography variant="base" className="underline">
                  Starting doses.
                </Typography>
                <Typography variant="base" className="underline">
                  Times of uses.
                </Typography>
                <Button
                  variant="white"
                  right={<icons.ArrowRightIcon />}
                  className="mt-6"
                  onClick={() => {
                    window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                  }}
                >
                  Save Recommendations
                </Button>
              </div>
            </article>
            <article className="flex-wor flex items-center justify-center gap-4">
              <div>
                <div className="h-14 w-14 rounded-full bg-cream-300 p-2">
                  <icons.XMarkIcon className="stroke-[3px]" />
                </div>
              </div>
              <div className="flex w-[316px] flex-col">
                <Typography
                  variant="large"
                  font="bold"
                  className="whitespace-nowrap font-nobel"
                >
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  What's not included:
                </Typography>
                <Typography variant="base" className="underline">
                  Local dispensary inventory match.
                </Typography>
                <Typography variant="base" className="underline">
                  Clinician review & approval.
                </Typography>
                <Typography variant="base" className="underline">
                  Ongoing feedback & optimization.
                </Typography>
                <Button
                  variant="white"
                  right={<icons.ArrowRightIcon />}
                  className="mt-6"
                  onClick={() => {
                    window.location.href = `/${union}/account?submission_id=${submissionId}&union=${union}`;
                  }}
                >
                  Continue & Get Care Plan
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
                  {/*Pending to define what to do, when jotform does respond well */}
                  <Typography></Typography>
                </div>
              )}
            </>
          ) : (
            <>
              {hasDataToShow ? (
                <>
                  {hasWorkdayTimeSelected() &&
                    renderPlan("On Workday", scheduleWorkDay)}
                  {hasNonWorkDayTimeSelected() &&
                    renderPlan("On Non- Workdays", scheduleWorkDay)}
                </>
              ) : (
                <div className="mx-4 my-10">
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
                    className="mx-auto my-3"
                    onClick={() => {
                      window.location.href = `/${union}/profile-onboarding?malady=${
                        jotformAnswers?.malady || "Pain"
                      }&union=${union}`;
                    }}
                  >
                    Redirect
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
              <Typography className="mb-8  mt-12 text-justify ">
                {whyRecommended}
              </Typography>
            </header>
          </section>
          <footer>
            <Typography className="mb-8 mt-12 text-justify">
              These recommendations were created using our proprietary data
              model which leverages the latest cannabis research and the wisdom
              of over 18,000 patient interactions. Note that these
              recommendations should be informed by a more complete
              understanding of your current symptoms, specific diagnoses,
              medications, or medical history, and have not been reviewed or
              approved by an eo clinician. To most responsibly define and
              maintain an optimal cannabis regimen,
              <span
                onClick={() => navigate(ROUTES.register)}
                className="underline"
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
