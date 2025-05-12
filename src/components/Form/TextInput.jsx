import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const INPUT_TYPE_TEXT = 'text';
export const INPUT_TYPE_EMAIL = 'email';

const TextInput = forwardRef((props, ref) => (
  <Input
    ref={ref}
    type={props.type}
    valid={props.valid}
    highlightWhenValid={props.highlightWhenValid}
    defaultValue={props.defaultValue}
    {...props.passthrough()}
  />
));

TextInput.propTypes = {
  type: PropTypes.oneOf([INPUT_TYPE_TEXT, INPUT_TYPE_EMAIL]),
  valid: PropTypes.bool,
  highlightWhenValid: PropTypes.bool,
  defaultValue: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  type: INPUT_TYPE_TEXT,
  valid: null,
  highlightWhenValid: false,
  defaultValue: '',
};

export default withPropsPassthrough()(TextInput);

