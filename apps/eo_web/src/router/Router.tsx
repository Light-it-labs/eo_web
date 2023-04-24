// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { Login } from "~/screens/Login";

import { ProtectedRoute } from "./ProtectedRoute";

export const Router = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute expected="loggedOut" />}>
        {/* PUBLIC ONLY ROUTES */}
        <Route element={<Login />} path="/login" />
      </Route>

      <Route element={<ProtectedRoute expected="loggedIn" />}>
        {/* PRIVATE ONLY ROUTES */}
      </Route>
    </Routes>
  );
};
