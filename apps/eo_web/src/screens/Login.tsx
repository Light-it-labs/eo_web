import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, Input, Typography, icons } from "@eo/ui";

import { login } from "~/api/auth";
import { LayoutWithoutSession } from "~/layouts/LayoutWithoutSession";
import {
  useProfileStore,
  type Profile,
  type Session,
} from "~/stores/useProfileStore";

const newClientSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "The email received it is not a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginFormSchema = z.infer<typeof newClientSchema>;

export const Login = () => {
  const setProfile = useProfileStore((state) => state.setProfile);
  const setSession = useProfileStore((state) => state.setSession);

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: ({ data }) => {
      setProfile(data.profile as Profile);
      setSession(data.session as Session);
    },
  });

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginFormSchema>({ resolver: zodResolver(newClientSchema) });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <LayoutWithoutSession>
      <div className="flex h-full w-full flex-row items-center justify-center gap-20">
        <div>
          <div>
            <Typography variant="large">Welcome</Typography>
          </div>

          <form
            onSubmit={(e) => {
              void handleSubmit((data) => {
                mutate(data);
              })(e);
            }}
          >
            <Input
              id={"email"}
              label="Email"
              placeholder="lightit@lightit.io"
              type="email"
              className="h-12 w-[327px] shadow-md"
              {...register("email")}
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
              className="h-12 w-[327px] shadow-md"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={errors.password?.message}
            />
            <Typography variant="small" className="text-gray-300">
              Forgot password?
            </Typography>

            <Button type="submit" className="mt-10">
              Sign in
            </Button>
            <Typography variant="small" className="text-gray-30 mt-3">
              First time here? <strong>Create account</strong>
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
    </LayoutWithoutSession>
  );
};
