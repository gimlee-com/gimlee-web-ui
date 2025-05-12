import React from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Placeholder = props => (
  <div
    className={classNames('uk-placeholder', props.className)}
    ref={props.onRef}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

Placeholder.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

Placeholder.defaultProps = {
  id: null,
  children: null,
  className: null,
  onRef: UIkit.util.noop,
};

export default withPropsPassthrough()(Placeholder);
