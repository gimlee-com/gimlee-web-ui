import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Breadcrumb = props => (
  <li {...props.passthrough()}>
    {props.children}
  </li>
);

Breadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Breadcrumb.defaultProps = {
  className: null,
};

export default withPropsPassthrough()(Breadcrumb);
