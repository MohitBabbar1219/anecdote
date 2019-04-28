import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from "../../actions/loginAction";

class NavBar extends React.Component {
  initLogout = () => {
    this.props.logout();
    this.props.history.push('/');
  };

  render() {
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Anecdote</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/blog_posts">Blog Posts</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/new_blog">Add Blog</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my_blog_posts">My Blog Posts</Link>
          </li>
        </ul>
        {!this.props.currentUser ? <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul> : <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" style={{cursor: 'pointer'}} onClick={this.initLogout}>
              <img className="rounded-circle"
                   style={{width: '25px', marginRight: '5px'}}
                   src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                   alt=""
                   title="You must have a Gravatar connected to your email to display an image"/> Logout
            </a>
          </li>
        </ul>}
      </div>
    </nav>);
  }
};


const mapStateToProps = state => ({
  currentUser: state.login.currentUser
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));