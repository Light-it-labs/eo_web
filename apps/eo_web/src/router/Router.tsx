import React from "react";
import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/router/routes";
import { AccountCreation } from "~/screens/AccountCreation";
import { AthleteSurveyForm } from "~/screens/Athlete/AthleteSurveyForm";
import { AthleteSurveyThankYou } from "~/screens/Athlete/AthleteSurveyThankYou";
import { CancerSurveyThankYou } from "~/screens/Cancer/CancerSurveyThankYou";
import { Profiling } from "~/screens/Cancer/Profiling";
import { SurveyForm } from "~/screens/Cancer/SurveyForm";
import { Checkout } from "~/screens/Checkout";
import { EligibleProfile } from "~/screens/EligibleProfile";
import { EmailVerificationUncompletedButLogged } from "~/screens/EmailVerificationUncompletedButLogged";
import { ForgotPassword } from "~/screens/ForgotPassword";
import { Home } from "~/screens/Home";
import { Login } from "~/screens/Login";
import { PrePlan } from "~/screens/PrePlan";
import { PrePlanV2 } from "~/screens/PrePlanV2";
import { ProfilingOne } from "~/screens/profiling/ProfilingOne";
import { ProfilingOneRedirect } from "~/screens/profiling/ProfilingOneRedirect";
import { ProfilingTwo } from "~/screens/profiling/ProfilingTwo";
import { ProfilingTwoRedirect } from "~/screens/profiling/ProfilingTwoRedirect";
import { ProfilingIntroQuestions } from "~/screens/ProfilingIntroQuestions";
import { ProfilingThankYou } from "~/screens/ProfilingThankYou";
import { RecoveryPassword } from "~/screens/RecoveryPassword";
import { Register } from "~/screens/Register";
import { RegisterComplete } from "~/screens/RegisterComplete";
import { ROICalculator } from "~/screens/ROICalculator";
import { RoiCalculatorThankYou } from "~/screens/RoiCalculatorThankYou";
import { Profiling as SeniorProfiling } from "~/screens/Senior/Profiling";
import { SeniorSurveyForm } from "~/screens/Senior/SeniorSurveyForm";
import { SeniorSurveyThankYou } from "~/screens/Senior/SeniorSurveyThankYou";
import { StartPlan } from "~/screens/StartPlan";
import { UnavailableZipCode } from "~/screens/UnavailableZipCode";
import { UserRolSelector } from "~/screens/UserRolSelector";
import { ZipCodeValidation } from "~/screens/ZipCodeValidation";
import { ProtectedRoute } from "./ProtectedRoute";


export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute expected="loggedOut" />}>
        {/* PUBLIC ONLY ROUTES */}
        <Route element={<Login />} path={ROUTES.login} />
        <Route element={<Register />} path={ROUTES.register} />
        <Route
          element={<RegisterComplete />}
          path={ROUTES.registrationComplete}
        />
        <Route element={<ForgotPassword />} path={ROUTES.forgotPassword} />
        <Route element={<RecoveryPassword />} path={ROUTES.recoveryPassword} />

        <Route element={<PrePlanV2 />} path={ROUTES.prePlanV2} />
      </Route>

      <Route element={<ProtectedRoute expected="withZipCode" />}>
        {/* PRIVATE ROUTES ONLY WHEN IS LOGGED IN AND HAVE ZIPCODE */}
        <Route element={<Home />} path={ROUTES.home} />
        <Route
          element={<UnavailableZipCode />}
          path={ROUTES.unavailableZipCode}
        />
        <Route element={<EligibleProfile />} path={ROUTES.eligibleProfile} />
        <Route element={<ProfilingOne />} path={ROUTES.profilingOne} />
        <Route
          element={<ProfilingOneRedirect />}
          path={ROUTES.profilingOneRedirect}
        />
        <Route element={<ProfilingTwo />} path={ROUTES.profilingTwo} />
        <Route
          element={<ProfilingTwoRedirect />}
          path={ROUTES.profilingTwoRedirect}
        />
        <Route element={<PrePlan />} path={ROUTES.prePlan} />
      </Route>

      <Route
        element={
          <ProtectedRoute expected={["withoutZipCode", "withZipCode"]} />
        }
      >
        {/* PRIVATE ROUTES ONLY WHEN IS LOGGED IN AND HAVE AND HAVEN'T ZIPCODE */}
        <Route
          element={<ZipCodeValidation />}
          path={ROUTES.zipCodeValidation}
        />
      </Route>
      <Route
        element={<EmailVerificationUncompletedButLogged />}
        path={ROUTES.emailVerification}
      />

      <Route element={<UserRolSelector />} path={ROUTES.userRolSelector} />
      <Route element={<ROICalculator />} path={ROUTES.roiCalculator} />
      <Route
        element={<RoiCalculatorThankYou />}
        path={ROUTES.roiCalculatorThankYou}
      />
      <Route element={<StartPlan />} path={ROUTES.startPlan} />
      <Route
        element={<ProfilingIntroQuestions />}
        path={ROUTES.introQuestions}
      />
      <Route element={<AccountCreation />} path={ROUTES.accountSetup} />
      <Route element={<ProfilingThankYou />} path={ROUTES.profilingThankYou} />

      {/* CANCER */}
      <Route element={<Profiling />} path={ROUTES.cancerForm} />
      <Route element={<SurveyForm />} path={ROUTES.cancerSurvey} />
      <Route
        element={<CancerSurveyThankYou />}
        path={ROUTES.cancerSurveyThankYou}
      />

      {/* ATHLETES */}
      <Route element={<AthleteSurveyForm />} path={ROUTES.athleteSurvey} />
      <Route
        element={<AthleteSurveyThankYou />}
        path={ROUTES.athleteSurveyThankYou}
      />

      {/* SENIOR */}
      <Route element={<SeniorProfiling />} path={ROUTES.seniorForm} />
      <Route element={<SeniorSurveyForm />} path={ROUTES.seniorSurvey} />
      <Route
        element={<SeniorSurveyThankYou />}
        path={ROUTES.seniorSurveyThankYou}
      />

      <Route element={<Checkout />} path={ROUTES.checkout} />
    </Routes>
  );
};
