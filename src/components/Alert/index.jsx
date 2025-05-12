import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UIkit from 'uikit';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const ALERT_PRIMARY = 'primary';
export const ALERT_SUCCESS = 'success';
export const ALERT_WARNING = 'warning';
export const ALERT_DANGER = 'danger';

class Alert extends Component {

  componentDidMount() {
    this.domNode.addEventListener('beforehide', this.props.onBeforeHide);
    this.domNode.addEventListener('hide', this.props.onHide);
  }

  componentWillUnmount() {
    this.domNode.removeEventListener('beforehide', this.props.onBeforeHide);
    this.domNode.removeEventListener('hide', this.props.onHide);
  }

  render() {
    return (
      <div
        ref={(ref) => { this.domNode = ref; }}
        className={classNames(
          'uk-alert',
          { [`uk-alert-${this.props.type}`]: !!this.props.type },
          this.props.className,
        )}
        {...this.props.passthrough()}
        uk-alert=""
      >
        {
          this.props.withCloseButton
          && <a className={classNames('uk-alert-close', this.props.closeButtonClassName)} uk-close=""/> // eslint-disable-line
        }
        {this.props.children}
      </div>
    );
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf([ALERT_DANGER, ALERT_PRIMARY, ALERT_SUCCESS, ALERT_WARNING]),
  withCloseButton: PropTypes.bool,
  onBeforeHide: PropTypes.func,
  onHide: PropTypes.func,
  className: PropTypes.string,
  closeButtonClassName: PropTypes.string,
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

Alert.defaultProps = {
  type: null,
  withCloseButton: false,
  onBeforeHide: UIkit.util.noop,
  onHide: UIkit.util.noop,
  className: null,
  closeButtonClassName: null,
  children: null,
};

export default withPropsPassthrough()(Alert);
