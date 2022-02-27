import { GetServerSidePropsContext } from 'next';
import Cookie from 'universal-cookie';
import JsonWebToken from 'jsonwebtoken';

export function useUserInfo(ctx?: GetServerSidePropsContext) {
  let cookie = null;
  if (process.env.NEXT_IS_SERVER === 'true') {
    cookie = new Cookie(ctx?.req.headers.cookie)
  } else {
    cookie = new Cookie();
  }
  const token = cookie.get(process.env.JWT_KEY)
  const decode = token ? JsonWebToken.decode(token) : undefined
  return decode
}
