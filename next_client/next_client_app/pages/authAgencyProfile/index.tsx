import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";

import { useUserInfo } from "../../hooks/user";
import AgencyListItem from "../../components/Agencylist/AgencyListItem";
import Header from "../../components/Header";
import styles from "./authAgencyProfile.module.scss";

import { GET_ADOPT_USER_DETAIL } from "../../quries/userFindQuery";
import { phoneHyphen } from "../../utils/phoneHyphen";

function AuthAgencyProfile() {
  const router = useRouter();
  const [getDetail, { data }] = useLazyQuery(GET_ADOPT_USER_DETAIL);

  useEffect(() => {
    getDetail({
      variables: { id: Number(router.query?.id) }
    });
  }, [router.query?.id])

  if (data?.getOneAdoptUser) {
    const _data = data?.getOneAdoptUser
    const companyName = _data.companyName || '';
    const address = _data.address || '';
    const phoneNumber = _data.phoneNumber || '-';
    const homepage = _data.pageUri || '없음';
    const isAuthenticated = _data.isAuthenticated;
  
    return (
      <div className={styles.container}>
        <Header children={"업체 프로필"} />
        <AgencyListItem item={{ companyName, isAuthenticated }} />
        <div className={styles.basicInfo}>
          <div className={styles.title}>기본정보</div>
          <div className={styles.content}>
            <div className={styles.contentitem}>
              <div className={styles.subtitle}>대표전화</div>
              <div>{phoneHyphen(phoneNumber)}</div>
            </div>
            <div className={styles.contentitem}>
              <div className={styles.subtitle}>홈페이지</div>
              <a href={homepage}>{homepage}</a>
            </div>
            <div className={styles.contentitem}>
              <div className={styles.subtitle}>주소</div>
              <div> {address}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>loading...</div>
}

export default AuthAgencyProfile;
