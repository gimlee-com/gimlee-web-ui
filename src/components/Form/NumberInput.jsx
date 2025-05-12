import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const NumberInput = props => (
  <Input
    type="number"
    defaultValue={props.defaultValue ? props.defaultValue : 0}
    {...props.passthrough()}
  />
);

NumberInput.propTypes = {
  defaultValue: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

NumberInput.defaultProps = {
  defaultValue: '0',
};

export default withPropsPassthrough()(NumberInput);
