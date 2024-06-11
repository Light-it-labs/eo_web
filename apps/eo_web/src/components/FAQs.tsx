import React from "react";

import { Typography } from "@eo/ui";

import { cOrgFaqs, inovaFaqs, paidFaqs, pilotFaqs } from "~/copy/copy";
import { Flows, type FlowType } from "~/stores/useProfilingStore";
import { Collapsible } from "./Collapsible";


interface FAQsProps {
  flow?: FlowType;
}

const flowsWithCOrgFaqs: FlowType[] = [
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
];

const flowsWithInovaFaqs: FlowType[] = [
  Flows.inova,
  Flows.uva,
];

const getFAQCopies = (flow?: FlowType) => {
  if (flow && flowsWithCOrgFaqs.includes(flow)) return cOrgFaqs;
  if (flow && flowsWithInovaFaqs.includes(flow)) return inovaFaqs;
  if (flow === Flows.cancer_pilot) return pilotFaqs;

  return paidFaqs;
};

export const FAQs = ({ flow }: FAQsProps) => {
  const faqList = getFAQCopies(flow);

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
            <Collapsible key={title} title={title} active={false}>
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
