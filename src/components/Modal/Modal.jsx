import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UIkit from 'uikit';
import { withPropsPassthrough } from '../_HOC';

class Modal extends Component {

  static getDerivedStateFromProps(props, state) {
    if (!state.displayedAtLeastOnce && props.visible) {
      return {
        displayedAtLeastOnce: true,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.handleModalHide = this.handleModalHide.bind(this);

    this.state = {
      displayedAtLeastOnce: false,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.modalRef.show();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        this.modalRef.show();
      } else {
        this.modalDOMNode.removeEventListener('beforehide', this.handleModalHide);
        this.modalRef.hide();
        this.modalDOMNode.addEventListener('beforehide', this.handleModalHide);
      }
    }
  }

  handleModalHide(e) {
    this.props.onCloseRequested();
    e.preventDefault();
  }

  render() {
    if (!this.state.displayedAtLeastOnce && this.props.lazyRenderContent) {
      return null;
    }
    return (
      <div
        ref={(ref) => {
          if (ref) {
            if (this.modalDOMNode) {
              this.modalDOMNode.removeEventListener('beforehide', this.handleModalHide);
            }
            this.modalDOMNode = ref;
            this.modalRef = UIkit.modal(ref, {
              'esc-close': this.props.closeOnESCPressed,
              'bg-close': this.props.closeOnBackgroundClicked,
              stack: this.props.stackModals,
            });
            this.props.modalRef(this.modalRef);
            ref.addEventListener('beforehide', this.handleModalHide);
          }
        }}
        className={classNames(this.props.className, { 'uk-modal-full': this.props.full })}
        {...this.props.passthrough()}
      >
        {this.props.children}
      </div>
    );
  }
}

Modal.propTypes = {
  full: PropTypes.bool,
  closeOnESCPressed: PropTypes.bool,
  closeOnBackgroundClicked: PropTypes.bool,
  stackModals: PropTypes.bool,
  visible: PropTypes.bool,
  lazyRenderContent: PropTypes.bool,
  modalRef: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  onCloseRequested: PropTypes.func,
  passthrough: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  full: false,
  closeOnESCPressed: true,
  closeOnBackgroundClicked: true,
  stackModals: false,
  visible: false,
  lazyRenderContent: true,
  modalRef: UIkit.util.noop,
  active: false,
  onCloseRequested: UIkit.util.noop,
  children: null,
  className: null,
};

export default withPropsPassthrough()(Modal);
