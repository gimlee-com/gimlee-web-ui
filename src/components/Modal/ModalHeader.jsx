import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withPropsPassthrough } from '../_HOC';

const ModalHeader = props => (
  <div className={classNames('uk-modal-header', props.className)} {...props.passthrough()}>
    {props.children}
  </div>
);

ModalHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

ModalHeader.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(ModalHeader);
