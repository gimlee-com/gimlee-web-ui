import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import except from 'except';

const LISTENER_INTERVAL = 100;

export default function withScrollHeightListener() {
  return (WrappedComponent) => {
    class WithScrollHeightListener extends Component {
      componentDidMount() {
        const domNode = findDOMNode(this);
        this.lastHeight = domNode.clientHeight;

        this.interval = setInterval(() => {
          const currentHeight = findDOMNode(this).scrollHeight;
          if (currentHeight !== this.lastHeight) {
            this.props.onScrollHeightChange(this.lastHeight, currentHeight);
          }
          this.lastHeight = currentHeight;
        }, LISTENER_INTERVAL);
      }

      componentWillUnmount() {
        clearInterval(this.interval);
      }

      render() {
        return <WrappedComponent {...except(this.props, 'onScrollHeightChange')} />;
      }
    }

    WithScrollHeightListener.propTypes = {
      ...WrappedComponent.propTypes,
      onScrollHeightChange: PropTypes.func.isRequired,
    };

    return WithScrollHeightListener;
  };
}

