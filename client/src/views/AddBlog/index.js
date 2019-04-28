import React, {Component} from 'react';
import validateBlog from "../../helpers/blogValidation";
import {publishBlog, resetPublishedBlog} from "../../actions/blogActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link, withRouter} from 'react-router-dom';

class AddBlog extends Component {
  state = {
    text: "",
    title: "",
    errors: {}
  };

  componentDidUpdate() {
    console.log(this.props.publishedBlog);
    if (this.props.publishedBlog) {
      this.props.history.push(`/blog/${this.props.publishedBlog._id}`);
    }
  }

  onBlogSubmit = () => {
    this.props.resetPublishedBlog();
    const newBlog = {
      text: this.state.text,
      title: this.state.title
    };
    const {errors, isValid} = validateBlog(newBlog);
    if (!isValid) {
      this.setState({errors: {...errors}});
      return;
    }
    this.props.publishBlog(newBlog);
    console.log(newBlog);
  };

  render() {
    return (<div>
      <div className="mt-4">
        <h2>Add Blog</h2>
        <div className="blog-form">
          <input value={this.state.title} onChange={(evt) => this.setState({title: evt.target.value})} type="text" className="d-block w-75 form-control mt-2" placeholder="Title..."/>
          <textarea  value={this.state.text} onChange={(evt) => this.setState({text: evt.target.value})} rows={6} type="text" className="d-block w-75 form-control mt-2" placeholder="Text..."/>
          <div className="text-center w-75">
            <button onClick={this.onBlogSubmit} className="mt-2 btn btn-dark w-50">Publish Blog</button>
          </div>
        </div>
      </div>
    </div>)
  }
}


const mapStateToProps = (state) => ({
  publishedBlog: state.blogs.publishedBlog
});

const mapDispatchToProps = dispatch => bindActionCreators({
  publishBlog,
  resetPublishedBlog,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddBlog));