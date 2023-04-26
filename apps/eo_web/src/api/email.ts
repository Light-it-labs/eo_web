import { api } from "~/api/axios";
import { API_URL } from "~/api/common";

export interface ResendEmailVerificationResponse {
  success: boolean;
}
export const resendEmailVerification = async (email: string) => {
  return await api.post<ResendEmailVerificationResponse>(
    `${API_URL}/v2/email/verification/resend`,
    { email },
  );
};
