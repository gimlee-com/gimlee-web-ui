import React, { PureComponent } from 'react';
import classNames from 'classnames';

export const BORDER_ROUNDED = 'rounded';
export const BORDER_CIRCLE = 'circle';

export default function border({ type }) {
  const className = `uk-border-${type}`;

  return (WrappedComponent) => {
    class Border extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    Border.propTypes = WrappedComponent.propTypes;

    return Border;
  };
}

export function roundedBorder() {
  return border({ type: BORDER_ROUNDED });
}

export function circleBorder() {
  return border({ type: BORDER_CIRCLE });
}
