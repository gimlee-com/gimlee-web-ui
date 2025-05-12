import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default function inline() {
  return (WrappedComponent) => {
    class Inline extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames('uk-inline', this.props.className)}
          />
        );
      }
    }

    Inline.propTypes = WrappedComponent.propTypes;

    return Inline;
  };
}
