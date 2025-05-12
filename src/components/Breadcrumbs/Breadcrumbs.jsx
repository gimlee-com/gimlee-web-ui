import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Breadcrumbs = props => (
  <ul className={classNames('uk-breadcrumb', props.className)} {...props.passthrough()}>
    {props.children}
  </ul>
);

Breadcrumbs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Breadcrumbs.defaultProps = {
  className: null,
};

export default withPropsPassthrough()(Breadcrumbs);
