import React from "react";
import Link from "next/link";
import { IoCloseOutline } from "react-icons/io5";

import { useUserInfo } from "../../hooks/user";
import { localLogout } from "../../utils/authUtil";
import { GET_ONE_ADOPTEE_USER, GET_ONE_ADOPT_USER } from "../../quries/userFindQuery";
import styles from "./SideBar.module.scss";

const Sidebar = ({ router, sidebarOnOff, onOffSidebar }) => {
  const userInfo = useUserInfo();

  const closeSidebar = () => {
    onOffSidebar(false);
  };
  const logout = () => {
    localLogout();
    router.replace("/");
  };

  const BeforeLogin = () => {
    return (
      <div className={styles.userSection}>
        <div className={styles.login}>
          <Link href="/login">
            <a>
              <span>로그인하기</span>
            </a>
          </Link>
          <IoCloseOutline onClick={closeSidebar} />
        </div>
        <div className={styles.info}>
          <span>회원가입 후 다양한 서비스를 이용해보세요</span>
          <div>
            <Link
              href={{
                pathname: "signIn",
                query: { type: "개인" },
                as: "/signIn",
              }}
            >
              <a>개인 회원가입</a>
            </Link>
            <span>/</span>
            <Link
              href={{
                pathname: "signIn",
                query: { type: "업체" },
                as: "/signIn",
              }}
            >
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
            <span className={styles.nickname}>{userInfo?.nickname || "사용자"}</span>
            <span> 님 어서오세요.</span>
          </div>
          <IoCloseOutline onClick={closeSidebar} />
        </div>
        <ul className={styles.afterInfo}>
          <li>
            <Link href="myPage">
              <a>마이페이지</a>
            </Link>
          </li>
          <li>
            <Link href="/favorities">
              <a>찜리스트</a>
            </Link>
          </li>
          <li onClick={logout}>로그아웃</li>
        </ul>
      </div>
    );
  };
  return (
    <div className={sidebarOnOff ? `${styles.modal} ${styles.openSidebar}` : styles.modal}>
      {sidebarOnOff ? (
        <section>
          {userInfo ? <AfterLogin /> : <BeforeLogin />}
          <ul className={styles.menuList}>
            <li>MENU</li>
            {userInfo?.userType === "ADOPT_USER" && (
              <li>
                작성하기
                <ul>
                  <li>
                    <Link href="/post/register">
                      <a>입양글 작성하기</a>
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li>
              분양받기
              <ul>
                <li>
                  <Link href="/post/list/dog">
                    <a>강아지 분양받기</a>
                  </Link>
                </li>
                <li>
                  <Link href="/post/list/cat">
                    <a>고양이 분양받기</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              커뮤니티
              <ul>
                <li>
                  <Link href="/reviews">
                    <a>입양후기</a>
                  </Link>
                </li>
                <li>
                  <Link href="/event">
                    <a>이벤트 게시판</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/authagency">
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
