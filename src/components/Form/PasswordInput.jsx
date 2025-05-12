import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const PasswordInput = props => (
  <Input
    type="password"
    valid={props.valid}
    highlightWhenValid={props.highlightWhenValid}
    {...props.passthrough()}
  />
);

PasswordInput.propTypes = {
  valid: PropTypes.bool,
  highlightWhenValid: PropTypes.bool,
  passthrough: PropTypes.func.isRequired,
};

PasswordInput.defaultProps = {
  valid: null,
  highlightWhenValid: false,
};

export default withPropsPassthrough()(PasswordInput);

