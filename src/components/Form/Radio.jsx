import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from './Input';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Radio = props => (
  <Input
    type="radio"
    className={classNames('uk-radio', props.className)}
    {...props.passthrough()}
  />
);

Radio.propTypes = {
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Radio.defaultProps = {
  className: null,
};

export default withPropsPassthrough()(Radio);

