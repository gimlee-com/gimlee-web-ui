import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const CardFooter = props => (
  <div
    className={classNames('uk-card-footer', props.className)}
    {...props.passthrough()}
  >
    {props.children}
  </div>
);

CardFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

CardFooter.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(CardFooter);
