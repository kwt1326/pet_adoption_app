import React from "react";
import Header from "../../components/Header/index";
import style from "./signIn.module.scss";
import { useState } from "react";
// import cookie from 'js-cookie';
import { useMutation } from "@apollo/client";
import { SIGN_UP_QUERY } from "../../quries/authQuery";

function personalSignIn() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const { name, password, nickname, confirmPassword } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const [signUpQuery] = useMutation(SIGN_UP_QUERY);

  const handleUserCreateClick = () => {
    const response = signUpQuery({
      variables: {
        input: {
          email: inputs.email,
          password: inputs.password,
          nickname: inputs.nickname,
        },
      },
    });
  };

  return (
    <div>
      <Header children={"개인 회원가입"} />
      <div className={style.container}>
        <div className={style.infoContainer}>
          <h4>개인정보</h4>
          <div>
            <input name="email" onChange={onChange} value={name} className={style.inputArea} placeholder="이메일을 입력하세요"></input>
            <button className={style.button}>조회</button>
          </div>
          <input name="password" onChange={onChange} value={password} className={style.inputArea} type="password" placeholder="비밀번호를 입력하세요"></input>
          <input name="confirmPassword" onChange={onChange} value={confirmPassword} className={style.inputArea} type="password" placeholder="비밀번호를 재입력하세요"></input>
          <div>
            <input name="nickname" onChange={onChange} value={nickname} className={style.inputArea} placeholder="닉네임을 입력하세요"></input>
            <button className={style.button}>중복확인</button>
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

export default personalSignIn;
