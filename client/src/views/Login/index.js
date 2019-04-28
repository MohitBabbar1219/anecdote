import React, {Component} from 'react';
import './login.css';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import validateLogin from './../../helpers/loginValidation';

import {initLogin, setLoginErrorsToNull} from './../../actions/loginAction';


class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

  componentDidMount() {
    if (this.props.isLoginSuccessful === true) {
      this.props.history.push('/blog_posts');
    }
  }

  componentDidUpdate() {
    if (this.props.errors) {
      this.setState({errors: this.props.errors});
      console.log(this.props.errors);
      this.props.setLoginErrorsToNull();
    } else if (this.props.isLoginSuccessful === true) {
      this.props.history.push('/blog_posts');
    }
  }

  onLoginFormSubmit = () => {
    const newLogin = {
      email: this.state.email,
      password: this.state.password
    };
    const {errors, isValid} = validateLogin(newLogin);
    if (!isValid) {
      this.setState({errors: {...errors}});
      return;
    }
    this.props.initLogin(newLogin);
    console.log(newLogin);
  };

  render() {
    return (<div className="container text-center align-items-center">
      <div className="login-form w-50 p-4 d-inline-block">
        <h2 className="mb-4">Login</h2>
        <input className="form-control d-block mt-2" value={this.state.email} onChange={(evt) => this.setState({email: evt.target.value})} placeholder="Email Address..."/>
        {!!this.state.errors.email ? <p className="text-danger ml-2">{this.state.errors.email}</p> : null}
        <input type="password" className="form-control d-block mt-2" value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} placeholder="Password..."/>
        {!!this.state.errors.password ? <p className="text-danger ml-2">{this.state.errors.password}</p> : null}
        <button onClick={this.onLoginFormSubmit} className="btn btn-dark w-50 mt-2">Login</button>
      </div>
    </div>)
  }
}

const mapStateToProps = (state) => ({
  isLoginSuccessful: state.login.isLoginSuccessful,
  currentUser: state.login.currentUser,
  errors: state.login.errors
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initLogin,
  setLoginErrorsToNull
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));