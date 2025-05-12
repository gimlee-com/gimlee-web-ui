import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Navbar.scss';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarActionItem = (props) => {
  const styleNames = ['action-item'];
  if (props.isLogo) styleNames.push('logo');

  const className = classNames({
    'uk-navbar-item': true,
    'uk-logo': props.isLogo,
  }, props.className);

  return (
    <div
      ref={props.onRef}
      tabIndex="0"
      role="button"
      onClick={props.clickAction}
      className={className}
      styleName={styleNames.join(' ')}
      {...props.passthrough()}
    >
      {props.children}
    </div>);
};

NavbarActionItem.propTypes = {
  children: PropTypes.node,
  clickAction: PropTypes.func.isRequired,
  isLogo: PropTypes.bool,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarActionItem.defaultProps = {
  children: null,
  isLogo: false,
  className: null,
  onRef: null,
};

NavbarActionItem = withPropsPassthrough()(NavbarActionItem);

export default React.forwardRef((props, ref) => <NavbarActionItem onRef={ref} {...props} />);
