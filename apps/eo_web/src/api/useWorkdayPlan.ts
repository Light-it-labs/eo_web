import { ReasonsEnum, TimeToUse, type Schedule } from "~/api/PrePlanTypes";
import { type FormDataPrePlan } from "~/api/usePrePlan";

interface WorkdayPlanProps {
  C3: string | boolean;
  onlyCbd: boolean;
  C5: boolean;
  C7: string | boolean;
  C11: boolean;
  reasonToUse: (typeof ReasonsEnum)[keyof typeof ReasonsEnum][];
  C14: boolean;
  C15: boolean;
  C16: boolean;
  C17: boolean;
  M5: string;
}
export const useWorkdayPlan = (
  data: FormDataPrePlan,
  {
    C3,
    onlyCbd,
    C5,
    C7,
    C11,
    reasonToUse,
    C14,
    C15,
    C16,
    C17,
    M5,
  }: WorkdayPlanProps,
) => {
  const { openToUseThcProducts, currentlyUsingCannabisProducts } = data;
  // DayTime
  const dayTimeCannabinoidType = () => {
    if (
      K5 === "topical lotion or patch" &&
      reasonToUse.includes(ReasonsEnum.Anxiety)
    ) {
      return "1:1 CBD:THC ratio";
    } else if (K5 === "topical lotion or patch") {
      return "THC-dominant";
    } else if (reasonToUse.includes(ReasonsEnum.Sleep)) {
      return "";
    } else if (onlyCbd && C11 === false) {
      return "CBD or CBDA";
    } else if (onlyCbd && C11 === true) {
      return "CBD, CBDA, or CBC";
    } else if (reasonToUse.includes(ReasonsEnum.Anxiety)) {
      return "CBD-dominant";
    } else if (C5 === false && C11 === false) {
      return "CBD-dominant";
    } else if (C5 === false && C11 === true) {
      return "4:1 CBD:THC ratio";
    } else if (C5 === true && C11 === false) {
      return "2:1 CBD:THC ratio";
    } else if (C5 === true && C11 === true) {
      return "THC-dominant";
    } else {
      return "CBD-dominant";
    }
  };
  const dayTimeForm = () => {
    if (
      M5 === "fast-acting form" &&
      C16 === false &&
      K6 === "sublingual" &&
      C17 === false
    ) {
      return "patch";
    } else if (M5 === "fast-acting form" && C16 === false) {
      return "sublingual";
    } else if (M5 === "fast-acting form" && C17 === false) {
      return "topical lotion or patch";
    } else if (M5 === "fast-acting form" && C14 === false) {
      return "inhalation method";
    } else if (C15 === false) {
      return "edible";
    } else if (C17 === false) {
      return "topical lotion or patch";
    } else if (C16 === false) {
      return "sublingual";
    } else if (C14 === false) {
      return "inhalation method";
    } else {
      return "capsule";
    }
  };
  const dayTimeDose = () => {
    if (K5 === "topical lotion or patch") {
      return "50mg";
    } else if (J5 === "") {
      return "";
    } else if (J5 === "THC-dominant") {
      return "2.5mg";
    } else if (J5 === "CBD-dominant" && C3 === true) {
      return "10mg";
    } else if (J5 === "CBD-dominant" || J5 === "4:1 CBD:THC ratio") {
      return "5mg";
    } else if (J5 === "2:1 CBD:THC ratio") {
      return "2.5mg";
    } else {
      return "10mg";
    }
  };

  const dayTimeResult = () => {
    if (reasonToUse.includes(ReasonsEnum.Sleep)) {
      return "";
    } else if (K5 === "inhalation method") {
      return "Use a " + J5 + " inhalable product";
    } else {
      return "Use " + L5 + " of a " + J5 + " " + K5 + " product";
    }
  };
  // EndDayTime

  // Evening
  const eveningCannabinoidType = () => {
    if (reasonToUse.includes(ReasonsEnum.Anxiety) && onlyCbd) {
      return "CBDA";
    } else if (reasonToUse.includes(ReasonsEnum.Pain) && onlyCbd) {
      return "CBG plus CBD";
    } else if (onlyCbd) {
      return "CBD";
    } else if (
      openToUseThcProducts.includes(TimeToUse.WorkDayEvenings) &&
      currentlyUsingCannabisProducts
    ) {
      return "THC-dominant";
    } else if (
      openToUseThcProducts.includes(TimeToUse.WorkDayEvenings) &&
      !currentlyUsingCannabisProducts
    ) {
      return "1:1 CBD:THC ratio";
    } else {
      return "CBD-dominant";
    }
  };

  const eveningForm = () => {
    if (C5 === true && C14 === false) {
      return "inhalation method";
    } else if (C5 === true && C16 === false) {
      return "sublingual";
    } else if (C14 === false) {
      return "inhalation method";
    } else if (C16 === false) {
      return "sublingual";
    } else if (C15 === false) {
      return "edible";
    } else if (C17 === false) {
      return "topical lotion or patch";
    } else {
      return "capsule";
    }
  };
  const eveningDose = () => {
    if (K6 === "topical lotion or patch") {
      return "50mg";
    } else if (J6 === "THC-dominant") {
      return "2.5mg";
    } else if (J6 === "CBD-dominant") {
      return "5mg";
    } else if (J6 === "1:1 CBD:THC ratio") {
      return "2.5mg";
    } else {
      return "10mg";
    }
  };
  const eveningResult = () => {
    if (K6 === "inhalation method") {
      return `Use a ${J6} inhalable product`;
    } else {
      return `Use ${L6} of a ${J6} ${K6} product`;
    }
  };

  // EndEvening

  // Bedtime
  const bedTimeCannabinoidType = () => {
    if (onlyCbd) {
      return "CBN or D8-THC";
    } else if (C7 === true) {
      return "THC-dominant";
    } else if (C11 === true) {
      return "1:1 CBD:THC ratio";
    } else {
      return "CBD-dominant";
    }
  };
  const bedTimeForm = () => {
    if (C15 === false) {
      return "edible";
    } else if (C16 === false) {
      return "sublingual";
    } else if (C17 === false) {
      return "topical lotion or patch";
    } else if (C14 === false) {
      return "inhalation method";
    } else {
      return "capsule";
    }
  };
  const bedTimeDose = () => {
    if (K7 === "topical lotion or patch") {
      return "50mg";
    } else if (J7 === "THC-dominant") {
      return "2.5mg";
    } else if (J7 === "CBD-dominant") {
      return "5mg";
    } else if (J7 === "1:1 CBD:THC ratio") {
      return "2.5mg";
    } else {
      return "10mg";
    }
  };

  const bedTimeResult = () => {
    return K7 === "inhalation method"
      ? `Use a ${J7} inhalable product`
      : `Use ${L7} of a ${J7} ${K7} product`;
  };
  // EndBedtime

  // This order is too important for resolve all recurrent dependencies EYE O.O
  const K6 = eveningForm();
  const K5 = dayTimeForm();
  const J5 = dayTimeCannabinoidType();
  const L5 = dayTimeDose();
  const J6 = eveningCannabinoidType();
  const L6 = eveningDose();
  const J7 = bedTimeCannabinoidType();
  const K7 = bedTimeForm();
  const L7 = bedTimeDose();

  const schedules: { dayTime: Schedule; evening: Schedule; bedTime: Schedule } =
    {
      dayTime: {
        time: "Morning",
        type: dayTimeCannabinoidType(),
        form: dayTimeForm(),
        dose: dayTimeDose(),
        result: dayTimeResult(),
      },
      evening: {
        time: "Evening",
        type: eveningCannabinoidType(),
        form: eveningForm(),
        dose: eveningDose(),
        result: eveningResult(),
      },
      bedTime: {
        time: "BedTime",
        type: bedTimeCannabinoidType(),
        form: bedTimeForm(),
        dose: bedTimeDose(),
        result: bedTimeResult(),
      },
    };

  return schedules;
};
