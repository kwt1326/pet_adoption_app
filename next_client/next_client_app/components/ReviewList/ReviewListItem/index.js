import React, { Fragment } from "react";
import styles from "./ReviewListItem.module.scss";
import { BsHeart } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

function ReviewListItem({ item, toggleLikeMutation }) {
  const isExistPicture = item.pictures.length > 0 ? true : false;
  const isLikes = item.likes.length;
  const commentCount = item.comments.length;
  return (
    <div className={styles.ReviewContainer}>
      <div className={styles.title}>{item.title}</div>
      <div className={styles.detail}>
        <div className={styles.nickname}>{item.nickname}</div>
        <div className={styles.date}>{item.date}</div>
      </div>
      <div className={styles.content}>{item.content}</div>
      <div className={styles.pictureWrapper}>
        {isExistPicture ? (
          item.pictures.map((picture, i) => (
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
      <div className={styles.reaction}>
        <div
          className={styles.isLikes}
          onClick={() => toggleLikeMutation(item?.id)}
        >
          <BsHeart size={15} />
          <div> 좋아요 {isLikes}</div>
        </div>

        <div className={styles.comment}>
          <FaRegCommentDots></FaRegCommentDots>댓글 {commentCount}
        </div>
      </div>
    </div>
  );
}

export default ReviewListItem;
