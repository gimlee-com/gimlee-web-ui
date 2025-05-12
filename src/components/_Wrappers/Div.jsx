import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Div = ({ children, passthrough, onRef }) => (
  <div ref={onRef} {...passthrough()} >{children}</div>
);

Div.propTypes = {
  children: PropTypes.node,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Div.defaultProps = {
  children: null,
  onRef: null,
};

const DivPassthrough = withPropsPassthrough()(Div);

export default React.forwardRef((props, ref) => <DivPassthrough onRef={ref} {...props} />);
