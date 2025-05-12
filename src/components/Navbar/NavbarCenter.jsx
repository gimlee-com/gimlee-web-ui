import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarCenter = props => (
  <div
    ref={props.onRef}
    className={classNames('uk-navbar-center', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarCenter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarCenter.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

NavbarCenter = withPropsPassthrough()(NavbarCenter);

export default React.forwardRef((props, ref) => <NavbarCenter onRef={ref} {...props} />);
