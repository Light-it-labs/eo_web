import React from "react";

import { Typography } from "@eo/ui";





export function Footer() {
  return (
    <footer className="mt-[60px] flex flex-col justify-center gap-4 bg-black px-4 py-[100px] pl-0 md:flex-row md:pl-[10px] lg:pl-[20px]">
      <section>
        <svg
          className="mb-6 h-11 w-20 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="20"
          viewBox="0 0 42 20"
          fill="none"
          onClick={() => {
            window.open("https://eo.care/kit", "_blank");
          }}
        >
          <path
            d="M5.91088 11.6872C6.02006 12.778 6.53759 13.5608 7.32479 14.1766C9.36977 15.775 12.3887 15.537 14.1727 13.6471C15.0036 12.766 15.1171 12.7474 16.1511 13.4069C16.9023 13.8862 17.6469 14.3753 18.3871 14.871C18.9996 15.2815 19.0597 15.6243 18.612 16.2314C17.0398 18.3604 14.866 19.4654 12.3013 19.8421C9.97137 20.1838 7.67963 20.0004 5.51892 19.0013C1.94975 17.3527 0.188639 14.4921 0.0139472 10.5976C-0.100694 8.03509 0.482339 5.67784 2.09933 3.65142C4.02749 1.23194 6.62602 0.1292 9.66238 0.0101916C12.3952 -0.096807 14.8551 0.630347 16.8051 2.64803C18.4559 4.35455 19.2169 6.46614 19.4418 8.79172C19.4975 9.37038 19.5117 9.95451 19.5161 10.5365C19.5226 11.399 19.2311 11.6861 18.374 11.6872C14.4435 11.6894 10.514 11.6872 6.58344 11.6872C6.37054 11.6872 6.15763 11.6872 5.91088 11.6872ZM13.7414 7.81345C13.9118 6.60043 13.1355 5.19853 12.012 4.64716C10.2847 3.79882 7.84341 4.34909 6.66642 5.86454C6.2286 6.42901 5.93599 7.0579 5.92616 7.81345H13.7414Z"
            fill="white"
          />
          <path
            d="M41.2904 9.96945C41.2904 15.7638 37.0661 19.9804 31.2598 19.9815C25.4601 19.9826 21.2063 15.7081 21.2227 9.89302C21.238 4.09872 25.4109 -0.00652785 31.2817 2.30877e-05C37.433 0.00657402 41.4826 4.55183 41.2904 9.96945ZM31.3646 6.31185C31.2838 6.25726 31.2227 6.22232 31.1692 6.17755C30.2554 5.40782 29.2214 5.20256 28.1154 5.63819C26.969 6.08912 26.3248 6.98441 26.1883 8.20179C26.0398 9.5229 26.4318 10.7206 27.1819 11.7983C28.1678 13.2122 29.5347 14.1511 31.0917 14.8335C31.2478 14.9023 31.4902 14.8881 31.6507 14.8171C32.9128 14.2658 34.0429 13.5179 34.9731 12.4894C35.9044 11.4576 36.4536 10.2621 36.5421 8.86234C36.6414 7.28466 35.697 5.88167 34.2329 5.51919C33.1465 5.2506 32.189 5.55303 31.3657 6.31294L31.3646 6.31185Z"
            fill="white"
          />
        </svg>
        <Typography
          variant="large"
          font="bold"
          className="font-grand mb-6 text-5xl font-extrabold text-white"
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
            className="mb-0 py-[8px] font-new-hero  font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            About
          </a>
          <a
            href="https://www.eo.care/kit/terms-of-use"
            className="mb-0 py-[8px] font-new-hero  font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Terms of Use
          </a>
          <a
            href="https://www.eo.care/privacy-policy"
            className="mb-0 py-[8px] font-new-hero  font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.eo.care"
            className="mb-0 py-[8px] font-new-hero  font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
          >
            Visit eo
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
            <Typography className="mb-0 pt-[8px] leading-[22px] text-white opacity-50 md:mr-2 ">
              Call:
            </Typography>
            <a
              href="tel:877-707-0706"
              className="mb-2 pb-[8px] font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
            >
              877-707-0706
            </a>
            <Typography className="mb-0 pt-[8px]  font-normal leading-[22px] text-white opacity-50 md:mr-2 ">
              Email:
            </Typography>
            <a
              href="mailto:employers@eo.care"
              className="mb-2 pb-[8px] font-new-hero font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mr-2"
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
              className="mb-0 py-[8px] font-new-hero  font-normal leading-[22px] text-white hover:underline hover:opacity-50 md:mb-2 md:mr-2"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </footer>
  );
}
