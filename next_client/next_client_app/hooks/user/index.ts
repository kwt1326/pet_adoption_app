import Cookie from 'universal-cookie';
import JsonWebToken from 'jsonwebtoken';
import { useQuery } from "@apollo/client";
import { GetServerSidePropsContext } from 'next';

import { GET_ONE_ADOPTEE_USER, GET_ONE_ADOPT_USER } from "../../quries/userFindQuery";

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

export function useUserDetail() {
  const userInfo = useUserInfo();
  let oneUser = {};
  if (userInfo?.userType === "ADOPTEE_USER") {
    const { data } = useQuery(GET_ONE_ADOPTEE_USER, {
      variables: {
        id: userInfo?.id,
      },
    });
    oneUser = data?.getOneAdopteeUser;
  } else if (userInfo?.userType === "ADOPT_USER") {
    const { data } = useQuery(GET_ONE_ADOPT_USER, {
      variables: {
        id: userInfo?.id,
      },
    });
    oneUser = data?.getOneAdoptUser;
  }
  return oneUser;
}
