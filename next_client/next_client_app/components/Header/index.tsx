import React, { useState } from "react";
import styles from "./header.module.scss";
import { FaHome, FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Sidebar from "../../components/modal/sidebar.js";

const Header = ({ children }) => {
  const [sidebarOnOff, setSidebarOnOff] = useState(false);
  const onOffSidebar = () => {
    setSidebarOnOff(!sidebarOnOff);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          {children && (
            <Link href="/">
              <a>
                <FaChevronLeft />
              </a>
            </Link>
          )}
          {!children && (
            <div className={styles.hamberger} onClick={onOffSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <Sidebar sidebarOnOff={sidebarOnOff} onOffSidebar={onOffSidebar} />
        {children && <div className={styles.title}> {children} </div>}
        {!children && (
          <div className={styles.logo}>
            <img src="images/logo.png"></img>
          </div>
        )}
        {!children && <FaHome size="1.8em" color="#555" className={styles.homeIcon} />}
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Header;
