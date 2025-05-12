import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createButtonClassName } from '../Button/Button';
import { commonButtonPropTypes, commonButtonDefaultProps } from '../Button/common-button-prop-types';
import Input from './Input';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const SubmitButton = props => (
  <Input
    id={props.id}
    type="submit"
    className={classNames(
      createButtonClassName(props.type, props.size),
      props.className,
    )}
    value={props.value}
    {...props.passthrough()}
  />
);

SubmitButton.propTypes = {
  ...commonButtonPropTypes,
  value: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SubmitButton.defaultProps = {
  defaultCommonButtonProps: commonButtonDefaultProps,
  value: '',
  className: null,
};

export default withPropsPassthrough()(SubmitButton);
