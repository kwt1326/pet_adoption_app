import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { withRouter } from "next/router";
import Link from "next/link";

import Header from "../../components/Header";
import SignInput from "../../components/SignInput";
import { LOGIN_QUERY } from "../../quries/authQuery";
import { localLogin } from "../../utils/authUtil";
import style from "./login.module.scss";

function login(props) {
  const client = useApolloClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

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
      const { data, error } = await client.query({
        query: LOGIN_QUERY,
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
        fetchPolicy: "no-cache",
        errorPolicy: 'ignore' // TODO: error catch
      });
      if (data) {
        const responseData = data?.login;
        if (responseData) {
          localLogin(responseData.result.token);
          props.router.push('/');
          return;
        }
      }
      console.log(error);
      setErrorText("아이디 혹은 비밀번호가 존재하지 않습니다");
    }
  };

  return (
    <div>
      <Header children={"로그인"} />
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
        <div className={style.join}>
          <Link
            href={{
              pathname: "/signIn",
              query: { type: "개인" },
            }}
          >
            <a>개인 회원가입</a>
          </Link>
          <span> / </span>
          <Link
            href={{
              pathname: "/signIn",
              query: { type: "업체" },
            }}
          >
            <a>업체 회원가입</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withRouter(login);
