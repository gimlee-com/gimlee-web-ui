import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarLeft = props => (
  <div
    ref={props.onRef}
    className={classNames('uk-navbar-left', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarLeft.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarLeft.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

NavbarLeft = withPropsPassthrough()(NavbarLeft);

export default React.forwardRef((props, ref) => <NavbarLeft onRef={ref} {...props} />);
