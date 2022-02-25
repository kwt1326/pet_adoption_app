import Cookie from 'universal-cookie';
import { isLoggedVar, tokenVar } from '../apollo/client';

export function localLogin(token: string) {
  (new Cookie()).set(process.env.JWT_KEY, token);
  isLoggedVar(true);
  tokenVar(token);
}

export function localLogout() {
  (new Cookie()).remove(process.env.JWT_KEY);
  isLoggedVar(false);
  tokenVar(null);
}
