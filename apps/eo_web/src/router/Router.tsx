import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/router/routes";
import { Home } from "~/screens/Home";
import { Login } from "~/screens/Login";
import { Register } from "~/screens/Register";
import { RegisterComplete } from "~/screens/RegisterComplete";
import { useProfileStore } from "~/stores/useProfileStore";

import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  const setProfile = useProfileStore((state) => {
    return state.setProfile;
  });
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
      </Route>
    </Routes>
  );
};
