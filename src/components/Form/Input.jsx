import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Input = forwardRef((props, ref) => {
  const className = classNames({
    'uk-input': ['text', 'password', 'number'].indexOf(props.type) >= 0,
    'uk-checkbox': props.type === 'checkbox',
    'uk-radio': props.type === 'radio',
    'uk-form-success': props.highlightWhenValid && props.valid === true,
    'uk-form-danger': props.valid === false,
  }, props.className);

  const inputProps = {
    className,
    type: props.type,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    onAbort: props.onAbort,
    onChange: props.onChange,
    placeholder: props.placeholder,
    disabled: props.disabled,
    name: props.name,
    id: props.id,
  };
  if (props.type === 'number') {
    inputProps.step = props.step;
    inputProps.min = props.min;
    inputProps.max = props.max;
  }

  return (<input ref={ref} {...inputProps} {...props.passthrough()} />);
});

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'submit', 'checkbox', 'radio', 'number']).isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onAbort: PropTypes.func,
  onKeyPress: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  valid: PropTypes.bool,
  highlightWhenValid: PropTypes.bool,
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  passthrough: PropTypes.func.isRequired,
};

Input.defaultProps = {
  onFocus: null,
  onBlur: null,
  onAbort: null,
  onKeyPress: null,
  onChange: null,
  placeholder: null,
  disabled: false,
  name: null,
  className: null,
  id: null,
  valid: null,
  highlightWhenValid: false,
  step: 1,
  min: null,
  max: null,
};

export default withPropsPassthrough()(Input);
