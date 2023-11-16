import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Typography } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const FormThankYou = () => {
  const [searchParams] = useSearchParams();

  const submission_id = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  if (!submission_id) {
    navigate(ROUTES.cancerProfile);
  }

  const { postCancerFormSubmission } = useApi();

  const { mutate } = useMutation({
    mutationFn: postCancerFormSubmission,
    mutationKey: ["postCancerFormSubmission", submission_id],
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

  useMount(() => mutate({ submission_id }));

  return (
    <LayoutDefault>
      <div className="flex h-full flex-col items-center justify-center px-[20%]">
        <Typography
          variant="large"
          className="font-nunito text-[45px] font-bold leading-[55px]"
        >
          All done!
        </Typography>
        <br />
        <Typography
          variant="base"
          font="regular"
          className="text-center font-nunito text-[28px] font-light leading-[40px]"
        >
          You’ll receive your initial, personalized, clinician-approved care
          care plan via email within 24 hours. <br />
          <br />
          If you’ve opted to receive a medical card through eo and/or take home
          delivery of your products, we’ll communicate your next steps in
          separate email(s) you’ll receive shortly. <br />
          <br />
          Have questions? We’re here. Email members@eo.care, call{" "}
          <a href="tel:+1-877-707-0706">877-707-0706</a>, or schedule a free
          consultation.
        </Typography>
      </div>
    </LayoutDefault>
  );
};
