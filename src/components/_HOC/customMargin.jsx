import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import except from 'except';

const CLASSNAME_PREFIX = 'uk-margin';
const REMOVE_PREFIX = `${CLASSNAME_PREFIX}-remove`;

export default function customMargin() {
  return (WrappedComponent) => {
    class Margin extends PureComponent {
      render() {
        const marginClassNames = [];
        this.props.addMargins.forEach((addMarginSetting) => {
          const size = addMarginSetting.size === 'default' ? null : addMarginSetting.size;
          const position = addMarginSetting.position;
          marginClassNames.push([CLASSNAME_PREFIX, size, position].join('-').replace(/-+/g, '-'));
        });
        this.props.removeMargins.forEach((removeSetting) => {
          marginClassNames.push(removeSetting === 'all' ? REMOVE_PREFIX : `${REMOVE_PREFIX}-${removeSetting}`);
        });

        return (
          <WrappedComponent
            {...except(this.props, ['addMargins', 'removeMargins'])}
            className={classNames(marginClassNames, this.props.className)}
          />
        );
      }
    }

    Margin.propTypes = {
      ...WrappedComponent.propTypes || {},
      addMargins: PropTypes.arrayOf(PropTypes.shape({
        size: PropTypes.oneOf(['default', 'small', 'medium', 'large', 'xlarge']),
        position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']).isRequired,
      })),
      removeMargins: PropTypes.arrayOf(
        PropTypes.oneOf(['all', 'top', 'bottom', 'left', 'right', 'vertical', 'adjacent']),
      ),
    };

    Margin.defaultProps = {
      ...WrappedComponent.defaultProps || {},
      addMargins: [],
      removeMargins: [],
    };

    return Margin;
  };
}
