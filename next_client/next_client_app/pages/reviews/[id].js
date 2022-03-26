import dayjs from "dayjs";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation, useLazyQuery } from "@apollo/client";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import Comment from "../../components/Comments/Comment";
import Header from "../../components/Header";
import styles from "./Reviews.module.scss";

import { QUERY_ADOPTREVIEW, TOGGLE_LIKE_MUTATION } from "../../quries/adoptionPostReviewsQuery";

function ReviewDetail() {
  const router = useRouter();
  const postid = router.query.id;
  const [getDetail, { loading, error, data }] = useLazyQuery(QUERY_ADOPTREVIEW, {
    variables: { input: Number(postid) }
  });
  const [toggleLike] = useMutation(TOGGLE_LIKE_MUTATION);

  useEffect(() => {
    postid && getDetail()
  }, [postid, router])

  const toggleLikeMutation = async (id) => {
    const result = await toggleLike({
      variables: { input: Number(id), },
    });
    if (result?.errors) {
      console.error(result.errors);
      alert(result.errors);
      return;
    }
    getDetail()
    window.scrollTo(0, 0);
  };
  const refreshComment = async (id) => {
    getDetail()
  };


  if (data?.getOneAdoptReview) {
    const reviewItem = data.getOneAdoptReview;
    const reviewComments = reviewItem.comments;
    const isLikedCount = reviewItem?.likes?.length;
    const isExistPicture = reviewItem?.pictures?.length > 0;

    const commentCount = (reviewItem) => {
      let count = reviewItem?.comments?.length;
      for (let i = 0; i < reviewItem.comments.length; i++) {
        count += reviewItem.comments[i].child.length;
      }
      return count;

    }
    const createdAt = dayjs(reviewItem?.createdAt).format("YYYY/MM/DD");
    const nickname = reviewItem?.adopteeUser?.nickname;

    return (
      <div>
        <Header
          children={" "}
          leftBtn={{ func: () => void 0, text: "/reviews" }}
        />
        <div className={styles.detail_container}>
          <div className={styles.top_content}>
            <div className={styles.title}>{reviewItem.title}</div>
            <div className={styles.detail}>
              <div className={styles.nickname}>{nickname}</div>
              <div className={styles.date}>{createdAt}</div>
            </div>
            <div className={styles.content}>{reviewItem.content}</div>
          </div>
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
              <img
                className={styles.image}
                src="/images/no_image.svg"
                alt="no_image"
              />
            )}
          </div>
          <div className={styles.Itemreaction}>
            <div className={styles.comment} >댓글 ({commentCount(reviewItem)})</div>
            <div
              className={styles.isLikes}
              onClick={() => toggleLikeMutation(reviewItem?.id)}
            >
              {reviewItem.isLiked ? <BsHeartFill size={15} /> : <BsHeart size={15} />}
              <span>좋아요 ({isLikedCount})</span>
            </div>
          </div>
          <Comment postid={postid} reviewItem={reviewItem} refreshComment={refreshComment} />
        </div>
      </div>
    );
  }
  return null;
}

export default ReviewDetail;
