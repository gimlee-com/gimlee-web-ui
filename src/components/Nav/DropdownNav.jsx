import React from 'react';
import classNames from 'classnames';
import Nav from './Nav';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const DropdownNav = props => (
  <Nav
    className={classNames('uk-dropdown-nav', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </Nav>
);

DropdownNav.propTypes = Nav.propTypes;
DropdownNav.defaultProps = Nav.defaultProps;

export default withPropsPassthrough()(DropdownNav);
