import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarCenterRight = props => (
  <div
    ref={props.onRef}
    className={classNames('uk-navbar-center-right', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarCenterRight.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarCenterRight.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

NavbarCenterRight = withPropsPassthrough()(NavbarCenterRight);

export default React.forwardRef((props, ref) => <NavbarCenterRight onRef={ref} {...props} />);
