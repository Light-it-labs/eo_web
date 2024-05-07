import React from "react";

import { useApi } from "~/api/useApi";
import { ThankYou } from "~/components";
import { EOInYourInbox } from "~/components/EOInYourInbox";
import { FAQs } from "~/components/FAQs";
import { HowEOWorks } from "~/components/HowEOWorks";
import { WEB_APP_URL } from "~/configs/env";
import { LayoutDefault } from "~/layouts";
import { Footer } from "~/layouts/Footer";
import { FooterFull } from "~/layouts/FooterFull";
import { ROUTES } from "~/router";
import {
  Flows,
  useProfilingStore,
  type FlowType,
} from "~/stores/useProfilingStore";


const flowsWithSmallFooter: FlowType[] = [
  Flows.c_org,
  Flows.cancer_pilot,
  Flows.twist_out_cancer,
  Flows.cancer_support_community,
  Flows.resource_center_1,
  Flows.resource_center_2,
  Flows.employer_center,
  Flows.inova,
  Flows.imerman,
  Flows.unite_for_her,
];

export const ProfilingThankYou = () => {
  const { flow } = useProfilingStore();

  const { checkoutComplete } = useApi();

  const goToWebApp = () => {
    window.location.href = WEB_APP_URL;
  };

  return (
    <LayoutDefault>
      <ThankYou mutationKey="checkoutComplete" mutationFunction={checkoutComplete} isProfiling={true} exitRoute={ROUTES.userRolSelector}>
        You’ll be able to review your initial, personalized,
        clinician-approved care plan within 24 hours. When your care plan is
        ready, we will send you an email with a link to{" "}
        <span className="cursor-pointer underline" onClick={goToWebApp}>
          log into your account.
        </span>
      </ThankYou>

      <HowEOWorks pilot={flow == Flows.cancer_pilot} />
      <FAQs flow={flow} />
      <EOInYourInbox />
      {flowsWithSmallFooter.includes(flow) ? (
        <Footer flow={flow} />
      ) : (
        <FooterFull />
      )}
    </LayoutDefault>
  );
};
