import { useNavigate } from "react-router-dom";

import {
  CANCER_INTRO_QUESTION_CAREGIVER_ID,
  CANCER_INTRO_QUESTION_PATIENT_ID,
  SENIOR_INTRO_QUESTION_CAREGIVER_ID,
  SENIOR_INTRO_QUESTION_PATIENT_ID,
} from "~/configs/env";
import { jotformScript } from "~/helpers/jotform_script";
import { useMount } from "~/hooks/useMount";
import { LayoutDefault } from "~/layouts";
import { useProfilingStore } from "~/stores/useProfilingStore";

export const ProfilingIntroQuestions = () => {
  const navigate = useNavigate();
  const { channel, type } = useProfilingStore((state) => state);

  let introQuestionsId: string | number | null = null;

  switch (channel) {
    case "senior": {
      introQuestionsId =
        type === "Patient"
          ? SENIOR_INTRO_QUESTION_PATIENT_ID
          : SENIOR_INTRO_QUESTION_CAREGIVER_ID;
      break;
    }
    case "cancer": {
      introQuestionsId =
        type === "Patient"
          ? CANCER_INTRO_QUESTION_PATIENT_ID
          : CANCER_INTRO_QUESTION_CAREGIVER_ID;
      break;
    }
  }

  useMount(() => {
    setTimeout(() => {
      jotformScript(introQuestionsId);
    }, 400);
  });

  console.log(introQuestionsId);
  if (introQuestionsId === null) navigate("/");

  return (
    <LayoutDefault>
      <div className="mb-10 flex h-screen flex-col">
        {introQuestionsId && (
          <iframe
            id={`JotFormIFrame-${introQuestionsId}`}
            title=""
            onLoad={() => window.parent.scrollTo(0, 0)}
            allow="geolocation; microphone; camera"
            allowTransparency
            allowFullScreen={true}
            src={`https://form.jotform.com/${introQuestionsId}`}
            className="h-full w-full"
            style={{
              minWidth: "100%",
              height: "539px",
              border: "none",
            }}
          ></iframe>
        )}
      </div>
    </LayoutDefault>
  );
};
