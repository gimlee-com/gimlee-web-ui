import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ParticipantList.scss';

class ParticipantList extends PureComponent {
  render() {
    return (
      <ul
        ref={this.props.onRef}
        aria-label={this.props.title}
        className={classNames(
          'uk-list',
          styles.list,
          { [styles.inline]: this.props.inline },
          this.props.className,
        )}
      >
        {this.props.children}
      </ul>
    );
  }
}

ParticipantList.propTypes = {
  title: PropTypes.string,
  inline: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

ParticipantList.defaultProps = {
  title: null,
  inline: false,
  children: null,
  className: null,
  onRef: null,
};

export default React.forwardRef((props, ref) => <ParticipantList onRef={ref} {...props} />);
