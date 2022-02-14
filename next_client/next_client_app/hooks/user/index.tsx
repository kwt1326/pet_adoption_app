import cookies from 'js-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export function useUserInfo() {
  const token = cookies.get(process.env.JWT_KEY)
  const decode = token ? jwtDecode<JwtPayload>(token) : undefined

  return decode
}