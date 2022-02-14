import React from "react";
import Header from "../../../components/Header";
import styles from './Register.module.scss';

function Register() {
  return (
    <div className={styles.container}>
      <Header
        children={'입양글 작성하기'}
        rightBtn={{ func: () => void 0, text: '완료' }}
      />
      TEST
    </div>
  )
}

export default Register
