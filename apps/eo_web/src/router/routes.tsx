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
  prePlanV2: `${BASE}/preplan`,

  userRolSelector: "/start",
  introQuestions: "/profiling-intro-questions",
  profilingThankYou: "/profiling-thank-you",
  accountSetup: "/account-setup",
  roiCalculator: "/roi-calculator",
  roiCalculatorThankYou: "/roi-calculator-thank-you",
  startPlan: "/start-plan",

  // Cancer PATH
  cancerForm: "/cancer/profiling",
  cancerSurvey: "/cancer/survey",
  cancerSurveyThankYou: "/cancer/survey-thank-you",

  // Senior PATH -- Old ones, can be deleted in the future once everything points to older-adult
  seniorForm: "/senior/profiling",
  seniorSurvey: "/senior/survey",
  seniorSurveyThankYou: "/senior/survey-thank-you",

  // New Senior PATH
  olderAdultForm: "/older-adult/profiling",
  olderAdultSurvey: "/older-adult/survey",
  olderAdultSurveyThankYou: "/older-adult/survey-thank-you",

  checkout: "/checkout",
} as const;
