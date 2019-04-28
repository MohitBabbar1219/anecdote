import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import validateRegister from './../../helpers/registerValidations';

import {initRegister} from './../../actions/registerAction';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: [],
  };

  componentDidUpdate() {
    if (this.props.registerData) {
      console.log(this.props.registerData);
      this.props.history.push('/login');
    }
    if (localStorage.getItem('authToken')) {
      this.props.history.push('/dashboard');
    }
  }

  onRegisterFormSubmit = () => {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    const {errors, isValid} = validateRegister(newUser);

    if (!isValid) {
      this.setState({errors: {...errors}});
      return;
    }

    this.props.initRegister(newUser);

    console.log(newUser);
  };

  render() {
    return (<div className="container text-center align-items-center">
      <div className="login-form w-50 p-4 d-inline-block">
        <h2 className="mb-4">Register</h2>
        <input value={this.state.name} onChange={(evt) => this.setState({name: evt.target.value})} className="form-control d-block mt-2" placeholder="Name..."/>
        {!!this.state.errors.name ? <p className="text-danger ml-2">{this.state.errors.name}</p> : null}
        <input value={this.state.email} className="form-control d-block mt-2" onChange={(evt) => this.setState({email: evt.target.value})} placeholder="Email Address..."/>
        {!!this.state.errors.email ? <p className="text-danger ml-2">{this.state.errors.email}</p> : null}
        <input type="password" value={this.state.password} className="form-control d-block mt-2" onChange={(evt) => this.setState({password: evt.target.value})} placeholder="Password..."/>
        {!!this.state.errors.password ? <p className="text-danger ml-2">{this.state.errors.password}</p> : null}
        <input type="password" value={this.state.password2} className="form-control d-block mt-2" onChange={(evt) => this.setState({password2: evt.target.value})} placeholder="Repeat Password..."/>
        {!!this.state.errors.password2 ? <p className="text-danger ml-2">{this.state.errors.password2}</p> : null}
        <button onClick={this.onRegisterFormSubmit} className="btn btn-dark w-50 mt-2">Register</button>
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  registerData: state.register.isRegistrationSuccessful
});

const mapDispatchToProps = dispatch => bindActionCreators({
  initRegister
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));