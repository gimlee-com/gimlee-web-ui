import React, { PureComponent } from 'react';
import classNames from 'classnames';

const CSS_PREFIX = 'uk-position';

export const PLACEMENT_LEFT = `${CSS_PREFIX}-left`;
export const PLACEMENT_RIGHT = `${CSS_PREFIX}-right`;
export const PLACEMENT_TOP = `${CSS_PREFIX}-top`;
export const PLACEMENT_BOTTOM = `${CSS_PREFIX}-bottom`;
export const PLACEMENT_TOP_LEFT = `${CSS_PREFIX}-top-left`;
export const PLACEMENT_TOP_RIGHT = `${CSS_PREFIX}-top-right`;
export const PLACEMENT_TOP_CENTER = `${CSS_PREFIX}-top-center`;
export const PLACEMENT_CENTER = `${CSS_PREFIX}-center`;
export const PLACEMENT_CENTER_LEFT = `${CSS_PREFIX}-center-left`;
export const PLACEMENT_CENTER_RIGHT = `${CSS_PREFIX}-center-right`;
export const PLACEMENT_BOTTOM_LEFT = `${CSS_PREFIX}-bottom-left`;
export const PLACEMENT_BOTTOM_CENTER = `${CSS_PREFIX}-bottom-center`;
export const PLACEMENT_BOTTOM_RIGHT = `${CSS_PREFIX}-bottom-right`;
export const PLACEMENT_COVER = `${CSS_PREFIX}-cover`;

export const MARGIN_SMALL = `${CSS_PREFIX}-small`;
export const MARGIN_MEDIUM = `${CSS_PREFIX}-medium`;

export const POSITION_RELATIVE = `${CSS_PREFIX}-relative`;
export const POSITION_ABSOLUTE = `${CSS_PREFIX}-absolute`;
export const POSITION_FIXED = `${CSS_PREFIX}-fixed`;
export const POSITION_Z_INDEX_1 = `${CSS_PREFIX}-z-index`;

export default function position(positionProps) {
  const className = classNames(
    positionProps.placement,
    positionProps.margin,
    positionProps.position,
  );

  return (WrappedComponent) => {
    class Position extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    Position.propTypes = WrappedComponent.propTypes;

    return Position;
  };
}
