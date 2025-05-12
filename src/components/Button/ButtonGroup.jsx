import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const ButtonGroup = forwardRef((props, ref) => (
  <div
    ref={ref}
    className={classNames('uk-button-group', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
));

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  passthrough: PropTypes.func.isRequired,
};

ButtonGroup.defaultProps = {
  className: null,
};

export default withPropsPassthrough()(ButtonGroup);
