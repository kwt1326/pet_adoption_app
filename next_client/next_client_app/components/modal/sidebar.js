import React from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import styles from "./sidebar.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { GET_ONE_ADOPTEE_USER, GET_ONE_ADOPT_USER } from "../../quries/userFindQuery";

const Sidebar = ({ sidebarOnOff, onOffSidebar }) => {
  const userTokenInfo = {};
  const getToken = () => {
    let isToken = false;
    const token = Cookies.get("with-pet-jwt");
    if (token) {
      isToken = true;
      const base64Payload = token.split(".")[1];
      const payload = Buffer.from(base64Payload, "base64");
      userTokenInfo = JSON.parse(payload.toString());
    } else {
      isToken = false;
    }
    return isToken;
  };

  const closeSidebar = () => {
    onOffSidebar(false);
  };
  const logout = () => {
    Cookies.remove("with-pet-jwt");
    Router.push("/");
  };

  const BeforeLogin = () => {
    return (
      <div className={styles.userSection}>
        <div className={styles.login}>
          <Link href="login">
            <a>
              <span>로그인하기</span>
            </a>
          </Link>
          <IoCloseOutline onClick={closeSidebar} />
        </div>
        <div className={styles.info}>
          <span>회원가입 후 다양한 서비스를 이용해보세요</span>
          <div>
            <Link href="signIn/personalSignIn">
              <a>개인 회원가입</a>
            </Link>
            <span>/</span>
            <Link href="signIn/corpSignIn">
              <a>업체 회원가입</a>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  const AfterLogin = () => {
    return (
      <div className={styles.userSection}>
        <div className={styles.login}>
          <div className={styles.loginText}>
            <span>{userTokenInfo.nickname}</span> 님 어서오세요.
          </div>
          <IoCloseOutline onClick={closeSidebar} />
        </div>
        <ul className={styles.afterInfo}>
          <li>마이페이지</li>
          <li>찜리스트</li>
          <li onClick={logout}>로그아웃</li>
        </ul>
      </div>
    );
  };
  return (
    <div className={sidebarOnOff ? `${styles.modal} ${styles.openSidebar}` : styles.modal}>
      {sidebarOnOff ? (
        <section>
          {getToken() ? AfterLogin() : BeforeLogin()}
          <ul className={styles.menuList}>
            <li>MENU</li>
            <li>
              분양받기
              <ul>
                <li>
                  <Link href="puppyadopt">
                    <a>강아지 분양받기</a>
                  </Link>
                </li>
                <li>
                  <Link href="catAdopt">
                    <a>고양이 분양받기</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              커뮤니티
              <ul>
                <li>
                  <Link href="adoptReview">
                    <a>입양후기</a>
                  </Link>
                </li>
                <li>
                  <Link href="event">
                    <a>이벤트 게시판</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="authagency">
                <a>인증업체현황</a>
              </Link>
            </li>
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default Sidebar;
