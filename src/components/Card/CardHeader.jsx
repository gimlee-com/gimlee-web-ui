import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const CardHeader = props => (
  <div className={classNames('uk-card-header', props.className)} {...props.passthrough()}>
    {props.children}
  </div>
);

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

CardHeader.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(CardHeader);
