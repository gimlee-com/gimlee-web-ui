import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let Navbar = props => (
  <nav
    ref={props.onRef}
    className={classNames('uk-navbar-container uk-navbar-transparent uk-navbar', props.className)}
    {...props.passthrough()}
    uk-navbar=""
  >
    {props.children}
  </nav>
);

Navbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

Navbar = withPropsPassthrough()(Navbar);

export default React.forwardRef((props, ref) => <Navbar onRef={ref} {...props} />);
