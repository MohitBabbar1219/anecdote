import React, {Component} from 'react';
import './blog.css'
import {getAllBlogs} from "../../actions/blogActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import BlogCard from "../../components/BlogCard";

class BlogPosts extends Component {

  componentDidMount() {
    this.props.getAllBlogs();
  }

  gotoBlog = (id) => {
    this.props.history.push(`/blog/${id}`);
  };

  render() {
    return (<div className="mt-4">
      <h2>Blog Posts</h2>
      <div className="blog-posts mt-2">
        {this.props.allBlogs ? this.props.allBlogs.map(blog => <BlogCard author={blog.user.name} key={blog._id} onClick={() => this.gotoBlog(blog._id)} title={blog.title} text={blog.text}/>) : <h3>Loading...</h3>}
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  allBlogs: state.blogs.allBlogs
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllBlogs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogPosts));
