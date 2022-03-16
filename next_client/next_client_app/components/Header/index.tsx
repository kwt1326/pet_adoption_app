import React, { useState } from "react";
import Link from "next/link";
import { FaHome, FaChevronLeft } from "react-icons/fa";

import Sidebar from "../SideBar";
import styles from "./header.module.scss";
import { useRouter } from "next/router";

const Header = (props: Partial<{
  children: React.ReactNode,
  rightBtn: {
    func: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
  },
  leftBtn: {
    func: React.MouseEventHandler<HTMLButtonElement>;
    text: string;
  },
}>) => {
  const router = useRouter();
  const [sidebarOnOff, setSidebarOnOff] = useState(false);  
  const onOffSidebar = () => setSidebarOnOff(!sidebarOnOff);
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          {props?.children && props?.leftBtn && (
            <Link href={`${props?.leftBtn.text}`}>
              <a>
                <FaChevronLeft />
              </a>
            </Link>
          )}
          {props?.children && !props?.leftBtn && (
            <div onClick={() => router.back()}>
              <FaChevronLeft />
            </div>
          )}
          {!props?.children && (
            <div className={styles.hamberger} onClick={onOffSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <Sidebar router={router} sidebarOnOff={sidebarOnOff} onOffSidebar={onOffSidebar} />
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
