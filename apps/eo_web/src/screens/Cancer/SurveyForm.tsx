import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { useApi } from "~/api/useApi";
import { JotformFrame } from "~/components/JotformFrame";
import { Loading } from "~/components/Loading";
import { SurveyResponded } from "~/components/SurveyResponded";
import {
  CANCER_CAREGIVER_SURVEY_ID,
  CANCER_PATIENT_SURVEY_ID,
} from "~/configs/env";
import { scapeParamFromQuery } from "~/helpers";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { useProfilingStore } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";


export const SurveyForm = () => {
  const [searchParams] = useSearchParams();
  const { setUsePayment } = useProfilingStore();
  const { setPhase, setEmail } = useSurveyStore();
  const { surveyStatus } = useApi();

  const isPilot = (searchParams.get("pilot") ?? "") === "true";
  const email = scapeParamFromQuery("email", searchParams);
  const profiled = searchParams.get("profiled") ?? "patient";
  const symptoms = searchParams.get("symptoms") ?? "";
  const phase = searchParams.get("phase") ?? "";

  if (!email) {
    window.location.href = "https://eo.care";
  }

  useMount(() => {
    setPhase(phase);
    setEmail(email as string);
    setUsePayment(!isPilot);
  });

  const { data, isSuccess } = useQuery({
    queryFn: () => (email && phase ? surveyStatus(email, phase) : null),
    queryKey: ["surveyStatus"],
  });

  const formId =
    profiled === "patient"
      ? CANCER_PATIENT_SURVEY_ID
      : CANCER_CAREGIVER_SURVEY_ID;

  const params = new URLSearchParams({
    email: email as string,
    symptoms,
  });

  return (
    <LayoutDefault className="bg-gradient">
      <div className="mb-10 flex h-screen flex-col">
        {!isSuccess && <Loading />}
        {isSuccess ? (
          <JotformFrame formId={formId} searchParam={params} />
        ) : (
          data?.data && !data?.data?.active && <SurveyResponded />
        )}
      </div>
    </LayoutDefault>
  );
};
