import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  TYPE_DANGER,
  TYPE_DEFAULT, TYPE_LINK,
  TYPE_PRIMARY,
  TYPE_SECONDARY, TYPE_TEXT,
} from 'gimlee-ui-components/Button';
import './Navbar.scss';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const createNavbarRouterLinkButtonClassName = type => classNames({
  'uk-button': true,
  'uk-button-default': type === TYPE_DEFAULT,
  'uk-button-primary': type === TYPE_PRIMARY,
  'uk-button-secondary': type === TYPE_SECONDARY,
  'uk-button-danger': type === TYPE_DANGER,
  'uk-button-text': type === TYPE_TEXT,
  'uk-button-link': type === TYPE_LINK,
});


const NavbarRouterLink = (props) => {
  const styleNames = ['action-item'];
  if (props.isLogo) styleNames.push('logo');

  const className = classNames(
    'uk-navbar-item',
    createNavbarRouterLinkButtonClassName(props.type),
    {
      'uk-logo': props.isLogo,
    },
    props.className,
  );

  return (
    <Link
      to={props.to}
      className={className}
      styleName={styleNames.join(' ')}
      replace={props.replace}
      target={props.target}
      {...props.passthrough()}
    >
      {props.children}
    </Link>);
};

NavbarRouterLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node,
  isLogo: PropTypes.bool,
  replace: PropTypes.bool,
  target: PropTypes.string,
  type: PropTypes.oneOf([
    TYPE_DEFAULT,
    TYPE_PRIMARY,
    TYPE_SECONDARY,
    TYPE_DANGER,
    TYPE_TEXT,
    TYPE_LINK,
  ]),
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

NavbarRouterLink.defaultProps = {
  children: null,
  isLogo: false,
  target: null,
  replace: false,
  type: TYPE_LINK,
  className: null,
};

export default withPropsPassthrough()(NavbarRouterLink);
