import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const GridItem = props => (
  <div {...props.passthrough()}>
    {props.children}
  </div>
);

GridItem.propTypes = {
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

GridItem.defaultProps = {
  children: null,
};

export default withPropsPassthrough()(GridItem);
