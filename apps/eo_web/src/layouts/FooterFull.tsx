import React from "react";

import { Typography, icons } from "@eo/ui";





export function FooterFull() {
  return (
    <footer className="flex flex-col justify-center gap-4 bg-black px-4 py-[100px] md:flex-row md:pl-0 lg:pl-5">
      <section className="sm:max-w-full md:max-w-[453px]">
        <icons.EoWhiteIcon
          onClick={() => {
            window.open("https://eo.care/web/home", "_blank");
          }}
        />
        <Typography
          variant="large"
          font="bold"
          className="mb-6 text-4xl font-extrabold text-white"
        >
          The wise use <br className="hidden md:block" />
          cannabis company.
        </Typography>
        <Typography className="mb-[36px] font-new-hero text-[14px] font-normal text-[#ababab]">
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
          <a
            href="https://eo.care/web/home"
            className="mb-0 py-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Home
          </a>
          <a
            href="https://eo.care/web/for-cancer"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            For Cancer Care
          </a>
          <a
            href="https://eo.care/web/for-seniors"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            For Seniors
          </a>
          <a
            href="https://eo.care/web/for-employers"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            For Employers
          </a>
          <a
            href="https://shop.eo.care"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Shop CBD
          </a>
          <a
            href="https://eo.care/web/about"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            About
          </a>
          <a
            href="https://eo.care/web/frequently-asked-questions"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            FAQs
          </a>
          <a
            href="https://eo.care/blog-posts"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Blog
          </a>
          <a
            href="https://eo.care/methodology"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Methodology
          </a>
          <a
            href="https://eo.care/research"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Research
          </a>

          <a
            href="https://www.eo.care/web/terms-of-use"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Terms of Use
          </a>
          <a
            href="https://www.eo.care/web/privacy-policy"
            className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Privacy Policy
          </a>
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
              For general inquiries:
            </Typography>
            <a
              href="mailto:hello@eo.care"
              className="mb-2 pb-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
            >
              hello@eo.care
            </a>
            <Typography className="mb-0  pt-2 text-[14px] font-normal leading-[22px] text-white opacity-50 md:mr-2 ">
              For press inquiries:
            </Typography>
            <a
              href="mailto:press@eo.care"
              className="mb-2 pb-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
            >
              press@eo.care
            </a>
            <Typography className="mb-0  pt-2 text-[14px] font-normal leading-[22px] text-white opacity-50 md:mr-2 ">
              For job opportunities:
            </Typography>
            <a
              href="mailto:careers@eo.care"
              className="mb-2 pb-2 font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
            >
              careers@eo.care
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
              className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/eocare_"
              className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/eo.care_/"
              className="mb-0 py-2  font-new-hero text-[14px] font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
