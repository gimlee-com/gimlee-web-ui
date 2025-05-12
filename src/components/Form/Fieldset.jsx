import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Fieldset = props => (
  <fieldset className={classNames('uk-fieldset', props.className)} {...props.passthrough()}>
    {props.children}
  </fieldset>
);

Fieldset.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Fieldset.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(Fieldset);
