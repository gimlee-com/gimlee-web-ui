import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withPropsPassthrough } from '../_HOC';

const ModalFooter = props => (
  <div className={classNames('uk-modal-footer', props.className)} {...props.passthrough()}>
    {props.children}
  </div>
);

ModalFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

ModalFooter.defaultProps = {
  children: null,
  className: null,
};

export default withPropsPassthrough()(ModalFooter);
