import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Commentlayout from "./Commentlayout";
import styles from "./SingleComment.module.scss";
function SingleComment({ commentitem, refreshFunc }) {
  const { id, content, writer } = commentitem;
  const [openreply, setOpenreply] = useState(false);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  const handleClickComment = (e) => {
    setComment(e.currentTarget.value);
  };
  const handleClickUser = (e) => {
    setUser(e.currentTarget.value);
  };

  const replyOpen = () => {
    setOpenreply((prev) => !prev);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      id: uuidv4(),
      content: comment,
      writer: user,
      Responseto: id,
    };

    setComment("");
    setUser("");
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
          <textarea
            className={styles.nickname}
            placeholder="닉네임"
            onChange={handleClickUser}
            value={user}
          ></textarea>
          <div className={styles.commentLayout}>
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
