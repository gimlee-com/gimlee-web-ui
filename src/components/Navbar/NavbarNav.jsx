import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarNav = props => (
  <div
    ref={props.onRef}
    className={classNames('uk-navbar-nav', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarNav.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarNav.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

NavbarNav = withPropsPassthrough()(NavbarNav);

export default React.forwardRef((props, ref) => <NavbarNav onRef={ref} {...props} />);
