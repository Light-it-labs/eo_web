export enum Maladies {
  Sleep = "Sleep",
  Pain = "Pain",
  Anxiety = "Anxiety",
}

export enum WorseSymptomsMomentEnum {
  Morning = "Morning",
  Afternoon = "Afternoon",
  Evening = "Evening",
  BedTimeOrNight = "Bedtime or During the Night",
}

export type WorseSymptomsMoment =
  (typeof WorseSymptomsMomentEnum)[keyof typeof WorseSymptomsMomentEnum];

export enum TimeToUse {
  WorkDayMornings = "Workday Mornings",
  NonWorkDayMornings = "Non-Workday Mornings",
  WorkDayAfternoons = "Workday Afternoons",
  NonWorkDayAfternoons = "Non-Workday Afternoons",
  WorkDayEvenings = "Workday Evenings",
  NonWorkDayEvenings = "Non-Workday Evenings",
  WorkDayBedtimes = "Workday Bedtimes",
  NonWorkDayBedtimes = "Non-Workday Bedtimes",
}
export type OpenToUseThcProducts = (typeof TimeToUse)[keyof typeof TimeToUse];

export enum AvoidPresentationEnum {
  inhalation = "Avoid inhalation",
  edibles = "Avoid edibles",
  sublinguals = "Avoid sublinguals",
  topicals = "Avoid topicals",
}

export type AvoidPresentation =
  (typeof AvoidPresentationEnum)[keyof typeof AvoidPresentationEnum];

export enum ThcProductPreferencesEnum {
  open = "I’m open to using products with THC.",
  notPrefer = "I’d prefer to use non-THC (CBD/CBN/CBG) products only.",
  notSure = "I’m not sure.",
}
export type ThcProductPreferences =
  (typeof ThcProductPreferencesEnum)[keyof typeof ThcProductPreferencesEnum];

export enum ReasonsEnum {
  Pain = "I want to manage pain",
  Anxiety = "I want to reduce anxiety",
  Sleep = "I want to sleep better",
}

export interface Schedule {
  time: "Morning" | "Evening" | "BedTime";
  type: string;
  form: string;
  dose: string;
  result: string;
}
