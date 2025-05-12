import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { fetchStatus, fetchStatusPropTypes } from '../../model/api';

export default function forAuthorizedOnly(requiredRoles, redirect = '/login') {
  return (WrappedComponent) => {
    const Authorized = (props) => {
      if (props.userRoles && props.userRoles.indexOf('UNVERIFIED') >= 0) {
        return <Redirect to="/verify" />;
      } else if (
          props.userRoles
          && props.userRoles.some(userRole => requiredRoles.indexOf(userRole) >= 0,
        )
      ) {
        return <WrappedComponent {...props} />;
      } else if (!props.loginStatus.fetching && props.loginStatus.loaded) {
        return <Redirect to="/error/403" />;
      }
      return <Redirect to={redirect} />;
    };

    Authorized.propTypes = { ...WrappedComponent.propTypes || {},
      userRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
      loginStatus: PropTypes.shape(fetchStatusPropTypes).isRequired,
    };

    Authorized.defaultProps = {
      ...WrappedComponent.defaultProps || {},
      userRoles: [],
      loginStatus: { ...fetchStatus },
    };

    function mapStateToProps(state) {
      return {
        loginStatus: state.loginSession.fetchStatus,
        userRoles: state.loginSession.user.roles,
      };
    }

    return connect(mapStateToProps)(Authorized);
  };
}
