import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Label.scss';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const LABEL_DEFAULT = 'default';
export const LABEL_SUCCESS = 'primary';
export const LABEL_WARNING = 'warning';
export const LABEL_DANGER = 'danger';

export const LABEL_SIZE_SMALL = 'small';
export const LABEL_SIZE_DEFAULT = 'default';

const Label = props => (
  <span
    ref={props.onRef}
    styleName="label"
    className={classNames(
      'uk-label',
      `uk-label-${props.type}`,
      { [[styles.small]]: props.size === LABEL_SIZE_SMALL },
      props.className,
    )}
    {...props.passthrough()}
  >
    {props.children}
  </span>
);

Label.propTypes = {
  type: PropTypes.oneOf([LABEL_DANGER, LABEL_DEFAULT, LABEL_SUCCESS, LABEL_WARNING]),
  size: PropTypes.oneOf([LABEL_SIZE_DEFAULT, LABEL_SIZE_SMALL]),
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Label.defaultProps = {
  type: LABEL_DEFAULT,
  size: LABEL_SIZE_DEFAULT,
  children: null,
  className: null,
  onRef: null,
};

const LabelWithPropsPassthrough = withPropsPassthrough()(Label);

export default React.forwardRef(
  (props, ref) => <LabelWithPropsPassthrough onRef={ref} {...props} />,
);
