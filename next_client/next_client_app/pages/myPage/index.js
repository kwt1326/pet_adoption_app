import React, { useState } from "react";
import style from "./mypage.module.scss";
import Header from "../../components/Header/index";
import Link from "next/link";
import { FaFile, FaBoxOpen, FaAngleRight } from "react-icons/fa";
import { useUserInfo } from "../../hooks/user";

const myPage = () => {
  const userInfo = useUserInfo();

  return (
    <div>
      <Header children={"마이페이지"} />
      <div className={style.container}>
        <div className={style.userInfo}>
          <div>
            <span className={style.nickname}>{userInfo?.nickname || "사용자"}</span> 님, 안녕하세요!
          </div>
          <span className={style.email}>{userInfo?.email || "이메일"}</span>
        </div>
        <ul className={style.list}>
          <Link href="personalInfo">
            <li>
              <div>
                <FaFile className={style.icon} />
                <span>개인정보 수정</span>
              </div>
              <FaAngleRight />
            </li>
          </Link>
          <li>
            <div>
              <FaBoxOpen className={style.icon} />
              <span>찜 리스트</span>
            </div>
            <FaAngleRight />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default myPage;
