import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarItem = props => (
  <div
    ref={props.onRef}
    className={classNames(
      'uk-navbar-item',
      { 'uk-logo': props.isLogo },
      props.className,
    )}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarItem.propTypes = {
  children: PropTypes.node,
  isLogo: PropTypes.bool,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarItem.defaultProps = {
  children: null,
  isLogo: false,
  className: null,
  onRef: null,
};

NavbarItem = withPropsPassthrough()(NavbarItem);

export default React.forwardRef((props, ref) => <NavbarItem onRef={ref} {...props} />);
