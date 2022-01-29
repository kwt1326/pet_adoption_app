import { React, useState } from "react";
import Header from "../../components/Header/index";
import style from "./signIn.module.scss";
import { useMutation } from "@apollo/client";
import { CORP_SIGN_UP_QUERY } from "../../quries/authQuery";

// import { useMutation } from "@apollo/client";
// import { SIGN_UP_QUERY2 } from "../../quries/authQuery";
function corpSignIn() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    nickname: "",
    companyName: "",
    address: "",
    phoneNumber: "",
    pageUri: "",
    email: "",
    password: "",
  });
  const { name, password, nickname, companyName, address, phoneNumber, pageUri } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [corpSignUpQuery, { data: token }] = useMutation(CORP_SIGN_UP_QUERY);
  const handleUserCreateClick = () => {
    const response = corpSignUpQuery({
      variables: {
        input: {
          nickname: inputs.nickname,
          companyName: inputs.companyName,
          address: inputs.address,
          phoneNumber: inputs.phoneNumber,
          pageUri: inputs.pageUri,
          email: inputs.email,
          password: inputs.password,
          isProfit: true,
        },
      },
    });
  };
  return (
    <div>
      <Header children={"업체 회원가입"} />
      <div className={style.container}>
        <div className={style.infoContainer}>
          <h4>개인정보</h4>
          <div>
            <input className={style.inputArea} placeholder="이메일을 입력하세요" onChange={onChange} value={email} name="email"></input>
            <button className={style.button}>조회</button>
          </div>
          <input className={style.inputArea} type="password" value={password} onChange={onChange} name="password" placeholder="비밀번호를 입력하세요"></input>
          <input className={style.inputArea} type="password" onChange={onChange} name="password" placeholder="비밀번호를 재입력하세요"></input>
          <div>
            <input className={style.inputArea} value={nickname} onChange={onChange} name="nickname" placeholder="닉네임을 입력하세요"></input>
            <button className={style.button}>중복확인</button>
          </div>
        </div>
        <div className={style.infoContainer}>
          <h4>기업정보</h4>
          <input className={style.inputArea} placeholder="업체명을 입력하세요" onChange={onChange} value={companyName} name="companyName"></input>
          <div>
            <input className={style.inputArea} placeholder="주소를 입력하세요" onChange={onChange} value={address} name="address"></input>
            <button className={style.button}>주소찾기</button>
          </div>
          <input className={style.inputArea} placeholder="전화번호를 입력하세요" onChange={onChange} value={phoneNumber} name="phoneNumber"></input>
          <input className={style.inputArea} placeholder="홈페이지를 입력하세요" onChange={onChange} value={pageUri} name="pageUri"></input>
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
        <button className={style.button} onClick={handleUserCreateClick}>
          회원가입하기
        </button>
      </div>
    </div>
  );
}

export default corpSignIn;
