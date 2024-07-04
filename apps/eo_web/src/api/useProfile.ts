import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { useApi } from "~/api/useApi";

const useProfilesKeys = {
  eligibleEmailQuery: (email: string) => ["eligibleEmail", email],
};

export const useProfile = () => {
  const { eligibleEmail } = useApi();
  const useEligibleEmailQuery = (
    email: string,
    extraConfig: Partial<UseQueryOptions>,
  ) =>
    useQuery({
      queryKey: useProfilesKeys.eligibleEmailQuery(email),
      queryFn: () => eligibleEmail(email),
      ...extraConfig,
    });

  return {
    useEligibleEmailQuery,
  };
};
