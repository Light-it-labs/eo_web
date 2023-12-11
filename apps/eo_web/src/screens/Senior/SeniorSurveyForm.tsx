import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SENIOR_SURVEY_ID } from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";


export const SeniorSurveyForm = () => {
  const [params] = useSearchParams();
  const email = params.get("email") || "";
  const symptoms = params.get("symptoms") || "";

  const searchParam = new URLSearchParams({
    email,
    symptoms,
  });

  useEffect(() => {
    jotformScript(SENIOR_SURVEY_ID);
  }, []);
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${SENIOR_SURVEY_ID}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${SENIOR_SURVEY_ID}?${searchParam.toString()}`}
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
