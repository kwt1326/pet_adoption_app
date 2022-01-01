import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./PetListItem.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function PetListItem({ petitem }) {
  const { text, kind, islike, price, description, date, img } = petitem;
  const imgsrc = `/${img}.jpg`;

  return (
    <div className={styles.PetListItem}>
      <div className={styles.PetListItemImage}>
        <Image src={imgsrc} alt="Vercel Logo" width={150} height={100} />
        <div className={` ${islike === true ? `${styles.active}` : ""}`}>
          <AiFillHeart></AiFillHeart>
        </div>
        <div className={styles.kind}></div>
      </div>
      <div className={styles.PetListItemContent}>
        <div className={styles.PetListItemTitle}>{text}</div>
        <div className={styles.PetListItemPrice}>{price}원</div>
        <div className={styles.PetListItemDescription}>{description}</div>
        <div className={styles.PetListItemDate}>{date}</div>
      </div>
    </div>
  );
}

export default PetListItem;
