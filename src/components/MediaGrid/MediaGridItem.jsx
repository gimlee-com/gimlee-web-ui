import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import UIkit from 'uikit';
import position, { PLACEMENT_TOP } from '../_HOC/position';
import { GridItem } from '../Grid/index';
import ActionLink from '../ActionLink/index';
import Overlay, { TYPE_PRIMARY } from '../Overlay/index';
import Icon, { icons } from '../Icon/index';
import { smallPadding, withPropsPassthrough } from '../_HOC';

const ControlsOverlay = compose(
  smallPadding(),
  position({ placement: PLACEMENT_TOP }),
)(Overlay);

class MediaGridItem extends Component {

  constructor(props) {
    super(props);
    this.showActionsOverlay = this.showActionsOverlay.bind(this);
    this.hideActionsOverlay = this.hideActionsOverlay.bind(this);
    this.state = {
      actionsOverlayVisible: false,
    };
  }

  showActionsOverlay() {
    this.setState({
      actionsOverlayVisible: true,
    });
  }

  hideActionsOverlay() {
    this.setState({
      actionsOverlayVisible: false,
    });
  }

  render() {
    return (
      <GridItem {...this.props.passthrough()}>
        <div
          onMouseEnter={this.showActionsOverlay}
          onMouseLeave={this.hideActionsOverlay}
        >
          <div className="uk-inline">
            <ActionLink clickAction={this.props.onClick}>
              {this.props.children}
            </ActionLink>
            <div>
              {this.state.actionsOverlayVisible && (
                <ControlsOverlay type={TYPE_PRIMARY}>
                  <ActionLink clickAction={this.props.onRemove}>
                    <Icon icon={icons.GARBAGE} />
                  </ActionLink>
                  {this.props.controls}
                </ControlsOverlay>
              )}
            </div>
          </div>
        </div>
      </GridItem>
    );
  }
}

MediaGridItem.propTypes = {
  onRemove: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node,
  controls: PropTypes.arrayOf(PropTypes.node),
  passthrough: PropTypes.func.isRequired,
};

MediaGridItem.defaultProps = {
  onRemove: UIkit.util.noop,
  onClick: UIkit.util.noop,
  children: null,
  controls: [],
};

export default withPropsPassthrough()(MediaGridItem);
