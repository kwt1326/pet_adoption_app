import React from "react";
import Header from "../../components/Header/subHeader";
import style from "./login.module.scss";
import Link from "next/link";

function login() {
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.inputArea}>
          <input placeholder="email을 입력하세요"></input>
          <input type="password" placeholder="비밀번호를 입력하세요"></input>
          <button>로그인</button>
        </div>
        <div className={style.search}>
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
        </div>
        <div className={style.join}>
          <Link href="../signIn/personalSignIn">
            <a>개인 회원가입</a>
          </Link>
          <span> / </span>
          <Link href="../signIn/corpSignIn">
            <a>업체 회원가입</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default login;
