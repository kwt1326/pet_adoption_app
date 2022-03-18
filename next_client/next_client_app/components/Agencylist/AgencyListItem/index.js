import React from "react";
import styles from "./AgencyListItem.module.scss";
import Image from "next/image";

function AgencyListItem({ item }) {
  const { companyName } = item;
  return (
    <div>
      <div className={styles.listitem}>
        <div className={styles.img}>
          <Image src="/images/no_image.svg" alt="no_image" width={50} height={50} />
        </div>
        <div className={styles.description}>
          <div className={styles.title}>
            업체명 {">"} {companyName || "이름없음"}
          </div>
          <button className={styles.button}>인증완료 </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default AgencyListItem;
