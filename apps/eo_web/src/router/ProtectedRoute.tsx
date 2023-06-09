import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useProfileStore } from "~/stores/useProfileStore";

import { ROUTES } from "./routes";

type ProfileState =
  | "loggedOut"
  | "withZipCode"
  | "withoutZipCode"
  | "withProfilingOne";

const HOME = {
  withoutZipCode: ROUTES.zipCodeValidation,
  withZipCode: ROUTES.home,
  loggedOut: ROUTES.login,
  withProfilingOne: ROUTES.profilingOne,
} as const;

export const ProtectedRoute = ({
  children,
  expected,
}: {
  children?: ReactNode;
  expected: ProfileState | ProfileState[];
}) => {
  const userState = useProfileStore((state) =>
    state.profile
      ? state.profile.zip
        ? "withZipCode"
        : "withoutZipCode"
      : "loggedOut",
  );

  if (!expected.includes(userState)) {
    return <Navigate to={HOME[userState]} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
