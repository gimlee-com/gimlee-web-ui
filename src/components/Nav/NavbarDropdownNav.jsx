import React from 'react';
import classNames from 'classnames';

import Nav from './Nav';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const NavbarDropdownNav = props => (
  <Nav
    className={classNames('uk-navbar-dropdown-nav', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </Nav>
);

NavbarDropdownNav.propTypes = Nav.propTypes;
NavbarDropdownNav.defaultProps = Nav.defaultProps;

export default withPropsPassthrough()(NavbarDropdownNav);
