import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from './Input';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Checkbox = props => (
  <Input
    type="checkbox"
    className={classNames('uk-checkbox', props.className)}
    defaultChecked={props.defaultChecked}
    {...props.passthrough()}
  />
);

Checkbox.propTypes = {
  defaultChecked: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Checkbox.defaultProps = {
  defaultChecked: false,
  className: null,
};

export default withPropsPassthrough()(Checkbox);

