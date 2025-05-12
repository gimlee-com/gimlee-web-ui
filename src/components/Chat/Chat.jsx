/* eslint-disable no-underscore-dangle */
import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { VariableSizeList as List } from 'react-window';
import classNames from 'classnames';
import { tween } from 'popmotion';
import debounce from 'debounce';
import UIkit from 'uikit';

import {
  autoWidth,
  circleBorder,
  expandWidth,
  fullWidth,
  removePadding,
  smallPadding,
  withTooltip,
  position,
  viewportWidthAware,
} from '../_HOC';
import {
  ALIGN_ITEMS_MIDDLE,
  FLEX_DIRECTION_COLUMN,
  flexContainer,
  JUSTIFY_CENTER,
} from '../_HOC/flexContainer';
import { POSITION_ABSOLUTE, POSITION_Z_INDEX_1 } from '../_HOC/position';
import { Div } from '../_Wrappers';
import { CardBody, CardFooter } from '../Card';
import { Grid, GUTTER_SMALL } from '../Grid';
import Icon from '../Icon/Icon';
import { SEND_MESSAGE } from '../Icon/icons';
import { ActionButton, TYPE_PRIMARY } from '../Button';
import { isEnter, isAlphaNumeric } from '../../util/keypressEventsUtil';
import calculateMessageHeights from './util/calculateMessageHeights';
import renderDate from './util/renderDate';
import TypingIndicator from './TypingIndicator';
import { chatItem as chatItemPrototype } from './model';
import { typingIndicatorPropTypes } from '../../store/chats';
import { messagePropTypes } from '../../store/chats/model';
import { userPropTypes } from '../../store/model';
import { MessageTextArea } from './Message';
import Label, { LABEL_SIZE_SMALL } from '../Label';
import ChatRow from './ChatRow';
import styles from './Chat.scss';

const ChatContainer = flexContainer()(Div);
const ChatCardBody = compose(
  flexContainer(),
  smallPadding(),
  removePadding(),
)(CardBody);
const ChatCardFooter = compose(smallPadding(), flexContainer())(CardFooter);
const ButtonsContainer = autoWidth()(Div);
const CircleActionButton = compose(
  removePadding(),
  circleBorder(),
  flexContainer(),
  withTooltip('desktop'),
)(ActionButton);
const ControlsGrid = compose(flexContainer(), expandWidth())(Grid);
const ChatListInfoBar = compose(
  fullWidth(),
  removePadding(),
  position({
    position: `${POSITION_ABSOLUTE} ${POSITION_Z_INDEX_1}`,
  }),
  flexContainer(),
)(Div);
const LoadingLabel = motion.custom(Label);
const DateLabel = motion.custom(Label);
const labelTransition = { duration: 0.2 };
const labelVariants = {
  initial: { y: 0, scale: 0.1, opacity: 0, transition: labelTransition },
  enter: { y: 0, scale: 1, opacity: 1, transition: labelTransition },
  exit: { y: -20, scale: 0.5, opacity: 0, transition: { duration: 0.5 } },
};

const TYPING_INDICATOR_FREQUENCY_MS = 5000;
const AUTO_SCROLL_BUFFER_PX = 50;

function getScrollToBottomDistance(domNode, scrollOffset) {
  return domNode.scrollHeight - domNode.getBoundingClientRect().height - scrollOffset;
}

function possiblyAddDaysDividerBeforeTheMessage(chatItems, message) {
  if (
    !chatItems.length
    || chatItems[chatItems.length - 1].timestamp.date() !== message.timestamp.date()
  ) {
    const date = message.timestamp.clone().startOf('day');
    const chatItemId = `days-divider-${date}`;
    const chatItem = {
      type: 'DAYS-DIVIDER',
      id: chatItemId,
      timestamp: date,
      height: 60,
    };
    chatItems.push(chatItem);
  }
}

