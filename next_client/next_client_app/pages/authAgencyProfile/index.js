import React from "react";
import AgencyListItem from "../../components/AgencyListItem";
import styles from "./authAgencyProfile.module.scss";
import Header from "../../components/Header/index";
const temp = {
  name: "땡땡 업체",
  forSale: 12,
  saleComplete: 2,
};
const basic = {
  phone: "010 - 1111 - 1111",
  homePage: "없음",
  address: "서울특별시 어디구 어디구 어디구 머머머머 어디어",
  map: "1.jpg",
};
const auth = {
  num: "0913423432432",
};
function AuthAgencyProfile(props) {
  const { phone, homePage, address, map } = basic;
  const { num } = auth;
  return (
    <div>
      <Header children={"업체 프로필"} />
      <AgencyListItem item={temp}></AgencyListItem>

      <div className={styles.basicInfo}>
        <div className={styles.title}>기본정보</div>
        <div className={styles.content}>
          <div className={styles.contentitem}>
            <div className={styles.subtitle}> 대표 전화</div>
            <div>{phone}</div>
          </div>
          <div className={styles.contentitem}>
            <div className={styles.subtitle}> 홈페이지</div>
            <div> {homePage}</div>
          </div>
          <div className={styles.contentitem}>
            <div className={styles.subtitle}>주소</div>
            <div> {address}</div>
          </div>
          <div className={styles.contentitem}>지도</div>
        </div>
      </div>
      <div className={styles.authInfo}>
        <div className={styles.title}>인증정보</div>
        <div className={styles.content}>
          <div className={styles.contentitem}>
            <div className={styles.subtitle}>사업자 등록 번호</div>
            <div>{num}</div>
          </div>
          <div className={styles.contentitem}>
            <div>업체 인테리어</div>
            <div></div>
          </div>
          <div className={styles.contentitem}>
            <div>매매계약서 양식</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthAgencyProfile;
