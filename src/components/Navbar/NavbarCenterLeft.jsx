import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarCenterLeft = props => (
  <div
    ref={props.onRef}
    className={classNames('uk-navbar-center-left', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarCenterLeft.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarCenterLeft.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

NavbarCenterLeft = withPropsPassthrough()(NavbarCenterLeft);

export default React.forwardRef((props, ref) => <NavbarCenterLeft onRef={ref} {...props} />);
