import { api } from "~/api/axios";
import { API_URL } from "~/api/common";
import { useProfileStore } from "~/stores/useProfileStore";

export interface ZipCodeValidationResponseSuccess {
  app_flags: {
    can_delete_sessions: boolean;
    can_edit_sessions: boolean;
    can_mute_sessions: boolean;
    malady_selection: Array<{
      label: string;
      slug: string;
    }>;
  };
  birth_date: string | null;
  caregiver: boolean;
  ced: boolean;
  email: string;
  first_name: string | null;
  gender: string | null;
  last_name: string | null;
  malady: string;
  med_card: boolean;
  phone: unknown;
  status: string;
  timezone: string;
  uid: string;
  zip: string;
}

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
    return api.post<
      ZipCodeValidationResponseSuccess | ZipCodeValidationResponseError
    >(
      `${API_URL}/v2/profile/validate_zip_code`,
      {
        zip: zipCode,
      },
      authHeader,
    );
  };

  return {
    validateZipCode,
  };
};
