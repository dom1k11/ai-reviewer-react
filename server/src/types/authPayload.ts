import { AUTH0_CLAIMS } from "@/constants/auth0Claims";

export interface AuthPayload {
  sub?: string;
  [AUTH0_CLAIMS.EMAIL]?: string;
  [AUTH0_CLAIMS.NICKNAME]?: string;
}
