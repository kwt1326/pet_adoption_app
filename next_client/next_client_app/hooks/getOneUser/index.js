import { GET_ONE_ADOPTEE_USER, GET_ONE_ADOPT_USER } from "../../quries/userFindQuery";
import { useQuery } from "@apollo/client";
import { useUserInfo } from "../user";

export function getOneUser() {
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
