import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon, { icons, sizes } from '../Icon';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';
import styles from './ActivityIndicator.scss';

const ActivityIndicator = props => (
  <span
    className={classNames(
        styles['activity-indicator'],
        styles[props.position],
        { [styles.active]: props.isActive },
        { [styles.inactive]: !props.isActive },
        props.className,
      )}
    {...props.passthrough(['isActive'])}
  >
    <Icon icon={icons.CIRCLE_FILLED} size={sizes.ICON_XS} />
  </span>
);

ActivityIndicator.propTypes = {
  isActive: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'center']),
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

ActivityIndicator.defaultProps = {
  isActive: false,
  position: 'top',
  className: null,
};

export default withPropsPassthrough()(ActivityIndicator);
