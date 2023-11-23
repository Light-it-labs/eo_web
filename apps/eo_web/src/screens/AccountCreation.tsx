import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { tw } from "@eo/shared/src";
import { Button, Input, Typography, icons } from "@eo/ui";
import { CheckBox } from "@eo/ui/src/form/CheckBox";

import { useApi } from "~/api/useApi";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { ChannelEnum, useProfilingStore } from "~/stores/useProfilingStore";





export const signUpSchema = z.object({
  // Profiling
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email." }),
  phoneNumber: z
    .string()
    .length(10, { message: "Contact number must be 10 digits" })
    .regex(/^[0-9]+$/, { message: "Enter a valid phone number." }),
  password: z
    .string()
    .regex(
      new RegExp(".*[A-Z].*"),
      "Password must contain at least one uppercase character",
    )
    .regex(
      new RegExp(".*[a-z].*"),
      "Password must contain at least one lowercase character",
    )
    .regex(new RegExp(".*\\d.*"), "Password must contain at least one number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Password must contain at least one special character",
    )
    .min(8, "Must be at least 8 characters in length"),
  agreeReceiveNotifications: z.boolean().refine((value) => value, {
    message: "Must agree to authorizations to continue.",
  }),
  agreeTermsAndConditions: z.boolean().refine((value) => value, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignUpFormSchema = z.infer<typeof signUpSchema>;

export const AccountCreation = () => {
  const navigate = useNavigate();
  const [useParams] = useSearchParams();
  const {
    account,
    setAccountData,
    setIntroQuestionSubmissionId,
    channel,
    setState,
  } = useProfilingStore((state) => state);
  // const navigate = useNavigate();
  const { eligibleEmail } = useApi();

  const [validatingForm, setValidatingForm] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: account,
  });

  const errorMessage =
    Object.keys(errors).length === 0 ? "" : Object.values(errors)[0];

  const onFormSubmission = async (data: SignUpFormSchema) => {
    setValidatingForm(true);
    const result = await eligibleEmail(data.email);
    if (!result.data.success) {
      setError("email", { message: "Email was already taken" });
      setValidatingForm(false);
      return;
    } else {
      setAccountData(data);

      switch (channel) {
        case ChannelEnum.cancer:
          navigate(ROUTES.cancerForm);
          break;
        case ChannelEnum.senior:
          navigate(ROUTES.seniorForm);
          break;
        default:
          navigate("/");
      }
    }
  };

  useMount(() => {
    const submissionId = useParams.get("submission_id");
    const state = useParams.get("state");
    if (!submissionId) {
      toast.error(
        <p>
          Impossible to continue without
          <br /> a submission id
        </p>,
      );
    } else {
      setState(state);
      setIntroQuestionSubmissionId(submissionId);
    }
  });

  return (
    <LayoutDefault>
      <div className="flex h-full w-full flex-row items-center justify-center pb-10">
        <form className="h-auto w-11/12 rounded-md border border-gray-100 bg-white  shadow-lg md:w-[797px]">
          <div className="px-[28px] py-[48px]">
            <Typography
              variant="large"
              font="semiBold"
              className={tw("mb-4 font-nunito", !!errorMessage && "text-red")}
            >
              Create an Account
            </Typography>

            <div className="grid grid-cols-2 gap-0 md:gap-4">
              <Input
                id={"firstName"}
                type="text"
                containerClassName="col-span-2 md:col-span-1"
                className="h-12"
                {...register("firstName")}
                error={errors.firstName?.message}
                placeholder="First Name*"
              />
              <Input
                id={"lastName"}
                type="text"
                containerClassName="col-span-2 md:col-span-1"
                className="h-12"
                {...register("lastName")}
                error={errors.lastName?.message}
                placeholder="Last Name*"
              />
            </div>
            <div className="grid grid-cols-2 gap-0 md:gap-4">
              <Input
                id={"email"}
                placeholder="Email*"
                type="email"
                left={<icons.ProfileIcon />}
                containerClassName="col-span-2 md:col-span-1"
                className="h-12"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                id={"password"}
                placeholder="Password*"
                message=""
                type="password"
                containerClassName="col-span-2 md:col-span-1"
                className="h-12"
                {...register("password")}
                error={errors.password?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-0 md:gap-4">
              <Input
                id={"phoneNumber"}
                placeholder="Phone number*"
                type="text"
                containerClassName="col-span-2 md:col-span-1"
                className="h-12 placeholder:text-[16px] placeholder:font-normal placeholder:text-gray-700"
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
              <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
                <CheckBox
                  id="agreeReceiveNotifications"
                  {...register("agreeReceiveNotifications")}
                  error={errors.agreeReceiveNotifications?.message}
                  containerClassName="col-span-2  md:col-span-1"
                  className="h-[18px] w-[18px]"
                  compact={true}
                  label={
                    <Typography
                      variant="small"
                      font="regular"
                      className={tw(
                        "font-nunito text-[11px] font-light ",
                        errors.agreeReceiveNotifications?.message &&
                          "text-red-500",
                      )}
                    >
                      I agree to receive emails and text messages.
                    </Typography>
                  }
                />
                <CheckBox
                  id="agreeTermsAndConditions"
                  {...register("agreeTermsAndConditions")}
                  error={errors.agreeTermsAndConditions?.message}
                  containerClassName="w-full col-span-2  md:col-span-1"
                  className="h-[18px] w-[18px]"
                  compact={true}
                  label={
                    <Typography
                      variant="small"
                      font="regular"
                      className={tw(
                        "font-nunito text-[11px] font-light ",
                        errors.agreeTermsAndConditions?.message &&
                          "text-red-500",
                      )}
                    >
                      I have read and agree to the{" "}
                      <a
                        href="https://www.eo.care/web/terms-of-use"
                        target="_blank"
                        className="underline"
                        rel="noreferrer"
                      >
                        Terms of Service
                      </a>
                      , and{" "}
                      <a
                        href="https://www.eo.care/web/privacy-policy"
                        target="_blank"
                        className="underline"
                        rel="noreferrer"
                      >
                        Privacy Policy{" "}
                      </a>{" "}
                    </Typography>
                  }
                />
              </div>
            </div>
          </div>
          <section className="flex h-[53px] items-center justify-end rounded-b-md bg-black pb-[19px] pt-4 md:w-full ">
            <Typography
              className={tw(
                "mx-auto my-0 hidden font-nunito text-white md:block",
                !!errorMessage && "text-red-300",
              )}
              variant="small"
            >
              {!!errorMessage
                ? errors.password?.message
                  ? "Password must be at least 8 characters, contain a capital letter, number, and special character."
                  : errorMessage.message
                : "Remember: You’ll need to have your password handy when accessing your care plan!"}
            </Typography>
            <Button
              id="ga-sign-up-button"
              className="click:border-0 focus:rign-outline-0 w-[150px] border-none hover:outline-0 focus:ring-0"
              variant="black"
              size="lg"
              onClick={() => void handleSubmit(onFormSubmission)()}
              right={<icons.RightArrow />}
            >
              {validatingForm ? "Validating" : "NEXT"}
            </Button>
          </section>
        </form>
      </div>
    </LayoutDefault>
  );
};
