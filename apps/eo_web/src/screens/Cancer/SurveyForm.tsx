import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  CANCER_CAREGIVER_SURVEY_ID,
  CANCER_PATIENT_SURVEY_ID,
} from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";
import { useProfilingStore } from "~/stores/useProfilingStore";


export const SurveyForm = () => {
  const [searchParams] = useSearchParams();
  const setUsePayment = useProfilingStore((s) => s.setUsePayment)

  const isPilot = (searchParams.get("pilot") ?? "") === "true";
  const email = searchParams.get("email") ?? "";
  const profiled = searchParams.get("profiled") ?? "patient";
  const symptoms = searchParams.get("symptoms") ?? "";

  setUsePayment(!isPilot)

  const formId =
    profiled === "patient"
      ? CANCER_PATIENT_SURVEY_ID
      : CANCER_CAREGIVER_SURVEY_ID;

  const params = new URLSearchParams({
    email,
    symptoms,
  });

  useEffect(() => {
    jotformScript(formId);
  }, [formId]);
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${formId}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${formId}?${params.toString()}`}
          className="h-full w-full"
          style={{
            minWidth: "100%",
            height: "539px",
            border: "none",
          }}
        ></iframe>
      </div>
    </LayoutDefault>
  );
};
