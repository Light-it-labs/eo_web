import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { useApi } from "~/api/useApi";
import { JotformFrame } from "~/components/JotformFrame";
import { Loading } from "~/components/Loading";
import { SurveyResponded } from "~/components/SurveyResponded";
import {
  SENIOR_CAREGIVER_SURVEY_ID,
  SENIOR_PATIENT_SURVEY_ID,
} from "~/configs/env";
import { scapeParamFromQuery } from "~/helpers";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { useSurveyStore } from "~/stores/useSurveyStore";


export const SeniorSurveyForm = () => {
  const { surveyStatus } = useApi();
  const { setPhase, setEmail } = useSurveyStore();
  const [searchParams] = useSearchParams();
  const email = scapeParamFromQuery("email", searchParams);
  const symptoms = searchParams.get("symptoms") || "";
  const profiled = searchParams.get("profiled") ?? "patient";
  const phase = searchParams.get("phase") ?? "";

  if (!email) {
    window.location.href = "https://eo.care";
  }

  useMount(() => {
    setPhase(phase);
    setEmail(email as string);
  });

  const { data, isSuccess } = useQuery({
    queryFn: () => (email && phase ? surveyStatus(email, phase) : null),
    queryKey: ["surveyStatus"],
  });

  const params = new URLSearchParams({
    email: email as string,
    symptoms,
  });

  const formId =
    profiled === "patient"
      ? SENIOR_PATIENT_SURVEY_ID
      : SENIOR_CAREGIVER_SURVEY_ID;

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
