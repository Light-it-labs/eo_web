import React from "react";

import { Typography, icons } from "@eo/ui";





export function Footer() {
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
          <a
            href="https://partner.eo.care/about"
            className="mb-0 py-2 font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            About
          </a>
          <a
            href="https://www.eo.care/kit/terms-of-use"
            className="mb-0 py-2 font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Terms of Use
          </a>
          <a
            href="https://www.eo.care/privacy-policy"
            className="mb-0 py-2 font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.eo.care"
            className="mb-0 py-2 font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Visit EO
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
              Call:
            </Typography>
            <a
              href="tel:877-707-0706"
              className="mb-2 pb-2 font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
            >
              877-707-0706
            </a>
            <Typography className="mb-0 pt-2  font-normal leading-[22px] text-white opacity-50 md:mr-2 ">
              Email:
            </Typography>
            <a
              href="mailto:employers@eo.care"
              className="mb-2 pb-2 font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
            >
              employers@eo.care
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
