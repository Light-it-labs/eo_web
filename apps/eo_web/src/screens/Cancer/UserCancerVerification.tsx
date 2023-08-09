import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Loading, Modal, Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const UserCancerVerification = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { eligibleEmail } = useElixirApi();

  const email = searchParams.get("email") || "";
  const submissionId = searchParams.get("submission_id") || "";
  if (!email || !submissionId) {
    navigate(ROUTES.cancerProfile);
  }

  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const { data: response, isLoading } = useQuery({
    queryFn: () => eligibleEmail(email),
    queryKey: ["eligibleEmail", email],
    enabled: !!email,
    onSuccess: ({ data }) => {
      if (data.success) {
        navigate(ROUTES.cancerForm, {
          state: {
            submission_id: searchParams.get("submission_id"),
          },
        });
      } else {
        setOpenModal(true);
      }
    },
    onError: () => {
      setOpenModal(true);
    },
  });

  useEffect(() => {
    if (closeModal) {
      navigate(ROUTES.cancerProfile);
    }
  }, [closeModal, navigate]);

  return (
    <LayoutDefault>
      {!isLoading && !response?.data.success && !openModal ? (
        <>
          <div className="flex flex-col items-center justify-center">
            <Typography
              variant="large"
              font="bold"
              className="mt-12 text-4xl font-bold"
            >
              We apologize for the inconvenience,
            </Typography>
            <Typography
              className="mx-0 my-4 px-10 text-center text-justify font-nobel"
              variant="large"
            >
              <br />
              <br />
              You can reach our customer support team by calling the following
              phone number: 877-707-0706. Our representatives will be delighted
              to assist you and address any inquiries you may have.
              Alternatively, you can also send us an email at members@eo.care.
              Our support team regularly checks this email and will respond to
              you as soon as possible.
            </Typography>
          </div>
        </>
      ) : (
        <>
          <div className="relative h-[250px]">
            <Loading />
          </div>
          <Modal
            isOpen={openModal}
            controller={setOpenModal}
            onPressX={() => setCloseModal(true)}
          >
            <div className="flex h-full w-full flex-col justify-center bg-white px-10 py-4 leading-[48px] md:px-12">
              <Typography
                variant="large"
                className="mb-0 font-nobel text-3xl md:mb-6 lg:text-5xl"
              >
                Oops! It looks like you already have an account.
              </Typography>
              <Typography
                font="light"
                className="mb-6 mt-4 whitespace-normal text-lg lg:text-2xl "
              >
                Please reach out to the eo team in order to change your care
                plan.
              </Typography>
              <ul className="list-disc pl-4">
                <li>
                  <Typography
                    variant="base"
                    className="mb-5 text-lg font-light tracking-wide lg:text-2xl"
                  >
                    <a
                      href="https://calendly.com/help-eo/30min"
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
                    className="mb-5 text-lg font-light tracking-wide lg:text-2xl"
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
                    className="mb-5 text-lg font-light tracking-wide lg:text-2xl"
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
        </>
      )}
    </LayoutDefault>
  );
};
