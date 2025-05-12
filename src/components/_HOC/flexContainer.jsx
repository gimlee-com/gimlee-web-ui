import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import except from 'except';
import styles from './flexContainer.scss';

export const FLEX_DIRECTION_ROW = 'uk-flex-row';
export const FLEX_DIRECTION_ROW_REVERSE = 'uk-flex-row-reverse';
export const FLEX_DIRECTION_COLUMN = 'uk-flex-column';
export const FLEX_DIRECTION_COLUMN_REVERSE = 'uk-flex-column-reverse';

export const FLEX_WRAP = 'uk-flex-wrap';
export const FLEX_WRAP_REVERSE = 'uk-flex-wrap-reverse';
export const FLEX_NOWRAP = 'uk-flex-nowrap';

export const JUSTIFY_LEFT = 'uk-flex-left';
export const JUSTIFY_CENTER = 'uk-flex-center';
export const JUSTIFY_RIGHT = 'uk-flex-right';
export const JUSTIFY_BETWEEN = 'uk-flex-between';
export const JUSTIFY_AROUND = 'uk-flex-around';

export const ALIGN_ITEMS_STRETCH = 'uk-flex-stretch';
export const ALIGN_ITEMS_TOP = 'uk-flex-top';
export const ALIGN_ITEMS_MIDDLE = 'uk-flex-middle';
export const ALIGN_ITEMS_BOTTOM = 'uk-flex-bottom';
export const ALIGN_ITEMS_BASELINE = styles.alignItemsBaseline;

export const ALIGN_CONTENT_STRETCH = 'uk-flex-wrap-stretch';
export const ALIGN_CONTENT_BETWEEN = 'uk-flex-wrap-between';
export const ALIGN_CONTENT_AROUND = 'uk-flex-wrap-around';
export const ALIGN_CONTENT_TOP = 'uk-flex-wrap-top';
export const ALIGN_CONTENT_MIDDLE = 'uk-flex-wrap-middle';
export const ALIGN_CONTENT_BOTTOM = 'uk-flex-wrap-bottom';

export function flexContainer() {
  return (WrappedComponent) => {
    class FlexContainer extends PureComponent {
      render() {
        const { inline, wrap, direction, contentAlign, contentJustify, itemsAlign } =
          this.props.flexContainer;
        return (
          <WrappedComponent
            {...except(this.props, 'flexContainer')}
            className={
              classNames(
                inline ? 'uk-flex-inline' : 'uk-flex',
                wrap,
                direction,
                contentAlign,
                contentJustify,
                itemsAlign,
                this.props.className,
              )}
          />
        );
      }
    }

    FlexContainer.propTypes = {
      ...WrappedComponent.propTypes,
      flexContainer: PropTypes.shape({
        inline: PropTypes.bool,
        wrap: PropTypes.oneOf([FLEX_WRAP, FLEX_WRAP_REVERSE, FLEX_NOWRAP]),
        direction: PropTypes.oneOf([
          FLEX_DIRECTION_ROW, FLEX_DIRECTION_ROW_REVERSE,
          FLEX_DIRECTION_COLUMN, FLEX_DIRECTION_COLUMN_REVERSE,
        ]),
        contentAlign: PropTypes.oneOf([
          ALIGN_CONTENT_AROUND, ALIGN_CONTENT_BETWEEN, ALIGN_CONTENT_BOTTOM,
          ALIGN_CONTENT_MIDDLE, ALIGN_CONTENT_STRETCH, ALIGN_CONTENT_TOP,
        ]),
        contentJustify: PropTypes.oneOf([
          JUSTIFY_AROUND, JUSTIFY_AROUND, JUSTIFY_BETWEEN,
          JUSTIFY_CENTER, JUSTIFY_LEFT, JUSTIFY_RIGHT,
        ]),
        itemsAlign: PropTypes.oneOf([
          ALIGN_ITEMS_TOP, ALIGN_ITEMS_BOTTOM, ALIGN_ITEMS_MIDDLE, ALIGN_ITEMS_STRETCH,
          ALIGN_ITEMS_BASELINE,
        ]),
      }).isRequired,
    };

    return FlexContainer;
  };
}
