import React, { useState } from "react";
import styles from "./Header.module.scss";
import { FaHome } from "react-icons/fa";
import Sidebar from "../../components/modal/sidebar.js";

const Header = () => {
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
        <div className={styles.hamberger} onClick={openModal}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <Sidebar open={modalOpen} close={closeModal}></Sidebar>
        <div className={styles.logo}>
          <img src="images/logo.png"></img>
        </div>
        <FaHome size="1.8em" color="#555" />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Header;
