import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/router/routes";
import { EligibleProfile } from "~/screens/EligibleProfile";
import { EmailVerificationUncompletedButLogged } from "~/screens/EmailVerificationUncompletedButLogged";
import { ForgotPassword } from "~/screens/ForgotPassword";
import { Home } from "~/screens/Home";
import { Login } from "~/screens/Login";
import { PrePlan } from "~/screens/PrePlan";
import { RecoveryPassword } from "~/screens/RecoveryPassword";
import { Register } from "~/screens/Register";
import { RegisterComplete } from "~/screens/RegisterComplete";
import { UnavailableZipCode } from "~/screens/UnavailableZipCode";
import { ZipCodeValidation } from "~/screens/ZipCodeValidation";
import { ProfilingOne } from "~/screens/profiling/ProfilingOne";
import { ProfilingOneRedirect } from "~/screens/profiling/ProfilingOneRedirect";
import { ProfilingTwo } from "~/screens/profiling/ProfilingTwo";
import { ProfilingTwoRedirect } from "~/screens/profiling/ProfilingTwoRedirect";

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
    </Routes>
  );
};
