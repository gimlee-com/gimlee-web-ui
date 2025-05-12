import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withPropsPassthrough } from '../_HOC';

const ModalBody = props => (
  <div className={classNames('uk-modal-body', props.className)} {...props.passthrough()}>
    {props.children}
  </div>
);

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

ModalBody.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(ModalBody);
