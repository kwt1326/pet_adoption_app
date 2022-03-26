import React from "react";
import styles from "./AgencyListItem.module.scss";
import Image from "next/image";
import Link from "next/link";

function AgencyListItem({ item }) {
  const { companyName, isAuthenticated, id } = item;
  return (
    <div className={styles.listitem}>
      <div className={styles.img}>
        <Image src="/images/no_image.svg" alt="no_image" width={50} height={50} />
      </div>
      <Link href={`/authAgencyProfile?id=${id}`}>
        <div className={styles.description}>
          <div className={styles.title}>
            업체명 {">"} {companyName || "이름없음"}
          </div>
          {isAuthenticated && <button className={styles.button}>인증완료</button>}
        </div>
      </Link>
    </div>
  );
}

export default AgencyListItem;
