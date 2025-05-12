import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { commonButtonPropTypes, commonButtonDefaultProps } from './common-button-prop-types';
import {
  SIZE_LARGE,
  SIZE_SMALL,
  TYPE_PRIMARY,
  TYPE_LINK,
  TYPE_DANGER,
  TYPE_DEFAULT,
  TYPE_SECONDARY,
  TYPE_TEXT,
} from './constants';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const createButtonClassName = (type, size) => classNames({
  'uk-button': true,
  'uk-button-small': size === SIZE_SMALL,
  'uk-button-large': size === SIZE_LARGE,
  'uk-button-default': type === TYPE_DEFAULT,
  'uk-button-primary': type === TYPE_PRIMARY,
  'uk-button-secondary': type === TYPE_SECONDARY,
  'uk-button-danger': type === TYPE_DANGER,
  'uk-button-text': type === TYPE_TEXT,
  'uk-button-link': type === TYPE_LINK,
});

const Button = forwardRef((props, ref) => (
  <button
    ref={ref}
    tabIndex={0}
    className={classNames(
      createButtonClassName(props.type, props.size),
      props.className,
    )}
    type="button"
    {...props.passthrough()}
  >
    {props.children}
  </button>
  ),
);

Button.propTypes = {
  ...commonButtonPropTypes,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};
Button.defaultProps = {
  ...commonButtonDefaultProps,
  className: null,
};

export default withPropsPassthrough()(Button);
