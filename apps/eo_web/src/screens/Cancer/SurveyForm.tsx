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
import { getUrlFromHost, scapeParamFromQuery } from "~/helpers";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { Flows } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";

export const SurveyForm = () => {
  const [searchParams] = useSearchParams();
  const { setPhase, setEmail, setFlow } = useSurveyStore();
  const { surveyStatus, getProfilingFlow } = useApi();

  const email = scapeParamFromQuery("email", searchParams);
  const profiled = searchParams.get("profiled") ?? "patient";
  const symptoms = searchParams.get("symptoms") ?? "";
  const phase = searchParams.get("phase") ?? "";
  const uid = searchParams.get("uid") ?? phase;

  if (!email) {
    window.location.href = "https://eo.care";
  }

  useMount(() => {
    setPhase(phase);
    setEmail(email as string);
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => (email && phase ? surveyStatus(email, phase) : null),
    queryKey: ["surveyStatus"],
  });

  const { isLoading: profilingLoading, isSuccess: getProfilingSuccess } =
    useQuery({
      queryFn: () => getProfilingFlow(email as string),
      onSuccess: (response) => {
        setFlow(response.data.flow ?? Flows.marketing_site);
      },
      queryKey: ["profilingFlow", email],
    });

  const formId =
    profiled === "patient"
      ? CANCER_PATIENT_SURVEY_ID
      : CANCER_CAREGIVER_SURVEY_ID;

  const params = new URLSearchParams({
    email: email as string,
    symptoms,
    origin: getUrlFromHost(),
    uid,
  });

  return (
    <LayoutDefault className="bg-gradient lg:bg-ice-silver lg:bg-none">
      <div className="mb-10 flex h-screen flex-col">
        {isLoading || (profilingLoading && <Loading />)}
        {!isLoading && !profilingLoading && isSuccess && data?.data.active ? (
          <JotformFrame formId={formId} searchParam={params} />
        ) : (
          isSuccess &&
          getProfilingSuccess &&
          data?.data &&
          !data?.data?.active && <SurveyResponded />
        )}
      </div>
    </LayoutDefault>
  );
};
