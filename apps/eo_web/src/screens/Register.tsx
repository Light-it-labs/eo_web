import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography, icons } from "@eo/ui";
import { CheckBox } from "@eo/ui/src/form/CheckBox";

import { register } from "~/api/auth";
import { LayoutDefault } from "~/layouts/LayoutDefault";
import { ROUTES } from "~/router";

const newClientSchema = z
  .object({
    first_name: z.string().min(2, "The first name must be present"),
    last_name: z.string().min(2, "The last name must be present"),
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
    password_confirmation: z
      .string()
      .min(8, { message: "This field is required." }),
    agree_terms_and_conditions: z.boolean({
      required_error: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
  })
  .refine((data) => !!data.agree_terms_and_conditions, {
    message: "You must agree to the terms and conditions",
    path: ["agree_terms_and_conditions"],
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
      <div className="flex h-full w-full flex-row items-center justify-center gap-x-20 px-2">
        <div>
          <Typography variant="large" font="bold">
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
            <div className="flex flex-col gap-0 md:flex-row md:gap-2">
              <Input
                id={"firstName"}
                label="First name"
                type="text"
                className="h-12 shadow-md"
                {...registerForm("first_name")}
                error={errors.first_name?.message}
              />
              <Input
                id={"lastName"}
                label="Last name"
                type="text"
                className="h-12 shadow-md"
                {...registerForm("last_name")}
                error={errors.last_name?.message}
              />
            </div>
            <Input
              id={"email"}
              label="Email"
              type="email"
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
              className="h-12 shadow-md"
              type={showPassword ? "text" : "password"}
              {...registerForm("password")}
              error={errors.password?.message}
            />
            <Input
              id={"password_confirmation"}
              label="Password confirmation"
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

            <CheckBox
              id="agree_terms_and_conditions"
              {...registerForm("agree_terms_and_conditions")}
              error={errors.agree_terms_and_conditions?.message}
              containerClassName="mt-2"
              label={
                <Typography variant="small" font="regular">
                  I have read and agree to the{" "}
                  <a
                    href="https://www.eo.care/web/terms-of-use"
                    target="_blank"
                    className="underline"
                  >
                    Terms of <br className="block md:hidden lg:block" />
                    Service
                  </a>
                  , and{" "}
                  <a
                    href="https://www.eo.care/web/privacy-policy"
                    target="_blank"
                    className="underline"
                  >
                    Privacy Policy{" "}
                  </a>{" "}
                  of eo.
                </Typography>
              }
            />

            <Button type="submit" className="mt-3">
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
