import { apiElixir, apiLaravel } from "~/api/axios";

export interface ResendEmailVerificationResponse {
  success: boolean;
}

export const resendEmailVerification = async (email: string) => {
  return await apiElixir.post<ResendEmailVerificationResponse>(
    "/v2/profile/resend_confirmation_email",
    { email },
  );
};

export interface SubscribeToEoEmailPostResponse {
  success: boolean;
}

export const subscribeToEoEmailPost = async (email: string) => {
  return await apiLaravel.post<SubscribeToEoEmailPostResponse>(
    "/api/slack-notification/eo-subscription",
    { email },
  );
};
