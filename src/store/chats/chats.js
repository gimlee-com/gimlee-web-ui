import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../service/api';
import { fetchStatus } from '../../model/api';
import { message as defaultMessage } from '../../components/Chat/model';
import setUpChatStream from './setUpChatStream';
import {
  APPEND_MESSAGES,
  PREPEND_MESSAGES,
  ADD_OUTGOING_MESSAGE,
  ADD_SOMEONE_TYPING,
  REMOVE_OUTGOING_MESSAGES,
  INIT_CHAT,
  REMOVE_SOMEONE_TYPING,
  REMOVE_USERS_TYPING,
  TERMINATE_CHAT,
  HISTORIC_MESSAGES_FETCH_START,
  HISTORIC_MESSAGES_FETCH_COMPLETE,
} from './actionTypes';

let currentPlaceholderMessageId = 0;

export const messageMetadata = Object.freeze({
  messageId: null,
  arrayIndex: null,
  message: null,
});

export const messageMetadataPropTypes = Object.freeze({
  messageId: PropTypes.string,
  arrayIndex: PropTypes.number,
  message: PropTypes.string,
});

export const typingIndicator = Object.freeze({
  username: null,
  timestamp: null,
});

export const typingIndicatorPropTypes = Object.freeze({
  username: PropTypes.string,
  timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

const chatState = Object.freeze({
  url: '',
  stream: null,
  messages: [],
  messagesFetchStatus: fetchStatus,
  whoIsTyping: [],
  outgoingMessages: [],
  hasMoreMessages: true,
});

const initialChatState = { ...chatState };

const initialState = {};

function processMessages(messages) {
  if (!messages) {
    return;
  }

  messages.forEach((message) => {
    const { timestamp, lastEdited } = message;
    message.timestamp = moment(timestamp);
    message.lastEdited = lastEdited ? moment(lastEdited) : lastEdited;
  });
}

export function initChat(chatId, url) {
  return (dispatch, getState) => {
    api.get(`${url}/archive/`).then((response) => {
      const newChatStream = setUpChatStream(dispatch, getState, url, chatId);
      const initialData = response.data;

      processMessages(initialData.messages);

      dispatch({
        type: INIT_CHAT,
        payload: {
          chatId,
          url,
          stream: newChatStream,
        },
      });

      dispatch({
        type: PREPEND_MESSAGES,
        payload: {
          chatId,
          messages: initialData.messages ? initialData.messages.reverse() : [],
          hasMore: initialData.hasMoreItems || false,
        },
      });
    });
  };
}

export function terminateChat(chatId) {
  return (dispatch, getState) => {
    if (getState().chats[chatId]) {
      getState().chats[chatId].stream.close();
      dispatch({ type: TERMINATE_CHAT, payload: chatId });
    }
  };
}

export function loadOlderMessages(chatId, url) {
  return (dispatch, getState) => {
    if (!getState().chats[chatId].hasMoreMessages) {
      return;
    }

    dispatch({
      type: HISTORIC_MESSAGES_FETCH_START,
      payload: { chatId },
    });

    api.get(`${url}/archive/${getState().chats[chatId].messages[0].id}/`).then((response) => {
      const data = response.data;

      processMessages(data.messages);

      dispatch({
        type: PREPEND_MESSAGES,
        payload: {
          chatId,
          messages: data.messages ? data.messages.reverse() : [],
          hasMore: data.hasMoreItems || false,
        },
      });

      dispatch({
        type: HISTORIC_MESSAGES_FETCH_COMPLETE,
        payload: { chatId },
      });
    });
  };
}

export function sendMessage(chatId, data) {
  return (dispatch, getState) => {
    const userProfile = getState().userProfile.data;
    api.post(`${getState().chats[chatId].url}/sendMessage`, { message: data });
    const placeholderMessage = {
      ...defaultMessage,
      id: (Number.MAX_SAFE_INTEGER - (currentPlaceholderMessageId += 1)).toString(),
      author: userProfile.nick,
      data,
      own: true,
      sending: true,
      timestamp: moment(),
      lastEdited: null,
    };
    dispatch({
      type: ADD_OUTGOING_MESSAGE,
      payload: {
        chatId,
        message: placeholderMessage,
      },
    });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CHAT: {
      const { chatId, url, stream } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...initialChatState,
          url,
          stream,
        },
      };
    }
    case APPEND_MESSAGES: {
      const { messages, chatId } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messages: state[chatId].messages.concat(messages),
        },
      };
    }
    case PREPEND_MESSAGES: {
      const { messages, chatId, hasMore } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messages: messages.concat(state[chatId].messages),
          hasMoreMessages: hasMore,
        },
      };
    }
    case ADD_SOMEONE_TYPING: {
      const { chatId, typingIndicators } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          whoIsTyping: state[chatId].whoIsTyping.concat(typingIndicators),
        },
      };
    }
    case REMOVE_SOMEONE_TYPING: {
      const { chatId, typingIndicators } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          whoIsTyping: state[chatId].whoIsTyping.filter((who) => {
            const indexOfMatch = typingIndicators.findIndex(
              indicator => indicator.username === who.username);
            if (indexOfMatch < 0) {
              return true;
            }
            typingIndicators.splice(indexOfMatch, 1);
            return false;
          }),
        },
      };
    }
    case REMOVE_USERS_TYPING: {
      const { chatId, usernames } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          whoIsTyping: state[chatId].whoIsTyping
            .filter(who =>
              usernames.indexOf(who.username) < 0,
            ),
        },
      };
    }
    case ADD_OUTGOING_MESSAGE: {
      const { chatId, message } = action.payload;
      const messages = [...state[chatId].messages, message];
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messages,
          outgoingMessages: [
            ...state[chatId].outgoingMessages, {
              ...messageMetadata,
              messageId: message.id,
              data: message.data,
              arrayIndex: messages.length - 1,
            },
          ],
        },
      };
    }
    case REMOVE_OUTGOING_MESSAGES: {
      const messageIdsToDelete = [];
      const { chatId, messagesToHide } = action.payload;
      const messages = state[chatId].messages;

      state[chatId].outgoingMessages.forEach((outgoingMessage) => {
        if (messagesToHide.indexOf(outgoingMessage.data) >= 0) {
          messageIdsToDelete.push(outgoingMessage.messageId);
        }
      });
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messages: messages.filter(
            message => !messageIdsToDelete.some(id => id === message.id)),
        },
      };
    }
    case HISTORIC_MESSAGES_FETCH_START: {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messagesFetchStatus: { ...fetchStatus, fetching: true },
        },
      };
    }
    case HISTORIC_MESSAGES_FETCH_COMPLETE: {
      const { chatId } = action.payload;
      return {
        ...state,
        [chatId]: {
          ...state[chatId],
          messagesFetchStatus: fetchStatus,
        },
      };
    }
    case TERMINATE_CHAT: {
      const chatId = action.payload;
      return {
        ...state,
        [chatId]: null,
      };
    }
    default:
      return state;
  }
}
