import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { Chat } from 'gimlee-ui-components/Chat';
import {
  initChat as initChatAction,
  terminateChat as terminateChatAction,
  loadOlderMessages as loadOlderMessagesAction,
  sendMessage as sendMessageAction,
  typingIndicatorPropTypes,
} from 'gimlee-ui-store/chats';
import api from 'gimlee-ui-service/api'; // Import the api service
import { fetchStatus } from 'gimlee-ui-model/api';
import { userPropTypes } from 'gimlee-ui-model';

const EMPTY_ARRAY = [];

class ChatPrototype extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
  }

  componentDidMount() {
    const { chatId, initChat } = this.props;
    if (chatId) {
      initChat(chatId, `/api/chat/${chatId}`);
    }
  }

  componentWillUnmount() {
    const { chatId, terminateChat } = this.props;
    terminateChat(chatId);
  }

  handleMessageSubmit(message) {
    const { chatId, sendMessage } = this.props;
    sendMessage(chatId, message);
  }

  handleTyping() {
    const { chatId } = this.props;
    api.post(`/api/chat/${chatId}/indicateTyping`);
  }

  render() {
    const {
      chatId,
      whoIsTyping,
      messages,
      usersByUsername,
      messagesLoading,
      outgoingMessages,
      loadOlderMessages,
    } = this.props;

    return (
      <Chat
        onMessageSubmit={this.handleMessageSubmit}
        onTyping={this.handleTyping}
        whoIsTyping={whoIsTyping}
        messages={messages}
        usersByUsername={usersByUsername}
        messagesLoading={messagesLoading}
        outgoingMessages={outgoingMessages}
        loadOlderMessages={() => loadOlderMessages(chatId, `/api/chat/${chatId}`)}
      />
    );
  }
}

ChatPrototype.propTypes = {
  chatId: PropTypes.string.isRequired,
  whoIsTyping: PropTypes.arrayOf(PropTypes.shape(typingIndicatorPropTypes)),
  messages: PropTypes.arrayOf(PropTypes.object),
  messagesLoading: PropTypes.bool.isRequired,
  outgoingMessages: PropTypes.arrayOf(PropTypes.object),
  usersByUsername: PropTypes.objectOf(PropTypes.shape(userPropTypes)).isRequired,
  initChat: PropTypes.func.isRequired,
  terminateChat: PropTypes.func.isRequired,
  loadOlderMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

ChatPrototype.defaultProps = {
  whoIsTyping: [],
  messages: [],
  outgoingMessages: [],
};


const mapStateToProps = (state, ownProps) => {
  const chatState = state.chats[ownProps.chatId] || {
    messages: EMPTY_ARRAY,
    messagesFetchStatus: fetchStatus,
  };
  const { usersByUsername } = state.users;

  return {
    whoIsTyping: chatState.whoIsTyping,
    messagesLoading: chatState.messagesFetchStatus.fetching,
    messages: chatState.messages,
    usersByUsername,
    outgoingMessages: chatState.outgoingMessages,
  };
};

const mapDispatchToProps = {
  initChat: initChatAction,
  terminateChat: terminateChatAction,
  loadOlderMessages: loadOlderMessagesAction,
  sendMessage: sendMessageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ChatPrototype));
