import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import PageContent from 'gimlee-ui-components/PageContent';
import { RouterButton } from 'gimlee-ui-components/Button';

const RegisterComplete = props => (
  <PageContent>
      <p dangerouslySetInnerHTML={{ __html: // eslint-disable-line
          props.t('app:auth:register:complete', {
            email: props.email,
          }),
      }}
      />
    <RouterButton to="/login">{props.t('doLogin')}</RouterButton>
  </PageContent>
);

RegisterComplete.propTypes = {
  email: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.registration.email,
  };
}

export default connect(mapStateToProps)(translate()(RegisterComplete));
