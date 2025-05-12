import React, { PureComponent } from 'react';
import classNames from 'classnames';

const CSS_PREFIX = 'uk-background';

export const BG_COLOR_DEFAULT = `${CSS_PREFIX}-default`;
export const BG_COLOR_MUTED = `${CSS_PREFIX}-muted`;
export const BG_COLOR_PRIMARY = `${CSS_PREFIX}-primary`;
export const BG_COLOR_SECONDARY = `${CSS_PREFIX}-secondary`;

export const BG_SIZE_COVER = `${CSS_PREFIX}-cover`;
export const BG_SIZE_CONTAIN = `${CSS_PREFIX}-contain`;

export const BG_PLACEMENT_TOP_LEFT = `${CSS_PREFIX}-top-left`;
export const BG_PLACEMENT_TOP_CENTER = `${CSS_PREFIX}-top-center`;
export const BG_PLACEMENT_TOP_RIGHT = `${CSS_PREFIX}-top-right`;
export const BG_PLACEMENT_CENTER_LEFT = `${CSS_PREFIX}-center-left`;
export const BG_PLACEMENT_CENTER_CENTER = `${CSS_PREFIX}-center-center`;
export const BG_PLACEMENT_CENTER_RIGHT = `${CSS_PREFIX}-center-right`;
export const BG_PLACEMENT_BOTTOM_LEFT = `${CSS_PREFIX}-bottom-left`;
export const BG_PLACEMENT_BOTTOM_CENTER = `${CSS_PREFIX}-bottom-center`;
export const BG_PLACEMENT_BOTTOM_RIGHT = `${CSS_PREFIX}-bottom-right`;

export default function background(backgroundProps) {
  const className = classNames(
    backgroundProps.color,
    backgroundProps.size,
    backgroundProps.placement,
    { [`${CSS_PREFIX}-norepeat`]: backgroundProps.noRepeat },
    { [`${CSS_PREFIX}-fixed`]: backgroundProps.fixed },
  );

  return (WrappedComponent) => {
    class Background extends PureComponent {

      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    Background.propTypes = WrappedComponent.propTypes;

    return Background;
  };
}
