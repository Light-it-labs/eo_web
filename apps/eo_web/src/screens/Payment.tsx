import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { LayoutDefault } from "~/layouts/LayoutDefault";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Button, Input, Select, Typography } from "@eo/ui";
import { useElixirApi } from "~/api/useElixirApi";

const plans = [
  {
    id: 'web_plan_monthly',
    name: "Monthly",
    price: 1400
  },
  {
    id: 'web_plan_annual',
    name: "Annual",
    price: 9900
  }
]

interface AuthNetSuccessResponse {
  messages: {
    resultCode: "Ok";
    message: Array<{
      code: string;
      text: string;
    }>;
  }
  opaqueData: {
    dataDescriptor: string;
    dataValue: string;
  }
}

interface AuthNetErrorResponse {
  messages: {
    resultCode: "Error";
    message: Array<{
      code: string;
      text: string;
    }>;
  }
}

type AuthNetResponse = AuthNetSuccessResponse | AuthNetErrorResponse;

const isSuccessAuthNetResponse = (response: AuthNetResponse): response is AuthNetSuccessResponse => {
  return response.messages.resultCode === "Ok";
}

const paymentSchema = z.object({
  streetAddress1: z.string().min(1, { message: "Address is required" }),
  streetAddress2: z.string().min(1, { message: "Address is required" }),
  // Phone number should be in the user already.
  //phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  plan: z.string().refine((value: string) => {
    return plans.some((plan) => plan.id === value);
  }, { message: "Plan is required" }),

  cardNumber: z.string()
    .min(13, { message: "Card number must be between 13 and 16 digits" })
    .max(16, { message: "Card number must be between 13 and 16 digits" })
    .refine((value: string) => {
      return /^\d+$/.test(value);
    }, { message: "Card number must be a number" }),

  expMonth: z.string().length(2, { message: "The month must be a 2 digit number" }).refine((value: string) => {
    return parseInt(value) >= 1 && parseInt(value) <= 12;
  }, { message: "Select a valid month" }),
  expYear: z.string().length(2, { message: "The year must be a 2 digit number" }).refine((value: string) => {
    const currentYear = new Date().getFullYear() - 2000;
    return parseInt(value) >= currentYear && parseInt(value) <= currentYear + 10;
  }, { message: "Select a valid year" }),
  cardCode: z.string()
    .min(3, { message: "The card security code must be between 3 and 4 digits" })
    .max(4, { message: "The card security code must be between 3 and 4 digits" }),
  zip: z.string().length(5, { message: "Zip code is required" }).refine((value: string) => {
    return /^\d+$/.test(value);
  }, { message: "Zip code must be a number" }),
  city: z.string().min(1, { message: "City is required" }),
});

export type PaymentFormSchema = z.infer<typeof paymentSchema>;


export const Payment = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PaymentFormSchema>({ resolver: zodResolver(paymentSchema) });

  const { submitPayment } = useElixirApi()

  const { mutate } = useMutation({
    mutationFn: submitPayment,
    /*     onSuccess: ({ data }) => {
          console.log(data);
        },
        onError: (result) => {
          console.log(result);
        }, */
  });

  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://jstest.authorize.net/v1/Accept.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  function sendPaymentDataToAnet({
    streetAddress1,
    streetAddress2,
    plan,
    cardNumber,
    expMonth,
    expYear,
    cardCode,
    zip,
    city,
  }: PaymentFormSchema) {
    const authData = {
      clientKey: "9dVea6Tj6875TBFnHb8TTHDYAht7ct54yNp8m5C67h2WXquRd2hXkGF42ZFPKdrA",
      apiLoginID: "7E8pC4j2XsUw",
    };
    const cardData = {
      cardNumber,
      month: expMonth,
      year: expYear,
      cardCode,

    };

    const secureData = {
      authData: authData,
      cardData: cardData,
    };

    // @ts-expect-error - Accept is a global variable injected by the auth.net js script.
    Accept.dispatchData(secureData, (response: AuthNetSuccessResponse | AuthNetErrorResponse) => { // eslint-disable-line
      if (!isSuccessAuthNetResponse(response)) {
        // Handle error
        return;
      }
      const opaqueData = response.opaqueData;

      mutate({
        order: {
          plan_id: plan,
        },
        payment_method: {
          descriptor: opaqueData.dataDescriptor,
          value: opaqueData.dataValue,
        },
        billing_address: {
          address_line_1: streetAddress1,
          address_line_2: streetAddress2,
          zip,
          city,
        },
      });
    });
  }

  return (
    <LayoutDefault>
      <div className="flex flex-col items px-12">
        <div>
          <Typography variant="large" className="text-gray-700">
            Payment!
          </Typography>
        </div>
        <div>
          <form
            onSubmit={(e) => {
              void handleSubmit(({
                streetAddress1,
                streetAddress2,
                plan,
                cardNumber,
                expMonth,
                expYear,
                cardCode,
                zip,
                city,
              }) => {
                // Submit payment to Authorize.net
                sendPaymentDataToAnet({
                  streetAddress1,
                  streetAddress2,
                  plan,
                  cardNumber,
                  expMonth,
                  expYear,
                  cardCode,
                  zip,
                  city,
                });

                ;
              })(e);
            }}
          >
            <input type="hidden" name="dataValue" id="dataValue" />
            <input type="hidden" name="dataDescriptor" id="dataDescriptor" />
            <Input
              id={"streetAddress1"}
              label="Street Address1"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("streetAddress1")}
              error={errors.streetAddress1?.message}
            />
            <Input
              id={"streetAddress2"}
              label="Street Address2"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("streetAddress2")}
              error={errors.streetAddress2?.message}
            />
            <Select
              id={"plan"}
              label="Plan"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("plan")}
              error={errors.plan?.message}
              options={plans.map((plan) => ({
                label: plan.name + " - " + (plan.price / 100).toLocaleString("en-US", { style: "currency", currency: "USD" }),
                value: plan.id.toString(),
              }))}
            />
            <Button type="submit" className="mt-10">
              Proceed to payment
            </Button>

            <Input
              id={"cardNumber"}
              label="Card Number"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("cardNumber")}
              error={errors.cardNumber?.message}
            />
            <Input
              id={"expMonth"}
              label="Card expiration month"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("expMonth")}
              error={errors.expMonth?.message}
            />
            <Input
              id={"expYear"}
              label="Card expiration year"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("expYear")}
              error={errors.expYear?.message}
            />
            <Input
              id={"cardCode"}
              label="Card security code"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("cardCode")}
              error={errors.cardCode?.message}
            />
            <Input
              id={"zip"}
              label="zip"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("zip")}
              error={errors.zip?.message}
            />
            <Input
              id={"city"}
              label="City"
              type="text"
              containerClassName="max-w-[327px]"
              className="h-12 shadow-md"
              {...register("city")}
              error={errors.city?.message}
            />

          </form>
        </div>
      </div>
    </LayoutDefault>
  );
};
