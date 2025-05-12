import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

class SliderItem extends PureComponent {
  constructor(props) {
    super(props);
    this.connectListeners = this.connectListeners.bind(this);
    this.disconnectListeners = this.disconnectListeners.bind(this);

    this.ref = createRef();
  }

  componentDidMount() {
    this.connectListeners();
  }

  componentWillUnmount() {
    this.disconnectListeners();
  }

  connectListeners() {
    const domNode = this.ref.current;
    domNode.addEventListener('beforeitemshow', this.props.beforeItemShow);
    domNode.addEventListener('itemshow', this.props.onItemShowStart);
    domNode.addEventListener('itemshown', this.props.onItemShown);
    domNode.addEventListener('beforeitemhide', this.props.beforeItemHide);
    domNode.addEventListener('itemhide', this.props.onItemHideStart);
    domNode.addEventListener('itemhidden', this.props.onItemHidden);
  }

  disconnectListeners() {
    const domNode = this.ref.current;
    domNode.removeEventListener('beforeitemshow', this.props.beforeItemShow);
    domNode.removeEventListener('itemshow', this.props.onItemShowStart);
    domNode.removeEventListener('itemshown', this.props.onItemShown);
    domNode.removeEventListener('beforeitemhide', this.props.beforeItemHide);
    domNode.removeEventListener('itemhide', this.props.onItemHideStart);
    domNode.removeEventListener('itemhidden', this.props.onItemHidden);
  }

  render() {
    return (
      <li ref={this.ref} {...this.props.passthrough()}>
        {this.props.children}
      </li>
    );
  }
}

SliderItem.propTypes = {
  children: PropTypes.node,
  beforeItemShow: PropTypes.func,
  onItemShowStart: PropTypes.func,
  onItemShown: PropTypes.func,
  beforeItemHide: PropTypes.func,
  onItemHideStart: PropTypes.func,
  onItemHidden: PropTypes.func,
  passthrough: PropTypes.func.isRequired,

};

SliderItem.defaultProps = {
  children: null,
  beforeItemShow: UIkit.util.noop,
  onItemShowStart: UIkit.util.noop,
  onItemShown: UIkit.util.noop,
  beforeItemHide: UIkit.util.noop,
  onItemHideStart: UIkit.util.noop,
  onItemHidden: UIkit.util.noop,
};

export default withPropsPassthrough()(SliderItem);
