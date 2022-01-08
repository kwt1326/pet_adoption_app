import React, { useState } from "react";
import styles from "./header.module.scss";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href="/">
            <a>
              <FaChevronLeft />
            </a>
          </Link>
        </div>
        <div className={styles.title}>
          <span>로그인</span>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Header;
