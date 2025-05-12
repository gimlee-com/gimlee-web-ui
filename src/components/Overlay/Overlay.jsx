import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const TYPE_PRIMARY = 'primary';
export const TYPE_DEFAULT = 'default';
export const TYPE_SECONDARY = 'secondary';

const CSS_PREFIX = 'uk-overlay';

const Overlay = (props) => {
  const classes = classNames({
    [CSS_PREFIX]: true,
    [`${CSS_PREFIX}-default`]: props.type === TYPE_DEFAULT,
    [`${CSS_PREFIX}-primary`]: props.type === TYPE_PRIMARY,
    [`${CSS_PREFIX}-secondary`]: props.type === TYPE_SECONDARY,
  }, props.className);
  return (
    <div className={classes} {...props.passthrough()}>
      {props.children}
    </div>
  );
};

Overlay.propTypes = {
  type: PropTypes.oneOf([TYPE_DEFAULT, TYPE_PRIMARY, TYPE_SECONDARY]),
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Overlay.defaultProps = {
  type: null,
  children: null,
  className: null,
};

export default withPropsPassthrough()(Overlay);
