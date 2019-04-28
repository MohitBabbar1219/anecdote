import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {getCommentsForBlog, getSpecificBlog, postCommentFromBlog} from "../../actions/blogActions";
import Comment from "../../components/Comment";

class SpotlightBlog extends Component {
  state = {
    comment: "",
    error: ""
  };

  componentDidUpdate() {
    if (this.props.commentPosted) {
      this.props.getCommentsForBlog(this.props.match.params.id)
    }
  }

  renderCommentsRec = (data, level, commentsTree) => {
    if (data) return data.forEach(comment => {
      commentsTree.push(<Comment onReplyClick={() => this.props.history.push(`/comment/${comment.comment ? comment.comment._id : comment._id}`)} key={comment._id} text={(comment.text || comment.comment.text)} username={comment.user ? comment.user.name : comment.comment.user.name} level={level} />);
      this.renderCommentsRec(comment.comment ? comment.comment.comments : comment.comments, level + 1, commentsTree);
    });
  };
  renderComments = (data) => {
    const commentsTree = [];
    this.renderCommentsRec(data, 0, commentsTree);
    return commentsTree;
  };

  componentDidMount() {
    console.log(this.props.match);
    this.props.getSpecificBlog(this.props.match.params.id);
    this.props.getCommentsForBlog(this.props.match.params.id);
  }

  onBlogPostComment = () => {
    if (this.state.comment.length === 0) {
      return this.setState({error: "Invalid comment"});
    }
    this.props.postCommentFromBlog({text: this.state.comment}, this.props.match.params.id);
  };

  render() {
    return (<div className="mb-4">
      {this.props.specificBlog ? <div className="blog ml-3 p-4 bg-light mt-4">
        <h2 className="text-capitalize text-dark">{this.props.specificBlog.title}</h2>
        <p>{this.props.specificBlog.text}</p>
      </div> : <h3 className="mt-4">Loading...</h3>}
      <h3 className="mt-3">Comments</h3>
      <div className="ml-3 mt-4">
        <textarea rows={2} className="form-control w-50" value={this.state.comment}
                  onChange={(evt) => this.setState({comment: evt.target.value})} placeholder="Comment on this blog..."/>
        {this.state.error.length !== 0 ? <p className="text-danger ml-2">{this.state.error}</p> : null}
        <button onClick={this.onBlogPostComment} className="mt-2 btn btn-dark">Post Comment</button>
      </div>
      <div className="mt-4">
        {this.props.commentsSpecificBlog ? this.renderComments(this.props.commentsSpecificBlog) : <h3>Loading...</h3>}
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  specificBlog: state.blogs.specificBlog,
  commentsSpecificBlog: state.blogs.commentsSpecificBlog,
  commentPosted: state.blogs.commentPosted
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSpecificBlog,
  getCommentsForBlog,
  postCommentFromBlog
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SpotlightBlog));