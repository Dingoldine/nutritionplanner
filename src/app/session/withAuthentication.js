import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../firebase';

import { AUTH_USER } from '../constants'

const withAuthentication = Component => {

  class WithAuthentication extends React.Component {

    constructor(props) {
      super(props);
      const { onSetAuthUser } = this.props
      onSetAuthUser(
        JSON.parse(localStorage.getItem('authUser')),
      );
    }

    componentDidMount() {
      const { firebase, onSetAuthUser } = this.props
      this.listener = firebase.auth.onAuthStateChanged(authUser => {  
          if(authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));         
            onSetAuthUser(authUser);
          } else {
            localStorage.removeItem('authUser');
            onSetAuthUser(null);
          }   
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
      dispatch({ type: AUTH_USER, payload: authUser }),
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps,
    ),
  )(WithAuthentication);
};

export default withAuthentication;