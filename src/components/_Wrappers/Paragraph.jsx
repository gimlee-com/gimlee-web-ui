import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Paragraph = ({ children, passthrough }) => (<p {...passthrough()} >{children}</p>);

Paragraph.propTypes = {
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

Paragraph.defaultProps = {
  children: null,
};

export default withPropsPassthrough()(Paragraph);
