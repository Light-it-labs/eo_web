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
    MedCard: "No, thanks. I'll continue without the card.";
    areThere: ["Type option 1"];
    attentive: null;
    calm: null;
    cannbis_care_recommend: null;
    cheerful: null;
    email: "";
    energetic: null;
    eo_care_recommend: null;
    isuser: "Yes";
    malady: "Pain";
    med_card_expiration: "";
    med_card_number: "";
    name: {
      first: "Carlos";
      last: "Garcia";
    };
    pageBreak: "";
    pain_worse_times: ["Morning"];
    product_successful_list: "<h5>dsadsad</h5>";
    satisfaction_rating: null;
    sleep_quality: null;
    submit: "";
    symptoms_negatively_impacting: {
      Impact: "A Little Bit";
    };
    symptoms_quality: null;
    thc_type_preferences: "I'm open to using products with THC.";
    typeA: "";
    typeA88: "";
    typeA93: "";
    union: "";
    usingCannabisProducts: "Yes";
    whatBrings: ["I want to manage pain"];
    workday_allow_intoxication_nonworkday_allow_intoxi: ["Workday Afternoons"];
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
    return await api.get<ProfileOne>(`${API_URL}/v2/profile/profiling_one`);
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
