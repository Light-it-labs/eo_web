import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Button, Typography, icons } from "@eo/ui";

import { ThcProductPreferencesEnum } from "~/api/PrePlanTypes";
import { useApi } from "~/api/useApi";
import { usePrePlan } from "~/api/usePrePlan";
import { getImageForForm } from "~/helpers/PrePlan";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const PrePlan = () => {
  // when have time connect to backend
  const { getSubmission } = useApi();
  const { data } = useQuery({
    queryFn: getSubmission,
    queryKey: ["getSubmission"],
  });

  const values = data?.data.values;

  const { nonWorkdayPlan, workdayPlan, whyRecommended } = usePrePlan(
    !values
      ? {
        avoidPresentation: [],
        currentlyUsingCannabisProducts: false,
        openToUseThcProducts: [],
        reasonToUse: [],
        symptomsWorseTimes: [],
        thcTypePreferences: ThcProductPreferencesEnum.notSure,
      }
      : {
        avoidPresentation: values.areThere,
        currentlyUsingCannabisProducts:
          values.usingCannabisProducts === "Yes",
        openToUseThcProducts:
          values.workday_allow_intoxication_nonworkday_allow_intoxi,
        reasonToUse: values.whatBrings,
        symptomsWorseTimes: values.symptoms_worse_times,
        thcTypePreferences: values.thc_type_preferences,
      },
  );

  const navigate = useNavigate();

  const workDayData = [
    {
      title: "IN THE MORNINGS",
      label: workdayPlan.dayTime.result,
      description: "",
      form: workdayPlan.dayTime.form,
      type: workdayPlan.dayTime.type,
    },
    {
      title: "IN THE EVENING",
      label: workdayPlan.evening.result,
      description: "",
      form: workdayPlan.evening.form,
      type: workdayPlan.evening.type,
    },
    {
      title: "AT BEDTIME",
      label: workdayPlan.bedTime.result,
      description: "",
      form: workdayPlan.bedTime.form,
      type: workdayPlan.bedTime.type,
    },
  ];

  const nonWorkdayData = [
    {
      title: "IN THE MORNINGS",
      label: nonWorkdayPlan.dayTime.result,
      description: "",
      form: nonWorkdayPlan.dayTime.form,
      type: nonWorkdayPlan.dayTime.type,
    },
    {
      title: "IN THE EVENING",
      label: nonWorkdayPlan.evening.result,
      description: "",
      form: nonWorkdayPlan.evening.form,
      type: nonWorkdayPlan.evening.type,
    },
    {
      title: "AT BEDTIME",
      label: nonWorkdayPlan.bedTime.result,
      description: "",
      form: nonWorkdayPlan.bedTime.form,
      type: nonWorkdayPlan.bedTime.type,
    },
  ];

  return (
    <LayoutDefault>
      <div className="flex  flex-col items-center gap-0 px-2 md:gap-20">
        <div className="w-full max-w-[1211px] lg:w-3/5">
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
                    navigate(ROUTES.profilingTwo);
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
                    navigate(ROUTES.profilingTwo);
                  }}
                >
                  Continue & Get Care Plan
                </Button>
              </div>
            </article>
          </section>
          <section>
            <header>
              <Typography
                variant="large"
                font="bold"
                className="mb-8 mt-4 font-nobel"
              >
                On Workdays
              </Typography>
            </header>
            <main className="flex flex-col gap-14">
              {workDayData.map(({ title, label, description, type, form }) =>
                type ? (
                  <article
                    className="gap-4 divide-y divide-gray-300"
                    key={title}
                  >
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
                ) : (
                  <></>
                ),
              )}
            </main>
          </section>
          <section>
            <Typography
              variant="large"
              font="bold"
              className="mb-8 mt-12 font-nobel"
            >
              On Non- Workdays
            </Typography>
            <main className="flex flex-col gap-14">
              {nonWorkdayData.map(({ title, label, description, type, form }) =>
                type ? (
                  <article
                    className="gap-4 divide-y divide-gray-300"
                    key={title}
                  >
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
                ) : (
                  <></>
                ),
              )}
            </main>
          </section>
          <section>
            <header>
              <Typography
                variant="large"
                font="bold"
                className="mb-8 mt-12 font-nobel"
              >
                Why recommended
              </Typography>
              <Typography className="mb-8 mt-12">{whyRecommended}</Typography>
            </header>
          </section>
          <footer>
            <Typography className="mb-8 mt-12">
              These recommendations were created using our proprietary data
              model which leverages the latest cannabis research and the wisdom
              of over 18,000 patient interactions. Note that these
              recommendations should be informed by a more complete
              understanding of your current symptoms, specific diagnoses,
              medications, or medical history, and have not been reviewed or
              approved by an EO clinician. To most responsibly define and
              maintain an optimal cannabis regimen,
              <a href={ROUTES.register} className="underline">
                get your EO care plan now.
              </a>
            </Typography>
          </footer>
        </div>
      </div>
    </LayoutDefault>
  );
};
