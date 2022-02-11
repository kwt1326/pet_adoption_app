import React, { useState } from "react";
import style from "./findPassword.module.scss";
import { useLazyQuery } from "@apollo/client";
import Header from "../../components/Header/index";
import { GET_ONE_ADOPTEE_USER, GET_ONE_ADOPT_USER, GET_ALL_ADOPTEE_USER, GET_ALL_ADOPT_USER } from "../../quries/userFindQuery";

function findPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const [getAllAdopteeQuery] = useLazyQuery(GET_ALL_ADOPTEE_USER);
  const [getAllAdoptQuery] = useLazyQuery(GET_ALL_ADOPT_USER);

  const findUserId = async () => {
    const AllAdoptee = await getAllAdopteeQuery();
    const AllAdopt = await getAllAdoptQuery();
    //모든 유저 리스트 재생성
    let userList = [];
    if (AllAdoptee?.data?.getAllAdopteeUser || AllAdopt?.data?.getAllAdopteeUser) {
      AllAdoptee.data.getAllAdopteeUser.map((user) => {
        userList.push(user.user);
      });
      AllAdopt.data.getAllAdoptUser.map((user) => {
        userList.push(user.user);
      });
    }
    //이메일 입력한 유저 존재 유무
    let oneUser = userList.find((userInfo) => {
      return userInfo.email === email;
    });
    if (!oneUser) {
      setErrorMsg("가입되지 않은 이메일 주소 입니다.");
      setIsTrue(false);
    } else {
      setErrorMsg("");
      setIsTrue(true);
    }
  };

  const passwordInput = () => {
    return (
      <div className={style.dFlex}>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 입력하세요"
          type="password"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 재입력하세요"
          type="password"
        />
        <button className={style.button}>비밀번호 저장</button>
      </div>
    );
  };

  return (
    <div>
      <Header children={"비밀번호 재입력"} />
      <div className={style.dFlex}>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="이메일을 입력하세요"
          type="text"
        />
        {errorMsg ? <div>{errorMsg}</div> : null}
        <button
          className={style.button}
          onClick={() => {
            findUserId();
          }}
        >
          조회
        </button>
        {isTrue ? passwordInput() : null}
      </div>
    </div>
  );
}

export default findPassword;
