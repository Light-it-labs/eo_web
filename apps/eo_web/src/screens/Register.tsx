import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography, icons } from "@eo/ui";

import { register } from "~/api/auth";
import { LayoutDefault } from "~/layouts/LayoutDefault";
import { ROUTES } from "~/router";

const newClientSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "The email received it is not a valid email" }),
  password: z
    .string()
    .min(8, { message: "The password must has 8 characters." })
    .regex(
      /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
      "The password must have at least one uppercase letter, one lowercase letter, one number",
    ),
});

export type LoginFormSchema = z.infer<typeof newClientSchema>;

export interface RegisterErrorInterface {
  errors: {
    email: Array<{ code: string; message: string }>;
    password: Array<{ code: string; message: string }>;
  };
}

export const Register = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    register: registerForm,
    handleSubmit,
    getValues,
    setError,
  } = useForm<LoginFormSchema>({ resolver: zodResolver(newClientSchema) });

  const { mutate } = useMutation({
    mutationFn: register,
    onError: (result) => {
      if (axios.isAxiosError(result)) {
        const data = result.response?.data as RegisterErrorInterface;

        if (data.errors?.email) {
          setError("email", {
            message: data.errors.email.pop()?.message || "",
          });
        }

        if (data.errors?.password) {
          setError("password", {
            message: data.errors.password.pop()?.message || "",
          });
        }
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
    onSuccess: ({ data }) => {
      if (typeof data === "string") {
        navigate(ROUTES.registrationComplete, {
          state: {
            email: getValues("email"),
          },
        });
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LayoutDefault>
      <div className="flex h-full w-full flex-row items-center justify-center gap-20">
        <div>
          <Typography variant="large" font="medium">
            Start here.
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
              {...registerForm("email")}
              error={errors.email?.message}
            />
            <Input
              id={"password"}
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
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              type={showPassword ? "text" : "password"}
              {...registerForm("password")}
              error={errors.password?.message}
            />
            <Typography variant="small" className="text-gray-300">
              Must be at least 8 characters long and contain <br /> a capital
              letter, number, and special character
            </Typography>

            <Button type="submit" className="mt-10">
              Create account
            </Button>
            <Typography variant="small" className="text-gray-30 mt-3">
              Already have an account?{" "}
              <Link to={ROUTES.login}>
                <strong>Sign in</strong>
              </Link>
            </Typography>
          </form>
        </div>
        <div>
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
