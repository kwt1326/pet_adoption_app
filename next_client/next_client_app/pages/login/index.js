import React from "react";
import Header from "../../components/Header/index";
import style from "./login.module.scss";
import Link from "next/link";
import { useState } from "react";
import cookie from "js-cookie";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_QUERY } from "../../quries/authQuery";

function login() {
  // const [inputs, setInputs] = useState({
  //   email: "",
  //   password: "",
  // });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [trigger, setTrigger] = useState({
    isComplete: true,
  });
  // const { email, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
    // setInputs({
    //   ...inputs,
    //   [name]: value,
    // });
  };
  const [loginQuery, { data: token }] = useLazyQuery(LOGIN_QUERY);
  // const [loginQuery] = useLazyQuery(LOGIN_QUERY);

  // GraphQL / LOGIN QUERY
  const loginFunc = async () => {
    if (email === "" || password === "") {
      setTrigger(() => {
        return { isComplete: false };
      });
    } else {
      setTrigger(() => {
        return { isComplete: true };
      });
      const response = await loginQuery({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
      console.log(response);
      console.log(token);
      const responseData = response?.data?.login;
      if (responseData) {
        console.log(responseData.result.token);
        cookie.set(process.env.JWT_KEY, responseData.result.token);
      }
    }
  };

  return (
    <div>
      <Header children={"로그인"} />
      <div className={style.container}>
        <div className={style.inputArea}>
          <input name="email" onChange={onChange} value={email} placeholder="email을 입력하세요"></input>
          <input name="password" onChange={onChange} value={password} type="password" placeholder="비밀번호를 입력하세요"></input>
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
