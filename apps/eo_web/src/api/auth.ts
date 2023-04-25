import { api } from "~/api/axios";

const API_URL = "";

interface LoginResponse {
  profile: unknown;
  session: unknown;
}

export const login = async (credential: {
  email: string;
  password: string;
}) => {
  return await api.post<LoginResponse>(`${API_URL}/v2/login`, {
    email: credential.email,
    password: credential.password,
  });
};

export const register = async (email: string, password: string) => {
  return await api.post<LoginResponse>(`${API_URL}/v2/profile`, {
    email,
    password,
  });
};
