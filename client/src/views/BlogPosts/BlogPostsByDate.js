import React, {Component} from 'react';
import './blog.css'
import {getAllBlogsByDate} from "../../actions/blogActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';
import BlogGroup from "../../components/Blog/BlogGroup";
import BlogCard from "../../components/Blog/BlogCard";

class BlogPosts extends Component {

  componentDidMount() {
    this.props.getAllBlogsByDate();
  }

  gotoBlog = (id) => {
    this.props.history.push(`/blog/${id}`);
  };

  render() {
    return (<div className="mt-4">
      <h2>Blog Posts</h2>
      <div className="blog-posts mt-2">
        {this.props.allBlogsByDate ? this.props.allBlogsByDate.map(date => <BlogGroup date={`${date._id.day}/${date._id.month}/${date._id.year}`} key={date._id} onClick={this.gotoBlog} count={date.count} posts={date.posts}/>) : <h3>Loading...</h3>}
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  allBlogsByDate: state.blogs.allBlogsByDate
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllBlogsByDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogPosts));
