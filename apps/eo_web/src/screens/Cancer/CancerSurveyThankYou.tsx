import { Navigate, useSearchParams } from "react-router-dom";

import { useApi } from "~/api/useApi";
import { ThankYou } from "~/components";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { Footer } from "~/layouts/Footer";
import { FooterFull } from "~/layouts/FooterFull";
import { Flows, type Channel, type FlowType } from "~/stores/useProfilingStore";
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
  Flows.uva,
  Flows.mass_retirees,
  Flows.free_care_plan,
  Flows.care_plan_ad_1,

  // The flows related to resources_center_1/2
  Flows.cancer_buddy,
  Flows.friend_family,
  Flows.northwell_health,
  Flows.realm_of_caring,
  Flows.private_health_management,
  Flows.memorial_sloan_kettering_cancer_center,
  Flows.new_england_cancer_specialists,
  Flows.penn_medicine,
];

export const CancerSurveyThankYou = () => {
  const { flow, email, phase, channel } = useSurveyStore();

  const [searchParams] = useSearchParams();
  const submission_id = searchParams.get("submission_id") ?? "";

  const { postCancerSurveyFormSubmission } = useApi();

  if (!submission_id) {
    return <Navigate to={"/"} />;
  }

  return (
    <LayoutDefault>
      <ThankYou
        mutationKey={["postCancerSurveyFormSubmission", submission_id]}
        mutationFunction={postCancerSurveyFormSubmission as never}
        mutationsParams={{
          email,
          phase,
          submission_id,
          channel: channel as Channel,
        }}
      />
      <HowEOWorks />
      <FAQs flow={flow} />
      {flowsWithSmallFooter.includes(flow) ? (
        <Footer flow={flow} />
      ) : (
        <FooterFull />
      )}
    </LayoutDefault>
  );
};
