import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useLazyQuery } from "@apollo/client";

import Header from "../../components/Header/index";
import { useUserInfo } from "../../hooks/user";
import { localLogout } from "../../utils/authUtil";

import { CHECK_DUPLICATE } from "../../quries/authQuery";
import { DELETE_ONE_USER, UPDATE_ADOPTEE_USER, UPDATE_ADOPT_USER } from "../../quries/userQuery";

import style from "./personalInfo.module.scss";


const personalInfo = () => {
  const router = useRouter();
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

  //유저삭제
  const removeUser = async () => {
    const id = userInfo.id;
    const response = await deleteOneUserQuery({
      variables: {
        id: parseFloat(id),
      },
    });

    if (!response.errors) {
      alert('정상적으로 회원탈퇴 되었습니다. withPet 을 이용해주셔서 감사합니다.')
      localLogout();
      router.push("/");
    }
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
    let response = await checkDuplicateNicknameQuery();
    if (response.error) { return alert(response.error.message) }

    let state = response?.data?.checkDuplicateField?.result;
    if (state === true) { return setNicknameError("이미 존재하는 닉네임입니다."); }

    setIsEditNickname(false);
    if (userInfo?.userType === "ADOPTEE_USER") {
      response = await updateAdopteeUserQuery({
        variables: {
          input: {
            id: parseFloat(userInfo?.id),
            nickname: nickname,
          },
        },
      });
      if (response.error) { return alert(response.error.message) }
    } else if (userInfo?.userType === "ADOPT_USER") {
      response = await updateAdoptUserQuery({
        variables: {
          input: {
            id: parseFloat(userInfo?.id),
            nickname: nickname,
          },
        },
      });
      if (response.error) { return alert(response.error.message) }
    }

    alert('닉네임이 성공적으로 수정되었습니다. 다시 로그인 해주세요.');
    localLogout();
    return router.push("/");
  };

  //패스워드 수정 시
  const editPassword = async () => {
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (passwordReg.test(password)) {
      setPasswordError("");
      setIsEditPassword(false);
      let response = {};
      if (userInfo?.userType === "ADOPTEE_USER") {
        response = await updateAdopteeUserQuery({
          variables: {
            input: {
              id: parseFloat(userInfo?.id),
              user: {
                password: password,
              },
            },
          },
        });
        if (response.error) { return alert(response.error.message) }
      } else if (userInfo?.userType === "ADOPT_USER") {
        response = await updateAdoptUserQuery({
          variables: {
            input: {
              id: parseFloat(userInfo?.id),
              user: {
                password: password,
              },
            },
          },
        });
        if (response.error) { return alert(response.error.message) }
      }

      alert('비밀번호가 성공적으로 수정되었습니다. 다시 로그인 해주세요.');
      localLogout();
      return router.push("/");
    }

    setPasswordError("최소 8글자 이상 최소 하나의 문자 및 하나의 숫자로 구성해주세요");
  };

  const cancelNickname = () => {
    setIsEditNickname(false);
    setNickname(userInfo?.nickname);
  };

  const cancelPassword = () => {
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
                      cancelNickname();
                    }}
                  >
                    취소
                  </button>
                  <div className={style.warnText}>{nicknameError}</div>
                </div>
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
                        cancelPassword();
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
