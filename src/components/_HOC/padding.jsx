import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './padding.scss';

export const PADDING_DEFAULT = 'uk-padding';
export const PADDING_SMALL = 'uk-padding-small';
export const PADDING_MEDIUM = styles.medium;
export const PADDING_LARGE = 'uk-padding-large';

export const PADDING_REMOVE_ALL = 'uk-padding-remove';
export const PADDING_REMOVE_TOP = 'uk-padding-remove-top';
export const PADDING_REMOVE_BOTTOM = 'uk-padding-remove-bottom';
export const PADDING_REMOVE_LEFT = 'uk-padding-remove-left';
export const PADDING_REMOVE_RIGHT = 'uk-padding-remove-right';
export const PADDING_REMOVE_VERTICAL = 'uk-padding-remove-vertical';
export const PADDING_REMOVE_HORIZONTAL = 'uk-padding-remove-horizontal';

function padding(paddingProps) {
  const className = classNames(paddingProps.remove, paddingProps.size);

  return (WrappedComponent) => {
    class Padding extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    Padding.propTypes = WrappedComponent.propTypes;

    return Padding;
  };
}

export function removePadding() {
  return padding({ remove: PADDING_REMOVE_ALL });
}

export function defaultPadding() {
  return padding({ size: PADDING_DEFAULT });
}

export function smallPadding() {
  return padding({ size: PADDING_SMALL });
}

export function mediumPadding() {
  return padding({ size: PADDING_MEDIUM });
}

export function largePadding() {
  return padding({ size: PADDING_LARGE });
}

export function removeBottomPadding() {
  return padding({ remove: PADDING_REMOVE_BOTTOM });
}

export function removeTopPadding() {
  return padding({ remove: PADDING_REMOVE_TOP });
}

export function removeHorizontalPadding() {
  return padding({ remove: PADDING_REMOVE_HORIZONTAL });
}

export function removeVerticalPadding() {
  return padding({ remove: PADDING_REMOVE_VERTICAL });
}

export function removeLeftPadding() {
  return padding({ remove: PADDING_REMOVE_LEFT });
}

export function removeRightPadding() {
  return padding({ remove: PADDING_REMOVE_RIGHT });
}
