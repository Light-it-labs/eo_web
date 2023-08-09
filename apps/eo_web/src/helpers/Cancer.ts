import {
  AppetiteCauseEnum,
  BodyTypeEnum,
  type CancerFormInterface,
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
} from "~/types/Cancer";

export function getKeyByValue(
  enumObj: Record<string, string>,
  value: string | string[],
): string | string[] {
  if (typeof value === "string") {
    return Object.keys(enumObj).find((key) => enumObj[key] === value) || value;
  } else {
    return value.map((val) => getKeyByValue(enumObj, val) as string);
  }
}

export const makeRequest = (e: CancerFormInterface) => {
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
