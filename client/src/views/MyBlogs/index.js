import React, {Component} from 'react';
import {getMyBlogs} from "../../actions/blogActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import BlogCard from "../../components/BlogCard";

class MyBlogs extends Component {
  componentDidMount() {
    this.props.getMyBlogs();
  }

  gotoBlog = (id) => {
    this.props.history.push(`/blog/${id}`);
  };

  render() {
    return (<div>
      <h2 className="mt-4">My Blog Posts</h2>
      <div className="blog-posts mt-2">
      {this.props.myBlogs ? this.props.myBlogs.map(blog => <BlogCard author={blog.user.name} key={blog._id} onClick={() => this.gotoBlog(blog._id)} title={blog.title} text={blog.text}/>) : <h3>Loading...</h3>}
    </div>
    </div>)
  }
}


const mapStateToProps = (state) => ({
  myBlogs: state.blogs.myBlogs
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getMyBlogs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyBlogs));