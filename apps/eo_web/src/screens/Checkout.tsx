import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useApi } from "~/api/useApi";
import { JotformFrame } from "~/components/JotformFrame";
import { Loading } from "~/components/Loading";
import { CHECKOUT_FORM_ID } from "~/configs/env";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";


export const Checkout = () => {
  const { usePayment } = useProfilingStore();
  const [searchParams] = useSearchParams();

  const { account, introQuestionSubmissionId, channel, flow, origin } =
    useProfilingStore();

  const formParams = new URLSearchParams({
    email: account.email,
    origin: origin,
  });

  const submissionId = searchParams.get("submission_id") || "";

  const navigate = useNavigate();

  const [showJotform, setShowJotform] = useState(false);

  if (!submissionId) {
    navigate(ROUTES.userRolSelector);
  }

  const { postCancerFormSubmission, postSeniorFormSubmission } = useApi();

  const { mutate } = useMutation({
    mutationFn:
      channel === "cancer"
        ? postCancerFormSubmission
        : postSeniorFormSubmission,
    mutationKey: ["postCancerSeniorFormSubmission", submissionId],
    onSuccess: () => {
      setShowJotform(true);
    },
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

  useMount(() =>
    mutate({
      name: account.firstName,
      last_name: account.lastName,
      email: account.email,
      password: account.password,
      phone_number: account.phoneNumber,
      profiling_submission_id: submissionId,
      intro_submission_id: introQuestionSubmissionId,
      agree_receive_notifications: account.agreeReceiveNotifications,
      agree_terms_and_conditions: account.agreeTermsAndConditions,
      channel,
      flow,
    }),
  );

  if (!usePayment) return <Navigate to={ROUTES.profilingThankYou} replace />;

  return (
    <LayoutDefault>
      {!showJotform ? (
        <Loading />
      ) : (
        <JotformFrame formId={CHECKOUT_FORM_ID} searchParam={formParams} />
      )}
    </LayoutDefault>
  );
};
