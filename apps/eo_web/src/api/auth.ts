import { api } from "~/api/axios";
import { API_URL } from "~/api/common";
import {
  useProfileStore,
  type Profile,
  type Session,
} from "~/stores/useProfileStore";

interface LoginResponse {
  profile: Profile;
  session: Session;
}

export const login = async (credential: {
  email: string;
  password: string;
}) => {
  return await api.post<LoginResponse>(`${API_URL}/v2/profile/login`, {
    email: credential.email,
    password: credential.password,
  });
};

export const register = async (credential: {
  email: string;
  password: string;
}) => {
  return await api.post<string>(`${API_URL}/v2/profile`, {
    email: credential.email,
    password: credential.password,
  });
};

export const GetToken = () => {
  const session = useProfileStore((state) => state.session);
  return session?.token;
};
