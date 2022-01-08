import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import { v4 as uuidv4 } from "uuid";
import styles from "./Comment.module.scss";
function Comment() {
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("/api/comment")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        if (myJson) {
          setComments(myJson);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  const handleClickComment = (e) => {
    setComment(e.currentTarget.value);
  };
  const handleClickUser = (e) => {
    setUser(e.currentTarget.value);
  };

  const refreshFunc = (item) => {
    const templist = comments.concat(item);
    setComments(templist);

    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templist),
    }).then((res) => {
      if (res.status === 200) {
      } else {
        console.log("데이터를 저장하지 못했습니다.");
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      id: uuidv4(),
      content: comment,
      writer: user,
    };
    const templist = comments.concat(variables);

    setComment("");
    setUser("");
    setComments(templist);

    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templist),
    }).then((res) => {
      if (res.status === 200) {
      } else {
        console.error("데이터 저장하지 못했습니다.");
      }
    });
  };

  return (
    <div>
      <br />
      <p className={styles.replyTitle}>댓글 창</p>
      <hr />
      {comments.map(
        (commentitem, index) =>
          !commentitem.Responseto && (
            <div key={index}>
              <SingleComment
                commentitem={commentitem}
                refreshFunc={refreshFunc}
              ></SingleComment>
              <ReplyComment
                parentCommentId={commentitem.id}
                refreshFunc={refreshFunc}
                comments={comments}
              ></ReplyComment>
            </div>
          )
      )}
      <hr />
      <form className={styles.formLayout} onSubmit={onSubmit}>
        <div className={styles.nickname}>
          <textarea
            className={styles.nicknameText}
            onChange={handleClickUser}
            placeholder="닉네임을 입력해주세요"
            value={user}
          ></textarea>
        </div>
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
