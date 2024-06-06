import { Navigate, useSearchParams } from "react-router-dom";

import { useApi } from "~/api/useApi";
import { ThankYou } from "~/components";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { Footer } from "~/layouts/Footer";
import { FooterFull } from "~/layouts/FooterFull";
import { Flows, type FlowType } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";


const flowsWithSmallFooter: FlowType[] = [
  Flows.c_org,
  Flows.cancer_pilot,
  Flows.twist_out_cancer,
  Flows.cancer_support_community,
  Flows.resource_center_1,
  Flows.resource_center_2,
  Flows.employer_center,
  Flows.inova,
];

export const CancerSurveyThankYou = () => {
  const { flow, email, phase, channel } = useSurveyStore();

  const [searchParams] = useSearchParams();
  const submission_id = searchParams.get("submission_id") ?? "";

  const { postCancerSurveyFormSubmission } = useApi();

  if (!submission_id || !channel) {
    return <Navigate to={"/"} />;
  }

  return (
    <LayoutDefault>
      <ThankYou
        mutationKey={["postCancerSurveyFormSubmission", submission_id]}
        mutationFunction={postCancerSurveyFormSubmission}
        mutationsParams={{ email, phase, submission_id, channel }}
      />
      <HowEOWorks pilot={flow === Flows.cancer_pilot} />
      <FAQs flow={flow} />
      {flowsWithSmallFooter.includes(flow) ? (
        <Footer flow={flow} />
      ) : (
        <FooterFull />
      )}
    </LayoutDefault>
  );
};
