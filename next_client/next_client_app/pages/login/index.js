import React from "react";
import Header from "../../components/Header/subHeader";
import style from "./login.module.scss";
import Link from "next/link";
import { useState } from "react";
import cookie from "js-cookie";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../quries/authQuery";

function login() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [loginQuery, { data: token }] = useLazyQuery(LOGIN_QUERY);

  // GraphQL / LOGIN QUERY
  const loginFunc = async () => {
    const response = await loginQuery({
      variables: {
        input: {
          email: inputs.email,
          password: inputs.password,
        },
      },
    });
    console.log("RESPONSE", response, token);
    const responseData = response?.data?.login;
    if (responseData) {
      console.log(responseData.result.token);
      cookie.set(process.env.JWT_KEY, responseData.result.token);
    }
  };

  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style.inputArea}>
          <input
            name="email"
            onChange={onChange}
            value={email}
            placeholder="email을 입력하세요"
          ></input>
          <input
            name="password"
            onChange={onChange}
            value={password}
            type="password"
            placeholder="비밀번호를 입력하세요"
          ></input>
          <button onClick={loginFunc}>로그인</button>
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
