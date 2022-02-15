import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaChevronLeft } from "react-icons/fa";

import Sidebar from "../../components/Modal/sidebar.js";
import styles from "./header.module.scss";

const Header = (props: { children, rightBtn }) => {
  const [sidebarOnOff, setSidebarOnOff] = useState(false);
  
  const onOffSidebar = () => setSidebarOnOff(!sidebarOnOff);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          {props?.children && (
            <Link href="/">
              <a>
                <FaChevronLeft />
              </a>
            </Link>
          )}
          {!props?.children && (
            <div className={styles.hamberger} onClick={onOffSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <Sidebar sidebarOnOff={sidebarOnOff} onOffSidebar={onOffSidebar} />
        {props?.children && (
          <div className={styles.title}>{props?.children}</div>
        )}
        {!props?.children && (
          <div className={styles.logo}>
            <img src="/images/logo.png"></img>
          </div>
        )}
        {props?.rightBtn && (
          <button className={styles.right_btn} onClick={props?.rightBtn?.func}>{props?.rightBtn?.text}</button>
        )}
        {!props?.children && (
          <Link href={'/'}>
            <a>
              <FaHome
                size="1.8em"
                color="#555"
                className={styles.homeIcon}
              />
            </a>
          </Link>
        )}
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Header;
