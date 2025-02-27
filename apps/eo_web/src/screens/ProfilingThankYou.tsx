import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  type Channel,
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
  Flows.uva,
  Flows.imerman,
  Flows.unite_for_her,

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

export const ProfilingThankYou = () => {
  const { flow, account, usePayment, channel } = useProfilingStore();

  const [searchParams] = useSearchParams();
  const submission_id = searchParams.get("submission_id") ?? "";
  const navigate = useNavigate();

  const { checkoutComplete } = useApi();

  useEffect(() => {
    if (!submission_id && usePayment) {
      navigate(ROUTES.userRolSelector);
    }
  }, [navigate, submission_id, usePayment]);

  const goToWebApp = () => {
    window.location.href = WEB_APP_URL;
  };

  return (
    <LayoutDefault>
      <ThankYou
        mutationKey={["checkoutComplete", submission_id]}
        mutationFunction={checkoutComplete as never}
        isProfiling={true}
        mutateOnMount={usePayment}
        mutationsParams={{
          email: account.email,
          submission_id,
          channel: channel as Channel,
        }}
      >
        You’ll be able to review your initial, personalized, clinician-approved
        care plan within 24 hours. When your care plan is ready, we will send
        you a text message and an email with a link to{" "}
        <span className="cursor-pointer underline" onClick={goToWebApp}>
          log into your account.
        </span>
      </ThankYou>

      <HowEOWorks flow={flow} />
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
