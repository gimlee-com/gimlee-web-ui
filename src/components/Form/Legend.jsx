import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Legend = props => (
  <legend className={classNames('uk-legend', props.className)} {...props.passthrough()}>
    {props.children}
  </legend>
);

Legend.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Legend.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(Legend);
