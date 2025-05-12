import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Close = forwardRef((props, ref) => (
  <button
    ref={ref}
    tabIndex={0}
    className={props.className}
    type="button"
    {...props.passthrough()}
    uk-close=""
  >
    {props.children}
  </button>
  ),
);

Close.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};
Close.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(Close);
