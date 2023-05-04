import { api } from "~/api/axios";
import { API_URL } from "~/api/common";
import { useProfileStore, type Profile } from "~/stores/useProfileStore";

export interface ZipCodeValidationResponseError {
  errors: {
    zip?: Array<{
      code: string;
      message: string;
    }>;
    default?: Array<{
      code: string;
      message: string;
    }>;
  };
}
export const useElixirApi = () => {
  const token = useProfileStore((state) => state.session?.token);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const validateZipCode = async (zipCode: string) => {
    return api.post<Profile | ZipCodeValidationResponseError>(
      `${API_URL}/v2/profile/validate_zip_code`,
      {
        zip: zipCode,
      },
      authHeader,
    );
  };

  const combineProfileOne = async (submissionId: string) => {
    return api.post(
      `${API_URL}/v2/profile/combine_profile_one`,
      {
        submission_id: submissionId,
      },
      authHeader,
    );
  };

  const combineProfileTwo = async (submissionId: string) => {
    return api.post(
      `${API_URL}/v2/profile/combine_profile_two`,
      {
        submission_id: submissionId,
      },
      authHeader,
    );
  };

  const sendEmailToRecoveryPassword = async (email: string) => {
    return api.post(`${API_URL}/v2/profile/request_password_reset`, {
      email,
    });
  };

  const resetPassword = async (data: { password: string; token: string }) => {
    return api.post(`${API_URL}/v2/profile/reset_password`, data);
  };

  return {
    validateZipCode,
    combineProfileOne,
    combineProfileTwo,
    sendEmailToRecoveryPassword,
    resetPassword,
  };
};
