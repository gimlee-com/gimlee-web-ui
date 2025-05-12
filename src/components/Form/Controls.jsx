import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Controls = props => (
  <div className={classNames('uk-form-controls', props.className)} {...props.passthrough()}>
    {props.children}
  </div>
);

Controls.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(Controls);
