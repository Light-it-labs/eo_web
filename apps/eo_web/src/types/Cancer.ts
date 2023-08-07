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

export type YesNo = "Yes" | "No";

export enum SymptomsEnum {
  pain = "Pain",
  nausea = "Nausea / vomiting",
  appetite = "Decreased appetite",
  anxiety = "Anxiety",
  sleep = "Sleeping trouble",
}

export enum DaysMomentEnum {
  mornings = "Mornings",
  afternoons = "Afternoons",
  evenings = "Evenings",
  bedtimes = "Bedtimes",
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
  Plump = "Plump",
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
  comes_and_goes = "Comes and goes",
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

export interface CancerFormInterface {
  cannabis_manage_sex: YesNo;
  cannabis_use_last_60: YesNo;
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
  appetite_cause: string;
  non_workday_allow_intoxication: DaysMomentEnum[];
  recent_unintentional_weight_loss: YesNo;
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
  working_status: YesNo;
  budget: Budgets;
  name: {
    first: string;
    last: string;
  };
  side_effects_avoid: SideEffectsEnum[];
  symptoms: SymptomsEnum[];
  aboutYou: "";
  workday_wakeup_time: JotformTime;
  sex_life_importance: YesNo;
  suffering_frequency: SymptomsConstancy;
  thc_type_preference: ThcPreferenceEnum;
  email: string;
  pain_feel: PainFeelLikeEnum;
  following_conditions: {
    field_1: '["Bronchitis"]';
    field_2: '["Ulcerative Colitis"]';
    field_3: '["Abnormal Heart Rhythm"]';
    field_4: '["Hepatitis"]';
  };
  smoking_amount: YesNo;
  food_allergies: FoodAllergiesEnum[];
  treatment_type: TreatmentTypeEnum[];
  cannabis_forms_avoid: {
    field_1: '["Burning Flower","Vaping Concentrate"]';
  };
  treatment_status: YesNo;
  typeA63: "";
  non_workday_bed_time: JotformTime;
  symptom_intensity_overall: Intensity;
  sleep_cause: "";
  adls_difficult: {
    "Activity 1": "Difficult";
    "Activity 2": "Somewhat Difficult";
    "Activity 3": "Difficult";
  };
  dob: JotformDate;
  unplanned_hospitalizations_baseline: {
    field_1: "None";
    field_2: "Once";
  };
  alcohol_amount: YesNo;
}
