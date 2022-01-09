import React from "react";
import styles from "./AgencyListItem.module.scss";
import Image from "next/image";

function AgencyListItem({ item }) {
  const { name, forSale, saleComplete } = item;

  return (
    <div>
      <div className={styles.listitem}>
        <div className={styles.img}>
          <Image
            src="/../public/dog.jpg"
            alt="Vercel Logo"
            width={50}
            height={50}
          />
        </div>
        <div className={styles.description}>
          <div className={styles.title}>
            업체명 {">"} {name}
          </div>
          <div className={styles.sale}>
            <span>분양 중 {forSale} 마리 / </span>
            <span>분양 완료 {saleComplete} 마리</span>
          </div>
          <button className={styles.button}>인증완료 </button>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}

export default AgencyListItem;