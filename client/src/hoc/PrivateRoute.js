import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      !!auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login"/>
      )
    }
  />
);


const mapStateToProps = state => ({
  auth: state.login.currentUser
});

export default connect(mapStateToProps)(PrivateRoute);
