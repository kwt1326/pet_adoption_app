import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./PetListItem.module.scss";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

function PetListItem({ petitem }) {
  console.log(petitem);
  // const text = petitem.title;
  // const description = petitem.content;
  // const petinfo = petitem.pet;
  // const kind = petinfo.type;
  // const price = petinfo.price;

  return <div className={styles.PetListItem}></div>;
}

export default PetListItem;

/*
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
*/
