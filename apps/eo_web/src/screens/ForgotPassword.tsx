import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography, icons } from "@eo/ui";

import { useApi } from "~/api/useApi";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "The email received it is not a valid email" }),
});
export type TypeForgotPasswordShema = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const { sendEmailToRecoveryPassword } = useApi();

  const {
    formState: { errors },
    register: registerForm,
    handleSubmit,
  } = useForm<TypeForgotPasswordShema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate } = useMutation({
    mutationFn: sendEmailToRecoveryPassword,
    onSuccess: () => {
      toast.success(
        "Email sent to recovery your password, please check your inbox",
      );
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

  return (
    <LayoutDefault>
      <div className="flex h-full h-full flex-row items-start justify-center gap-20 px-2 md:items-center">
        <div>
          <Typography variant="large" font="bold">
            Reset your password
          </Typography>
          <Typography variant="small" font="regular" className="mt-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Enter your email and we'll send you instructions{" "}
            <br className="hidden md:block" /> on how to reset your password
          </Typography>

          <form
            className="mt-10 flex flex-col "
            onSubmit={(e) => {
              void handleSubmit((data) => {
                mutate(data.email);
              })(e);
            }}
          >
            <Input
              id={"email"}
              label="Email"
              type="email"
              containerClassName="max-w-[317px]"
              className="h-12 shadow-md"
              {...registerForm("email")}
              error={errors.email?.message}
            />
            <div className="flex flex-row justify-center gap-2 md:justify-start">
              <Link to={ROUTES.login}>
                <Button
                  type="button"
                  className="mt-10"
                  variant="secondary"
                  left={<icons.ArrowLeftIcon />}
                >
                  Back
                </Button>
              </Link>
              <Button type="submit" className="mt-10">
                Continue
              </Button>
            </div>
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
