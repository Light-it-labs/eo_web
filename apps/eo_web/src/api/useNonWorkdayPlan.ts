import { ReasonsEnum } from "~/api/PrePlanTypes";
import { type FormDataPrePlan } from "~/api/usePrePlan";

interface NonWorkdayPlanProps {
  C3: string | boolean;
  onlyCbd: boolean;
  C8: boolean;
  C9: boolean;
  C10: boolean;
  reasonToUse: (typeof ReasonsEnum)[keyof typeof ReasonsEnum][];
  C14: boolean;
  C15: boolean;
  C16: boolean;
  C17: boolean;
  M5: string;
}
export const useNonWorkdayPlan = (
  data: FormDataPrePlan,
  {
    C3,
    onlyCbd,
    C9,
    C8,
    C10,
    reasonToUse,
    C14,
    C15,
    C16,
    C17,
    M5,
  }: NonWorkdayPlanProps,
) => {
  const { currentlyUsingCannabisProducts } = data;
  // DayTime
  const dayTimeCannabinoidType = () => {
    if (reasonToUse.includes(ReasonsEnum.Sleep)) {
      return "";
    } else if (
      K10 === "topical lotion or patch" &&
      reasonToUse.includes(ReasonsEnum.Anxiety)
    ) {
      return "1:1 CBD:THC ratio";
    } else if (K10 === "topical lotion or patch") {
      return "THC-dominant";
    } else if (onlyCbd && !currentlyUsingCannabisProducts) {
      return "CBD or CBDA";
    } else if (onlyCbd && currentlyUsingCannabisProducts) {
      return "CBD, CBDA, or CBC";
    } else if (reasonToUse.includes(ReasonsEnum.Anxiety)) {
      return "CBD-dominant";
    } else if (C8 === false && !currentlyUsingCannabisProducts) {
      return "CBD-dominant";
    } else if (C8 === false && currentlyUsingCannabisProducts) {
      return "4:1 CBD:THC ratio";
    } else if (C8 === true && !currentlyUsingCannabisProducts) {
      return "2:1 CBD:THC ratio";
    } else if (C8 === true && currentlyUsingCannabisProducts) {
      return "THC-dominant";
    } else {
      return "";
    }
  };
  const dayTimeForm = () => {
    if (
      M5 === "fast-acting form" &&
      C16 === false &&
      K11 === "sublingual" &&
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
    if (K10 === "topical lotion or patch") {
      return "50mg";
    } else if (J10 === "") {
      return "";
    } else if (J10 === "THC-dominant") {
      return "2.5mg";
    } else if (J10 === "CBD-dominant" && C3 === true) {
      return "10mg";
    } else if (J10 === "CBD-dominant" || J10 === "4:1 CBD:THC ratio") {
      return "5mg";
    } else if (J10 === "2:1 CBD:THC ratio") {
      return "2.5mg";
    } else {
      return "10mg";
    }
  };

  const dayTimeResult = () => {
    if (reasonToUse.includes(ReasonsEnum.Sleep)) {
      return "";
    } else if (K10 === "inhalation method") {
      return `Use a ${J10} inhalable product`;
    } else {
      return `Use ${L10} of a ${J10} ${K10} product`;
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
    } else if (C9 === true && currentlyUsingCannabisProducts) {
      return "THC-dominant";
    } else if (C9 === true && !currentlyUsingCannabisProducts) {
      return "1:1 CBD:THC ratio";
    } else {
      return "CBD-dominant";
    }
  };
  const eveningForm = () => {
    if (C9 && !C14) {
      return "inhalation method";
    } else if (C9 && !C16) {
      return "sublingual";
    } else if (!C14) {
      return "inhalation method";
    } else if (!C16) {
      return "sublingual";
    } else if (!C15) {
      return "edible";
    } else if (!C17) {
      return "topical lotion or patch";
    } else {
      return "capsule";
    }
  };
  const eveningDose = () => {
    if (K11 === "topical lotion or patch") {
      return "50mg";
    } else if (J11 === "THC-dominant") {
      return "2.5mg";
    } else if (J11 === "CBD-dominant") {
      return "5mg";
    } else if (J11 === "1:1 CBD:THC ratio") {
      return "2.5mg";
    } else {
      return "10mg";
    }
  };
  const eveningResult = () => {
    if (K11 === "inhalation method") {
      return `Use a ${J11} inhalable product`;
    } else {
      return `Use ${L11} of a ${J11} ${K11} product`;
    }
  };

  // EndEvening

  // Bedtime
  const bedTimeCannabinoidType = () => {
    if (onlyCbd) {
      return "CBN or D8-THC";
    } else if (C10 === true) {
      return "THC-dominant";
    } else if (currentlyUsingCannabisProducts) {
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
    if (K12 === "topical lotion or patch") {
      return "50mg";
    } else if (J12 === "THC-dominant") {
      return "2.5mg";
    } else if (J12 === "CBD-dominant") {
      return "5mg";
    } else if (J12 === "1:1 CBD:THC ratio") {
      return "2.5mg";
    } else {
      return "10mg";
    }
  };

  const bedTimeResult = () => {
    if (K12 === "inhalation method") {
      return `Use a ${J12} inhalable product`;
    } else {
      return `Use ${L12} of a ${J12} ${K12} product`;
    }
  };
  // EndBedtime

  // This order is too important for resolve all recurrent dependencies EYE O.O
  const K11 = eveningForm();
  const K10 = dayTimeForm();
  const J10 = dayTimeCannabinoidType();
  const L10 = dayTimeDose();

  const J11 = eveningCannabinoidType();
  const L11 = eveningDose();

  const K12 = bedTimeForm();
  const J12 = bedTimeCannabinoidType();
  const L12 = bedTimeDose();

  return {
    dayTime: {
      type: dayTimeCannabinoidType(),
      form: dayTimeForm(),
      dose: dayTimeDose(),
      result: dayTimeResult(),
    },
    evening: {
      type: eveningCannabinoidType(),
      form: eveningForm(),
      dose: eveningDose(),
      result: eveningResult(),
    },
    bedTime: {
      type: bedTimeCannabinoidType(),
      form: bedTimeForm(),
      dose: bedTimeDose(),
      result: bedTimeResult(),
    },
  };
};
