import Comment from "../components/Comment";
import React from "react";

const renderCommentsRec = (data, level, commentsTree) => {
  if (data) return data.forEach(comment => {
    commentsTree.push(<Comment onReplyClick={} key={comment._id} text={(comment.text || comment.comment.text)} username={comment.user ? comment.user.name : comment.comment.user.name} level={level} />);
    renderCommentsRec(comment.comment ? comment.comment.comments : comment.comments, level + 1, commentsTree);
  });
};
const renderComments = (data) => {
  const commentsTree = [];
  renderCommentsRec(data, 0, commentsTree);
  return commentsTree;
};

export default renderComments;