import { useNavigate } from "react-router-dom";

import { SENIOR_PROFILE_PATIENT_ID } from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";


export const Profiling = () => {
  const { type, symptoms, state, usePayment, origin, experience, account } =
    useProfilingStore((state) => state);

  const searchParam = new URLSearchParams({
    email: account.email,
    states: state ?? "",
    symptoms: symptoms.join(","),
    payment: usePayment ? "yes" : "no",
    origin,
    experience,
  });
  const navigate = useNavigate();

  const seniorFormId =
    type === "Patient" ? SENIOR_PROFILE_PATIENT_ID : SENIOR_PROFILE_PATIENT_ID;

  if (!type) {
    navigate(ROUTES.userRolSelector);
  }

  useMount(() => {
    setTimeout(() => {
      jotformScript(seniorFormId);
    }, 400);
  });

  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        {/* uncomment for real flow */}
        <iframe
          id={`JotFormIFrame-${seniorFormId}`}
          title=""
          onLoad={() => window.parent.scrollTo(0, 0)}
          allow="geolocation; microphone; camera"
          allowTransparency={true}
          allowFullScreen={true}
          src={`https://form.jotform.com/${seniorFormId}?${searchParam.toString()}`}
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
