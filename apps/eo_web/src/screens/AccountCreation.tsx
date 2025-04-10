import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import { tw } from "@eo/shared/src";
import { Button, icons, Input, Typography } from "@eo/ui";
import { CheckBox } from "@eo/ui/src/form/CheckBox";

import { usePreProfile } from "~/api/usePreProfile";
import { useProfile } from "~/api/useProfile";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import {
  Flows,
  useProfilingStore,
  type FlowType,
} from "~/stores/useProfilingStore";

export const ReferralOptions: Record<string, FlowType> = {
  "Twist Out Cancer": Flows.twist_out_cancer,
  "Unite for Her": Flows.unite_for_her,
  "Imerman Angels": Flows.imerman,
  "Cancer Support Community": Flows.cancer_support_community,
  "UVA Health": Flows.uva,
  "Inova Schar Cancer Institute": Flows.inova,
  "Mass Retirees": Flows.mass_retirees,
  "Northwell Health": Flows.northwell_health,
  "Friend / Family": Flows.friend_family,
  "Cancer Buddy": Flows.cancer_buddy,
  "Realm of Caring": Flows.realm_of_caring,
  "Private Health Management": Flows.private_health_management,
  "Memorial Sloan Kettering Cancer Center":
    Flows.memorial_sloan_kettering_cancer_center,
  "New England Cancer Specialists": Flows.new_england_cancer_specialists,
  "Penn Medicine": Flows.penn_medicine,
  "Free Care Plan": Flows.free_care_plan,
  "Care Plan Ad 1": Flows.care_plan_ad_1,
} as const;

export type ReferralOptionsType = keyof typeof ReferralOptions;

const getFlowFromReferral = (value: string) => {
  const keys: ReferralOptionsType[] = Object.keys(ReferralOptions);
  const key = keys.find((key) => key === value);
  return key ? ReferralOptions[key] : undefined;
};

const getReferredBy = (searchParams: URLSearchParams) => {
  const encodedReferredBy = searchParams.get("referred_by") ?? undefined;
  return encodedReferredBy ? decodeURIComponent(encodedReferredBy) : undefined;
};

export const signUpSchema = z.object({
  // Profiling
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Enter a valid email." }),
  phoneNumber: z.string().superRefine((phoneNumber, ctx) => {
    const phoneWithOnlyNumbers = phoneNumber.replace(/\D/g, "");
    const numberOfDigits = phoneWithOnlyNumbers.length;
    if (numberOfDigits !== 10) {
      ctx.addIssue({
        code: "custom",
        message: "Contact number must be 10 digits",
      });
    }
  }),
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
    setExperience,
    flow,
    setFlow,
    setReferredBy,
  } = useProfilingStore((state) => state);

  const referredBy = getReferredBy(useParams);
  const referredFlow = referredBy ? getFlowFromReferral(referredBy) : undefined;

  const [validatingForm, setValidatingForm] = useState(false);
  const { mutate: createPreProfile } = usePreProfile().preProfileMutation;
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    getValues,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: account,
  });

  useProfile().useEligibleEmailQuery(getValues("email"), {
    enabled: validatingForm,
    retry: 1,
    retryOnMount: false,
    onSettled: () => setValidatingForm(false),
    onError: () => {
      setError("email", { message: "Email was already taken" });
    },
    onSuccess: () => {
      const data = getValues();
      setAccountData({
        ...data,
        phoneNumber: data.phoneNumber.replace(/\D/g, ""),
      });
      createPreProfile({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber.replace(/\D/g, ""),
        origin: getIndex(flow),
        referred_by: referredBy ?? "",
      });
      switch (channel) {
        case "cancer":
          navigate(ROUTES.cancerForm);
          break;
        case "senior":
          navigate(ROUTES.olderAdultForm);
          break;
        default:
          navigate("/");
      }
    },
  });

  const errorMessage =
    Object.keys(errors).length === 0 ? "" : Object.values(errors)[0];

  const getIndex = (input: FlowType): string => {
    switch (input) {
      case Flows.cancer_pilot:
        return "1";
      case Flows.twist_out_cancer:
        return "2";
      case Flows.cancer_support_community:
        return "3";
      case Flows.resource_center_1:
        return "4";
      case Flows.resource_center_2:
        return "5";
      case Flows.employer_center:
        return "6";
      case Flows.inova:
        return "7";
      case Flows.uva:
        return "8";
      case Flows.imerman:
        return "9";
      case Flows.unite_for_her:
        return "10";
      case Flows.mass_retirees:
        return "11";
      case Flows.stupid_cancer:
        return "12";
      case Flows.marketing_site:
        return "13";
      case Flows.c_org:
        return "14";
      case Flows.cancer_buddy:
        return "15";
      case Flows.realm_of_caring:
        return "16";
      case Flows.friend_family:
        return "17";
      case Flows.northwell_health:
        return "18";
      case Flows.private_health_management:
        return "19";
      case Flows.memorial_sloan_kettering_cancer_center:
        return "20";
      case Flows.new_england_cancer_specialists:
        return "21";
      case Flows.penn_medicine:
        return "22";
      case Flows.free_care_plan:
        return "23";
      case Flows.care_plan_ad_1:
        return "24"
    }
  };

  const onFormSubmission = () => setValidatingForm(true);

  useMount(() => {
    const submissionId = useParams.get("submission_id");
    const state = useParams.get("state");
    const experience = useParams.get("experience") ?? "";
    const referredBy = getReferredBy(useParams) ?? "";

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
      setExperience(experience);
      setReferredBy(referredBy);
      if (referredFlow) setFlow(referredFlow);
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
              Great! Now let&apos;s create your account.
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
                left={<icons.ProfileIconGray />}
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
                      I agree to receive emails and text messages related to my
                      care.
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
                        "font-nunito text-[11px] font-light !leading-4",
                        errors.agreeTermsAndConditions?.message &&
                        "text-red-500",
                      )}
                    >
                      I have read and agree to the{" "}
                      <a
                        href="https://www.eo.care/web/terms-of-use"
                        target="_blank"
                        className="!font-nunito !text-[11px] !font-light !leading-4 underline"
                        rel="noreferrer"
                      >
                        Terms of Service
                      </a>
                      , and{" "}
                      <a
                        href="https://www.eo.care/web/privacy-policy"
                        target="_blank"
                        className="!font-nunito !text-[11px] !font-light !leading-4 underline"
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
              className="click:border-0 focus:ring-outline-0 w-[150px] border-none hover:outline-0 focus:ring-0"
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
