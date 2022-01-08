import React from "react";
import Header from "../../components/Header/subHeader";
import style from "./signIn.module.scss";

function corpSignIn() {
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
        <div className={style.infoContainer}>
          <h4>기업정보</h4>
          <input className={style.inputArea} placeholder="업체명을 입력하세요"></input>
          <div>
            <input className={style.inputArea} placeholder="주소를 입력하세요"></input>
            <button className={style.button}>주소찾기</button>
          </div>
          <input className={style.inputArea} placeholder="전화번호를 입력하세요"></input>
          <input className={style.inputArea} placeholder="홈페이지를 입력하세요"></input>
        </div>
        <div className={[style.infoContainer, style.picture].join(" ")}>
          <h4>사진정보</h4>
          <div>
            <span>매장 인테리어 사진(1장이상)</span>
            <div className={style.pictureChoice}></div>
          </div>
          <div>
            <span>업체 대표 사진(1장)</span>
            <div className={style.pictureChoice}></div>
          </div>
          <div>
            <span>매매계약서 사진(1장이상)</span>
            <div className={style.pictureChoice}></div>
          </div>
        </div>
      </div>
      <div className={style.searchContainer}>
        <button className={style.button}>회원가입하기</button>
      </div>
    </div>
  );
}

export default corpSignIn;
