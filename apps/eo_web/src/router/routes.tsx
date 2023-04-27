const BASE = "/app";
export const ROUTES = {
  login: `${BASE}/login`,
  register: `${BASE}/register`,
  registrationComplete: `${BASE}/register/complete`,
  home: `${BASE}/home`,
  zipCodeValidation: `${BASE}/profile/zip-code-validation`,
  emailVerification: `${BASE}profile/email-verification`,
  unavailableZipCode: `${BASE}/profile/unavailable-zip-code`,
  eligibleProfile: `${BASE}/profile/eligible-profile`,
  profiling1: `${BASE}profiling1`,
} as const;
