import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {getSpecificComment, postCommentFromComment} from "../../actions/blogActions";
import Comment from "../../components/Comment";

class CommentOnComment extends Component {
  state = {
    comment: "",
    error: ""
  };

  componentDidMount() {
    this.props.getSpecificComment(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (this.props.commentPosted) {
      this.props.history.push(`/blog/${this.props.specificComment.blog}`);
    }
  }

  onCommentComment = () => {
    if (this.state.comment.length === 0) {
      return this.setState({error: "Invalid comment"});
    }
    this.props.postCommentFromComment({text: this.state.comment}, this.props.match.params.id);
  };

  render() {
    return (<div className="mt-4">
      {this.props.specificComment ? <Comment dontShowReply text={this.props.specificComment.text} username={this.props.specificComment.user.name} level={0} /> : <h3>Loading...</h3>}
      <div className="ml-3 mt-4">
        <textarea rows={2} className="form-control w-50" value={this.state.comment}
                  onChange={(evt) => this.setState({comment: evt.target.value})} placeholder="Comment on this blog..."/>
        {this.state.error.length !== 0 ? <p className="text-danger ml-2">{this.state.error}</p> : null}
        <button onClick={this.onCommentComment} className="mt-2 btn btn-dark">Post Comment</button>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  specificComment: state.blogs.specificComment,
  commentPosted: state.blogs.commentPosted,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSpecificComment,
  postCommentFromComment,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentOnComment));