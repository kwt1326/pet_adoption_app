import { GetServerSidePropsContext } from 'next';
import Cookie from 'universal-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export function useUserInfo(ctx?: GetServerSidePropsContext) {
  console.log(ctx?.req.headers.cookie)
  let cookie = null;
  if (process.env.NEXT_IS_SERVER === 'true') {
    cookie = new Cookie(ctx?.req.headers.cookie)
  }
  cookie = new Cookie();
  const token = cookie.get(process.env.JWT_KEY)
  const decode = token ? jwtDecode<JwtPayload>(token) : undefined

  return decode
}
