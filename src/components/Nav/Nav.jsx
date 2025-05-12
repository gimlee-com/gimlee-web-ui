import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import animations from '../constant/animations';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Nav = (props) => {
  const className = classNames(
    'uk-nav',
    'uk-nav-default', {
      'uk-nav-center': props.centered,
    }, props.className);
  return (
    <ul
      className={className}
      uk-nav={`
        collapsible: ${props.collapsible};
        multiple: ${props.multiple};
        transition: ${props.transition};
        animation: [${props.animationIn},${props.animationOut}];
        duration: ${props.duration};
      `}
      {...props.passthrough()}
    >
      {props.children}
    </ul>
  );
};

const animationValues = [true].concat(Object.values(animations));

Nav.propTypes = {
  children: PropTypes.node,
  centered: PropTypes.bool,
  collapsible: PropTypes.bool,
  multiple: PropTypes.bool,
  transition: PropTypes.oneOf(['ease', 'linear']),
  animationIn: PropTypes.oneOf(animationValues),
  animationOut: PropTypes.oneOf(animationValues),
  duration: PropTypes.number,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  children: null,
  centered: false,
  collapsible: true,
  multiple: false,
  transition: 'ease',
  animationIn: true,
  animationOut: true,
  duration: 200,
  className: null,
};

export default withPropsPassthrough()(Nav);
