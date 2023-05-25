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
    <header className="border-1 relative flex min-h-[93px] w-full flex-row items-center justify-between border bg-white px-2 shadow-lg md:px-12">
      <img
        src="https://assets-global.website-files.com/641990da28209a736d8d7c6a/641990da28209a61b68d7cc2_eo-logo%201.svg"
        alt="Leters EO"
        className="h-11 w-20"
      />
      <div className="right-12 flex flex-row items-center gap-2">
        {isMobile ? (
          <>
            <img
              src="https://assets-global.website-files.com/6087423fbc61c1bded1c5d8e/63da9be7c173debd1e84e3c4_image%206.png"
              onClick={() => {
                window.open("https://www.eo.care/web/privacy-policy", "_blank");
              }}
            ></img>
            <icons.QuestionMarkCircleIcon
              onClick={() => setOpenModal(true)}
              className="h-6 w-6 rounded-full bg-primary-900"
            />
          </>
        ) : (
          <>
            <Button
              variant="tertiary-link"
              onClick={() => {
                window.open("https://www.eo.care/web/privacy-policy", "_blank");
              }}
            >
              Privacy Policy
            </Button>
            <Button
              left={<icons.QuestionMarkCircleIcon />}
              onClick={() => setOpenModal(true)}
            >
              Need Helps
            </Button>
          </>
        )}

        {profile && (
          <Button variant="outline" onClick={() => logout()} className="">
            Log out
          </Button>
        )}
      </div>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Modal isOpen={openModal} onClose={() => {}} controller={setOpenModal}>
        <div className="flex h-full w-full flex-col justify-center bg-white px-10 py-4 leading-[48px] md:px-12">
          <Typography
            variant="large"
            className="mb-0 font-nobel text-5xl md:mb-6"
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            We're here.
          </Typography>
          <Typography
            font="light"
            className="mb-6 whitespace-normal text-3xl lg:whitespace-nowrap"
          >
            Have questions or prefer to complete these questions and set-up your
            account with an eo rep?
          </Typography>
          <ul className="list-disc pl-4">
            <li>
              <Typography
                variant="base"
                className="mb-5 text-2xl font-light tracking-wide"
              >
                <a
                  href="https://eo-care-telemed.as.me/schedule.php"
                  className="underline decoration-1 underline-offset-8"
                >
                  <strong>Schedule a video chat</strong>
                </a>{" "}
                with a member of our team.
              </Typography>
            </li>
            <li>
              <Typography
                variant="base"
                className="mb-5 text-2xl font-light tracking-wide"
              >
                Call{" "}
                <a href="tel:877-707-0706">
                  <strong className="underline decoration-1 underline-offset-8">
                    877-707-0706
                  </strong>
                </a>
              </Typography>
            </li>
            <li>
              <Typography
                variant="base"
                className="mb-5 text-2xl font-light tracking-wide"
              >
                Email{" "}
                <a
                  href="mailto:members@eo.care"
                  className="underline decoration-1 underline-offset-8"
                >
                  <strong>members@eo.care</strong>
                </a>
              </Typography>
            </li>
          </ul>
        </div>
      </Modal>
    </header>
  );
};
