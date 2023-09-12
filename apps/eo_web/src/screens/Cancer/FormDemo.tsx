import { useNavigate, useSearchParams } from "react-router-dom";

import {
  CANCER_PROFILE_CAREGIVER_ID,
  CANCER_PROFILE_PATIENT_ID,
} from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const FormDemo = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const caregiver = searchParams.get("caregiver");
  const cancerProfileId =
    caregiver === "I’m a patient"
      ? CANCER_PROFILE_PATIENT_ID
      : CANCER_PROFILE_CAREGIVER_ID;

  if (!caregiver) {
    navigate(ROUTES.cancerUserTypeSelectDemo);
  }

  useMount(() => {
    setTimeout(() => {
      jotformScript(cancerProfileId);
    }, 400);
  });

  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        {/* uncomment for real flow */}
        <iframe
          id={`JotFormIFrame-${cancerProfileId}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${cancerProfileId}?caregiver=${caregiver}`}
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
