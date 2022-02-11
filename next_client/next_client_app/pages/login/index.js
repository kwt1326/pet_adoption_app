import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import cookie from "js-cookie";
import Header from "../../components/Header/index";
import { LOGIN_QUERY } from "../../quries/authQuery";
import style from "./login.module.scss";
import Router from "next/router";
import SignInput from "../../components/signInput";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCookie, setIsCookie] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loginQuery] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      input: {
        email: email,
        password: password,
      },
    },
    fetchPolicy: "no-cache",
  });
  const validateForm = () => {
    let validated = true;
    if (!email) {
      setErrorText("이메일을 입력하세요");
      validated = false;
    } else if (!password) {
      setErrorText("비밀번호를 입력하세요");
      validated = false;
    }
    return validated;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const response = await loginQuery();
      const responseData = response?.data?.login;
      if (responseData) {
        cookie.set(process.env.JWT_KEY, responseData.result.token);
      }
      if (response?.data?.login?.statusCode === 200) {
        setIsCookie(responseData.result.token);
        Router.push("/");
      } else {
        setErrorText("아이디 혹은 비밀번호가 존재하지 않습니다");
      }
    }
  };

  return (
    <div>
      <Header children={"로그인"} isLogin={isCookie} />
      <div className={style.container}>
        <form onSubmit={onSubmit} className={style.inputArea}>
          <SignInput
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email을 입력하세요"
            type="text"
          />
          <SignInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
          <div className={style.validText}>{errorText}</div>
          <button type="submit">로그인</button>
        </form>
        <div className={style.search}>
          <Link href="findPassword">
            <a>비밀번호 찾기</a>
          </Link>
        </div>
        <div className={style.join}>
          <Link href={`signIn/personalSignIn`}>
            <a>개인 회원가입</a>
          </Link>
          <span> / </span>
          <Link href="signIn/corpSignIn">
            <a>업체 회원가입</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default login;
