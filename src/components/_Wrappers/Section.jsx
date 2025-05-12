import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Section = ({ children, passthrough }) => (<section {...passthrough()} >{children}</section>);

Section.propTypes = {
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

Section.defaultProps = {
  children: null,
};

export default withPropsPassthrough()(Section);
