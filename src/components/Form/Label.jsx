import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Label = props => (
  <label
    htmlFor={props.for}
    className={classNames('uk-form-label', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node,
  for: PropTypes.string.isRequired,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,

};

Label.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(Label);
