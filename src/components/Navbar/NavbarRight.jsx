import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

let NavbarRight = props => (
  <div
    ref={props.onRef}
    className={classNames('uk-navbar-right', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

NavbarRight.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

NavbarRight.defaultProps = {
  children: null,
  className: null,
  onRef: null,
};

NavbarRight = withPropsPassthrough()(NavbarRight);

export default React.forwardRef((props, ref) => <NavbarRight onRef={ref} {...props} />);
