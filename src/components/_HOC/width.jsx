import React, { PureComponent } from 'react';
import classNames from 'classnames';
import getWidthClassName from './helper/get-width-class-name';
import {
  SIZE_LARGE,
  SIZE_MEDIUM,
  SIZE_SMALL,
  SIZE_XLARGE,
  SIZE_XXLARGE,
  TYPE_AUTO,
  TYPE_EXPAND,
  TYPE_FIXED,
  TYPE_FRACTION,
} from './helper/width-constants';

export function width(widthProps) {
  const className = getWidthClassName('uk-width-', widthProps);

  return (WrappedComponent) => {
    class WidthComponent extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    WidthComponent.propTypes = WrappedComponent.propTypes;

    return WidthComponent;
  };
}

export function fractionWidth(nominator, denominator, viewportSize) {
  return width({
    widthType: TYPE_FRACTION,
    fraction: { nominator, denominator },
    viewportSize,
  });
}

export function fullWidth(viewportSize) {
  return width({
    widthType: TYPE_FRACTION,
    fraction: { nominator: 1, denominator: 1 },
    viewportSize,
  });
}

export function autoWidth(viewportSize) {
  return width({
    widthType: TYPE_AUTO,
    viewportSize,
  });
}

export function expandWidth(viewportSize) {
  return width({
    widthType: TYPE_EXPAND,
    viewportSize,
  });
}

export function smallWidth(viewportSize) {
  return width({
    widthType: TYPE_FIXED,
    size: SIZE_SMALL,
    viewportSize,
  });
}

export function mediumWidth(viewportSize) {
  return width({
    widthType: TYPE_FIXED,
    size: SIZE_MEDIUM,
    viewportSize,
  });
}

export function largeWidth(viewportSize) {
  return width({
    widthType: TYPE_FIXED,
    size: SIZE_LARGE,
    viewportSize,
  });
}

export function xlargeWidth(viewportSize) {
  return width({
    widthType: TYPE_FIXED,
    size: SIZE_XLARGE,
    viewportSize,
  });
}

export function xxlargeWidth(viewportSize) {
  return width({
    widthType: TYPE_FIXED,
    size: SIZE_XXLARGE,
    viewportSize,
  });
}
