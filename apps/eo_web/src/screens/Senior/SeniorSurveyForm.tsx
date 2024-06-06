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
import { getUrlFromHost, scapeParamFromQuery } from "~/helpers";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { Channels } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";


export const SeniorSurveyForm = () => {
  const { surveyStatus } = useApi();
  const { setPhase, setEmail, setChannel } = useSurveyStore();
  const [searchParams] = useSearchParams();
  const email = scapeParamFromQuery("email", searchParams);
  const symptoms = searchParams.get("symptoms") || "";
  const profiled = searchParams.get("profiled") ?? "patient";
  const phase = searchParams.get("phase") ?? "";
  const uid = searchParams.get("uid") ?? phase;

  if (!email) {
    window.location.href = "https://eo.care";
  }

  useMount(() => {
    setPhase(phase);
    setEmail(email as string);
    setChannel(Channels.senior);
  });

  const { data, isLoading, isSuccess } = useQuery({
    queryFn: () => (email && phase ? surveyStatus(email, phase) : null),
    queryKey: ["surveyStatus"],
  });

  const params = new URLSearchParams({
    email: email as string,
    symptoms,
    origin: getUrlFromHost(),
    uid,
  });

  const formId =
    profiled === "patient"
      ? SENIOR_PATIENT_SURVEY_ID
      : SENIOR_CAREGIVER_SURVEY_ID;

  return (
    <LayoutDefault className="bg-gradient lg:bg-ice-silver lg:bg-none">
      <div className="mb-10 flex h-screen flex-col">
        {isLoading && <Loading />}
        {!isLoading && isSuccess && data?.data.active ? (
          <JotformFrame formId={formId} searchParam={params} />
        ) : (
          isSuccess && data?.data && !data?.data?.active && <SurveyResponded />
        )}
      </div>
    </LayoutDefault>
  );
};
