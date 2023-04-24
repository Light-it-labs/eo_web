/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_AUTH_SSO_CLIENT_ID: string;
  readonly VITE_API_URL: string;
  readonly VITE_APP_ENV: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
