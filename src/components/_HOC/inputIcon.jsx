import React, { PureComponent } from 'react';
import classNames from 'classnames';

export default function inputIcon() {
  return (WrappedComponent) => {
    class InputIcon extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(this.props.className, 'uk-form-icon', 'uk-form-icon-flip')}
          />
        );
      }
    }

    InputIcon.propTypes = WrappedComponent.propTypes;

    return InputIcon;
  };
}
