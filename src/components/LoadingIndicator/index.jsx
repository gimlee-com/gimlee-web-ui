import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';
import styles from './LoadingIndicator.scss';

export const TYPE_PRIMARY = 'primary';
export const TYPE_LIGHT = 'light';

const LoadingIndicator = (props) => {
  const styleNames = [];
  if (props.type) {
    styleNames.push(props.type);
  }
  if (props.isInputLoading) {
    styleNames.push('input');
  }
  if (props.small) {
    styleNames.push('small');
  }

  return (<div
    styleName={styleNames.join(' ')}
    className={classNames(styles.ldsSpinner, props.className)}
    {...props.passthrough()}
  >
    <div /><div /><div /><div /><div /><div /><div /><div /><div /><div />
  </div>);
};

LoadingIndicator.propTypes = {
  type: PropTypes.oneOf([TYPE_PRIMARY, TYPE_LIGHT]),
  isInputLoading: PropTypes.bool,
  small: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

LoadingIndicator.defaultProps = {
  type: null,
  isInputLoading: false,
  small: false,
  className: null,
};

export default withPropsPassthrough()(LoadingIndicator);
