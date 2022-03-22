import React, { Fragment } from "react";
import { Image } from "cloudinary-react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";

import styles from "./ReviewListItem.module.scss";

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
      {isExistPicture && (
        <div className={styles.pictureWrapper}>
          <div className={styles.picture_wrapper_inner}>
            {item.pictures.map((picture, i) => (
              <div key={i} className={styles.image}>
                <img
                  src={picture.uri}
                  alt="pet_thumbnail_img"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.reaction}>
        <div
          className={styles.isLikes}
          onClick={(e) => {
            e.preventDefault();
            toggleLikeMutation(item?.id)
          }}
        >
          {item.isLiked ? <BsHeartFill size={15} /> : <BsHeart size={15} />}
          <span>좋아요 {isLikes}</span>
        </div>
        <div className={styles.comment}>
          <FaRegCommentDots size={15} />
          <span>댓글 {commentCount}</span>
        </div>
      </div>
    </div>
  );
}

export default ReviewListItem;
