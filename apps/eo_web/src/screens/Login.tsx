import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography, icons } from "@eo/ui";

import { login } from "~/api/auth";
import { LayoutDefault } from "~/layouts/LayoutDefault";
import { ROUTES } from "~/router";
import { useProfileStore } from "~/stores/useProfileStore";

const newClientSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "The email received it is not a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormSchema = z.infer<typeof newClientSchema>;

export interface LoginErrorInterface {
  errors: {
    email: Array<{ code: string; message: string }>;
    password: Array<{ code: string; message: string }>;
  };
}

export const Login = () => {
  const setProfile = useProfileStore((state) => state.setProfile);
  const setSession = useProfileStore((state) => state.setSession);
  const [accountConfirmed, setAccountConfirmed] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("email") && searchParams.has("account_confirmed")) {
      setAccountConfirmed((confirmed) => {
        if (!confirmed) {
          toast.success("Your account has been activated.");
        }
        return true;
      });
    }
  }, [accountConfirmed, searchParams]);

  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
  } = useForm<LoginFormSchema>({ resolver: zodResolver(newClientSchema) });

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      setProfile(data.profile);
      setSession(data.session);
    },
    onError: (result) => {
      if (axios.isAxiosError(result)) {
        if (result.response?.status === 403) {
          navigate(ROUTES.emailVerification, {
            state: {
              email: getValues("email"),
            },
          });
        } else {
          setLoginError("Your email or password is incorrect");
        }
      } else {
        setLoginError("Something went wrong");
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LayoutDefault>
      <div className="flex h-full w-full flex-row items-center justify-center gap-20 px-2">
        <div>
          <Typography variant="large" font="bold">
            Welcome back.
          </Typography>
          <form
            className="mt-10"
            onSubmit={(e) => {
              void handleSubmit((data) => {
                mutate(data);
              })(e);
            }}
          >
            <Input
              id={"email"}
              label="Email"
              type="email"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              id={"password"}
              label="Password"
              right={
                showPassword ? (
                  <icons.EyeIcon
                    className="h-5 w-5 cursor-pointer text-primary-white-600"
                    onClick={() => setShowPassword((current) => !current)}
                  />
                ) : (
                  <icons.EyeSlashIcon
                    className="h-5 w-5 cursor-pointer text-primary-white-600"
                    onClick={() => setShowPassword((current) => !current)}
                  />
                )
              }
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={errors.password?.message}
            />
            <Link to={ROUTES.forgotPassword}>
              <Typography
                variant="small"
                className="text-gray-300 hover:underline"
              >
                Forgot password?
              </Typography>
            </Link>

            <Button type="submit" className="mt-10">
              Sign in
            </Button>
            {loginError && (
              <Typography
                variant="small"
                id="login-message"
                className="text-red-600"
              >
                {loginError}
              </Typography>
            )}
            <Typography variant="small" className="text-gray-30 mt-3">
              First time here?{" "}
              <Link to={ROUTES.register}>
                <strong>Create account</strong>
              </Link>
            </Typography>
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
