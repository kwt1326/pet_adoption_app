import { GetServerSidePropsContext } from 'next';
import Cookie from 'universal-cookie';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export function useUserInfo(params: { ctx?: GetServerSidePropsContext }) {
  let cookie = null;
  if (process.env.NEXT_IS_SERVER === 'true') {
    cookie = new Cookie(params?.ctx.req.headers.cookie)
    console.log(process.env.NEXT_IS_SERVER, cookie.get(process.env.JWT_KEY));
    return
  }
  cookie = new Cookie();
  const token = cookie.get(process.env.JWT_KEY)
  const decode = token ? jwtDecode<JwtPayload>(token) : undefined

  return decode
}
