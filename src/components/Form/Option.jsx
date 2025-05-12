import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Option = props => (
  <option onClick={props.onClick} {...props.passthrough()}>{props.children}</option>
);

Option.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  passthrough: PropTypes.func.isRequired,
};

Option.defaultProps = {
  children: null,
  onClick: null,
};

export default withPropsPassthrough()(Option);
