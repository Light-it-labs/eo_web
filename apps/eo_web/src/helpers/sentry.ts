import React from "react";
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

import { env } from "~/env";

const sentryDns =
  window.data.getEnv("VITE_SENTRY_DSN_PUBLIC") ?? env.VITE_SENTRY_DSN_PUBLIC;

if (sentryDns) {
  Sentry.init({
    environment: window.data.getEnv("VITE_APP_ENV") ?? env.VITE_APP_ENV,
    dsn: sentryDns,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration({
        // Additional SDK configuration goes in here, for example:
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [
      "localhost",
      "www.eo.care",
      "partner.eo.care",
      "eo-marketing-06cbaf66a5b1fbfeecb0ca9525.webflow.io",
      "eo-marketing.webflow.io",
    ],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}
