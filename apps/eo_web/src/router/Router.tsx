import { Route, Routes } from "react-router-dom";

import { ROUTES } from "~/router/routes";
import { Login } from "~/screens/Login";

import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute expected="loggedOut" />}>
        {/* PUBLIC ONLY ROUTES */}
        <Route element={<Login />} path={ROUTES.login} />
      </Route>

      <Route element={<ProtectedRoute expected="loggedIn" />}>
        {/* PRIVATE ONLY ROUTES */}
      </Route>
    </Routes>
  );
};
