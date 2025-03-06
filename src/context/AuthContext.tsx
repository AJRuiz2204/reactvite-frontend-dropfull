import { createContext } from 'react';
import { JwtPayload } from '../services/jwt';

export interface AuthContextProps {
  token: string | null;
  user: JwtPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  login: () => {},
  logout: () => {},
});
