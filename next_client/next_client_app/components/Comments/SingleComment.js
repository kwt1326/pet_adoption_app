import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Commentlayout from "./Commentlayout";
import styles from "./SingleComment.module.scss";

function SingleComment({ commentitem, refreshFunc, postid }) {
  const { content, id, parentId, writerNickname } = commentitem;
  const [openreply, setOpenreply] = useState(false);
  const [comment, setComment] = useState("");
  const handleClickComment = (e) => {
    setComment(e.currentTarget.value);
  };

  const replyOpen = () => {
    setOpenreply((prev) => !prev);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: comment,
      parentCommentId: id,
      postId: Number(postid),
    };
    setComment("");
    refreshFunc(variables);
  };

  return (
    <div>
      <Commentlayout
        commentitem={commentitem}
        replyOpen={replyOpen}
      ></Commentlayout>
      {openreply && (
        <form className={styles.formLayout} onSubmit={onSubmit}>
          <div
            className={styles.commentLayout}
            style={{ marginLeft: "40px" }}
          >
            <textarea
              className={styles.comment}
              placeholder="댓글을 입력해주세요"
              onChange={handleClickComment}
              value={comment}
            ></textarea>
            <button className={styles.button} onClick={onSubmit}>
              등록
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SingleComment;
