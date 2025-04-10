import React, { useId } from "react";

import { Typography } from "@eo/ui";

import { paidFaqs, partnerFlowFaqs } from "~/copy/copy";
import { Flows, type FlowType } from "~/stores/useProfilingStore";
import { Collapsible } from "./Collapsible";

interface FAQsProps {
  flow?: FlowType;
}

const partnerSiteFlows: FlowType[] = [
  Flows.c_org,
  Flows.twist_out_cancer,
  Flows.cancer_support_community,
  Flows.resource_center_1,
  Flows.resource_center_2,
  Flows.employer_center,
  Flows.imerman,
  Flows.unite_for_her,
  Flows.mass_retirees,
  Flows.stupid_cancer,
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
  Flows.cancer_pilot,
  Flows.inova,
  Flows.uva,
];

const getFAQCopies = (flow?: FlowType) => {
  if (flow && partnerSiteFlows.includes(flow)) return partnerFlowFaqs;

  return paidFaqs;
};

export const FAQs = ({ flow }: FAQsProps) => {
  const faqList = getFAQCopies(flow);
  const faqId = useId();

  return (
    <section className="px-6 py-12 md:mx-0 md:my-[100px]">
      <div className="mx-auto my-0 flex max-w-[900px] flex-col">
        <Typography
          font="bold"
          variant="large"
          className="mb-[50px] text-center"
        >
          FAQs
        </Typography>
        <div className="flex flex-col gap-6">
          {faqList.map(({ title, content }) => (
            <Collapsible key={`${title}-${faqId}`} title={title} active={false}>
              <Typography className="text-[18px] leading-[26px] text-gray-800">
                {content}
              </Typography>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};
