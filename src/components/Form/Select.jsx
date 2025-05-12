import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from './Option';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Select = props => (
  <select
    className={classNames('uk-input', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </select>
);

Select.propTypes = {
  children: PropTypes.arrayOf(Option),
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Select.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(Select);
