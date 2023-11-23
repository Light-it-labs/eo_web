import { useNavigate, useSearchParams } from "react-router-dom";

import { Typography } from "@eo/ui";

import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import {
  useProfilingStore,
  type Channel,
  type Type,
} from "~/stores/useProfilingStore";


export const UserRolSelector = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    setChannel,
    setType,
    setSymptoms,
    setUsePayment,
    resetProfilingStore,
  } = useProfilingStore((state) => state);
  const redirectForm = (type: Type) => {
    const channel = searchParams.get("channel") as Channel;
    const symptoms = searchParams.get("symptoms") ?? "";

    setSymptoms(symptoms.split(","));
    setChannel(channel);
    setType(type);
    navigate(ROUTES.introQuestions);
  };

  useMount(() => {
    resetProfilingStore();
    const payment = searchParams.get("payment") || "yes";
    setUsePayment(payment !== "no");
    searchParams.delete("payment");
    setSearchParams(searchParams);
  });

  return (
    <LayoutDefault>
      <div className="flex h-full w-full items-center justify-center bg-opacity-50">
        <div className="relative w-3/4 bg-white px-[43px] py-[52px] md:w-[742px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="absolute left-4 top-4 h-6 w-6"
            onClick={() =>
              (window.location.href = `https://${window.location.host}/pilot#how-eo-care-plans-works`)
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <Typography className="font-nunito text-lg font-normal">
            Which best describes you? <span className="text-red-600">*</span>
          </Typography>
          <div className="mt-6 flex flex-row gap-5">
            <button
              className="h-[41px] w-1/2 border border-solid border-[#a5c4ff] bg-[#a5c4ff] bg-opacity-10 px-[15px] py-[9px] font-nunito	"
              onClick={() => redirectForm("Patient")}
            >
              Patient
            </button>
            <button
              className="h-[41px] w-1/2 border border-solid border-[#a5c4ff] bg-[#a5c4ff] bg-opacity-10 px-[15px] py-[9px] font-nunito	"
              onClick={() => redirectForm("Caregiver")}
            >
              Caregiver
            </button>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
};
