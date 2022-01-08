import React from "react";
import styles from "./Commentlayout.module.scss";

function Commentlayout({ commentitem, replyOpen }) {
  const { id, content, writer } = commentitem;
  return (
    <div className={styles.layout}>
      <div className={styles.writer}>{writer}</div>
      <div className={styles.content}>{content}</div>
      <div onClick={replyOpen} className={styles.reply}>
        Reply to
      </div>
    </div>
  );
}

export default Commentlayout;
