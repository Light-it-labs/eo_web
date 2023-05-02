import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import { env } from "./env";
import { Router } from "./router";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();
declare global {
  interface Window {
    data: {
      API_URL: string;
      PROFILE_ONE_ID: string;
      PROFILE_TWO_ID: string;
      ZUKO_SLUG_ID_PROCESS_START: string;
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
