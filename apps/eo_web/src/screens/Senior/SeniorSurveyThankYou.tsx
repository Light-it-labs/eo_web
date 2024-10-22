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

const flowsWithSmallFooter: FlowType[] = [Flows.mass_retirees];

export const SeniorSurveyThankYou = () => {
  const { flow, email, phase, channel } = useSurveyStore();

  const [searchParams] = useSearchParams();
  const submission_id = searchParams.get("submission_id") ?? "";

  const { postSeniorSurveyFormSubmission } = useApi();

  if (!submission_id) {
    return <Navigate to={"/"} />;
  }

  return (
    <LayoutDefault>
      <ThankYou
        mutationKey={["postSeniorSurveyFormSubmission", submission_id]}
        mutationFunction={postSeniorSurveyFormSubmission as never}
        mutationsParams={{
          email,
          phase,
          submission_id,
          channel: channel as Channel,
        }}
      />

      <HowEOWorks flow={flow} />
      <FAQs flow={flow} />
      {flowsWithSmallFooter.includes(flow) ? (
        <Footer flow={flow} />
      ) : (
        <FooterFull />
      )}
    </LayoutDefault>
  );
};
