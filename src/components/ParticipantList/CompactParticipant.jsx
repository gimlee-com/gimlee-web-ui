import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';

import { Div, Image } from '../_Wrappers/index';
import ActivityIndicator from '../ActivityIndicator/index';
import ActionLink from '../ActionLink/index';
import styles from './CompactParticipant.scss';

class CompactParticipant extends PureComponent {
  render() {
    const { user, avatar, isActive, className, children, onRef, onClick } = this.props;
    return (
      <li
        ref={onRef}
        className={className}
      >
        <ActionLink clickAction={onClick} className={styles.link}>
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
          <ActivityIndicator
            position="top"
            isActive={isActive}
            className={styles['activity-indicator']}
          />
          {children}
        </ActionLink>
      </li>
    );
  }
}

CompactParticipant.propTypes = {
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

CompactParticipant.defaultProps = {
  avatar: null,
  isActive: false,
  onClick: UIkit.util.noop,
  className: null,
  children: null,
  onRef: null,
};

export default React.forwardRef((props, ref) => <CompactParticipant onRef={ref} {...props} />);
