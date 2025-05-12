import React, { PureComponent } from 'react';
import classNames from 'classnames';

const DARK_CLASS = 'uk-dark';
const LIGHT_CLASS = 'uk-light';

export function dark() {
  return (WrappedComponent) => {
    class Dark extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(DARK_CLASS, this.props.className)}
          />
        );
      }
    }

    Dark.propTypes = WrappedComponent.propTypes;

    return Dark;
  };
}

export function light() {
  return (WrappedComponent) => {
    class Light extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(LIGHT_CLASS, this.props.className)}
          />
        );
      }
    }

    Light.propTypes = WrappedComponent.propTypes;

    return Light;
  };
}
