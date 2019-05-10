import React from 'react';

const BlogCard = (props) => {
  return (<div className="blog ml-3 mt-3 p-4 bg-light w-75">
    <h4>{props.title}</h4>
    <h6>~{props.author}</h6>
    <p>{props.text}</p>
    <button onClick={props.onClick} className="btn btn-dark">Read More...</button>
  </div>);
};

export default BlogCard;