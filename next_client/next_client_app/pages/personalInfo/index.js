import React, { useState } from "react";
import { concat, useMutation } from "@apollo/client";
import style from "./personalInfo.module.scss";
import Header from "../../components/Header/index";
import { DELETE_ONE_USER, ADOPTEE_USER, ADOPT_USER } from "../../quries/userQuery";
import { useUserInfo } from "../../hooks/user";
import { localLogout } from "../../utils/authUtil";
import Router from "next/router";

const personalInfo = () => {
  const userInfo = useUserInfo();
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [password, setPassword] = useState("");

  const [deleteOneUserQuery] = useMutation(DELETE_ONE_USER);
  const [adopteeUserQuery] = useMutation(ADOPTEE_USER);
  const [adoptUserQuery] = useMutation(ADOPT_USER);

  //유저삭제
  const removeUser = async () => {
    const id = userInfo.id;
    const response = await deleteOneUserQuery({
      variables: {
        id: parseFloat(id),
      },
    });
    localLogout();
    Router.push("/");
  };

  //수정 엘리먼트
  const editElement = (type) => {
    const whatType = () => {
      if (type === "password") {
        editPassword();
      } else if (type === "nickname") {
        editNickname();
      }
    };
    return (
      <>
        <input
          value={type === "nickname" ? nickname : password}
          onChange={(e) => {
            if (type === "nickname") {
              setNickname(e.target.value);
            } else {
              setPassword(e.target.value);
            }
          }}
        ></input>
        <button
          className={style.btn}
          onClick={() => {
            whatType();
          }}
        >
          확인
        </button>
      </>
    );
  };
  //패스워드 수정 시
  const editPassword = async () => {
    setIsEditPassword(false);
    if (userInfo?.userType === "ADOPTEE_USER") {
      const response = await adopteeUserQuery({
        variables: {
          userId: parseFloat(userInfo?.id),
          nickname: nickname,
        },
      });
      console.log(response);
    } else if (userInfo?.userType === "ADOPT_USER") {
      const response = await adoptUserQuery({
        variables: {
          userId: parseFloat(userInfo?.id),
          nickname: nickname,
        },
      });
      console.log(response);
    }
  };
  // 닉네임 수정 시
  const editNickname = async () => {
    setIsEditNickname(false);
    if (userInfo?.userType === "ADOPTEE_USER") {
      const response = await adopteeUserQuery({
        variables: {
          userId: parseFloat(userInfo?.id),
          nickname: nickname,
        },
      });
      console.log(response);
    } else if (userInfo?.userType === "ADOPT_USER") {
      const response = await adoptUserQuery({
        variables: {
          userId: parseFloat(userInfo?.id),
          nickname: nickname,
        },
      });
      console.log(response);
    }
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
              <span>{userInfo?.email}</span>
            </li>
            <li>
              <span>닉네임</span>
              {isEditNickname ? (
                editElement("nickname")
              ) : (
                <div>
                  <span>{userInfo?.nickname}</span>
                  <button
                    className={style.btn}
                    onClick={() => {
                      setIsEditNickname(true);
                    }}
                  >
                    닉네임 변경
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div className={style.card}>
          <h4 className={style.title}>비밀번호 수정</h4>
          <ul className={style.content}>
            <li>
              <span>비밀번호</span>
              {isEditPassword ? (
                editElement("password")
              ) : (
                <button
                  className={style.btn}
                  onClick={() => {
                    setIsEditPassword(true);
                  }}
                >
                  비밀번호 재등록
                </button>
              )}
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
