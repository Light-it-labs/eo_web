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
  profilingOne: `${BASE}/profiling/one`,
  profilingOneRedirect: `${BASE}/profiling/one/redirect`,
  profilingTwo: `${BASE}/profiling/two`,
  profilingTwoRedirect: `${BASE}/profiling/two/redirect`,
} as const;