class Chat extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      stickToBottom: true,
      chatItemsById: Object.create(null),
      chatItems: [],
      headingDate: null,
    };

    this.submitMessage = this.submitMessage.bind(this);
    this.handleKeyDownOnTextArea = this.handleKeyDownOnTextArea.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.chatMessageListScrollHandler = this.chatMessageListScrollHandler.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.getChatItemHeight = this.getChatItemHeight.bind(this);
    this.updateMeasuredMessages = this.updateMeasuredMessages.bind(this);
    this.mapMessagesToChatItems = debounce(this.mapMessagesToChatItems.bind(this), 100);
  }

  componentDidMount() {
    if (this.props.messages.length) {
      this.mapMessagesToChatItems(
        this.props.messages, this.state.chatItemsById, this.getChatMessageListDomNodeWidth(), true);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.viewportWidth !== newProps.viewportWidth) {
      this.mapMessagesToChatItems(
          newProps.messages, this.state.chatItemsById, this.getChatMessageListDomNodeWidth(), true);
    } else if (
      this.props.messages !== newProps.messages
      || this.props.usersByUsername !== newProps.usersByUsername
    ) {
      this.mapMessagesToChatItems(
          newProps.messages, this.state.chatItemsById, this.getChatMessageListDomNodeWidth());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.chatItems !== prevState.chatItems) {
      const chatMessageListNode = this.chatMessageListNode;
      chatMessageListNode.resetAfterIndex(0);

      if (
        this.state.chatItems[1] && prevState.chatItems[1]
        && this.state.chatItems[1].id !== prevState.chatItems[1].id
      ) {
        const offset = this.state.chatItems
          .findIndex(chatItem => chatItem.id === prevState.chatItems[1].id);
        chatMessageListNode.scrollToItem(offset, 'start');

        setTimeout(() => {
          const chatHeight = chatMessageListNode._outerRef.getBoundingClientRect().height;
          const scrollFrom = chatMessageListNode._outerRef.scrollTop;
          const scrollTo = Math.max(0, scrollFrom - (chatHeight / 2));

          tween({ from: scrollFrom, to: scrollTo, duration: 200 })
            .start(scrollTop => chatMessageListNode.scrollTo(scrollTop));
        }, 0);
      } else if (this.state.stickToBottom && this.state.chatItems.length) {
        this.scrollToBottom();
      }
    }
  }

  componentWillUnmount() {
    if (this.typingIndicatorTimeout) {
      clearTimeout(this.typingIndicatorTimeout);
    }
  }

  getChatMessageListDomNodeWidth() {
    return this.chatMessageListNode._outerRef.getBoundingClientRect().width;
  }

  getChatItemHeight(index) {
    const chatItem = this.state.chatItems[index];
    if (!chatItem) {
      return 0;
    }
    return chatItem.height || 0;
  }

  mapMessagesToChatItems(messages, chatItemsById, chatWidth, forceMeasure = false) {
    const chatItems = [];
    const unmeasuredChatItems = {};

    messages.forEach((message) => {
      possiblyAddDaysDividerBeforeTheMessage(chatItems, message);
      if (message.id in chatItemsById) {
        const messageChatItem = chatItemsById[message.id];
        chatItems.push(messageChatItem);
        if (forceMeasure) {
          unmeasuredChatItems[messageChatItem.id] = messageChatItem;
        }
      } else {
        const newMessageChatItem = this.mapMessageToChatItem(message);
        chatItems.push(newMessageChatItem);
        unmeasuredChatItems[newMessageChatItem.id] = newMessageChatItem;
      }
    });

    calculateMessageHeights(unmeasuredChatItems, chatWidth).then((heights) => {
      this.updateMeasuredMessages(unmeasuredChatItems, chatItems, heights);
    });
  }

  mapMessageToChatItem(message) {
    return {
      ...chatItemPrototype,
      ...message,
      author: { ...this.props.usersByUsername[message.author] },
    };
  }

  updateMeasuredMessages(chatItemsById, chatItems, heightsById) {
    this.setState((state) => {
      Object.keys(heightsById).forEach((id) => {
        if (id in chatItemsById) {
          chatItemsById[id].height = heightsById[id];
        }
      });
      this.chatMessageListNode.resetAfterIndex(0);
      return {
        chatItems,
        chatItemsById: { ...state.chatItemsById, ...chatItemsById },
      };
    });
  }

  scrollToBottom() {
    if (this.chatMessageListNode && this.state.chatItems) {
      this.chatMessageListNode.scrollToItem(this.state.chatItems.length - 1, 'end');
    }
  }

  submitMessage() {
    const messageTextAreaDOMNode = findDOMNode(this.messageTextAreaNode);
    if (messageTextAreaDOMNode.value) {
      this.props.onMessageSubmit(messageTextAreaDOMNode.value);
      messageTextAreaDOMNode.value = '';

      if (this.typingIndicatorTimeout) {
        clearTimeout(this.typingIndicatorTimeout);
        this.typingIndicatorTimeout = null;
      }
    }
  }

  handleKeyDownOnTextArea(e) {
    if (isEnter(e) && !e.shiftKey) {
      this.submitMessage();
      e.preventDefault();
    } else if (isAlphaNumeric(e)) {
      this.handleTyping();
    }
  }

  handleTyping() {
    if (!this.typingIndicatorTimeout) {
      this.typingIndicatorTimeout = setTimeout(() => {
        clearTimeout(this.typingIndicatorTimeout);
        this.typingIndicatorTimeout = null;
      }, TYPING_INDICATOR_FREQUENCY_MS);
      this.props.onTyping();
    }
  }

  chatMessageListScrollHandler({ scrollDirection, scrollOffset }) {
    if (!this.chatMessageListNode || !this.state.chatItems.length) {
      return;
    }

    if (scrollDirection === 'backward' && scrollOffset === 0 && !this.state.stickToBottom) {
      this.props.loadOlderMessages();
    }

    this.setState(state => ({
      stickToBottom: this.shouldStickToBottom(scrollDirection, scrollOffset),
      headingDate: state.chatItems.length
        // _getRangeToRender() returns:
        // [fromIndexOverscan, endIndexOverscan, fromIndexVisible, endIndexVisible]
        ? state.chatItems[this.chatMessageListNode._getRangeToRender()[2]].timestamp
        : null,
    }));
  }

  shouldStickToBottom(scrollDirection, scrollOffset) {
    const messageListDomNode = this.chatMessageListNode._outerRef;
    return getScrollToBottomDistance(messageListDomNode, scrollOffset) < AUTO_SCROLL_BUFFER_PX;
  }

  render() {
    const { whoIsTyping, messagesLoading, className, infoBarClassName, t } = this.props;
    const { chatItems } = this.state;

    return (
      <ChatContainer
        className={classNames(styles.chatCard, className)}
        flexContainer={{
          direction: FLEX_DIRECTION_COLUMN,
        }}
      >
        <ChatCardBody
          className={styles.chatCardBody}
          flexContainer={{
            direction: FLEX_DIRECTION_COLUMN,
          }}
        >
          <Div className={styles.chatMessagesWrapper}>
            <ChatListInfoBar
              className={classNames(styles['date-heading'], infoBarClassName)}
              flexContainer={{
                direction: FLEX_DIRECTION_COLUMN,
                itemsAlign: ALIGN_ITEMS_MIDDLE,
              }}
            >
              <AnimatePresence>
                {messagesLoading &&
                  <LoadingLabel
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={labelVariants}
                    className="uk-position-absolute"
                    size={LABEL_SIZE_SMALL}
                    key="loading"
                  >
                    {t('common:loading')}
                  </LoadingLabel>
                }
                {!messagesLoading &&
                  <DateLabel
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    variants={labelVariants}
                    className="uk-position-absolute"
                    size={LABEL_SIZE_SMALL}
                    key="date"
                  >
                    {!!chatItems[1] &&
                      renderDate(
                        chatItems[this.chatMessageListNode._getRangeToRender()[2]].timestamp, t,
                      )
                    }
                  </DateLabel>
                }
              </AnimatePresence>
            </ChatListInfoBar>
            <List
              style={{ overflowX: 'hidden' }}
              ref={(ref) => { this.chatMessageListNode = ref; }}
              height={
                this.chatMessageListNode
                ? this.chatMessageListNode._outerRef.parentNode.getBoundingClientRect().height
                : 0
              }
              itemData={chatItems}
              itemCount={chatItems.length}
              itemSize={this.getChatItemHeight}
              onScroll={this.chatMessageListScrollHandler}
            >
              {ChatRow}
            </List>
          </Div>
          <TypingIndicator
            whoIsTyping={
              whoIsTyping
                // the magic below removes duplicate entries
                .filter((v, i, a) => a.findIndex(el => v.username === el.username) === i)
                .map(typingIndicator => typingIndicator.username)}
          />
        </ChatCardBody>
        <ChatCardFooter
          flexContainer={{}}
          className={styles.chatCardFooter}
        >
          <ControlsGrid
            className={styles.chatFooterControls}
            flexContainer={{
              itemsAlign: ALIGN_ITEMS_MIDDLE,
            }}
            gutter={GUTTER_SMALL}
          >
            <MessageTextArea
              className={styles.messageTextArea}
              rows={2}
              placeholder={t('chat:message:inputPlaceholder')}
              ref={(ref) => { this.messageTextAreaNode = ref; }}
              onKeyDown={this.handleKeyDownOnTextArea}
            />
            <ButtonsContainer className="uk-margin-small-left">
              <CircleActionButton
                flexContainer={{
                  itemsAlign: ALIGN_ITEMS_MIDDLE,
                  contentJustify: JUSTIFY_CENTER,
                }}
                tooltip={{
                  pos: 'left',
                  title: t('chat:message:send'),
                  delay: 400,
                }}
                type={TYPE_PRIMARY}
                action={this.submitMessage}
                style={{ width: '48px', height: '48px', position: 'relative' }}
              >
                <Icon icon={SEND_MESSAGE} />
              </CircleActionButton>
            </ButtonsContainer>
          </ControlsGrid>
        </ChatCardFooter>
      </ChatContainer>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape(messagePropTypes)),
  usersByUsername: PropTypes.objectOf(PropTypes.shape(userPropTypes)),
  whoIsTyping: PropTypes.arrayOf(PropTypes.shape(typingIndicatorPropTypes)),
  loadOlderMessages: PropTypes.func,
  messagesLoading: PropTypes.bool,
  onMessageSubmit: PropTypes.func,
  onTyping: PropTypes.func,
  t: PropTypes.func.isRequired,
  viewportWidth: PropTypes.number.isRequired,
  className: PropTypes.string,
  infoBarClassName: PropTypes.string,
};

Chat.defaultProps = {
  messages: [],
  usersByUsername: {},
  whoIsTyping: [],
  loadOlderMessages: UIkit.util.noop,
  messagesLoading: false,
  onMessageSubmit: UIkit.util.noop,
  onTyping: UIkit.util.noop,
  className: null,
  infoBarClassName: null,
};

export default compose(
  viewportWidthAware(),
  translate(),
)(Chat);

