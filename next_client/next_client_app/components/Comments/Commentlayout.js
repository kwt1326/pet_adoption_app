import React from "react";
import styles from "./Commentlayout.module.scss";

function Commentlayout({ commentitem, replyOpen }) {
  const { id, parentId, content, writerNickname } = commentitem;
  return (
    <div className={styles.layout}>
      <div className={styles.writer}>{writerNickname}</div>
      <div className={styles.content}>{content}</div>
      {parentId == null && <div onClick={replyOpen} className={styles.reply}>
        답글 달기
      </div>}
    </div>
  );
}

export default Commentlayout;
