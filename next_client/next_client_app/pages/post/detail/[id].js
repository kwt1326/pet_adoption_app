import React, { Fragment, useState, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { AiFillHeart } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";

import AdoptDetailCategories from "../../../components/AdoptDetailCategories";
import AdoptDetailContent from "../../../components/AdoptDetailContent";
import { GET_ADOPTION_POST, TOGGLE_LIKE_MUTATION } from "../../../quries/adoptionPostQuery";

import styles from "./detail.module.scss";

function Details() {
  const router = useRouter();
  const [category, setCategory] = useState("intro");
  const postid = router.query.id;

  const getDetailInput = useCallback(() => ({
    variables: {
      input: Number(postid)
    },
    fetchPolicy: 'cache-and-network'
  }), [postid])

  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);
  const { data, refetch } = useQuery(GET_ADOPTION_POST, getDetailInput());

  const toggleLikeMutation = async (postId) => {
    const result = await toggleLike({
      variables: {
        input: {
          postId,
        },
      },
    });
    if (result?.errors) {
      console.error(result.errors);
      alert(result.errors);
      return;
    }
    refetch()
  };

  const onSelect = useCallback((category) => setCategory(category), []);

  if (data?.getPost) {
    const petitem = data?.getPost;
    const isLiked = petitem.isLiked;
    const uri = petitem.pet.pictures[0]?.uri;

    return (
      <div>
        <div className={styles.pet_item_image}>
          <div className={styles.pet_item_image_wrap}>
            <Fragment>
              <img
                className={styles.pet_image}
                src={uri || "/images/no_image.svg"}
                alt="pet_thumbnail_img"
              />
              <div
                className={styles.back_btn}
                onClick={() => router.back()}
              >
                <BiChevronLeft size={25} color={'#282828'} />
              </div>
              <div
                className={styles.like_box}
                onClick={() => toggleLikeMutation(petitem?.id)}
              >
                <AiFillHeart size={25} color={isLiked ? "#ff6f8b" : "gray"} />
              </div>
            </Fragment>
          </div>
        </div>
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
