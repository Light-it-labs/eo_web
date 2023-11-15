import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { ATHLETE_SURVEY_FORM } from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";





export const AthleteSurveyForm = () => {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email") || "";
  const symptoms = searchParams.get("symptoms") || "";

  useEffect(() => {
    jotformScript(ATHLETE_SURVEY_FORM);
  }, []);
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${ATHLETE_SURVEY_FORM}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${ATHLETE_SURVEY_FORM}?email=${email}&symptoms=${symptoms}`}
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
