import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Loading, Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { makeRequest } from "~/helpers/Cancer";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { type CancerFormInterface } from "~/types/Cancer";





export const CancerThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const [jotformReturnedInformation, setJotformReturnedInformation] =
    useState(false);

  const maxRetries = 10;
  const [countFetching, setCountFetching] = useState(0);
  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { getSubmissionByIdV2, postCancerFormSubmission } = useElixirApi();
  const { data } = useQuery({
    queryFn: () => getSubmissionByIdV2(submission_id),
    queryKey: ["cancerLastSubmission", submission_id],
    enabled: !!submission_id,
    onSuccess: ({ data: resp }) => {
      if (resp.dob && resp.name && resp.email) {
        setJotformReturnedInformation(true);
      }
      setCountFetching((state) => state + 1);
    },
    refetchInterval:
      jotformReturnedInformation || countFetching >= maxRetries ? false : 1500,
  });

  const { mutate } = useMutation({
    mutationFn: (data: CancerFormInterface) =>
      postCancerFormSubmission(makeRequest(data)),
    onError: (result) => {
      if (axios.isAxiosError(result)) {
        if (result.response?.status !== 200) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (data?.data) {
      mutate(data.data as never);
    }
  }, [data?.data, mutate]);

  return (
    <LayoutDefault>
      {jotformReturnedInformation ? (
        <div className="flex flex-col items-center justify-center px-[20%]">
          <Typography
            variant="large"
            className="font-nunito font-bold"
            style={{
              fontFamily: "nunito",
              lineHeight: "55px",
              fontSize: "45px",
            }}
          >
            All done!
          </Typography>
          <br />
          <Typography
            variant="base"
            font="regular"
            className="text-center font-nunito"
            style={{
              fontWeight: "300px",
              fontFamily: "nunito",
              lineHeight: "40px",
              fontSize: "28px",
            }}
          >
            You’ll receive your initial, personalized, clinician-approved care
            care plan via email within 24 hours. <br />
            <br />
            If you’ve opted to receive a medical card through eo and/or take
            home delivery of your products, we’ll communicate your next steps in
            separate email(s) you’ll receive shortly. <br />
            <br />
            Have questions? We’re here. Email members@eo.care, call
            877.707.0706, or schedule a free consultation.
          </Typography>
        </div>
      ) : (
        <>
          {countFetching < maxRetries ? (
            <div className="relative h-[250px]">
              <Loading />
            </div>
          ) : (
            <div>
              <Typography className="my-4 text-justify">
                We apologize for the inconvenience, but we are currently
                experiencing difficulties establishing a connection. This may be
                due to temporary network issues or ongoing maintenance. Please
                try again later. If the problem persists, kindly check your
                internet connection or contact our support team for assistance.
                Thank you for your patience, and we apologize for any
                inconvenience caused.
                <br />
                <br />
                You can reach our customer support team by calling the following
                phone number: 877-707-0706. Our representatives will be
                delighted to assist you and address any inquiries you may have.
                Alternatively, you can also send us an email at members@eo.care.
                Our support team regularly checks this email and will respond to
                you as soon as possible.
              </Typography>
            </div>
          )}
        </>
      )}
    </LayoutDefault>
  );
};
