import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/router/routes";
import { Home } from "~/screens/Home";
import { Login } from "~/screens/Login";
import { Register } from "~/screens/Register";
import { RegisterComplete } from "~/screens/RegisterComplete";

import { ProtectedRoute } from "./ProtectedRoute";
import { Profiling1 } from "~/screens/profiling/Profiling1";

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
        <Route element={<Profiling1 />} path={ROUTES.profiling1} />
      </Route>
    </Routes>
  );
};
