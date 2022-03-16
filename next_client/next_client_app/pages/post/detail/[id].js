import React, { useState, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../list/list.module.scss";

import Header from "../../../components/Header";
import AdoptDetailCategories from "../../../components/AdoptDetailCategories";
import AdoptDetailContent from "../../../components/AdoptDetailContent";
import { Fragment } from "react";
import { AiFillHeart } from "react-icons/ai";
import { GET_ADOPTION_POST } from "../../../quries/adoptionPostQuery";
import { useMutation, useQuery } from "@apollo/client";

function Details(props) {
  const [category, setCategory] = useState("intro");
  const onSelect = useCallback((category) => setCategory(category), []);
  const router = useRouter();
  const postid = router.query.id;
  const { loading, error, data } = useQuery(GET_ADOPTION_POST, {
    variables: { input: Number(postid) },
  });
  if (data?.getPost) {
    const petitem = data?.getPost;
    const isLiked = petitem.isLiked;
    const uri = petitem.pet.pictures[0]?.uri;
    return (
      <div>
        <Header
          children="상세 페이지"
          rightBtn={{ func: () => router.push("/post/list/all") }}
        />
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
                  src="/images/no_image.svg"
                  alt="no_image"
                  className={styles.pet_image}
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
  return null;
}

export default Details;
