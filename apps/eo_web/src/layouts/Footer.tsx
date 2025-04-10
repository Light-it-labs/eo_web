import React from "react";

import { tw } from "@eo/shared";
import { icons, Typography } from "@eo/ui";

import { Flows, type FlowType } from "~/stores/useProfilingStore";

interface FooterProps {
  flow: FlowType;
}

type ConfigType = {
  title: string;
  url: string;
  extraClasses?: string;
}

const basicData = [
  { title: "Terms of use", url: "https://eo.care/web/terms-of-use" },
  { title: "Privacy Policy", url: "https://eo.care/web/privacy-policy" },
  { title: "Cookie Preferences", url: "#", extraClasses: "cky-banner-element" },
  { title: "Visit eo.care", url: "https://eo.care/web/home" },
];

const c_org = [
  { title: "About EO", url: "https://partner.eo.care/c-org/about" },
  ...basicData,
];

const cancer_pilot = [
  { title: "About EO", url: "https://partner.eo.care/cancer/about" },
  ...basicData,
];

const inova = [
  { title: "About EO", url: "https://partner.eo.care/inova/about" },
  ...basicData,
];

const uva = [
  { title: "About EO", url: "https://partner.eo.care/inova/about" },
  ...basicData,
];

const twist_out_cancer = [
  { title: "About EO", url: "https://partner.eo.care/twist-out-cancer/about" },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/twist-out-cancer/cannabis-101",
  },
  ...basicData,
];

const cancer_support_community = [
  {
    title: "About EO",
    url: "https://partner.eo.care/cancer-support-community/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/cancer-support-community/cancer-101",
  },
  ...basicData,
];

const employer_center = [
  { title: "About EO", url: "https://partner.eo.care/employers/about" },
  ...basicData,
];

const resource_center_1 = [
  {
    title: "About EO",
    url: "https://partner.eo.care/cannabis-resource-center-1/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/cannabis-resource-center-1/cannabis-101",
  },
  ...basicData,
];

const resource_center_2 = [
  {
    title: "About EO",
    url: "https://partner.eo.care/cannabis-resource-center-2/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/cannabis-resource-center-2/cannabis-101",
  },
  ...basicData,
];

const imerman = [
  {
    title: "About EO",
    url: "https://partner.eo.care/imerman/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/imerman/cannabis-101",
  },
  ...basicData,
];

const unite_for_her = [
  {
    title: "About EO",
    url: "https://partner.eo.care/unite-for-her/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/unite-for-her/cannabis-101",
  },
  ...basicData,
];

const mass_retirees = [
  {
    title: "About EO",
    url: "https://partner.eo.care/mass-retirees/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/mass-retirees/cannabis-101",
  },
  ...basicData,
];

const free_care_plan = [
  {
    title: "About EO",
    url: "https://partner.eo.care/free-care-plan/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/free-care-plan/cannabis-101",
  },
  ...basicData,
];

const stupid_cancer = [
  {
    title: "About EO",
    url: "https://partner.eo.care/stupid-cancer/about",
  },
  {
    title: "Cannabis 101",
    url: "https://partner.eo.care/stupid-cancer/cannabis-101",
  },
  ...basicData,
];

const cancer_buddy = resource_center_1;
const realm_of_caring = resource_center_1;
const friend_family = resource_center_1;
const northwell_health = resource_center_1;
const private_health_management = resource_center_1;
const memorial_sloan_kettering_cancer_center = resource_center_1;
const new_england_cancer_specialists = resource_center_1;
const penn_medicine = resource_center_1;
const care_plan_ad_1 = free_care_plan;

const allData: Record<FlowType, ConfigType[]> = {
  c_org,
  cancer_pilot,
  twist_out_cancer,
  cancer_support_community,
  marketing_site: basicData, // Will never happen, it's filtered outside
  employer_center,
  resource_center_1,
  resource_center_2,
  inova,
  uva,
  imerman,
  unite_for_her,
  mass_retirees,
  stupid_cancer,
  cancer_buddy,
  realm_of_caring,
  friend_family,
  northwell_health,
  private_health_management,
  memorial_sloan_kettering_cancer_center,
  new_england_cancer_specialists,
  penn_medicine,
  free_care_plan,
  care_plan_ad_1
};

export function Footer({ flow }: FooterProps) {
  return (
    <footer className="flex flex-col justify-center gap-4 bg-black px-4 py-[100px] md:flex-row md:pl-[10px] lg:pl-5">
      <section className="sm:max-w-full md:max-w-[453px]">
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
        <Typography className="mb-[36px] font-new-hero text-[14px] font-normal text-[#ababab]">
          © 2022 All rights reserved. Patents pending. EO Care, Inc.
        </Typography>
        {flow === Flows.cancer_support_community && (
          <Typography className="font-new-hero text-[14px] font-normal text-[#ababab]">
            Reference in this site to any specific commercial product, process,
            or service, or the use of any trade, firm or corporation name is for
            the information and convenience of the recipient, and does not
            constitute endorsement, recommendation, or favoring by the Cancer
            Support Community.
          </Typography>
        )}
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
          {allData[flow].map(({ title, url, extraClasses }) => (
            <a
              key={url}
              href={url}
              className={tw(
                "mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2",
                extraClasses,
              )}
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
              href="https://www.instagram.com/eo.care_/"
              className="mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/eo-cannnabis-care"
              className="mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
