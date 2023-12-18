import { apiElixir } from "~/api/axios";

export interface ResendEmailVerificationResponse {
  success: boolean;
}

export const resendEmailVerification = async (email: string) => {
  return await apiElixir.post<ResendEmailVerificationResponse>(
    "/v2/profile/resend_confirmation_email",
    { email },
  );
};
