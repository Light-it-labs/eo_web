import { Navigate, useSearchParams } from "react-router-dom";

import { useApi } from "~/api/useApi";
import { ThankYou } from "~/components";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { type Channel } from "~/stores/useProfilingStore";
import { useSurveyStore } from "~/stores/useSurveyStore";

export const SeniorSurveyThankYou = () => {
  const { email, phase, channel } = useSurveyStore();
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
      <HowEOWorks />
      <FAQs />
      <FooterFull />
    </LayoutDefault>
  );
};
