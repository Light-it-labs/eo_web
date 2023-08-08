export interface CancerForm {
  dob: {
    datetime: string; //"1996-01-03 00:00:00",
    day: string; //"03",
    month: string; //"01",
    year: string; //"1996"
  };
  email: string;
  whoAre: {
    first: string;
    last: string;
  };
  name: {
    first: string;
    last: string;
  };
  caregiver: string;
}

export enum YesNoEnum {
  yes = "Yes",
  no = "No",
}

export enum SymptomsEnum {
  pain = "Pain",
  nausea = "Nausea / vomiting",
  appetite = "Decreased appetite",
  anxiety = "Anxiety",
  sleep = "Sleeping trouble",
}

export enum DaysMomentEnum {
  morning = "Morning",
  afternoon = "Afternoon",
  evening = "Evening",
  nighttime = "Nighttime",
}

export enum WeekDayEnum {
  sunday = "Sunday",
  monday = "Monday",
  tuesday = "Tuesday",
  wednesday = "Wednesday",
  thursday = "Thursday",
  friday = "Friday",
  saturday = "Saturday",
}

export enum BodyTypeEnum {
  skinny = "Skinny",
  average = "Average",
  plump = "Plump",
}

export enum CannabisHowLongEnum {
  "1_to_8_weeks" = "1-8 weeks",
  "2_to_6_months" = "2-6 months",
  "6_to_12_months" = "6-12 months",
  "1_to_5_years" = "1-5 years",
  "5_years_plus" = "Over 5 years",
}

export enum CaregiverEnum {
  no = "I’m a patient",
  yes = "I’m a caregiver",
}

export interface JotformTime {
  hourSelect: string; // exmaple "08";
  minuteSelect: string; // example "00";
}

export interface JotformDate {
  datetime: string; // example "2023-07-30 00:00:00";
  day: string; // example "30";
  month: string; // example "07";
  year: string; // example "2023";
}

export type Intensity =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

// Make type called budgets with amount from '$50' to '$500'

export type Budgets =
  | "$50"
  | "$100"
  | "$150"
  | "$200"
  | "$250"
  | "$300"
  | "$350"
  | "$400"
  | "$450"
  | "$500";

export enum SideEffectsEnum {
  weight_gain = "Weight gain",
  sedation = "Sedation",
  anxiety = "Anxiety",
  intox = "High / stoned",
}

export enum SymptomsConstancy {
  constant = "Constant",
  comes_and_goes = "Come and go",
}

export enum ThcPreferenceEnum {
  open_thc = "Open to THC",
  non_thc = "Only products without Delta 9 THC",
}

export enum PainFeelLikeEnum {
  dull_achy = "Dull / achy",
  stabbing_sharp = "Stabbing / sharp / shooting",
  burning = "Burning / tingling",
  other = "Other",
}

export enum FoodAllergiesEnum {
  none = "I have no allergy issues",
  eggs = "Eggs",
  fish = "Fish",
  milk = "Milk",
  peanuts = "Peanuts",
  shellfish = "Shellfish",
  soy = "Soy",
  tree_nuts = "Tree nuts",
  gluten = "Gluten",
}

export enum TreatmentTypeEnum {
  radiation = "Radiation",
  chemotherapy = "Chemotherapy (IV or pill)",
  immunotherapy = "Immunotherapy",
  clinical_trial = "Clinical trial",
  other = "Other",
}

export enum AvoidPresentationEnum {
  flower = "Burning Flower",
  vape_flower = "Vaping Flower",
  vape_concentrate = "Vaping Concentrate",
  gummy_edible = "Gummy Edible",
  hard_candy_edible = "Hard Candy Edible",
  chocolate_edible = "Chocolate Edible",
  patch = "Topical Patch",
  pill_edible = "Pill/Tablet",
  tincture = "Tincture",
  beverage_edible = "Beverage/Drink",
  lotion_topical = "Topical Lotion",
  rso = "Rick Simpson Oil (RSO)",
  speed_tab = "Sublingual Tablet",
  inhaler = "Inhaler",
}

export enum DifficultLevelEnum {
  not_difficult = "Not Difficult",
  slightly_difficult = "Slightly Difficult",
  some_what_difficult = "Some what Difficult",
  difficult = "Difficult",
  very_difficult = "Very Difficult",
  impossible = "Impossible",
}

export enum HospitalizationTimesEnum {
  none = "None",
  once = "Once",
  two_times = "Two times",
  more_than_3_times = "More than 3 times",
}

export enum RespiratoryConditionsEnum {
  frequent_allergies = "Frequent Allergies",
  asthma = "Asthma",
  copd = "COPD",
  bronchitis = "Bronchitis",
  lung_cancer = "Lung Cancer",
  cystic_fibrosis = "Cystic Fibrosis",
  shortness_of_breath = "Shortness of Breath",
  history_of_frequent_colds_or_lung_infections = "History of Frequent Colds or Lung Infections",
  sleep_apnea = "Sleep Apnea",
  other = "Other",
}

