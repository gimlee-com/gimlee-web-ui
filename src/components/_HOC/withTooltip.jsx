import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import UIKit from 'uikit';
import animations from '../constant/animations';

export default function withTooltip(targetDevices) {
  return (WrappedComponent) => {
    if (targetDevices && targetDevices.indexOf(APP_TARGET_DEVICE) < 0) {
      return WrappedComponent;
    }

    class WithTooltip extends Component {
      componentDidMount() {
        UIKit.tooltip(findDOMNode(this), this.props.tooltip);
      }

      render() {
        return (<WrappedComponent {...this.props} />);
      }
    }

    WithTooltip.propTypes = {
      tooltip: PropTypes.shape({
        title: PropTypes.string,
        pos: PropTypes.oneOf([
          'top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'left', 'right',
        ]),
        offset: PropTypes.number,
        animation: PropTypes.oneOf(Object.values(animations)),
        duration: PropTypes.number,
        delay: PropTypes.number,
        cls: PropTypes.string,
      }).isRequired,
      ...WrappedComponent.propTypes,
    };

    return WithTooltip;
  };
}
