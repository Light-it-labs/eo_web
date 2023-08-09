import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Loading, Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import {
  AppetiteCauseEnum,
  BodyTypeEnum,
  CannabisHowLongEnum,
  CaregiverEnum,
  DaysMomentEnum,
  DifficultLevelEnum,
  FoodAllergiesEnum,
  FormsAvoidsEnum,
  GiLiverKidneyConditionsEnum,
  HeartConditionEnum,
  HospitalizationTimesEnum,
  OrganicConditionsEnum,
  PainFeelLikeEnum,
  RespiratoryConditionsEnum,
  SideEffectsEnum,
  SleepCausesEnum,
  SymptomsConstancy,
  SymptomsEnum,
  ThcPreferenceEnum,
  TreatmentTypeEnum,
  TreatmentsStatusEnum,
  WeekDayEnum,
  YesNoEnum,
  type CancerFormInterface,
} from "~/types/Cancer";

export const CancerThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const [jotformReturnedInformation, setJotformReturnedInformation] =
    useState(false);

  const maxRetries = 10;
  const [countFetching, setCountFetching] = useState(0);
  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { getSubmissionByIdV2, postCancerFormSubmission } = useElixirApi();
  const { data } = useQuery({
    queryFn: () => getSubmissionByIdV2(submission_id),
    queryKey: ["cancerLastSubmission"],
    enabled: !!submission_id,
    onSuccess: ({ data: resp }) => {
      if (resp.dob && resp.name && resp.email) {
        setJotformReturnedInformation(true);
      }
      setCountFetching((state) => state + 1);
    },
    refetchInterval:
      jotformReturnedInformation || countFetching >= maxRetries ? false : 1500,
  });

  const { mutate } = useMutation({
    mutationFn: (data: CancerFormInterface) =>
      postCancerFormSubmission(makeRequest(data)),
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

  function getKeyByValue(
    enumObj: Record<string, string>,
    value: string | string[],
  ): string | string[] {
    if (typeof value === "string") {
      return (
        Object.keys(enumObj).find((key) => enumObj[key] === value) || value
      );
    } else {
      return value.map((val) => getKeyByValue(enumObj, val) as string);
    }
  }

  const makeRequest = (e: CancerFormInterface) => {
    return {
      cannabis_manage_sex: getKeyByValue(YesNoEnum, e.cannabis_manage_sex),
      cannabis_use_last_60: getKeyByValue(YesNoEnum, e.cannabis_use_last_60),
      workday_bed_time: `${e.workday_bed_time.hourSelect}:${e.workday_bed_time.minuteSelect}:00`,
      symptoms_relation_to_treatment: e.symptoms_relation_to_treatment,
      adl_name_1: e.adls_activities.field_1,
      adl_name_2: e.adls_activities.field_2,
      adl_name_3: e.adls_activities.field_3,
      appetite_cause: getKeyByValue(AppetiteCauseEnum, e.appetite_cause),
      non_workday_allow_intoxication: getKeyByValue(
        DaysMomentEnum,
        e.non_workday_allow_intoxication,
      ),
      recent_unintentional_weight_loss: getKeyByValue(
        YesNoEnum,
        e.recent_unintentional_weight_loss,
      ),
      non_workdays: getKeyByValue(WeekDayEnum, e.non_workdays),
      workday_allow_intoxication: getKeyByValue(
        DaysMomentEnum,
        e.workday_allow_intoxication,
      ),
      caregiver: getKeyByValue(CaregiverEnum, e.caregiver),
      cannabis_use_how_long: getKeyByValue(
        CannabisHowLongEnum,
        e.cannabis_use_how_long,
      ),
      diagnosis_date: `${e.diagnosis_date.year}-${e.diagnosis_date.month}-${e.diagnosis_date.day}`,
      body_type: getKeyByValue(BodyTypeEnum, e.body_type),
      non_workday_wakeup_time: e.non_workday_wakeup_time
        ? `${e.non_workday_wakeup_time.hourSelect}:${e.non_workday_wakeup_time.minuteSelect}:00`
        : null,
      working_status: getKeyByValue(YesNoEnum, e.working_status),
      budget: e.budget,
      personal_data: {
        name: e.name.first,
        last: e.name.last,
        email: e.email,
        dob: `${e.dob.year}-${e.dob.month}-${e.dob.day}`,
      },
      side_effects_avoid: getKeyByValue(SideEffectsEnum, e.side_effects_avoid),
      symptoms: getKeyByValue(SymptomsEnum, e.symptoms),
      workday_wakeup_time: `${e.workday_wakeup_time.hourSelect}:${e.workday_wakeup_time.minuteSelect}:00`,
      sex_life_importance: getKeyByValue(YesNoEnum, e.sex_life_importance),
      suffering_frequency: getKeyByValue(
        SymptomsConstancy,
        e.suffering_frequency,
      ),
      thc_type_preference: getKeyByValue(
        ThcPreferenceEnum,
        e.thc_type_preference,
      ),
      pain_feel: getKeyByValue(PainFeelLikeEnum, e.pain_feel),
      respiratory_conditions: e.following_conditions
        ? getKeyByValue(
            RespiratoryConditionsEnum,
            JSON.parse(e.following_conditions.field_1) as [],
          )
        : [],
      gi_liver_kidney_conditions: getKeyByValue(
        GiLiverKidneyConditionsEnum,
        JSON.parse(e.following_conditions.field_2) as [],
      ),
      heart_conditions: e.following_conditions
        ? getKeyByValue(
            HeartConditionEnum,
            JSON.parse(e.following_conditions.field_3) as [],
          )
        : [],
      organ_specific_concerns: e.following_conditions
        ? getKeyByValue(
            OrganicConditionsEnum,
            JSON.parse(e.following_conditions.field_4) as [],
          )
        : [],
      smoking_amount: getKeyByValue(YesNoEnum, e.smoking_amount),
      food_allergies: getKeyByValue(FoodAllergiesEnum, e.food_allergies),
      treatment_type: getKeyByValue(TreatmentTypeEnum, e.treatment_type),
      cannabis_forms_avoid: e.cannabis_forms_avoid
        ? getKeyByValue(
            FormsAvoidsEnum,
            JSON.parse(e.cannabis_forms_avoid.field_1) as [],
          )
        : [],
      treatment_status: getKeyByValue(
        TreatmentsStatusEnum,
        e.treatment_status === "Yes"
          ? TreatmentsStatusEnum.active
          : TreatmentsStatusEnum.complete,
      ),
      non_workday_bed_time: e.non_workday_bed_time
        ? `${e.non_workday_bed_time.hourSelect}:${e.non_workday_bed_time.minuteSelect}:00`
        : null,
      symptom_intensity_overall: e.symptom_intensity_overall,
      sleep_cause: getKeyByValue(SleepCausesEnum, e.sleep_cause),
      adl_baseline_1: getKeyByValue(
        DifficultLevelEnum,
        e.adls_difficult["Activity 1"],
      ),
      adl_baseline_2: getKeyByValue(
        DifficultLevelEnum,
        e.adls_difficult["Activity 2"],
      ),
      adl_baseline_3: getKeyByValue(
        DifficultLevelEnum,
        e.adls_difficult["Activity 3"],
      ),
      unplanned_hospitalizations_baseline: getKeyByValue(
        HospitalizationTimesEnum,
        e.unplanned_hospitalizations_baseline.field_1,
      ),
      er_visits_baseline: getKeyByValue(
        HospitalizationTimesEnum,
        e.unplanned_hospitalizations_baseline.field_2,
      ),
      alcohol_amount: getKeyByValue(YesNoEnum, e.alcohol_amount),
    };
  };

  useEffect(() => {
    if (data?.data) {
      mutate(data.data as never);
    }
  }, [data?.data, mutate]);

  return (
    <LayoutDefault>
      {jotformReturnedInformation ? (
        <div className="flex flex-col items-center justify-center px-[20%]">
          <Typography
            variant="large"
            className="font-nunito font-bold"
            style={{
              fontFamily: "nunito",
              lineHeight: "55px",
              fontSize: "45px",
            }}
          >
            All done!
          </Typography>
          <br />
          <Typography
            variant="base"
            font="regular"
            className="text-center font-nunito"
            style={{
              fontWeight: "300px",
              fontFamily: "nunito",
              lineHeight: "40px",
              fontSize: "28px",
            }}
          >
            You’ll receive your initial, personalized, clinician-approved care
            care plan via email within 24 hours. <br />
            <br />
            If you’ve opted to receive a medical card through eo and/or take
            home delivery of your products, we’ll communicate your next steps in
            separate email(s) you’ll receive shortly. <br />
            <br />
            Have questions? We’re here. Email members@eo.care, call
            877.707.0706, or schedule a free consultation.
          </Typography>
        </div>
      ) : (
        <>
          {countFetching < maxRetries ? (
            <div className="relative h-[250px]">
              <Loading />
            </div>
          ) : (
            <div>
              <Typography className="my-4 text-justify">
                We apologize for the inconvenience, but we are currently
                experiencing difficulties establishing a connection. This may be
                due to temporary network issues or ongoing maintenance. Please
                try again later. If the problem persists, kindly check your
                internet connection or contact our support team for assistance.
                Thank you for your patience, and we apologize for any
                inconvenience caused.
                <br />
                <br />
                You can reach our customer support team by calling the following
                phone number: 877-707-0706. Our representatives will be
                delighted to assist you and address any inquiries you may have.
                Alternatively, you can also send us an email at members@eo.care.
                Our support team regularly checks this email and will respond to
                you as soon as possible.
              </Typography>
            </div>
          )}
        </>
      )}
    </LayoutDefault>
  );
};
