// BEHOLD, THE DIRTIEST OF CALCULATIONS.

// DO THE CALCULATIONS BY TRIAL AND ERROR. ADD styles.debug CLASS TO
// THE dummyContainer AND INCREASE SETTIMEOUT TO SEE WHAT YOU'RE DOING
import React from 'react';
import ReactDOM from 'react-dom';
import linkifyHtml from 'linkifyjs/html';
import classNames from 'classnames';
import { HtmlRenderer, Parser } from 'commonmark';

import MessageCard from '../Message/MessageCard';
import styles from './dummyContainer.scss';
import messageContentStyles from '../Message/MessageContent.scss';

const markdownRenderer = new HtmlRenderer({ softbreak: '<br />' });
const markdownParser = new Parser({ safe: true });

const SENDING_INDICATOR_WIDTH = 52;
const HORIZONTAL_PADDING = 74;
const VERTICAL_PADDING = 10;

export default (messageChatItemsById, width) => {
  const dummyContainer = document.createElement('div');
  dummyContainer.className = `${styles.container}`;
  dummyContainer.style.width = `${width - HORIZONTAL_PADDING}px`;
  document.body.appendChild(dummyContainer);

  ReactDOM.render(Object.keys(messageChatItemsById).map((key) => {
    const messageChatItem = messageChatItemsById[key];
    const additionalPadding = messageChatItem.sending ? SENDING_INDICATOR_WIDTH : 0;

    return (
      <MessageCard key={messageChatItem.id} own={messageChatItem.own}>
        <p
          data-id={messageChatItem.id}
          className={classNames(
            'uk-margin-remove',
            messageContentStyles['message-content-text'],
          )}
          style={{
            paddingLeft: additionalPadding,
          }}
          dangerouslySetInnerHTML={{
            __html: linkifyHtml(markdownRenderer.render(
              markdownParser.parse(messageChatItem.data))),
          }}
        />
      </MessageCard>);
  }), dummyContainer);

  return new Promise((resolve) => {
    window.requestAnimationFrame(() => {
      const heights = Object.create(null);
      for (let i = 0; i < dummyContainer.children.length; i += 1) {
        const messageDomNode = dummyContainer.children[i];
        const messageId = messageDomNode.children[0].dataset.id;
        heights[messageId] = messageDomNode.getBoundingClientRect().height + VERTICAL_PADDING;
      }

      ReactDOM.unmountComponentAtNode(dummyContainer);
      document.body.removeChild(dummyContainer);
      resolve(heights);
    });
  });
};
