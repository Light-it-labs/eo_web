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

const ZUKO_SLUG_ID =
  window.data.ZUKO_SLUG_ID_PROCESS_START || "4e9cc7ceea3e22fb";

export const ZipCodeValidation = () => {
  const { validateZipCode } = useElixirApi();

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://assets.zuko.io/js/v2/client.min.js";
    document.body.appendChild(script);

    const implementScript = document.createElement("script");
    implementScript.type = "text/javascript";
    implementScript.textContent = `Zuko.trackForm({target:document.body,slug:"${ZUKO_SLUG_ID}"}).trackEvent(Zuko.FORM_VIEW_EVENT);`;
    setTimeout(() => {
      document.body.appendChild(implementScript);
    }, 2000);

    return () => {
      document.body.removeChild(script);
      setTimeout(() => {
        document.body.removeChild(implementScript);
      }, 2000);
    };
  });

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
      <div className="flex h-full h-full flex-col items-center justify-center">
        <Typography variant="large" font="bold">
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
            className="h-12 w-[327px] shadow-md"
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
