import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Badge = (props) => {
  const classes = classNames({
    'uk-badge': true,
    'uk-card-badge': props.isInsideCard,
  }, props.className);

  return (
    <span className={classes} {...props.passthrough()}>{props.children}</span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  isInsideCard: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Badge.defaultProps = {
  isInsideCard: false,
  className: null,
};

export default withPropsPassthrough()(Badge);
