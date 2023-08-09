import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { useElixirApi } from "~/api/useElixirApi";
import { jotformScript } from "~/helpers/jotform_script";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





const CANCER_PROFILE_ID = window.data.CANCER_PROFILING || 232054030821037;

export const CancerForm = () => {
  const location = useLocation();

  const { submission_id } = location.state as { submission_id: string };

  const [jotformReturnedInformation, setJotformReturnedInformation] =
    useState(false);

  const maxRetries = 10;
  const [countFetching, setCountFetching] = useState(0);
  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { getSubmissionByIdV2 } = useElixirApi();
  const { data } = useQuery({
    queryFn: () => getSubmissionByIdV2(submission_id),
    queryKey: ["getSubmission", submission_id],
    enabled: !!submission_id,
    onSuccess: ({ data: resp }) => {
      if (resp.dob && resp.whoAre && resp.email) {
        setJotformReturnedInformation(true);
      }
      setCountFetching((state) => state + 1);
    },
    refetchInterval:
      jotformReturnedInformation || countFetching >= maxRetries ? false : 1500,
  });

  useEffect(() => {
    jotformScript(CANCER_PROFILE_ID);
  }, [data?.data]);
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
          src={`https://form.jotform.com/${CANCER_PROFILE_ID}?name[0]=${data?.data.whoAre.first}&name[1]=${data?.data.whoAre.last}&email=${data?.data.email}&dob[month]=${data?.data.dob.month}&dob[day]=${data?.data.dob.day}&dob[year]=${data?.data.dob.year}&caregiver=${data?.data.caregiver}`}
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
