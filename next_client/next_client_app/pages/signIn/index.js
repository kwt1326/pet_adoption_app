import { React, useState, useEffect } from "react";
import { withRouter } from "next/router";
import Router from "next/router";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CORP_SIGN_UP_QUERY } from "../../quries/authQuery";
import { SIGN_UP_QUERY } from "../../quries/authQuery";
import { CHECK_DUPLICATE } from "../../quries/authQuery";
import SignInput from "../../components/SignInput";
import Header from "../../components/Header";
import style from "./signIn.module.scss";

function signIn({ router: { query } }) {
  const signInType = query.type;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pageUri, setPageUri] = useState("");
  const [profit, setProfit] = useState(true);

  const [errorText, setErrorTextError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  const [checkDuplicateNicknameQuery] = useLazyQuery(CHECK_DUPLICATE, {
    variables: {
      input: {
        nickname: nickname,
      },
    },
    fetchPolicy: "no-cache",
  });
  const [checkDuplicateEmailQuery] = useLazyQuery(CHECK_DUPLICATE, {
    variables: {
      input: {
        email: email,
      },
    },
    fetchPolicy: "no-cache",
  });

  const checkDuplicateEmail = async () => {
    const response = await checkDuplicateEmailQuery();
    let state = response?.data?.checkDuplicateField?.result;
    if (!email) {
      setEmailError("이메일을 입력하세요");
    } else {
      if (state === true) {
        setEmailError("이미 가입된 이메일입니다.");
      } else {
        setEmailError("가입 가능한 이메일입니다");
      }
    }
    return state;
  };
  const checkDuplicateNickname = async () => {
    const response = await checkDuplicateNicknameQuery();
    let state = response?.data?.checkDuplicateField?.result;
    if (!nickname) {
      setNicknameError("닉네임을 입력하세요");
    } else {
      if (state === true) {
        setNicknameError("이미 등록된 닉네임입니다.");
      } else {
        setNicknameError("등록 가능한 닉네임입니다");
      }
    }
    return state;
  };
  const passwordEqual = () => {
    let validated = true;
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        setPasswordError("비밀번호가 동일하지 않습니다.");
        setConfirmPasswordError("비밀번호가 동일하지 않습니다.");
        validated = false;
      } else if (password === confirmPassword && passwordReg.test(password)) {
        setPasswordError("");
        setConfirmPasswordError("");
      }
    }
    return validated;
  };
  const validateForm = async () => {
    let validated = true;
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!email) {
      setEmailError("이메일을 입력하세요");
      validated = false;
    } else {
      setEmailError("");
    }
    if (!password) {
      setPasswordError("비밀번호를 입력하세요");
      validated = false;
    } else {
      if (passwordReg.test(password)) {
        setPasswordError("");
      } else {
        setPasswordError("최소 8글자 이상 최소 하나의 문자 및 하나의 숫자로 구성해주세요");
        validated = false;
      }
    }

    if (!confirmPassword) {
      setConfirmPasswordError("비밀번호 재입력을 입력하세요");
      validated = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!nickname) {
      setNicknameError("닉네임을 입력하세요");
      validated = false;
    } else {
      setNicknameError("");
    }

    if (signInType === "업체") {
      if (!companyName) {
        setCompanyNameError("업체명을 입력하세요");
        validated = false;
      } else {
        setCompanyNameError("");
      }

      if (!address) {
        setAddressError("주소를 입력하세요");
        validated = false;
      } else {
        setAddressError("");
      }

      if (!phoneNumber) {
        setPhoneNumberError("전화번호를 입력하세요");
        validated = false;
      } else {
        setPhoneNumberError("");
      }
    }
    if (!passwordEqual()) {
      validated = false;
    }
    const emailDuplicate = await checkDuplicateEmail();
    const nicknameDuplicate = await checkDuplicateNickname();
    if (emailDuplicate === true) {
      validated = false;
    }
    if (nicknameDuplicate === true) {
      validated = false;
    }
    return validated;
  };

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"));
    }
    if (phoneNumber.length === 11) {
      console.log(phoneNumber)
      setPhoneNumber(phoneNumber.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"));
    }
  }, [phoneNumber]);
  const [signUpQuery] = useMutation(SIGN_UP_QUERY);
  const [corpSignUpQuery] = useMutation(CORP_SIGN_UP_QUERY);
  const handleUserCreate = async () => {
    let validated = await validateForm();
    let response = {};
    if (validated === true) {
      if (signInType === "개인") {
        response = await signUpQuery({
          variables: {
            input: {
              email: email,
              password: password,
              nickname: nickname,
            },
          },
        });
      } else if (signInType === "업체") {
        response = await corpSignUpQuery({
          variables: {
            input: {
              nickname: nickname,
              companyName: companyName,
              address: address,
              phoneNumber: phoneNumber,
              pageUri: pageUri,
              email: email,
              password: password,
              isProfit: profit,
            },
          },
        });
      }
      if (!response.error) {
        Router.push("/");
      }
    }
  };
  const numValid = (value) => {
    const num = value.replace(/[^0-9]/g, '')
    setPhoneNumber(num)
  }
  const renderCompany = () => {
    return (
      <div className={style.inputArea}>
        <h4>기업정보</h4>
        <div className={style.dFlex}>
          <input
            type="radio"
            value="true"
            checked={profit === true}
            onChange={(e) => {
              setProfit(JSON.parse(e.target.value));
            }}
          />
          업체
          <input
            checked={profit === false}
            value="false"
            type="radio"
            onChange={(e) => {
              setProfit(JSON.parse(e.target.value));
            }}
          />
          보호소
        </div>
        <div className={style.dFlex}>
          <SignInput
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            placeholder="업체명을 입력하세요"
            type="text"
            errorText={companyNameError}
          />
        </div>
        <div>
          <div className={style.dFlex}>
            <SignInput
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="주소를 입력하세요"
              type="text"
              errorText={addressError}
            />
            <button className={style.button}>주소찾기</button>
          </div>
        </div>
        <div className={style.dFlex}>
          <SignInput
            value={phoneNumber}
            onChange={(e) => {
              numValid(e.target.value)
            }}
            placeholder="전화번호를 입력하세요"
            type="text"
            errorText={phoneNumberError}
            maxLength="13"
          />
        </div>
        <div className={style.dFlex}>
          <SignInput
            value={pageUri}
            onChange={(e) => {
              setPageUri(e.target.value);
            }}
            placeholder="홈페이지를 입력하세요(선택)"
            type="text"
          />
        </div>
      </div>
    );
  };


  return (
    <div>
      <Header children={`${signInType} 회원가입`} />
      <div className={style.container}>
        <div className={style.inputArea}>
          <h4>기본정보</h4>
          <div className={style.dFlex}>
            <SignInput
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="이메일을 입력하세요"
              type="text"
              errorText={emailError}
            />
            <button
              className={style.button}
              onClick={() => {
                checkDuplicateEmail();
              }}
            >
              조회
            </button>
          </div>
          <div className={style.dFlex}>
            <SignInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="비밀번호를 입력하세요"
              type="password"
              errorText={passwordError}
            />
          </div>
          <div className={style.dFlex}>
            <SignInput
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="비밀번호를 재입력하세요"
              type="password"
              errorText={confirmPasswordError}
            />
          </div>
          <div className={style.dFlex}>
            <SignInput
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
              placeholder="닉네임을 입력하세요"
              type="text"
              errorText={nicknameError}
            />
            <button
              className={style.button}
              onClick={() => {
                checkDuplicateNickname();
              }}
            >
              중복확인
            </button>
          </div>
        </div>
        {signInType === "업체" ? renderCompany() : null}
      </div>

      <div className={style.searchContainer}>
        {/* <div className={style.validText}>{errorText}</div> */}
        <button className={style.button} onClick={handleUserCreate}>
          회원가입하기
        </button>
      </div>
    </div>
  );
}
export default withRouter(signIn);
