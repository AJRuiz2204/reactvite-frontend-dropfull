import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: number;
  email: string;
  firstName?: string;
  lastName?: string;
}

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
