import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { ZUKO_SLUG_ID } from "~/configs/env";
import { useZukoAnalytic } from "~/hooks/useZukoAnalytic";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { useProfileStore } from "~/stores/useProfileStore";





const zipCodeValidationSchema = z.object({
  zip_code: z
    .string()
    .min(5, { message: "Zip code is invalid" })
    .max(5, { message: "Zip code is invalid" }),
});
export type ZipCodeValidationSchema = z.infer<typeof zipCodeValidationSchema>;

export const ZipCodeValidation = () => {
  const { validateZipCode } = useElixirApi();
  const { triggerViewEvent } = useZukoAnalytic(ZUKO_SLUG_ID);
  useEffect(triggerViewEvent, [triggerViewEvent]);

  const navigate = useNavigate();
  const setProfileZip = useProfileStore((state) => state.setProfileZip);
  const {
    formState: { errors },
    register: registerForm,
    handleSubmit,
    setError,
    getValues,
  } = useForm<ZipCodeValidationSchema>({
    resolver: zodResolver(zipCodeValidationSchema),
  });

  const { mutate } = useMutation({
    mutationFn: validateZipCode,
    onSuccess: () => {
      setProfileZip(getValues("zip_code"));
      navigate(ROUTES.eligibleProfile);
    },
    onError: (result) => {
      if (axios.isAxiosError(result)) {
        if (result.response?.status === 400) {
          setProfileZip(getValues("zip_code"));
          navigate(ROUTES.unavailableZipCode, {
            state: {
              zip: getValues("zip_code"),
            },
          });
        } else if (result.response?.status === 422) {
          setError("zip_code", {
            message: "Zip code is invalid",
          });
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-col items-center justify-center px-2">
        <Typography variant="large" font="bold" className="text-center">
          First, let’s check our availability in your area.
        </Typography>
        <form
          className="mt-10 flex flex-col items-center justify-center"
          onSubmit={(e) => {
            void handleSubmit((data) => {
              mutate(data.zip_code);
            })(e);
          }}
        >
          <Input
            id={"zip_code"}
            label="Zip Code"
            type="number"
            className="h-12 shadow-md"
            {...registerForm("zip_code")}
            error={errors.zip_code?.message}
          />
          <Button type="submit" className="mt-10">
            Submit
          </Button>
        </form>
      </div>
    </LayoutDefault>
  );
};
