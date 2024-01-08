import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  SENIOR_CAREGIVER_SURVEY_ID,
  SENIOR_PATIENT_SURVEY_ID,
} from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
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

  useEffect(() => {
    jotformScript(formId);
  }, []);
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
          src={`https://form.jotform.com/${formId}?${searchParam.toString()}`}
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
