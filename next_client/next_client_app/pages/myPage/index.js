import React, { useState } from "react";
import { useUserInfo } from "../../hooks/user";
import style from "./mypage.module.scss";
import Header from "../../components/Header/index";
import { FaFile, FaBoxOpen, FaAngleRight } from "react-icons/fa";

function myPage() {
  let email = '';
  const userInfo = useUserInfo();
  // while (true) {
  //   try {
  // email = userInfo.email;
  // console.log(email)
  //     break;
  //   } catch (err) {
  //     console.log(err)

  //   }
  // }

  // 
  // console.log(email)
  return (
    <div>
      <Header children={"마이페이지"} />
      <div>
        <div>
          <div>
            <span>{ }</span>님, 안녕하세요!
          </div>
          <span>{ }</span>
        </div>
        <ul>
          <li style={{ display: "flex", justifyContent: "space-between" }} >
            <div>
              <FaFile />
              <span>개인정보 수정</span>
            </div>
            <FaAngleRight />
          </li>
        </ul>
      </div>
    </div >
  );
}

export default myPage;
