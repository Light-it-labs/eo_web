import { useSearchParams } from "react-router-dom";

import { JotformFrame } from "~/components/JotformFrame";
import {
  CANCER_CAREGIVER_SURVEY_ID,
  CANCER_PATIENT_SURVEY_ID,
} from "~/configs/env";
import { LayoutDefault } from "~/layouts";
import { useProfilingStore } from "~/stores/useProfilingStore";


export const SurveyForm = () => {
  const [searchParams] = useSearchParams();
  const setUsePayment = useProfilingStore((s) => s.setUsePayment);

  const isPilot = (searchParams.get("pilot") ?? "") === "true";
  const email = searchParams.get("email") ?? "";
  const profiled = searchParams.get("profiled") ?? "patient";
  const symptoms = searchParams.get("symptoms") ?? "";

  setUsePayment(!isPilot);

  const formId =
    profiled === "patient"
      ? CANCER_PATIENT_SURVEY_ID
      : CANCER_CAREGIVER_SURVEY_ID;

  const params = new URLSearchParams({
    email,
    symptoms,
  });

  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <JotformFrame formId={formId} searchParam={params} />
      </div>
    </LayoutDefault>
  );
};
