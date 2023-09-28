import { api } from "~/api/axios";
import { API_ELIXIR } from "~/configs/env";





export interface ResendEmailVerificationResponse {
  success: boolean;
}

export const resendEmailVerification = async (email: string) => {
  return await api.post<ResendEmailVerificationResponse>(
    `${API_ELIXIR}/v2/profile/resend_confirmation_email`,
    { email },
  );
};
