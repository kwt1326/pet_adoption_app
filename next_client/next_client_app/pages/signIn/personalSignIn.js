import React from "react";
import Header from "../../components/Header/subHeader";
import style from "./signIn.module.scss";

function personalSignIn() {
  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.infoContainer}>
          <h4>개인정보</h4>
          <div>
            <input className={style.inputArea} placeholder="이메일을 입력하세요"></input>
            <button className={style.button}>조회</button>
          </div>
          <input className={style.inputArea} type="password" placeholder="비밀번호를 입력하세요"></input>
          <input className={style.inputArea} type="password" placeholder="비밀번호를 재입력하세요"></input>
          <div>
            <input className={style.inputArea} placeholder="닉네임을 입력하세요"></input>
            <button className={style.button}>중복확인</button>
          </div>
        </div>
      </div>
      <div className={style.searchContainer}>
        <button className={style.button}>회원가입하기</button>
      </div>
    </div>
  );
}

export default personalSignIn;
