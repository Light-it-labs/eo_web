import { useApi } from "~/api/useApi";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { LayoutDefault } from "~/layouts";
import { FooterFull } from "~/layouts/FooterFull";
import { ThankYou } from "~/components";
import { useSurveyStore } from "~/stores/useSurveyStore";

export const SeniorSurveyThankYou = () => {
  const { email, phase } = useSurveyStore();

  const { postSeniorSurveyFormSubmission } = useApi();

  return (
    <LayoutDefault>
      <ThankYou
        mutationKey="postSeniorSurveyFormSubmission"
        mutationFunction={postSeniorSurveyFormSubmission}
        mutationsParams={{ email, phase }}
      />
      <HowEOWorks />
      <FAQs />
      <FooterFull />
    </LayoutDefault>
  );
};
