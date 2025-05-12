import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Span = ({ children, passthrough }) => (<span {...passthrough()} >{children}</span>);

Span.propTypes = {
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

Span.defaultProps = {
  children: null,
};

export default withPropsPassthrough()(Span);
