import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import cookie from "js-cookie";

import Header from "../../components/Header/index";
import { deviceLogin } from '../../utils/nativeInterfaceUtil';
import { LOGIN_QUERY } from "../../quries/authQuery";
import style from "./login.module.scss";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState({
    isComplete: true,
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const [loginQuery] = useLazyQuery(LOGIN_QUERY, {
    variables: {
      input: {
        email: email,
        password: password,
      },
    },
    fetchPolicy: 'no-cache'
  });

  const loginFunc = async () => {
    if (email === "" || password === "") {
      setTrigger(() => {
        return { isComplete: false };
      });
    } else {
      setTrigger(() => {
        return { isComplete: true };
      });
      const response = await loginQuery();
      const responseData = response?.data?.login;
      if (responseData) {
        deviceLogin(responseData.result.token);
        cookie.set(process.env.JWT_KEY, responseData.result.token);
      }
    }
  };

  return (
    <div>
      <Header children={"로그인"} />
      <div className={style.container}>
        <div className={style.inputArea}>
          <input name="email" onChange={onChange} placeholder="email을 입력하세요"></input>
          <input name="password" onChange={onChange} type="password" placeholder="비밀번호를 입력하세요"></input>
          <button onClick={loginFunc}>로그인</button>
        </div>
        {trigger.isComplete === false ? "아이디, 비밀번호를 모두 입력하세요" : null}
        <div className={style.search}>
          <div>아이디 찾기</div>
          <div>비밀번호 찾기</div>
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
