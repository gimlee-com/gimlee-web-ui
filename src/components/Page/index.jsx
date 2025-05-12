import React from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

// TODO: improve scrolling to top on route change
const Page = props => (
  <div ref={props.onRef} {...props.passthrough()}>{props.children}</div>
);

Page.propTypes = {
  children: PropTypes.node,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Page.defaultProps = {
  children: null,
  onRef: null,
};

const PageWithPassthrough = withPropsPassthrough()(Page);

export default React.forwardRef(
  (props, ref) => <PageWithPassthrough onRef={ref} {...props} />);
