import React, { useState, useCallback } from "react";
import AdoptDetailCategories from "../../../../components/AdoptDetailCategories";
import Header from "../../../../components/Header";
import { useRouter } from "next/router";
import AdoptDetailContent from "../../../../components/AdoptDetailContent";
import { AiFillHeart } from "react-icons/ai";
import styles from "../list.module.scss";
import { Fragment } from "react";

function Details(props) {
  const [category, setCategory] = useState("intro");
  const onSelect = useCallback((category) => setCategory(category), []);
  const router = useRouter();

  const petitem = JSON.parse(router.query.pet);
  const uri = petitem.pet.pictures[0]?.uri;
  const isLiked = petitem.isLiked;

  return (
    <div>
      <Header children="상세 페이지" />
      {uri ? (
        <div className={styles.pet_item_image}>
          <div className={styles.pet_item_image_wrap}>
            <Fragment>
              <img
                className={styles.pet_image}
                src={uri}
                alt="pet_thumbnail_img"
              />
              <AiFillHeart
                className={styles.like_box}
                size={15}
                color={isLiked ? "#ff6f8b" : "gray"}
              />
            </Fragment>
          </div>
        </div>
      ) : (
        <div className={styles.pet_item_image}>
          <div className={styles.pet_item_image_wrap}>
            <Fragment>
              <img
                className={styles.pet_image}
                src="/images/no_image.svg"
                alt="no_image"
              />
              <AiFillHeart
                className={styles.like_box}
                size={15}
                color={isLiked ? "#ff6f8b" : "gray"}
              />
            </Fragment>
          </div>
        </div>
      )}
      <AdoptDetailCategories
        onSelect={onSelect}
        category={category}
      ></AdoptDetailCategories>
      <AdoptDetailContent
        category={category}
        petitem={petitem}
      ></AdoptDetailContent>
    </div>
  );
}

export default Details;
