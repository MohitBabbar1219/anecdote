import React from 'react';
import Login from "./views/Login";
import NavBar from "./components/Navbar";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import setAuthToken from "./utils/setAuthToken";
import {setCurrentUser} from "./actions/loginAction";
import PrivateRoute from "./hoc/PrivateRoute";
import BlogPosts from "./views/BlogPosts/BlogPosts";
import Register from "./views/Register";
import MyBlogs from "./views/MyBlogs";
import CommentOnComment from "./views/CommentOnComment";
import AddBlog from "./views/AddBlog";
import SpotlightBlog from "./views/SpotlightBlog";
import BlogPostsByDate from "./views/BlogPosts/BlogPostsByDate";

class App extends React.Component {
  componentDidMount() {
    console.log('auth token set');
    setAuthToken(localStorage.getItem('authToken'));
    this.props.setCurrentUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <div className="container">
            <Route path="/" exact component={BlogPostsByDate}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/blog/:id" exact component={SpotlightBlog}/>
            <Route path="/blog_posts" exact component={BlogPosts}/>
            <Switch>
              <PrivateRoute path='/my_blog_posts' exact component={MyBlogs}/>
              <PrivateRoute path='/new_blog' exact component={AddBlog}/>
              <PrivateRoute path='/comment/:id' exact component={CommentOnComment}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setCurrentUser
}, dispatch);

export default connect(null, mapDispatchToProps)(App);

