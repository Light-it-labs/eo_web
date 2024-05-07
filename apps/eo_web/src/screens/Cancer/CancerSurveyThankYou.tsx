import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { Flows, type FlowType } from "~/stores/useProfilingStore";
import { Footer } from "~/layouts/Footer";
import { ThankYou } from "~/components";
import { useSurveyStore } from "~/stores/useSurveyStore";
import { useApi } from "~/api/useApi";

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
  const { flow } = useSurveyStore();

  const { postCancerSurveyFormSubmission } = useApi();

  return (
    <LayoutDefault>
      <ThankYou mutationKey="postCancerSurveyFormSubmission" mutationFunction={postCancerSurveyFormSubmission} />
      <HowEOWorks pilot={flow === Flows.cancer_pilot} />
      <FAQs flow={flow} />
      {flowsWithSmallFooter.includes(flow)
        ? <Footer flow={flow} />
        : <FooterFull />}
    </LayoutDefault >
  );
};
