import { useMutation } from "@tanstack/react-query";

import { useApi } from "~/api/useApi";

export const usePreProfile = () => {
  const { createPreProfile } = useApi();

  const preProfileMutation = useMutation({
    mutationFn: createPreProfile,
    mutationKey: ["createPreProfile"],
  });

  return {
    preProfileMutation,
  };
};
