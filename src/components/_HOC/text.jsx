import React, { PureComponent } from 'react';
import classNames from 'classnames';

export const TEXT_STYLE_LEAD = 'uk-text-lead';
export const TEXT_STYLE_META = 'uk-text-meta';

export const TEXT_SMALL = 'uk-text-small';
export const TEXT_LARGE = 'uk-text-large';

export const TEXT_UPPERCASE = 'uk-text-uppercase';
export const TEXT_CAPITALIZE = 'uk-text-capitalize';
export const TEXT_LOWERCASE = 'uk-text-lowercase';

export const TEXT_COLOR_MUTED = 'uk-text-muted';
export const TEXT_COLOR_PRIMARY = 'uk-text-primary';
export const TEXT_COLOR_SUCCESS = 'uk-text-success';
export const TEXT_COLOR_WARNING = 'uk-text-warning';
export const TEXT_COLOR_DANGER = 'uk-text-danger';

export const TEXT_LEFT = 'uk-text-left';
export const TEXT_RIGHT = 'uk-text-right';
export const TEXT_CENTER = 'uk-text-center';
export const TEXT_JUSTIFY = 'uk-text-justify';

export default function text(textProps) {
  const className = classNames(
    {
      'uk-text-bold': textProps.bold,
    },
    textProps.style,
    textProps.size,
    textProps.transform,
    textProps.align,
    textProps.color,
  );

  return (WrappedComponent) => {
    class Text extends PureComponent {
      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={classNames(className, this.props.className)}
          />
        );
      }
    }

    Text.propTypes = WrappedComponent.propTypes;

    return Text;
  };
}
