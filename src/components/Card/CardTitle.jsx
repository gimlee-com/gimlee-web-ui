import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const CardTitle = props => (
  <div className={classNames('uk-card-title', props.className)} {...props.passthrough()}>
    {props.children}
  </div>
);

CardTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

CardTitle.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(CardTitle);
