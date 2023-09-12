import { useNavigate } from "react-router-dom";

import { Typography } from "@eo/ui";

import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";





export const UserTypeSelectorDemo = () => {
  const navigate = useNavigate();

  const redirectForm = (type: string) => {
    navigate(`${ROUTES.cancerFormDemo}?type=${type}`);
  };

  return (
    <LayoutDefault>
      <div className="flex h-full w-full items-center justify-center bg-[#f8f6f3] bg-opacity-50">
        <div className="relative w-3/4 bg-white px-[43px] py-[52px] md:w-[742px]">
          <Typography className="text-nunito text-lg font-normal">
            Which best describes yous? <span className="text-red-600">*</span>
          </Typography>
          <div className="mt-6 flex flex-row gap-5">
            <button
              className="text-nunito h-[41px] w-1/2 border border-solid border-[#a5c4ff] bg-[#a5c4ff] bg-opacity-10 px-[15px] py-[9px]	"
              onClick={() => redirectForm("Patient")}
            >
              Patient
            </button>
            <button
              className="text-nunito h-[41px] w-1/2 border border-solid border-[#a5c4ff] bg-[#a5c4ff] bg-opacity-10 px-[15px] py-[9px]	"
              onClick={() => redirectForm("Caregiver")}
            >
              Caretaker
            </button>
          </div>
        </div>
      </div>
    </LayoutDefault>
  );
};
