import { useNavigate } from "react-router-dom";

import { JotformFrame } from "~/components/JotformFrame";
import {
  SENIOR_PROFILE_CAREGIVER_ID,
  SENIOR_PROFILE_PATIENT_ID,
} from "~/configs/env";
import { LayoutDefault } from "~/layouts";
import { ROUTES } from "~/router";
import { useProfilingStore } from "~/stores/useProfilingStore";


export const Profiling = () => {
  const { type, symptoms, state, usePayment, origin, experience, account } =
    useProfilingStore((state) => state);

  const searchParam = new URLSearchParams({
    email: account.email,
    states: state ?? "",
    symptoms: symptoms.join(","),
    payment: usePayment ? "yes" : "no",
    origin,
    experience,
  });
  const navigate = useNavigate();

  const seniorFormId =
    type === "Patient"
      ? SENIOR_PROFILE_PATIENT_ID
      : SENIOR_PROFILE_CAREGIVER_ID;

  if (!type) {
    navigate(ROUTES.userRolSelector);
  }

  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        <JotformFrame formId={seniorFormId} searchParam={searchParam} />
      </div>
    </LayoutDefault>
  );
};
