import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { Button, Input, Typography } from "@eo/ui";
import { CheckBox } from "@eo/ui/src/form/CheckBox";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { Footer } from "~/layouts/Footer";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";





export const signUpSchema = z.object({
  // Profiling
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "The email received it is not a valid email" }),
  phoneNumber: z
    .string()
    .length(10, { message: "Contact number must be 10 digits" })
    .regex(/^[0-9]+$/, { message: "Contact number must be 10 digits" }),
  password: z
    .string()
    .min(6, { message: "password have to be at least 6 characters long" }),
  agreeReceiveNotifications: z.boolean().refine((value) => value, {
    message: "You must authorize communication",
  }),
  agreeTermsAndConditions: z.boolean().refine((value) => value, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignUpFormSchema = z.infer<typeof signUpSchema>;

export const AccountCreation = () => {
  const navigate = useNavigate();
  const [useParams] = useSearchParams();
  const { setAccountData, setIntroQuestionSubmissionId, channel } =
    useProfilingStore((state) => state);
  // const navigate = useNavigate();
  const { validateEmail } = useApi();

  const [validatingForm, setValidatingForm] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onFormSubmission = async (data: SignUpFormSchema) => {
    setValidatingForm(true);
    if (!(await validateEmail(data.email))) {
      setError("email", { message: "Email was already taken" });
      setValidatingForm(false);
      return;
    }

    setAccountData(data);

    switch (channel) {
      case "cancer":
        navigate(ROUTES.cancerForm);
        break;
      case "senior":
        navigate(ROUTES.seniorForm);
        break;
      default:
        navigate("/");
    }
  };

  useMount(() => {
    const submissionId = useParams.get("submission_id");
    if (!submissionId) {
      toast.error("Impossible to continue without a submission id");
    } else {
      setIntroQuestionSubmissionId(submissionId);
    }
  });

  return (
    <LayoutDefault>
      <div className="flex h-full w-full flex-row items-center justify-center gap-x-20 px-2 pb-12">
        <div className="mb-10 h-auto w-full border border-gray-100 bg-white p-10 shadow-lg md:mb-0 md:max-w-2xl">
          <div className="">
            <form>
              <Typography variant="large" font="semiBold" className="mb-4">
                Account Set up
              </Typography>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id={"firstName"}
                  type="text"
                  containerClassName="w-full col-span-2 md:col-span-1"
                  className="h-12 rounded border-solid border-gray-300"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  label={
                    <span className={"font-bold"}>
                      First Name<span className="text-red-600">*</span>
                    </span>
                  }
                />
                <Input
                  id={"lastName"}
                  type="text"
                  containerClassName="w-full col-span-2 md:col-span-1"
                  className="h-12 rounded border-solid border-gray-300"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  label={
                    <span className={"font-bold"}>
                      Last Name<span className="text-red-600">*</span>
                    </span>
                  }
                />
              </div>
              <Input
                id={"email"}
                label={
                  <span className={"font-bold"}>
                    Email<span className="text-red-600">*</span>
                  </span>
                }
                message="example@example.com"
                type="email"
                containerClassName="w-full"
                className="h-12 rounded border-solid border-gray-300"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                id={"password"}
                label={
                  <span className={"font-bold"}>
                    Password <span className="text-red-600">*</span>
                  </span>
                }
                message=""
                type="password"
                containerClassName="w-full"
                className="h-12 rounded border-solid border-gray-300"
                {...register("password")}
                error={errors.password?.message}
              />
              <Input
                id={"phoneNumber"}
                label={
                  <span className={"font-bold"}>
                    Contact number <span className="text-red-600">*</span>
                  </span>
                }
                placeholder="(000) 000-0000"
                message="Please enter a valid phone number"
                type="text"
                containerClassName="w-full"
                className="h-12 rounded border-solid border-gray-300"
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
              <Typography variant="base" font="semiBold" className="mb-4">
                Authorizations
              </Typography>
              <CheckBox
                id="agreeReceiveNotifications"
                {...register("agreeReceiveNotifications")}
                error={errors.agreeReceiveNotifications?.message}
                containerClassName="mt-1"
                className="h-6 w-6 rounded border-solid border-gray-300"
                label={
                  <Typography variant="small" font="regular">
                    I agree to receive emails and text messages.
                  </Typography>
                }
              />
              <CheckBox
                id="agreeTermsAndConditions"
                {...register("agreeTermsAndConditions")}
                error={errors.agreeTermsAndConditions?.message}
                containerClassName="w-full"
                className="h-6 w-6 rounded border-solid border-gray-300"
                label={
                  <Typography variant="small" font="regular">
                    I have read and agree to the{" "}
                    <a
                      href="https://www.eo.care/web/terms-of-use"
                      target="_blank"
                      className="underline"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a>
                    ,<br /> and {""}
                    <a
                      href="https://www.eo.care/web/privacy-policy"
                      target="_blank"
                      className="underline"
                      rel="noreferrer"
                    >
                      Privacy Policy{" "}
                    </a>{" "}
                    of eo.
                  </Typography>
                }
              />

              <div className="flex justify-start md:justify-end">
                <Button
                  id="ga-sign-up-button"
                  className="w-full md:w-60"
                  variant="black"
                  size="lg"
                  onClick={() => void handleSubmit(onFormSubmission)()}
                >
                  {validatingForm ? "Validating" : "Next"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </LayoutDefault>
  );
};
