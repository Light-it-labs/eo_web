import {
  AvoidPresentationEnum,
  ReasonsEnum,
  ThcProductPreferencesEnum,
  TimeToUse,
  WorseSymptomsMomentEnum,
  type AvoidPresentation,
  type OpenToUseThcProducts,
  type ThcProductPreferences,
  type WorseSymptomsMoment,
} from "~/api/PrePlanTypes";
import { useNonWorkdayPlan } from "~/api/useNonWorkdayPlan";
import { useWorkdayPlan } from "~/api/useWorkdayPlan";

export interface FormDataPrePlan {
  symptomsWorseTimes: WorseSymptomsMoment[];
  thcTypePreferences: ThcProductPreferences;
  openToUseThcProducts: OpenToUseThcProducts[];
  currentlyUsingCannabisProducts: boolean;
  reasonToUse: (typeof ReasonsEnum)[keyof typeof ReasonsEnum][];
  avoidPresentation: AvoidPresentation[];
}

export const usePrePlan = (formData: FormDataPrePlan) => {
  const {
    symptomsWorseTimes,
    thcTypePreferences,
    openToUseThcProducts,
    currentlyUsingCannabisProducts,
    reasonToUse,
    avoidPresentation,
  } = formData;
  const levelFormActionType = reasonToUse.includes(ReasonsEnum.Sleep)
    ? ""
    : symptomsWorseTimes.includes(WorseSymptomsMomentEnum.Morning)
    ? "fast-acting form"
    : "long-lasting form";

  const onlyCbd = thcTypePreferences === ThcProductPreferencesEnum.notPrefer;

  const C3 = symptomsWorseTimes.includes(WorseSymptomsMomentEnum.Morning);

  const C5 = openToUseThcProducts.includes(TimeToUse.WorkDayMornings);
  const C7 = openToUseThcProducts.includes(TimeToUse.WorkDayBedtimes);
  const C8 = openToUseThcProducts.includes(TimeToUse.NonWorkDayMornings);
  const C9 = openToUseThcProducts.includes(TimeToUse.NonWorkDayEvenings);
  const C10 = openToUseThcProducts.includes(TimeToUse.NonWorkDayBedtimes);

  const C11 = currentlyUsingCannabisProducts;

  const C14 = avoidPresentation.includes(AvoidPresentationEnum.inhalation);
  const C15 = avoidPresentation.includes(AvoidPresentationEnum.edibles);
  const C16 = avoidPresentation.includes(AvoidPresentationEnum.sublinguals);
  const C17 = avoidPresentation.includes(AvoidPresentationEnum.topicals);

  const workdayPlan = useWorkdayPlan(formData, {
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
    M5: levelFormActionType,
  });
  const nonWorkdayPlan = useNonWorkdayPlan(formData, {
    C10,
    reasonToUse,
    C14,
    C15,
    C16,
    C17,
    C3,
    C8,
    C9,
    M5: levelFormActionType,
    onlyCbd,
  });

  const whyRecommended = () => {
    if (onlyCbd && reasonToUse.includes(ReasonsEnum.Pain)) {
      return "CBD and CBDA are predominantly researched for their potential in addressing chronic pain and inflammation. CBG has demonstrated potential for its anti-inflammatory and analgesic effects. Preliminary investigations also imply that CBN and D8-THC may contribute to enhancing sleep quality and providing relief during sleep.  We always recommend starting off at lower doses and adjusting from there to ensure consistently positive experiences.";
    } else if (onlyCbd && reasonToUse.includes(ReasonsEnum.Anxiety)) {
      return "Extensive research has been conducted on the therapeutic impacts of both CBD and CBDA on anxiety, with positive results. Preliminary investigations also indicate that CBN and D8-THC may be beneficial in promoting sleep. We always recommend starting off at lower doses and adjusting from there to ensure consistently positive experiences.";
    } else if (onlyCbd && reasonToUse.includes(ReasonsEnum.Sleep)) {
      return "CBD can be helpful in the evening for getting the mind and body relaxed and ready for sleep.  Some early studies indicate that CBN as well as D8-THC can be effective for promoting sleep. We always recommend starting off at lower doses and adjusting from there to ensure consistently positive experiences.";
    } else if (
      openToUseThcProducts.includes(TimeToUse.WorkDayEvenings) &&
      C5 &&
      C7 &&
      C8 &&
      C9 &&
      C10
    ) {
      return "Given that you indicated you're open to feeling the potentially altering effects of THC, we recommended a plan that at times has stronger proportions of THC, which may help provide more effective symptom relief. We always recommend starting off at lower doses and adjusting from there to ensure consistently positive experiences.";
    } else if (
      !openToUseThcProducts.includes(TimeToUse.WorkDayEvenings) &&
      !C5 &&
      !C7 &&
      !C8 &&
      !C9 &&
      !C10
    ) {
      return "Given that you'd like to avoid the potentially altering effects of THC, we primarily recommend using products with higher concentrations of CBD.  Depending on your experience level, some THC may not feel altering.  We always recommend starting off at lower doses and adjusting from there to ensure consistently positive experiences.";
    } else {
      return "For times when you're looking to maintain a clear head, we recommended product types that are lower in THC in relation to CBD, and higher THC at times when you're more able to relax and unwind.  The amount of THC in relation to CBD relates to your recent use of cannabis, as we always recommend starting off at lower doses and adjusting from there to ensure consistently positive experiences.";
    }
  };

  return {
    workdayPlan,
    nonWorkdayPlan,
    whyRecommended: whyRecommended(),
  };
};