export enum GiLiverKidneyConditionsEnum {
  acid_reflux_gerd = "Acid Reflux/GERD",
  crohns_disease = "Crohn's Disease",
  ulcerative_colitis = "Ulcerative Colitis",
  ibs = "IBS",
  celiac_disease = "Celiac Disease",
  ulcers = "Ulcers",
  diverticulosis_diverticulitis = "Diverticulosis/Diverticulitis",
  chronic_abdominal_pain = "Chronic Abdominal Pain",
  constipation = "Constipation",
  diarrhea = "Diarrhea",
  nausea = "Nausea",
  vomiting = "Vomiting",
  belching_bloating_flatulence = "Belching/Bloating/Flatulence",
  other = "Other",
}

export enum HeartConditionEnum {
  abnormal_heart_rhythm = "Abnormal Heart Rhythm",
  high_blood_pressure = "High Blood Pressure",
  high_cholesterol = "High Cholesterol",
  history_of_clotting = "History of Clotting",
  history_of_heart_attack = "History of Heart Attack",
  history_of_syncope = "History of Syncope",
  heart_muscle_disease = "Heart Muscle Disease",
  history_of_stroke = "History of Stroke",
  history_of_heart_failure = "History of Heart Failure",
  heart_valve_complications = "Heart Valve Complications",
  history_of_heart_surgery = "History of Heart Surgery",
}

export enum OrganicConditionsEnum {
  fatty_liver_disease = "Fatty Liver Disease",
  hepatitis = "Hepatitis",
  cirrhosis_severe_liver_disease = "Cirrhosis / Severe Liver Disease",
  gallbladder_disease = "Gallbladder Disease",
}

export enum FormsAvoidsEnum {
  flower = "Burning Flower",
  vape_flower = "Vaping Flower",
  vape_concentrate = "Vaping Concentrate",
  gummy_edible = "Gummy Edible",
  hard_candy_edible = "Hard Candy Edible",
  chocolate_edible = "Chocolate Edible",
  patch = "Topical Patch",
  pill_edible = "Pill/Tablet",
  tincture = "Tincture",
  beverage_edible = "Beverage / Drink",
  lotion_topical = "Topical Lotion",
  rso = "Rick Simpson Oil (RSO)",
  speed_tab = "Sublingual Tablet",
  inhaler = "Inhaler",
}

export enum SleepCausesEnum {
  pain = "Pain",
  anxiety = "Anxiety / stress",
  nausea = "Nausea",
  unsure = "Unsure / other",
}

export enum AppetiteCauseEnum {
  nausea = "Nausea",
  pain = "Pain",
  anxiety = "Anxiety / stress",
  taste = "Food just doesn’t taste good",
  unsure = "Unsure / other",
}

export enum TreatmentsStatusEnum {
  active = "Yes, I’m getting active treatment now",
  complete = "No, I completed all of my treatment",
}

export interface CancerFormInterface {
  cannabis_manage_sex: YesNoEnum;
  cannabis_use_last_60: YesNoEnum;
  workday_bed_time: {
    hourSelect: string; // example: "20",
    minuteSelect: string; // example: "00"
  };
  symptoms_relation_to_treatment: string;
  adls_activities: {
    field_1: string;
    field_2: string;
    field_3: string;
  };
  appetite_cause: AppetiteCauseEnum;
  non_workday_allow_intoxication: DaysMomentEnum[];
  recent_unintentional_weight_loss: YesNoEnum;
  pageBreak: "";
  non_workdays: WeekDayEnum[];
  workday_allow_intoxication: DaysMomentEnum[];
  body_type: BodyTypeEnum;
  caregiver: CaregiverEnum;
  aboutYour31: "";
  cannabis_use_how_long: CannabisHowLongEnum;
  diagnosis_date: JotformDate;
  aboutYou35: "";
  non_workday_wakeup_time: JotformTime;
  aboutYour: "";
  working_status: YesNoEnum;
  budget: Budgets;
  name: {
    first: string;
    last: string;
  };
  side_effects_avoid: SideEffectsEnum[];
  symptoms: SymptomsEnum[];
  aboutYou: "";
  workday_wakeup_time: JotformTime;
  sex_life_importance: YesNoEnum;
  suffering_frequency: SymptomsConstancy;
  thc_type_preference: ThcPreferenceEnum;
  email: string;
  pain_feel: PainFeelLikeEnum;
  following_conditions: {
    field_1: string; // respiratory_conditions
    field_2: string; // gi_liver_kidney_conditions
    field_3: string; // heart_conditions
    field_4: string; // organ_specific_concerns
  };
  smoking_amount: YesNoEnum;
  food_allergies: FoodAllergiesEnum[];
  treatment_type: TreatmentTypeEnum[];
  cannabis_forms_avoid: {
    field_1: string; // '["Burning Flower","Vaping Concentrate"]';
  };
  treatment_status: YesNoEnum;
  typeA63: "";
  non_workday_bed_time: JotformTime;
  symptom_intensity_overall: Intensity;
  sleep_cause: SleepCausesEnum;
  adls_difficult: {
    "Activity 1": DifficultLevelEnum;
    "Activity 2": DifficultLevelEnum;
    "Activity 3": DifficultLevelEnum;
  };
  dob: JotformDate;
  unplanned_hospitalizations_baseline: {
    field_1: HospitalizationTimesEnum;
    field_2: HospitalizationTimesEnum;
  };
  alcohol_amount: YesNoEnum;
}
