import React, { useState } from "react";
import { concat, useMutation, useLazyQuery, useQuery } from "@apollo/client";
import style from "./personalInfo.module.scss";
import Header from "../../components/Header/index";
import { DELETE_ONE_USER, UPDATE_ADOPTEE_USER, UPDATE_ADOPT_USER } from "../../quries/userQuery";
import { GET_ONE_ADOPTEE_USER, GET_ONE_ADOPT_USER } from "../../quries/userFindQuery";
import { CHECK_DUPLICATE } from "../../quries/authQuery";
import { useUserInfo } from "../../hooks/user";
import { getOneUser } from "../../hooks/getOneUser";
import { localLogout } from "../../utils/authUtil";
import Router from "next/router";

const personalInfo = () => {
  const userInfo = useUserInfo();
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditNickname, setIsEditNickname] = useState(false);
  const [nickname, setNickname] = useState(userInfo?.nickname);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");

  const [deleteOneUserQuery] = useMutation(DELETE_ONE_USER);
  const [updateAdopteeUserQuery] = useMutation(UPDATE_ADOPTEE_USER);
  const [updateAdoptUserQuery] = useMutation(UPDATE_ADOPT_USER);

  let oneUser = getOneUser();

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

  const [checkDuplicateNicknameQuery] = useLazyQuery(CHECK_DUPLICATE, {
    variables: {
      input: {
        nickname: nickname,
      },
    },
    fetchPolicy: "no-cache",
  });

  // 닉네임 수정 시
  const editNickname = async () => {
    const store = userInfo?.nickname;
    const response = await checkDuplicateNicknameQuery();
    let state = response?.data?.checkDuplicateField?.result;
    if (state === true) {
      setNicknameError("이미 존재하는 닉네임입니다.");
    } else {
      setIsEditNickname(false);
      if (userInfo?.userType === "ADOPTEE_USER") {
        const response = await updateAdopteeUserQuery({
          variables: {
            input: {
              id: parseFloat(userInfo?.id),
              nickname: nickname,
            },
          },
        });
      } else if (userInfo?.userType === "ADOPT_USER") {
        const response = await updateAdoptUserQuery({
          variables: {
            input: {
              id: parseFloat(userInfo?.id),
              nickname: nickname,
            },
          },
        });
      }
    }
  };
  //패스워드 수정 시
  const editPassword = async () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordReg.test(password)) {
      setPasswordError("");
      setIsEditPassword(false);
      if (userInfo?.userType === "ADOPTEE_USER") {
        const response = await updateAdopteeUserQuery({
          variables: {
            input: {
              id: parseFloat(userInfo?.id),
              user: {
                password: password,
              },
            },
          },
        });
      } else if (userInfo?.userType === "ADOPT_USER") {
        const response = await updateAdoptUserQuery({
          variables: {
            input: {
              id: parseFloat(userInfo?.id),
              user: {
                password: password,
              },
            },
          },
        });
      }
      setPassword("");
    } else {
      setPasswordError("최소 8글자 이상 최소 하나의 문자 및 하나의 숫자로 구성해주세요");
    }
  };
  const cancleNickname = () => {
    setIsEditNickname(false);
    setNickname(userInfo?.nickname);
  };
  const canclePassword = () => {
    setIsEditPassword(false);
    setPassword("");
    setPasswordError("");
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
                <div>
                  <input
                    value={nickname}
                    onChange={(e) => {
                      setNickname(e.target.value);
                    }}
                  ></input>
                  <button
                    className={style.btn}
                    onClick={() => {
                      editNickname();
                    }}
                  >
                    확인
                  </button>
                  <button
                    className={style.btn}
                    onClick={() => {
                      cancleNickname();
                    }}
                  >
                    취소
                  </button>
                  <div className={style.warnText}>{nicknameError}</div>
                </div>
              ) : (
                <div>
                  <span>{oneUser?.nickname}</span>
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
                <>
                  <div>
                    <input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                    ></input>
                    <button
                      className={style.btn}
                      onClick={() => {
                        editPassword();
                      }}
                    >
                      확인
                    </button>
                    <button
                      className={style.btn}
                      onClick={() => {
                        canclePassword();
                      }}
                    >
                      취소
                    </button>
                    <div className={style.warnText}>{passwordError}</div>
                  </div>
                </>
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
