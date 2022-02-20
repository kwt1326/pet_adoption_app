import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import style from "./personalInfo.module.scss";
import Header from "../../components/Header/index";
import { DELETE_ONE_USER } from "../../quries/userQuery";
import { useUserInfo } from "../../hooks/user";
import Cookies from "js-cookie";
import Router from "next/router";

const personalInfo = () => {
  const [deleteOneUserQuery] = useMutation(DELETE_ONE_USER);

  const userInfo = useUserInfo();
  const removeUser = async () => {
    const id = userInfo.id;
    const response = await deleteOneUserQuery({
      variables: {
        id: parseFloat(id),
      },
    });

    Cookies.remove("with-pet-jwt");
    Router.push("/");
  };
  return (
    <div>
      <Header children={"개인정보 수정"} />
      <div className={style.container}>
        <div className={style.card}>
          <h4 className={style.title}>사용자 정보</h4>
          <ul className={style.content}>
            <li>
              <span>이메일</span>
              <span>{}asdfasdf</span>
            </li>
            <li>
              <span>닉네임</span>
              <input></input>
            </li>
          </ul>
        </div>
        <div className={style.card}>
          <h4 className={style.title}>비밀번호 수정</h4>
          <ul className={style.content}>
            <li>
              <span>비밀번호</span>
              <input></input>
            </li>
          </ul>
        </div>
        <div className={style.card}>
          <h4 className={style.title}>탈퇴하기</h4>
          <div className={style.content}>
            <p className={style.info}>withPet을 더 이상 이용하지 않을 경우 회원탈퇴를 진행해주세요.</p>
            <button className={style.endbutton} onClick={removeUser}>
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default personalInfo;
