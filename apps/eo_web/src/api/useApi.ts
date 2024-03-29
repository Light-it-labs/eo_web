import {
  type AvoidPresentation,
  type Maladies,
  type OpenToUseThcProducts,
  type ReasonsEnum,
  type ThcProductPreferences,
  type WorseSymptomsMoment,
} from "~/api/PrePlanTypes";
import { apiElixir, apiLaravel } from "~/api/axios";
import { useProfileStore, type Profile } from "~/stores/useProfileStore";
import { type FlowsTypes } from "~/stores/useProfilingStore";

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

export interface ProfileOneV2 {
  areThere: AvoidPresentation[];
  malady: Maladies;
  symptoms_worse_times: WorseSymptomsMoment[];
  thc_type_preferences: ThcProductPreferences;
  usingCannabisProducts: "Yes" | "No";
  whatBrings: (typeof ReasonsEnum)[keyof typeof ReasonsEnum][];
  workday_allow_intoxication_nonworkday_allow_intoxi: OpenToUseThcProducts[];
}

export interface LaravelErrorValidation {
  status: number;
  success: false;
  error?: {
    code: string;
    fields?: {
      [k: string]: string[];
    };
  };
}

export interface LaravelSuccessBase<T> {
  status: number;
  success: true;
  data: T;
}

export interface ProfileCreationResult {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  inserted_at: string;
  updated_at: string;
  cancer_flow: boolean;
}

export interface ProfileOne {
  complete: boolean;
  step: null;
  values: {
    areThere: AvoidPresentation[];
    malady: Maladies;
    symptoms_worse_times: WorseSymptomsMoment[];
    thc_type_preferences: ThcProductPreferences;
    usingCannabisProducts: "Yes" | "No";
    whatBrings: (typeof ReasonsEnum)[keyof typeof ReasonsEnum][];
    workday_allow_intoxication_nonworkday_allow_intoxi: OpenToUseThcProducts[];
  };
}

export const useApi = () => {
  const token = useProfileStore((state) => state.session?.token);

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const validateZipCode = async (zipCode: string) =>
    apiElixir.post<Profile | ZipCodeValidationResponseError>(
      "/v2/profile/validate_zip_code",
      {
        zip: zipCode,
      },
      authHeader,
    );

  const combineProfileOne = async (submissionId: string) =>
    apiElixir.post(
      "/v2/profile/submit_profiling_one",
      {
        submission_id: submissionId,
      },
      authHeader,
    );

  const combineProfileTwo = async (submissionId: string) =>
    apiElixir.post(
      "/v2/profile/combine_profile_two",
      {
        submission_id: submissionId,
      },
      authHeader,
    );

  const sendEmailToRecoveryPassword = async (email: string) =>
    apiElixir.post("/v2/profile/request_password_reset", {
      email,
    });

  const resetPassword = async (data: { password: string; token: string }) =>
    apiElixir.post("/v2/profile/reset_password", data);

  const getSubmission = async () =>
    await apiElixir.get<ProfileOne>("/v2/profile/profiling_one", authHeader);

  const getSubmissionById = async (submissionId: string) =>
    await apiElixir.get<ProfileOneV2>(
      `/v2/submission/profiling_one?submission_id=${submissionId}`,
      authHeader,
    );

  const eligibleEmail = async (email: string) =>
    await apiElixir.post<LaravelSuccessBase<unknown> | LaravelErrorValidation>(
      "/v2/profiles/eligible",
      { email },
    );

  const surveyStatus = async (email: string, phase: string) =>
    await apiElixir.get<{ active: boolean }>(
      `/v2/survey/${email}/availability/${phase}`,
    );

  const postCancerFormSubmission = async (data: object) =>
    await apiLaravel.post<LaravelSuccessBase<ProfileCreationResult>>(
      "/api/v2/cancer/profile",
      data,
    );

  const postCancerSurveyFormSubmission = async (data: object) =>
    await apiLaravel.post<LaravelSuccessBase<unknown> | LaravelErrorValidation>(
      "/api/cancer/survey",
      data,
    );

  const postAthleteSurveyFormSubmission = async (data: object) =>
    await apiLaravel.post<
      LaravelSuccessBase<ProfileCreationResult> | LaravelErrorValidation
    >("/api/athletes/survey", data);

  const postSeniorFormSubmission = async (data: object) =>
    await apiLaravel.post<
      LaravelSuccessBase<ProfileCreationResult> | LaravelErrorValidation
    >("/api/senior/profile", data);

  const postSeniorSurveyFormSubmission = async (data: object) =>
    await apiLaravel.post<LaravelSuccessBase<never> | LaravelErrorValidation>(
      "/api/senior/survey",
      data,
    );

  const getProfilingFlow = async (email: string) =>
    await apiElixir.get<{ flow: FlowsTypes }>(`/v2/users/${email}/flow`);

  return {
    validateZipCode,
    combineProfileOne,
    combineProfileTwo,
    sendEmailToRecoveryPassword,
    resetPassword,
    getSubmission,
    getSubmissionById,
    eligibleEmail,
    postCancerFormSubmission,
    postCancerSurveyFormSubmission,
    postAthleteSurveyFormSubmission,
    postSeniorFormSubmission,
    postSeniorSurveyFormSubmission,
    surveyStatus,
    getProfilingFlow,
  };
};
