import React, { Fragment } from "react";
import dayjs from "dayjs";
import { AiFillHeart } from "react-icons/ai";
import { comma } from "../../../helpers/comma";
import styles from "./PetListItem.module.scss";

function PetListItem({ petitem, toggleLikeMutation }) {
  const pet = petitem?.pet;
  const writter = petitem?.writter;
  const text = petitem.title;
  const isLiked = petitem.isLiked;
  const isProfit = writter?.isProfit;
  const isExistPicture = pet?.pictures?.length > 0;
  const petBreed = pet?.breed;
  const price = comma(pet?.price);
  const src = isExistPicture ? pet?.pictures[0]?.uri : "/images/no_image.svg";
  const gender = pet?.isGenderMale ? "수컷" : "암컷";
  const boneAt = dayjs().diff(dayjs(pet?.createdAt), "month");
  const createdAt = dayjs(petitem?.createdAt).format("YYYY/MM/DD");
  const description = `${boneAt}개월 / ${gender} / ${petBreed}`;

  const Badges = () => (
    <Fragment>
      {isProfit ? (
        <div className={styles.badge_shop}>{"펫샵"}</div>
      ) : (
        <div className={styles.badge_not_shop}>{"보호소"}</div>
      )}
      <div
        className={styles.like_box}
        onClick={(e) => {
          e.preventDefault();
          toggleLikeMutation(petitem?.id)
        }}
      >
        <AiFillHeart size={15} color={isLiked ? "#ff6f8b" : "gray"} />
      </div>
    </Fragment>
  );

  const PetImage = () => (
    <div className={styles.pet_item_image}>
      <div className={styles.pet_item_image_wrap}>
        <img
          className={isExistPicture ? styles.pet_image : styles.pet_no_image}
          src={isExistPicture ? src : "/images/no_image.svg"}
          alt="pet_thumbnail_img"
        />
      </div>
        <Badges />
    </div>
  );

  return (
    <div className={styles.pet_item_container}>
      <PetImage />
      <div className={styles.pet_item_content}>
        <p className={styles.pet_item_title}>{text}</p>
        <p className={styles.pet_item_price}>{price}원</p>
        <p className={styles.pet_item_description}>{description}</p>
        <p className={styles.pet_item_description}>{createdAt}</p>
      </div>
    </div>
  );
}

export default PetListItem;
