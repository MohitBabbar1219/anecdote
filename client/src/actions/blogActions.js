import axios from 'axios';

export const BLOG_DATA = "BLOG_DATA";
export const BLOG_DATA_BY_DATE = "BLOG_DATA_BY_DATE";
export const SPECIFIC_BLOG = "SPECIFIC_BLOG";
export const MY_BLOGS = "MY_BLOGS";
export const PUBLISHED_BLOG = "PUBLISHED_BLOG";
export const RESET_PUBLISHED_BLOG = "RESET_PUBLISHED_BLOG";
export const COMMENTS_SPECIFIC_BLOG = "COMMENTS_SPECIFIC_BLOG";
export const POSTED_COMMENT = "POSTED_COMMENT";
export const SPECIFIC_COMMENT = "SPECIFIC_COMMENT";

export const getAllBlogs = (data) => {
  return dispatch => {
    axios.get('/api/blogs', data).then(data => {
      console.log(data);
      dispatch({
        type: BLOG_DATA,
        payload: data.data
      });
    });
  }
};

export const getAllBlogsByDate = (data) => {
  return dispatch => {
    axios.get('/api/blogs/group_by_date', data).then(data => {
      console.log(data);
      dispatch({
        type: BLOG_DATA_BY_DATE,
        payload: data.data
      });
    });
  }
};

export const getSpecificBlog = (id) => {
  return dispatch => {
    axios.get(`/api/blogs/${id}`).then(data => {
      console.log(data);
      dispatch({
        type: SPECIFIC_BLOG,
        payload: data.data
      });
    });
  }
};

export const getCommentsForBlog = (id) => {
  return dispatch => {
    axios.get(`/api/comments/of_blog_threaded/${id}`).then(data => {
      console.log(data);
      dispatch({
        type: COMMENTS_SPECIFIC_BLOG,
        payload: data.data
      });
    });
  }
};

export const getMyBlogs = () => {
  return dispatch => {
    axios.get(`/api/blogs/my_blogs`).then(data => {
      console.log(data);
      dispatch({
        type: MY_BLOGS,
        payload: data.data
      });
    });
  }
};

export const publishBlog = (data) => {
  return dispatch => {
    axios.post(`/api/blogs`, data).then(data => {
      console.log(data);
      dispatch({
        type: PUBLISHED_BLOG,
        payload: data.data
      });
    });
  }
};

export const postCommentFromBlog = (data, blogId) => {
  return dispatch => {
    axios.post(`/api/blogs/${blogId}/comment`, data).then(data => {
      console.log(data);
      dispatch({
        type: POSTED_COMMENT,
      });
    });
  }
};

export const postCommentFromComment = (data, commentId) => {
  return dispatch => {
    axios.post(`/api/comments/${commentId}`, data).then(data => {
      console.log(data);
      dispatch({
        type: POSTED_COMMENT,
      });
    });
  }
};

export const getSpecificComment = (id) => {
  return dispatch => {
    axios.get(`/api/comments/${id}`).then(data => {
      console.log(data);
      dispatch({
        type: SPECIFIC_COMMENT,
        payload: data.data
      });
    });
  }
};

export const resetPublishedBlog = () => {
  return dispatch => {
    dispatch({
      type: RESET_PUBLISHED_BLOG
    });
  }
};
