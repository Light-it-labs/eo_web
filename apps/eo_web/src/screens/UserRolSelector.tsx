import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Radio, Typography, icons } from "@eo/ui";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import {
  useProfilingStore,
  type Channel,
  type Type,
} from "~/stores/useProfilingStore";
import { useState } from "react";
import { tw } from "@eo/shared";

export const UserRolSelector = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValue, setSelectedValue] = useState<Type>(null);
  const {
    setChannel,
    setType,
    setSymptoms,
    setUsePayment,
    resetProfilingStore,
    setOrigin,
  } = useProfilingStore((state) => state);
  const redirectForm = (type: Type) => {
    const channel = searchParams.get("channel") as Channel;
    const symptoms = searchParams.get("symptoms") ?? "";
    const origin = searchParams.get("origin") ?? "localhost:5173";

    setOrigin(origin);
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
        <div className="relative w-3/4 bg-white md:w-[742px]">
          <div className="px-[28px] py-[28px]">
            <Typography className="font-nunito text-lg font-normal">
              Which best describes you? <span className="text-red-600">*</span>
            </Typography>

            <div className="mt-6 flex flex-row gap-5">
              <button
                className={tw("flex items-center justify-start gap-2 h-[48px] w-1/2 border border-solid border-gray-800 text-gray-800 rounded px-[15px] py-[9px] font-nunito",
                  selectedValue === 'Patient' && 'border-[#5AADFD] bg-[#5AADFD] bg-opacity-20')}
                onClick={() => setSelectedValue('Patient')}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" fill='none' stroke={selectedValue === 'Patient' ? '#5AADFD' : '#535A63'} strokeWidth={selectedValue === 'Patient' ? 3 : 1.5} />
                  <circle cx="12" cy="12" r="9" fill={selectedValue === 'Patient' ? '#5AADFD' : 'none'} stroke={selectedValue === 'Patient' ? 'white' : 'none'} strokeWidth={1.5} />
                </svg>
                Patient
              </button>
              <button
                className={tw("flex items-center justify-start gap-2 h-[48px] w-1/2 border border-solid border-gray-800 text-gray-800 rounded px-[15px] py-[9px] font-nunito",
                  selectedValue === 'Caregiver' && 'border-[#5AADFD] bg-[#5AADFD] bg-opacity-20')}
                onClick={() => setSelectedValue("Caregiver")}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10" fill='none' stroke={selectedValue === 'Caregiver' ? '#5AADFD' : '#535A63'} strokeWidth={selectedValue === 'Caregiver' ? 3 : 1.5} />
                  <circle cx="12" cy="12" r="9" fill={selectedValue === 'Caregiver' ? '#5AADFD' : 'none'} stroke={selectedValue === 'Caregiver' ? 'white' : 'none'} strokeWidth={1.5} />
                </svg>
                Caregiver
              </button>
            </div>
          </div>
          <section className="flex h-[53px] items-center justify-between rounded-b-md bg-black pb-[19px] pt-4 md:w-full ">
            <Button
              className="click:border-0 focus:ring-outline-0 hover:outline-0 focus:ring-0"
              variant="black"
              size="lg"
              onClick={() => {
                if (window.data.isMarketingSite(origin)) {
                  window.location.href = `https://${window.location.host}/pilot#how-eo-care-plans-works`;
                } else if (window.data.isPartnerSite(origin)) {
                  window.location.href = `https://${window.location.host}/cancer-pilot#how-eo-care-plans-works`;
                } else {
                  history.back();
                }
              }
              }
              left={<icons.RightArrow className="rotate-180 h-6 w-6 text-gray-300" />}
            >
              <span className="text-gray-300">PREVIOUS</span>
            </Button>

            <Button
              className="click:border-0 focus:ring-outline-0 hover:outline-0 focus:ring-0"
              variant="black"
              size="lg"
              right={<icons.RightArrow className="h-6 w-6" />}
              onClick={() => redirectForm(selectedValue)}
            >
              NEXT
            </Button>
          </section>
        </div>
      </div>
    </LayoutDefault>
  );
};
