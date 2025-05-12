import React, { createRef, PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import { HtmlRenderer, Parser } from 'commonmark';
import linkifyHtml from 'linkifyjs/html';
import UIkit from 'uikit';

import { autoWidth, removeBottomPadding, removeRightPadding, removeTopPadding, smallPadding } from '../../_HOC';
import { GridItem } from '../../Grid';
import text, { TEXT_COLOR_MUTED, TEXT_STYLE_META } from '../../_HOC/text';
import LoadingIndicator, { TYPE_LIGHT } from '../../LoadingIndicator';
import MessageCard from './MessageCard';
import { chatItem as chatItemPrototype, chatItemPropTypes } from '../model';
import styles from './MessageContent.scss';

const MessageGridItem = compose(
  autoWidth(),
  smallPadding(),
  removeRightPadding(),
  removeTopPadding(),
  removeBottomPadding(),
)(GridItem);
const MutedText = text({
  color: TEXT_COLOR_MUTED,
  style: TEXT_STYLE_META,
})('span');

const markdownRenderer = new HtmlRenderer({ softbreak: '<br />' });
const markdownParser = new Parser({ safe: true });

/**
 * Prevent rendering images for safety reasons (or avoid posting huge images)
 *
 * TODO: upload the image to media store, recompress, resize
 */
markdownRenderer.image = (node, entering) => {
  if (entering) {
    markdownRenderer.lit(markdownRenderer.esc(node.destination, true));
  }
};

/**
 * Display full URLs so the users can see where they will go
 *
 * TODO: Keep displaying link titles, but always show
 * alert with full link on click + info about risks
 */
const baseLink = HtmlRenderer.prototype.link.bind(markdownRenderer);
markdownRenderer.link = (node, entering) => {
  baseLink(node, entering);
  if (entering) {
    node.firstChild.literal = node.destination; // eslint-disable-line
  }
};

class MessageContent extends PureComponent {

  constructor(props) {
    super(props);

    this.ref = createRef();
    this.mouseEnterHandler = this.mouseEnterHandler.bind(this);
    this.mouseLeaveHandler = this.mouseLeaveHandler.bind(this);

    this.state = {
      messageContentHovered: false,
    };
  }

  componentDidMount() {
    if (this.ref.current) {
      this.domNode = findDOMNode(this.ref.current);
      if (this.domNode) {
        this.domNode.addEventListener('mouseenter', this.mouseEnterHandler);
        this.domNode.addEventListener('mouseleave', this.mouseLeaveHandler);
      }
    }
  }

  componentWillUnmount() {
    if (this.domNode) {
      this.domNode.removeEventListener('mouseenter', this.mouseEnterHandler);
      this.domNode.removeEventListener('mouseleave', this.mouseLeaveHandler);
    }
  }

  mouseEnterHandler() {
    this.props.onMouseEnter();
  }

  mouseLeaveHandler() {
    this.props.onMouseLeave();
  }

  render() {
    const { className, data, lastEdited, own, t, sending } = this.props;
    return (
      <MessageGridItem className={className} ref={this.ref}>
        <MessageCard own={own}>
          <p
            className={classNames(
              'uk-margin-remove',
              styles['message-content-text'],
            )}
            dangerouslySetInnerHTML={{
              __html: linkifyHtml(markdownRenderer.render(markdownParser.parse(data))),
            }}
          />
          {!!lastEdited && <MutedText className="uk-margin-small-left">{t('chat:message:edited')}</MutedText>}
          {sending ? <LoadingIndicator small type={TYPE_LIGHT} /> : undefined}
        </MessageCard>
      </MessageGridItem>
    );
  }
}
MessageContent.propTypes = {
  data: chatItemPropTypes.data,
  lastEdited: chatItemPropTypes.lastEdited,
  own: chatItemPropTypes.own,
  sending: chatItemPropTypes.sending,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
};

MessageContent.defaultProps = {
  data: chatItemPrototype.data,
  lastEdited: chatItemPrototype.edited,
  own: chatItemPrototype.own,
  sending: chatItemPrototype.sending,
  onMouseEnter: UIkit.util.noop,
  onMouseLeave: UIkit.util.noop,
  className: null,
};

export default translate()(MessageContent);
