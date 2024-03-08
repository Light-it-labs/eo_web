import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Modal, Typography, icons } from "@eo/ui";

import { useIsMobile } from "~/hooks/useIsMobile";
import { ROUTES } from "~/router";
import { useProfileStore } from "~/stores/useProfileStore";


export const Header = () => {
  const profile = useProfileStore((state) => state.profile);

  const setProfile = useProfileStore((state) => state.setProfile);
  const setSession = useProfileStore((state) => state.setSession);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const logout = () => {
    setProfile(null);
    setSession(null);
    navigate(ROUTES.login);
    toast.info("You has been logged out!");
  };

  const isMobile = useIsMobile();
  return (
    <header className="border-1 relative mb-10 flex min-h-[93px] w-full flex-row items-center justify-between border bg-white px-2 shadow-lg md:px-12">
      <svg
        className="h-11 w-20"
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="20"
        viewBox="0 0 42 20"
        fill="none"
        onClick={() => {
          window.open("https://www.eo.care/web/privacy-policy", "_blank");
        }}
      >
        <path
          d="M5.91088 11.6872C6.02006 12.778 6.53759 13.5608 7.32479 14.1766C9.36977 15.775 12.3887 15.537 14.1727 13.6471C15.0036 12.766 15.1171 12.7474 16.1511 13.4069C16.9023 13.8862 17.6469 14.3753 18.3871 14.871C18.9996 15.2815 19.0597 15.6243 18.612 16.2314C17.0398 18.3604 14.866 19.4654 12.3013 19.8421C9.97137 20.1838 7.67963 20.0004 5.51892 19.0013C1.94975 17.3527 0.188639 14.4921 0.0139472 10.5976C-0.100694 8.03509 0.482339 5.67784 2.09933 3.65142C4.02749 1.23194 6.62602 0.1292 9.66238 0.0101916C12.3952 -0.096807 14.8551 0.630347 16.8051 2.64803C18.4559 4.35455 19.2169 6.46614 19.4418 8.79172C19.4975 9.37038 19.5117 9.95451 19.5161 10.5365C19.5226 11.399 19.2311 11.6861 18.374 11.6872C14.4435 11.6894 10.514 11.6872 6.58344 11.6872C6.37054 11.6872 6.15763 11.6872 5.91088 11.6872ZM13.7414 7.81345C13.9118 6.60043 13.1355 5.19853 12.012 4.64716C10.2847 3.79882 7.84341 4.34909 6.66642 5.86454C6.2286 6.42901 5.93599 7.0579 5.92616 7.81345H13.7414Z"
          fill="black"
        />
        <path
          d="M41.2904 9.96945C41.2904 15.7638 37.0661 19.9804 31.2598 19.9815C25.4601 19.9826 21.2063 15.7081 21.2227 9.89302C21.238 4.09872 25.4109 -0.00652785 31.2817 2.30877e-05C37.433 0.00657402 41.4826 4.55183 41.2904 9.96945ZM31.3646 6.31185C31.2838 6.25726 31.2227 6.22232 31.1692 6.17755C30.2554 5.40782 29.2214 5.20256 28.1154 5.63819C26.969 6.08912 26.3248 6.98441 26.1883 8.20179C26.0398 9.5229 26.4318 10.7206 27.1819 11.7983C28.1678 13.2122 29.5347 14.1511 31.0917 14.8335C31.2478 14.9023 31.4902 14.8881 31.6507 14.8171C32.9128 14.2658 34.0429 13.5179 34.9731 12.4894C35.9044 11.4576 36.4536 10.2621 36.5421 8.86234C36.6414 7.28466 35.697 5.88167 34.2329 5.51919C33.1465 5.2506 32.189 5.55303 31.3657 6.31294L31.3646 6.31185Z"
          fill="black"
        />
      </svg>
      <div className="right-12 flex flex-row items-center gap-2">
        {isMobile ? (
          <>
            <icons.PrivacyPolicyIcon
              onClick={() => {
                window.open("https://www.eo.care/web/privacy-policy", "_blank");
              }}
              className="h-8 w-8 rounded-full stroke-2"
            />
            <icons.MarkCircleIcon
              onClick={() => setOpenModal(true)}
              className="h-8 w-8 rounded-full"
            />
          </>
        ) : (
          <>
            <Button
              variant="tertiary-link"
              onClick={() => {
                window.open("https://www.eo.care/web/privacy-policy", "_blank");
              }}
              font="regular"
            >
              Privacy Policy
            </Button>
            <Button
              variant="black"
              onClick={() => setOpenModal(true)}
              font="semiBold"
            >
              Need Help?
            </Button>
          </>
        )}

        {profile && (
          <Button variant="outline" onClick={() => logout()}>
            Log out
          </Button>
        )}
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Modal isOpen={openModal} onClose={() => {}} controller={setOpenModal}>
        <div
          className="flex h-full w-full flex-col justify-center rounded-3xl bg-white px-10 py-[50px] leading-[48px]
                    shadow-lg md:px-[60px] md:py-20"
        >
          <Typography
            variant="large"
            className="mb-4 text-[32px] font-bold leading-7 md:mb-6"
          >
            We’re here.
          </Typography>
          <Typography
            font="light"
            variant="large"
            className="mb-4 whitespace-normal text-[18px] font-semibold leading-normal text-gray-800 md:mb-6 md:text-[22px]"
          >
            Have questions or prefer to talk with an EO rep?
          </Typography>
          <ul className="list-disc pl-4">
            <li>
              <Typography
                variant="base"
                className="text-sm font-normal leading-[26px] md:text-lg"
              >
                <a
                  href="https://calendly.com/help-eo/30min"
                  className="underline decoration-1 underline-offset-8"
                >
                  Schedule a video chat
                </a>{" "}
                with a member of our team.
              </Typography>
            </li>
            <li>
              <Typography
                variant="base"
                className="text-sm font-normal leading-[26px] md:text-lg"
              >
                Call{" "}
                <a
                  href="tel:888-823-6143"
                  className="underline decoration-1 underline-offset-8"
                >
                  888-823-6143
                </a>
              </Typography>
            </li>
            <li>
              <Typography
                variant="base"
                className="text-sm font-normal leading-[26px] md:text-lg"
              >
                Email{" "}
                <a
                  href="mailto:support@eo.care"
                  className="underline decoration-1 underline-offset-8"
                >
                  support@eo.care
                </a>
              </Typography>
            </li>
          </ul>
        </div>
      </Modal>
    </header>
  );
};
