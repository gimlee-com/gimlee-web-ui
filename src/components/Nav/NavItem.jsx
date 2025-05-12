import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const NavItem = (props) => {
  const className = classNames({
    'uk-active': props.active,
    'uk-parent': props.parent,
  }, props.className);
  return <li className={className} {...props.passthrough()}>{props.children}</li>;
};

NavItem.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  parent: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

NavItem.defaultProps = {
  children: null,
  active: false,
  parent: false,
  className: null,
};


export default withPropsPassthrough()(NavItem);
