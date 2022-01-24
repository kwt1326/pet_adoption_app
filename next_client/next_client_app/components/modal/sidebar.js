import React from "react";
import styles from "./sidebar.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

const Sidebar = (props) => {
  const { open, close } = props;
  return (
    <div className={open ? `${styles.modal} ${styles.openSidebar}` : styles.modal}>
      {open ? (
        <section>
          <div className={styles.userSection}>
            <div className={styles.login}>
              <Link href="login/login">
                <a>
                  <span>로그인하기</span>
                </a>
              </Link>
              <IoCloseOutline onClick={close} />
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
