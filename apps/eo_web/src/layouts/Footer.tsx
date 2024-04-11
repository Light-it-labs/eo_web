import React from "react";

import { Typography, icons } from "@eo/ui";
import { type Flows } from "~/stores/useProfilingStore";
type FlowsTypes = keyof typeof Flows;

interface FooterProps {
  flow: FlowsTypes;
}

const basicData = [
  { title: 'Terms of use', url: 'https://eo.care/web/terms-of-use' },
  { title: 'Privacy Policy', url: 'https://eo.care/web/privacy-policy' },
  { title: 'Visit eo.care', url: 'https://eo.care/web/home' }
]

const c_org = [
  { title: 'About EO', url: 'https://partner.eo.care/c-org/about' },
  ...basicData
]

const cancer_pilot = [
  { title: 'About EO', url: 'https://partner.eo.care/cancer/about' },
  { title: 'Partner Dispensaries', url: 'https://partner.eo.care/partner-dispensaries' },
  ...basicData
]

const twist_out_cancer = [
  { title: 'About EO', url: 'https://partner.eo.care/twist-out-cancer/about' },
  { title: 'Cannabis 101', url: 'https://partner.eo.care/twist-out-cancer/cannabis-101' },
  ...basicData
]

const cancer_support_community = [
  { title: 'About EO', url: 'https://partner.eo.care/cancer-support-community/about' },
  { title: 'Cannabis 101', url: 'https://partner.eo.care/cancer-support-community/cancer-101' },
  ...basicData
]

const employer_center = [
  { title: 'About EO', url: 'https://partner.eo.care/employers/about' },
  ...basicData
];

const resource_center_1 = [
  { title: 'About EO', url: 'https://partner.eo.care/cannabis-resource-center-1/about' },
  { title: 'Cannabis 101', url: 'https://partner.eo.care/cannabis-resource-center-1/cannabis-101' },
  ...basicData
];

const resource_center_2 = [
  { title: 'About EO', url: 'https://partner.eo.care/cannabis-resource-center-2/about' },
  { title: 'Cannabis 101', url: 'https://partner.eo.care/cannabis-resource-center-2/cannabis-101' },
  ...basicData
];

const allData = {
  c_org,
  cancer_pilot,
  twist_out_cancer,
  cancer_support_community,
  marketing_site: basicData, // Will never happen, it's filtered outside
  employer_center,
  resource_center_1,
  resource_center_2
}

export function Footer({ flow }: FooterProps) {

  return (
    <footer className="flex flex-col justify-center gap-4 bg-black px-4 py-[100px] md:flex-row md:pl-[10px] lg:pl-5">
      <section>
        <icons.EoWhiteIcon
          onClick={() => {
            window.open("https://eo.care/kit", "_blank");
          }}
        />
        <Typography
          variant="large"
          font="bold"
          className="mb-6  text-5xl font-extrabold text-white"
        >
          Wise use for all.
        </Typography>
        <Typography className="font-new-hero font-normal text-[#ababab]">
          © 2022 All rights reserved. Patents pending. EO Care, Inc.
        </Typography>
      </section>
      <section className="block w-auto md:w-[100px] lg:w-[180px]"></section>
      <section className="flex flex-row justify-between">
        <div className="flex w-auto flex-col md:w-[100px] lg:w-[180px]">
          <Typography
            className="mb-4 text-[14px] leading-[18px] tracking-[1.4px] text-cloud-silver"
            font="regular"
          >
            COMPANY
          </Typography>
          {allData[flow].map(({ title, url }) => (
            <a
              key={url}
              href={url}
              className="mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              {title}
            </a>
          ))}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex w-auto flex-col md:w-[100px] lg:w-[200px]">
            <Typography
              className="mb-4 text-[14px] leading-[18px] tracking-[1.4px] text-cloud-silver"
              font="regular"
            >
              GET IN TOUCH
            </Typography>
            <Typography className="mb-0 pt-2 leading-[22px] text-white opacity-50 md:mr-2 ">
              Call:
            </Typography>
            <a
              href="tel:888-823-6143"
              className="mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              888-823-6143
            </a>
            <Typography className="mb-0 pt-2  font-normal leading-[22px] text-white opacity-50 md:mr-2 ">
              Email:
            </Typography>
            <a
              href="mailto:support@eo.care"
              className="mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              support@eo.care
            </a>
          </div>
          <div className="flex w-auto flex-col md:w-[100px] lg:w-[180px]">
            <Typography
              className="mb-4 text-[14px] leading-[18px] tracking-[1.4px] text-cloud-silver"
              font="regular"
            >
              FOLLOW US
            </Typography>
            <a
              href="https://www.linkedin.com/company/eo-cannnabis-care"
              className="mb-0 py-2 font-new-hero  font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
