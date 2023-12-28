import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import { env } from "./env";
import { Router } from "./router";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient();
type Hosts =
  | "www.eo.care"
  | "partner.eo.care"
  | "eo-marketing-06cbaf66a5b1fbfeecb0ca9525.webflow.io"
  | "eo-marketing.webflow.io";

interface EnvironmentsConfigs {
  API_URL: string;
  API_LARAVEL: string;
  PROFILE_ONE_ID: string;
  PROFILE_TWO_ID: string;
  ZUKO_SLUG_ID_PROCESS_START: string;
  CANCER_INTRO_QUESTION_PATIENT_ID: string;
  CANCER_INTRO_QUESTION_CAREGIVER_ID: string;
  CANCER_PROFILE_PATIENT_ID: string;
  CANCER_PROFILE_CAREGIVER_ID: string;
  CANCER_PATIENT_SURVEY_ID: string;
  CANCER_CAREGIVER_SURVEY_ID: string;
  ATHLETE_PROFILE_FORM: string;
  ATHLETE_SURVEY_FORM: string;
  SENIOR_INTRO_QUESTION_PATIENT_ID: string;
  SENIOR_INTRO_QUESTION_CAREGIVER_ID: string;
  SENIOR_PROFILE_PATIENT_ID: string;
  SENIOR_PROFILE_CAREGIVER_ID: string;
  SENIOR_SURVEY_FORM: string;
  WEB_APP_URL: string;
}

declare global {
  interface Window {
    data: {
      hosts: Hosts[];
      isProduction: boolean;
      environments: Record<Hosts, EnvironmentsConfigs>;
      getEnv: (key: keyof EnvironmentsConfigs) => string | null;
      isMarketingSite: (host: string) => boolean;
      isPartnerSite: (host: string) => boolean;
    };
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {env.VITE_APP_ENV === "local" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
