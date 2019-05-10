import React from 'react';
import './BlogCard.css'

const BlogCard = (props) => {
  return (<div className="blog ml-3 mt-3 p-4 bg-light w-75">
    <h2 className="d-inline-block">{props.date}</h2>
    <h2 className="d-inline-block ml-3">count: {props.count}</h2>
    {props.posts.map(post => <div className="blog-by-date mt-2 p-2 px-3">
      <h5 className="d-inline-block mr-3">{post.title}</h5>
      <button onClick={() => props.onClick(post.id)} className="btn btn-dark d-inline-block">Read More...</button>
    </div>)}
  </div>);
};

export default BlogCard;