import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography, icons } from "@eo/ui";

import { useElixirApi } from "~/api/useElixirApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";

const recoveryPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "The password must has 8 characters." })
    .regex(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
      "The password must have at least one uppercase letter, one lowercase letter, one number",
    ),
  password_confirmation: z
    .string()
    .min(8, { message: "This field is required." }),
  token: z.string().min(1, "Token is required"),
});
export type TypeRecoveryPasswordSchema = z.infer<typeof recoveryPasswordSchema>;

export const RecoveryPassword = () => {
  const { resetPassword } = useElixirApi();

  const [showPassword, setShowPassword] = useState(false);
  const {
    formState: { errors },
    register: registerForm,
    handleSubmit,
    setValue,
  } = useForm<TypeRecoveryPasswordSchema>({
    resolver: zodResolver(recoveryPasswordSchema),
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success(
        "Your password has been reset. Sign in with your new password.",
      );
      navigate(ROUTES.login);
    },
    onError: (result) => {
      if (axios.isAxiosError(result)) {
        if (result.response?.status !== 200) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  useEffect(() => {
    if (searchParams.has("token")) {
      setValue("token", searchParams.get("token") || "");
    } else {
      navigate(ROUTES.login);
    }
  }, [navigate, searchParams, setValue]);

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-row items-center justify-center gap-20 px-2">
        <div>
          <Typography variant="large" font="bold">
            Reset your password
          </Typography>

          <form
            className="mt-10 flex flex-col "
            onSubmit={(e) => {
              void handleSubmit((data) => {
                mutate(data);
              })(e);
            }}
          >
            <Input
              id={"password"}
              containerClassName="max-w-[327px]"
              label="Password"
              right={
                showPassword ? (
                  <icons.EyeIcon
                    className="m-auto h-5 w-5 cursor-pointer text-primary-white-600"
                    onClick={() => setShowPassword((current) => !current)}
                  />
                ) : (
                  <icons.EyeSlashIcon
                    className="m-auto h-5 w-5 cursor-pointer text-primary-white-600"
                    onClick={() => setShowPassword((current) => !current)}
                  />
                )
              }
              className="h-12 shadow-md"
              type={showPassword ? "text" : "password"}
              {...registerForm("password")}
              error={errors.password?.message}
            />
            <Input
              id={"password_confirmation"}
              label="Password confirmation"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              type="password"
              {...registerForm("password_confirmation")}
              error={errors.password_confirmation?.message}
            />
            <Typography
              variant="small"
              font="regular"
              className="text-gray-500"
            >
              Must be at least 8 characters long and contain <br /> a capital
              letter, number, and special character
            </Typography>

            <Button type="submit" className="mt-10 w-fit">
              Save and Sign in
            </Button>
          </form>
        </div>

        <div className="hidden md:block">
          <img
            className="w-[500px]"
            src="https://uploads-ssl.webflow.com/641990da28209a736d8d7c6a/641990da28209a9b288d7e7d_WhatsApp%20Image%202022-11-08%20at%207.46.28%20PM%20(1).jpeg"
            alt="Images showing app of Eo Care"
          />
        </div>
      </div>
    </LayoutDefault>
  );
};
