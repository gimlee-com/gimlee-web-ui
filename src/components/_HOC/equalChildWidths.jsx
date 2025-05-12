import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { TYPE_AUTO, TYPE_EXPAND, TYPE_FRACTION } from './helper/width-constants';
import getWidthClassName from './helper/get-width-class-name';

export function equalChildWidths(childWidthProps) {
  const className = getWidthClassName('uk-child-width-', childWidthProps);

  return (WrappedComponent) => {
    class EqualChildWidthsComponent extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    EqualChildWidthsComponent.propTypes = WrappedComponent.propTypes;

    return EqualChildWidthsComponent;
  };
}

export function equalFractionChildWidths(nominator, denominator, viewportSize) {
  return equalChildWidths({
    widthType: TYPE_FRACTION,
    fraction: { nominator, denominator },
    viewportSize });
}

export function equalAutoChildWidths(viewportSize) {
  return equalChildWidths({
    widthType: TYPE_AUTO,
    viewportSize });
}

export function equalExpandedChildWidths(viewportSize) {
  return equalChildWidths({
    widthType: TYPE_EXPAND,
    viewportSize });
}
