import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/router/routes";
import { EligibleProfile } from "~/screens/EligibleProfile";
import { EmailVerificationLogged } from "~/screens/EmailVerificationLogged";
import { Home } from "~/screens/Home";
import { Login } from "~/screens/Login";
import { Register } from "~/screens/Register";
import { RegisterComplete } from "~/screens/RegisterComplete";
import { UnavailableZipCode } from "~/screens/UnavailableZipCode";
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
      </Route>

      <Route element={<ProtectedRoute expected="loggedIn" />}>
        <Route element={<Home />} path={ROUTES.home} />
        <Route
          element={<ZipCodeValidation />}
          path={ROUTES.zipCodeValidation}
        />
        <Route
          element={<UnavailableZipCode />}
          path={ROUTES.unavailableZipCode}
        />
      </Route>
      <Route
        element={<UnavailableZipCode />}
        path={ROUTES.unavailableZipCode}
      />
      <Route element={<EligibleProfile />} path={ROUTES.eligibleProfile} />
      <Route
        element={<EmailVerificationLogged />}
        path={ROUTES.emailVerification}
      />
    </Routes>
  );
};
