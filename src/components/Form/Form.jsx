import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const FORM_STACKED = 'stacked';
export const FORM_HORIZONTAL = 'horizontal';

const handleOnSubmit = (e, handler) => {
  e.preventDefault();
  if (handler) {
    handler(e);
  }
};

const Form = (props) => {
  const className = classNames({
    'uk-form-stacked': props.layout === FORM_STACKED,
    'uk-form-horizontal': props.layout === FORM_HORIZONTAL,
  }, props.className);
  return (
    <form
      className={className}
      onSubmit={e => handleOnSubmit(e, props.onSubmit)}
      {...props.passthrough()}
    >
      {props.children}
    </form>);
};

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  layout: PropTypes.oneOf([FORM_STACKED, FORM_HORIZONTAL, null]),
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Form.defaultProps = {
  children: null,
  onSubmit: null,
  layout: null,
  className: null,
};

export default withPropsPassthrough()(Form);
