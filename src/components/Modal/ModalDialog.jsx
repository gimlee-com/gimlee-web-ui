import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withPropsPassthrough } from '../_HOC';

function renderCloseButton(className) {
  return <button className={className} type="button" uk-close="" />;
}

const ModalDialog = (props) => {
  const dialogClassName = classNames(
    props.className,
    'uk-modal-dialog',
    { 'uk-modal-body': props.withBodyPadding },
  );

  const closeButtonClassName = classNames(
    props.closeButtonClassName,
    { 'uk-modal-close-default': props.closeButtonType === 'default' },
    { 'uk-modal-close-outside': props.closeButtonType === 'outside' },
    { 'uk-modal-close-full': props.closeButtonType === 'full' },
    { 'uk-close-large': props.largeCloseButton },
  );

  return (
    <div className={dialogClassName} {...props.passthrough()}>
      {props.closeButtonType !== 'none' && renderCloseButton(closeButtonClassName)}
      {props.children}
    </div>
  );
};

ModalDialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeButtonClassName: PropTypes.string,
  closeButtonType: PropTypes.oneOf(['none', 'default', 'outside', 'full']),
  largeCloseButton: PropTypes.bool,
  withBodyPadding: PropTypes.bool,
  passthrough: PropTypes.func.isRequired,
};

ModalDialog.defaultProps = {
  children: null,
  className: null,
  closeButtonClassName: null,
  closeButtonType: 'none',
  largeCloseButton: false,
  withBodyPadding: true,
};

export default withPropsPassthrough()(ModalDialog);
