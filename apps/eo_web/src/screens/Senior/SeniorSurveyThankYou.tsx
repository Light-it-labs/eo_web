import { useApi } from "~/api/useApi";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { ThankYou } from "~/components";

export const SeniorSurveyThankYou = () => {

  const { postSeniorSurveyFormSubmission } = useApi();

  return (
    <LayoutDefault>
      <ThankYou mutationKey="postSeniorSurveyFormSubmission" mutationFn={postSeniorSurveyFormSubmission} />
      <HowEOWorks />
      <FAQs />
      <FooterFull />
    </LayoutDefault>
  );
};
