import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
function ReplyComment({ postid, comments, parentCommentId, refreshFunc }) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(true);
  useEffect(() => {
    let commentNumber = 0;
    comments.map((comment) => {
      if (comment.parentId === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [comments, parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    comments.map((commentitem, index) => (
      <div key={index}>
        {commentitem.parentId === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              commentitem={commentitem}
              refreshFunc={refreshFunc}
              postid={postid}
            />
            <ReplyComment
              comments={comments}
              parentCommentId={commentitem.id}
              refreshFunc={refreshFunc}
              postid={postid}
            />
          </div>
        )}
      </div>
    ));

  return (
    <div>
      {OpenReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
