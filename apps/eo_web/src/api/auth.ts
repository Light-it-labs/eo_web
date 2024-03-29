import { apiElixir } from "~/api/axios";
import {
  useProfileStore,
  type Profile,
  type Session,
} from "~/stores/useProfileStore";

interface LoginResponse {
  profile: Profile;
  session: Session;
}

export const login = async (credential: { email: string; password: string }) =>
  await apiElixir.post<LoginResponse>("/v2/profile/login", {
    email: credential.email,
    password: credential.password,
  });

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const register = async (registrationForm: RegisterRequest) =>
  await apiElixir.post<string>("/v2/profile", registrationForm);

export const GetToken = () => {
  const session = useProfileStore((state) => state.session);
  return session?.token;
};
