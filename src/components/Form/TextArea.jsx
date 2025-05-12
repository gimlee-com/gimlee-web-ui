import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const TextArea = (props) => {
  const className = classNames('uk-textarea', {
    'uk-form-success': props.highlightWhenValid && props.valid === true,
    'uk-form-danger': props.valid === false,
  }, props.className);

  return (
    <textarea
      className={className}
      defaultValue={props.defaultValue}
      {...props.passthrough()}
    />
  );
};

TextArea.propTypes = {
  defaultValue: PropTypes.string,
  valid: PropTypes.bool,
  highlightWhenValid: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  defaultValue: '',
  valid: null,
  className: null,
  highlightWhenValid: false,
};

export default withPropsPassthrough()(TextArea);
