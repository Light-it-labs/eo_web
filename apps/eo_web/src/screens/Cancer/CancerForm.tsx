import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





const CANCER_PROFILE_ID = window.data.CANCER_PROFILING || 232054030821037;

export const CancerForm = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const last = searchParams.get("last");
  const dob = searchParams.get("dob");
  const email = searchParams.get("email");
  const caregiver = searchParams.get("caregiver");
  const submission_id = searchParams.get("submission_id");
  const [day, month, year] = dob?.split("-") || [];

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

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
          src={`https://form.jotform.com/${CANCER_PROFILE_ID}?name[0]=${name}&name[1]=${last}&email=${email}&dob[month]=${month}&dob[day]=${day}&dob[year]=${year}&caregiver=${caregiver}`}
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
