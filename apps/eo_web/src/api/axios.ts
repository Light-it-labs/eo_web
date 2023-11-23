import axios from "axios";

import { API_ELIXIR, API_LARAVEL } from "~/configs/env";

export const apiElixir = axios.create({
  baseURL: API_ELIXIR,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiLaravel = axios.create({
  baseURL: API_LARAVEL,
  headers: {
    "Content-Type": "application/json",
  },
});
