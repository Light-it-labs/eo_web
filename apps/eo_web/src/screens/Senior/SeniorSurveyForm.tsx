import { useSearchParams } from "react-router-dom";

import { JotformFrame } from "~/components/JotformFrame";
import {
  SENIOR_CAREGIVER_SURVEY_ID,
  SENIOR_PATIENT_SURVEY_ID,
} from "~/configs/env";
import { LayoutDefault } from "~/layouts";


export const SeniorSurveyForm = () => {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const symptoms = params.get("symptoms") || "";
  const profiled = params.get("profiled") ?? "patient";

  const searchParam = new URLSearchParams({
    email,
    symptoms,
  });

  const formId =
    profiled === "patient"
      ? SENIOR_PATIENT_SURVEY_ID
      : SENIOR_CAREGIVER_SURVEY_ID;

  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <JotformFrame formId={formId} searchParam={searchParam} />
      </div>
    </LayoutDefault>
  );
};
