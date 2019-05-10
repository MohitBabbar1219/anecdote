import {
  BLOG_DATA, BLOG_DATA_BY_DATE, COMMENTS_SPECIFIC_BLOG,
  MY_BLOGS,
  POSTED_COMMENT,
  PUBLISHED_BLOG,
  RESET_PUBLISHED_BLOG,
  SPECIFIC_BLOG, SPECIFIC_COMMENT
} from "../actions/blogActions";


export default (state = {}, action) => {
  switch (action.type) {
    case BLOG_DATA:
      console.log(action.payload.posts);
      return {
        ...state,
        allBlogs: action.payload.posts
      };
    case BLOG_DATA_BY_DATE:
      console.log(action.payload.posts);
      return {
        ...state,
        allBlogsByDate: action.payload
      };
    case SPECIFIC_BLOG:
      console.log(action.payload);
      return {
        ...state,
        specificBlog: action.payload,
        publishedBlog: false
      };
    case SPECIFIC_COMMENT:
      console.log(action.payload);
      return {
        ...state,
        specificComment: action.payload
      };
    case COMMENTS_SPECIFIC_BLOG:
      console.log(action.payload);
      return {
        ...state,
        commentsSpecificBlog: action.payload,
        commentPosted: false
      };
    case MY_BLOGS:
      console.log(action.payload);
      return {
        ...state,
        myBlogs: action.payload.posts
      };
    case PUBLISHED_BLOG:
      console.log(action.payload);
      return {
        ...state,
        publishedBlog: action.payload
      };
    case RESET_PUBLISHED_BLOG:
      return {
        ...state,
        publishedBlog: undefined
      };
    case POSTED_COMMENT:
      return {
        ...state,
        commentPosted: true,
      };
    default:
      return {...state};
  }
}