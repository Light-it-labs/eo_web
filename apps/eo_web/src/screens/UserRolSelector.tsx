import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { tw } from "@eo/shared";
import { Button, Typography, icons } from "@eo/ui";

import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import {
  Flows,
  useProfilingStore,
  type Channel,
  type FlowType,
  type Type,
} from "~/stores/useProfilingStore";


export const UserRolSelector = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<Type>(null);
  const origin = searchParams.get("origin") ?? "localhost:5173";
  const channel = searchParams.get("channel") as Channel;
  const symptoms = searchParams.get("symptoms") ?? "";
  const flow: FlowType =
    (searchParams.get("flow") as FlowType) ?? Flows.marketing_site;

  const URL = localStorage.getItem("redirect_back_origin");

  const {
    setChannel,
    setType,
    setSymptoms,
    setUsePayment,
    resetProfilingStore,
    setOrigin,
    setFlow,
  } = useProfilingStore((state) => state);

  const redirectForm = (type: Type) => {
    setOrigin(origin);
    setFlow(flow);
    setSymptoms(symptoms.split(","));
    setChannel(channel);
    setType(type);
    navigate(ROUTES.introQuestions);
  };

  useMount(() => {
    resetProfilingStore();
    const payment = searchParams.get("p") ?? "yes";
    window.data.isPartnerSite(origin) || payment === "no"
      ? setUsePayment(false)
      : setUsePayment(true);
  });

  const redirectBack = () => {
    if (URL) window.location.href = URL;
  };

  return (
    <LayoutDefault>
      <div className="flex h-full w-full items-center justify-center bg-opacity-50 ">
        <div className="relative w-3/4 rounded-md bg-white shadow-2xl md:w-[742px]">
          <div className="px-7 py-7">
            <Typography className="font-nunito text-lg font-normal">
              We’ll start with some basics. Which best describes you?{" "}
              <span className="text-red-600">*</span>
            </Typography>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row">
              <button
                className={tw(
                  "flex h-12 items-center justify-start gap-2 rounded border border-solid border-gray-800 px-[15px] py-[9px] font-nunito text-gray-800 lg:w-1/2",
                  selectedValue === "Patient" &&
                    "border-[#5AADFD] bg-[#5AADFD] bg-opacity-20",
                )}
                onClick={() => setSelectedValue("Patient")}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke={selectedValue === "Patient" ? "#5AADFD" : "#535A63"}
                    strokeWidth={selectedValue === "Patient" ? 3 : 1.5}
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill={selectedValue === "Patient" ? "#5AADFD" : "none"}
                    stroke={selectedValue === "Patient" ? "white" : "none"}
                    strokeWidth={1.5}
                  />
                </svg>
                I’m a patient
              </button>
              <button
                className={tw(
                  "flex h-12 items-center justify-start gap-2 rounded border border-solid border-gray-800 px-[15px] py-[9px] font-nunito text-gray-800 lg:w-1/2",
                  selectedValue === "Caregiver" &&
                    "border-[#5AADFD] bg-[#5AADFD] bg-opacity-20",
                )}
                onClick={() => setSelectedValue("Caregiver")}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke={
                      selectedValue === "Caregiver" ? "#5AADFD" : "#535A63"
                    }
                    strokeWidth={selectedValue === "Caregiver" ? 3 : 1.5}
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill={selectedValue === "Caregiver" ? "#5AADFD" : "none"}
                    stroke={selectedValue === "Caregiver" ? "white" : "none"}
                    strokeWidth={1.5}
                  />
                </svg>
                I’m a caregiver
              </button>
            </div>
          </div>
          <section
            className={tw(
              "flex h-[53px] items-center justify-between rounded-b-md bg-black pb-[19px] pt-4 md:w-full",
              !URL && "justify-end",
            )}
          >
            {URL && (
              <Button
                className="click:border-0 focus:ring-outline-0 rounded-none hover:outline-0 focus:ring-0"
                variant="black"
                size="lg"
                onClick={redirectBack}
                disabled={!URL}
                left={
                  <icons.RightArrow className="h-6 w-6 rotate-180 text-gray-300" />
                }
              >
                <span className="hidden text-gray-300 lg:flex">PREVIOUS</span>
              </Button>
            )}
            <Button
              className="click:border-0 focus:ring-outline-0 hidden rounded-none hover:outline-0 focus:ring-0 lg:flex"
              variant="black"
              size="lg"
              right={<icons.RightArrow className="h-6 w-6" />}
              onClick={() => redirectForm(selectedValue)}
            >
              NEXT
            </Button>
            <Button
              className="click:border-0 focus:ring-outline-0 flex rounded-none hover:outline-0 focus:ring-0 lg:hidden"
              variant="black"
              size="lg"
              right={<icons.RightArrow className="h-6 w-6" />}
              onClick={() => redirectForm(selectedValue)}
            ></Button>
          </section>
        </div>
      </div>
    </LayoutDefault>
  );
};
