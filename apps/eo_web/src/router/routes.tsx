
const BASE = "/app";
export const ROUTES = {
  login: `${BASE}/login`,
  register: `${BASE}/register`,
  registrationComplete: `${BASE}/register-complete`,
  home: `${BASE}/home`,
  zipCodeValidation: `${BASE}/profile-zip-code-validation`,
  emailVerification: `${BASE}/profile-email-verification`,
  unavailableZipCode: `${BASE}/profile-unavailable-zip-code`,
  eligibleProfile: `${BASE}/profile-eligible`,
  profilingOne: `${BASE}/profiling-one`,
  profilingOneRedirect: `${BASE}/profiling-one-redirect`,
  profilingTwo: `${BASE}/profiling-two`,
  profilingTwoRedirect: `${BASE}/profiling-two-redirect`,
  forgotPassword: `${BASE}/forgot-password`,
  recoveryPassword: `${BASE}/reset-password`,
  prePlan: `${BASE}/pre-plan`,
  payment: `${BASE}/payment`,
} as const;
