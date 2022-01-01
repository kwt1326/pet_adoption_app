import React from "react";
import styles from "./sidebar.module.scss";
import { IoCloseOutline } from "react-icons/io5";

const Sidebar = (props) => {
  const { open, close } = props;
  console.log(open);
  console.log(close);
  return (
    <div className={open ? `${styles.modal} ${styles.openSidebar}` : styles.modal}>
      {open ? (
        <section>
          <div className={styles.userSection}>
            <div className={styles.login}>
              <span>로그인하기</span>
              <IoCloseOutline onClick={close} />
            </div>
            <div className={styles.info}>
              <span>회원가입 후 다양한 서비스를 이용해보세요</span>
              <div>
                <span>개인회원가입</span> / <span>업체회원가입</span>
              </div>
            </div>
          </div>
          <ul className={styles.menuList}>
            <li>MENU</li>
            <li>
              분양받기
              <ul>
                <li>강아지 분양받기</li>
                <li>고양이 분양받기</li>
              </ul>
            </li>
            <li>
              커뮤니티
              <ul>
                <li>입양후기</li>
                <li>이벤트 게시판</li>
              </ul>
            </li>
            <li>인증업체현황</li>
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default Sidebar;
