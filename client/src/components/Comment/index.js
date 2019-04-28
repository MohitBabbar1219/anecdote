import React from 'react';
import './comment.css';

const Comment = (props) => {
  let leftMargin = {marginLeft: `${(props.level * 30)}px`};
  return (<div className="comment p-3 mt-2 w-75" style={leftMargin}>
    <h4>{props.username}</h4>
    <p>{props.text}</p>
    {props.dontShowReply ? null : <button onClick={props.onReplyClick} className="btn btn-dark">Reply</button>}
  </div>);
};

export default Comment;