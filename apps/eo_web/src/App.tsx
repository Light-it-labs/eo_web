import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import { env } from "./env";
import { Router } from "./router";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient();
type Envs =
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
  CANCER_PROFILING: string;
  CANCER_USER_DATA: string;
  CANCER_SURVEY_FORM: string;
}

declare global {
  interface Window {
    data: {
      hosts: Envs[];
      isProduction: boolean;
      environments: Record<Envs, EnvironmentsConfigs>;
      getEnv: (key: keyof EnvironmentsConfigs) => string | null;
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
