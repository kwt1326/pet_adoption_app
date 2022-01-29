import React, { useState } from "react";
import styles from "./header.module.scss";
import { FaHome, FaChevronLeft } from "react-icons/fa";
import Sidebar from "../../components/modal/sidebar.js";
import Link from "next/link";

const Header = ({ children }: { children?: React.ReactNode }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
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
            <div className={styles.hamberger} onClick={openModal}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
        </div>
        <Sidebar open={modalOpen} close={closeModal}></Sidebar>
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
