import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const ProgressBar = props => (
  <progress
    className={classNames('uk-progress', props.className)}
    ref={props.onRef}
    hidden={props.hidden}
    {...props.passthrough()}
  />
);

ProgressBar.propTypes = {
  hidden: PropTypes.bool,
  className: PropTypes.string,
  onRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  passthrough: PropTypes.func.isRequired,
};

ProgressBar.defaultProps = {
  hidden: false,
  className: null,
  onRef: null,
};

export default withPropsPassthrough()(ProgressBar);
