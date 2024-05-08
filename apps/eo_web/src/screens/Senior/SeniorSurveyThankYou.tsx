import { useApi } from "~/api/useApi";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { ThankYou } from "~/components";
import { useSurveyStore } from "~/stores/useSurveyStore";
import { Navigate, useSearchParams } from "react-router-dom";

export const SeniorSurveyThankYou = () => {
  const { email, phase } = useSurveyStore();
  const [searchParams] = useSearchParams();
  const submission_id = searchParams.get("submission_id") ?? "";

  if (!submission_id) {
    return <Navigate to={'/'} />
  }
  const { postSeniorSurveyFormSubmission } = useApi();

  return (
    <LayoutDefault>
      <ThankYou
        mutationKey="postSeniorSurveyFormSubmission"
        mutationFunction={postSeniorSurveyFormSubmission}
        mutationsParams={{ email, phase, submission_id }}
      />
      <HowEOWorks />
      <FAQs />
      <FooterFull />
    </LayoutDefault>
  );
};
