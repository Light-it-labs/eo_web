import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useProfileStore } from "~/stores/useProfileStore";

import { ROUTES } from "./routes";

type ProfileState = "loggedIn" | "loggedOut";

const HOME = {
  loggedIn: ROUTES.home,
  loggedOut: ROUTES.login,
} as const;

export const ProtectedRoute = ({
  children,
  expected,
}: {
  children?: ReactNode;
  expected: ProfileState | ProfileState[];
}) => {
  const userState = useProfileStore((state) =>
    state.profile ? "loggedIn" : "loggedOut",
  );

  if (!expected.includes(userState)) {
    return <Navigate to={HOME[userState]} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
