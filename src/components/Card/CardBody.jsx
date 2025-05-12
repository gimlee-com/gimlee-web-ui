import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const CardBody = props => (
  <div
    className={classNames('uk-card-body', props.className)}
    {...props.passthrough()}
  >{props.children}</div>
);

CardBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

CardBody.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(CardBody);
