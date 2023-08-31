import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { CANCER_PROFILE_ID } from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";





export const SurveyForm = () => {
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  useEffect(() => {
    jotformScript(CANCER_PROFILE_ID);
  }, []);
  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <iframe
          id={`JotFormIFrame-${CANCER_PROFILE_ID}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${CANCER_PROFILE_ID}?email=${email}`}
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
