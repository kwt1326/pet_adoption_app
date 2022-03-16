import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Comment from "../../components/Comments/Comment";
import styles from "./Reviews.module.scss";
import Header from "../../components/Header";
import { BsHeart } from "react-icons/bs";
import dayjs from "dayjs";
import { useMutation, useQuery } from "@apollo/client";

import { QUERY_ADOPTREVIEW } from "../../quries/adoptionPostReviewsQuery";
function Index(props) {
  const router = useRouter();
  const postid = router.query.id;
  const { loading, error, data } = useQuery(QUERY_ADOPTREVIEW, {
    variables: { input: Number(postid) },
  });
  if (data?.getOneAdoptReview) {
    const reviewItem = data.getOneAdoptReview;
    const reviewComments = reviewItem.comments;
    const isLikedCount = reviewItem?.likes?.length;
    const isExistPicture = reviewItem?.pictures?.length > 0;
    const commentCount = reviewItem?.comments?.length;
    const createdAt = dayjs(reviewItem?.createdAt).format("YYYY/MM/DD");
    const nickname = reviewItem?.adopteeUser?.nickname;
    return (
      <div className={styles.PostContainer}>
        <Header
          children={" "}
          leftBtn={{ func: () => void 0, text: "/reviews" }}
        ></Header>
        <div className={styles.title}>{reviewItem.title}</div>
        <div className={styles.detail}>
          <div className={styles.nickname}>{nickname}</div>
          <div className={styles.date}>{createdAt}</div>
        </div>
        <div className={styles.content}>{reviewItem.content}</div>
        <div className={styles.ItempictureWrapper}>
          {isExistPicture ? (
            reviewItem.pictures.map((picture, i) => (
              <img
                key={i}
                className={styles.image}
                src={picture.uri}
                alt="pet_thumbnail_img"
              />
            ))
          ) : (
            <Fragment>
              <img
                className={styles.image}
                src="/images/no_image.svg"
                alt="no_image"
              />
            </Fragment>
          )}
        </div>

        <div className={styles.Itemreaction}>
          <div className={styles.comment}>댓글 ({commentCount})</div>
          <div
            className={styles.isLikes}
            onClick={() => toggleLikeMutation(reviewItem?.id)}
          >
            <BsHeart size={15} />
            <div> 좋아요 ({isLikedCount})</div>
          </div>
        </div>
        <Comment postid={postid} reviewItem={reviewItem}></Comment>
      </div>
    );
  }
  return null;
}

export default Index;
