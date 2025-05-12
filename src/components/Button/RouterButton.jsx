import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { createButtonClassName } from './Button';
import { commonButtonDefaultProps, commonButtonPropTypes } from './common-button-prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const RouterButton = forwardRef((props, ref) => (
  <Link
    innerRef={ref}
    id={props.id}
    className={classNames(
      createButtonClassName(props.type, props.size),
      props.className,
    )}
    to={props.to}
    replace={props.replace}
    onClick={props.action}
    target={props.target}
    {...props.passthrough()}
  >
    {props.children}
  </Link>
));

RouterButton.propTypes = {
  ...commonButtonPropTypes,
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  action: PropTypes.func,
  target: PropTypes.string,
  replace: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};
RouterButton.defaultProps = {
  ...commonButtonDefaultProps,
  action: null,
  target: null,
  replace: false,
  className: null,
};

export default withPropsPassthrough()(RouterButton);
