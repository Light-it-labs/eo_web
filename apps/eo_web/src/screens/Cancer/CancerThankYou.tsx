import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const CancerThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { postCancerFormSubmission } = useElixirApi();

  const { mutate } = useMutation({
    mutationFn: () => postCancerFormSubmission({ submission_id }),
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
    mutate();
  }, []);

  return (
    <LayoutDefault>
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
          If you’ve opted to receive a medical card through eo and/or take home
          delivery of your products, we’ll communicate your next steps in
          separate email(s) you’ll receive shortly. <br />
          <br />
          Have questions? We’re here. Email members@eo.care, call 877.707.0706,
          or schedule a free consultation.
        </Typography>
      </div>
    </LayoutDefault>
  );
};
