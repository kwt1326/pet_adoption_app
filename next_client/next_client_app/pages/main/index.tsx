import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Main.module.scss";
import Header from "../../components/Header/index";
import Carousel from "./carousel";
import { FaDog, FaCat, FaListAlt, FaBuilding } from "react-icons/fa";

const Main = () => {
  return (
    <div>
      <Header />
      <div className={styles.eventBanner}>
        <Carousel />
      </div>
      <ul className={styles.nav}>
        <li>
          <div>
            <FaDog />
            <span>강아지 분양</span>
          </div>
        </li>
        <li>
          <div>
            <FaCat />
            <span>고양이 분양</span>
          </div>
        </li>
        <li>
          <div>
            <FaListAlt />
            <span>입양 후기</span>
          </div>
        </li>
        <li>
          <div>
            <FaBuilding />
            <span>인증 업체</span>
          </div>
        </li>
      </ul>
      <div className={styles.contentBox}>
        <h4>최신 강아지 분양글</h4>
        <div></div>
        <div className={styles.btnBox}>
          <button>더 많은 강아지 보러가기 &#62;</button>
        </div>
        <h4>최신 고양이 분양글</h4>
        <div></div>
        <div className={styles.btnBox}>
          <button>더 많은 고양이 보러가기 &#62;</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
