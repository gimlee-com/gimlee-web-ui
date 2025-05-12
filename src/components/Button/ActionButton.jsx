import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createButtonClassName } from './Button';
import { commonButtonPropTypes, commonButtonDefaultProps } from './common-button-prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const ActionButton = forwardRef((props, ref) => (
  <button
    ref={ref}
    tabIndex={0}
    className={classNames(
      createButtonClassName(props.type, props.size),
      props.className,
    )}
    type="button"
    onClick={props.action}
    {...props.passthrough()}
  >
    {props.children}
  </button>
));

ActionButton.propTypes = {
  ...commonButtonPropTypes,
  className: PropTypes.string,
  action: PropTypes.func.isRequired,
  passthrough: PropTypes.func.isRequired,
};
ActionButton.defaultProps = {
  ...commonButtonDefaultProps,
  className: null,
};

export default withPropsPassthrough()(ActionButton);
