import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
function ReplyComment({ comments, parentCommentId, refreshFunc }) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    comments.map((comment) => {
      if (comment.Responseto === parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [comments, parentCommentId]);

  let renderReplyComment = (parentCommentId) =>
    comments.map((commentitem, index) => (
      <div key={index}>
        {commentitem.Responseto === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              commentitem={commentitem}
              refreshFunc={refreshFunc}
            />
            <ReplyComment
              comments={comments}
              parentCommentId={commentitem.id}
              refreshFunc={refreshFunc}
            />
          </div>
        )}
      </div>
    ));

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };
  return (
    <div>
      {ChildCommentNumber > 0 && (
        <p
          style={{ fontSize: "xx-small", margin: "10px", color: "gray" }}
          onClick={handleChange}
        >
          View {ChildCommentNumber} more comment(s)
          <hr></hr>
        </p>
      )}
      {OpenReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
