import {
  type AvoidPresentation,
  type OpenToUseThcProducts,
  type ReasonsEnum,
  type ThcProductPreferences,
  type WorseSymptomsMoment,
} from "~/api/PrePlanTypes";
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

export interface ProfileOne {
  complete: boolean;
  step: null;
  values: {
    areThere: AvoidPresentation[];
    malady: "Pain";
    symptoms_worse_times: WorseSymptomsMoment[];
    thc_type_preferences: ThcProductPreferences;
    usingCannabisProducts: "Yes" | "No";
    whatBrings: (typeof ReasonsEnum)[keyof typeof ReasonsEnum][];
    workday_allow_intoxication_nonworkday_allow_intoxi: OpenToUseThcProducts[];
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
      `${API_URL}/v2/profile/submit_profiling_one`,
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
  const getSubmission = async () => {
    return await api.get<ProfileOne>(
      `${API_URL}/v2/profile/profiling_one`,
      authHeader,
    );
  };

  return {
    validateZipCode,
    combineProfileOne,
    combineProfileTwo,
    sendEmailToRecoveryPassword,
    resetPassword,
    getSubmission,
  };
};
