import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import styles from "./Comment.module.scss";

import { CREATE_POST_ADOPTREVIEW_COMMENT } from "../../quries/adoptionPostReviewsQuery";

function Comment({ postid, reviewItem }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postQuery] = useMutation(CREATE_POST_ADOPTREVIEW_COMMENT);

  useEffect(() => {
    let templist = [];
    for (let i = 0; i < reviewItem.comments.length; i++) {
      templist.push(reviewItem.comments[i]);
      if (reviewItem.comments[i].child.length > 0) {
        for (let j = 0; j < reviewItem.comments[i].child.length; j++)
          templist.push(reviewItem.comments[i].child[j]);
      }
    }
    setComments(templist);
  }, []);

  const handleClickComment = (e) => {
    setComment(e.currentTarget.value);
  };

  const refreshFunc = async (item) => {
    const response = await postQuery({
      variables: { input: item },
    });
    const templist = comments.concat(response?.data?.createAdoptReviewComment);
    setComments(templist);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await postQuery({
      variables: {
        input: {
          parentCommentId: 0,
          content: comment,
          postId: Number(postid),
        },
      },
    });
    const templist = comments.concat(response?.data?.createAdoptReviewComment);
    setComment("");
    setComments(templist);
  };

  return (
    <div>
      {comments &&
        comments.map(
          (commentitem, index) =>
            !commentitem.parentId && (
              <div key={index}>
                <SingleComment
                  commentitem={commentitem}
                  refreshFunc={refreshFunc}
                  postid={postid}
                ></SingleComment>
                <ReplyComment
                  parentCommentId={commentitem.id}
                  refreshFunc={refreshFunc}
                  comments={comments}
                  postid={postid}
                ></ReplyComment>
              </div>
            )
        )}
      <form className={styles.formLayout} onSubmit={onSubmit}>
        <div className={styles.commentLayout}>
          <textarea
            className={styles.comment}
            placeholder="댓글을 입력해주세요"
            onChange={handleClickComment}
            value={comment}
          ></textarea>
          <button className={styles.button} onSubmit={onSubmit}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
}

export default Comment;
