import { useNavigate, useSearchParams } from "react-router-dom";

import {
  CANCER_PROFILE_CAREGIVER_ID,
  CANCER_PROFILE_PATIENT_ID,
} from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";





export const Profiling = () => {
  const { symptoms } = useProfilingStore((state) => state);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const cancerProfileId =
    type === "Patient"
      ? CANCER_PROFILE_PATIENT_ID
      : CANCER_PROFILE_CAREGIVER_ID;

  if (!type) {
    navigate(ROUTES.userRolSelector);
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
          src={`https://form.jotform.com/${cancerProfileId}&symptoms=${symptoms.join(
            ",",
          )}`}
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
