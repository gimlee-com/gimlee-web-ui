import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UIkit from 'uikit';

import { Div, Image, Span } from '../_Wrappers/index';
import ActivityIndicator from '../ActivityIndicator/index';
import ActionLink from '../ActionLink/index';
import styles from './Participant.scss';

class Participant extends PureComponent {
  render() {
    const { user, avatar, isActive, className, children, onRef, onClick } = this.props;
    return (
      <li
        ref={onRef}
        className={classNames(className)}
      >
        <ActionLink clickAction={onClick} className={styles.link}>
          <ActivityIndicator
            position="center"
            isActive={isActive}
            className={styles['activity-indicator']}
          />
          {
          !!avatar &&
          <Image
            src={avatar}
            alt={`User avatar: ${user.displayName}`}
            className={styles.image}
          />
        }
          {
          !avatar &&
          <Div className={styles.image} />
        }
          <Span className={styles['user-display-name']}>{ user.displayName }</Span>
          {children}
        </ActionLink>
      </li>
    );
  }
}

Participant.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    displayName: PropTypes.string,
  }).isRequired,
  avatar: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

Participant.defaultProps = {
  avatar: null,
  isActive: false,
  onClick: UIkit.util.noop,
  className: null,
  children: null,
  onRef: null,
};

export default React.forwardRef((props, ref) => <Participant onRef={ref} {...props} />);
