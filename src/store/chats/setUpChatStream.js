import moment from 'moment';
import {
  APPEND_MESSAGES, ADD_SOMEONE_TYPING, REMOVE_OUTGOING_MESSAGES,
  REMOVE_SOMEONE_TYPING, REMOVE_USERS_TYPING,
} from './actionTypes';
import { typingIndicator } from './chats';

const TYPING_INDICATOR_DURATION = 5000;

function isNotDuplicate(currentMessages) {
  return message =>
    !currentMessages.some(currentMessage =>
      !message.timestamp.diff(currentMessage.timestamp)
      && message.author === currentMessage.author,
    );
}

function setUpMessagesHandler(dispatch, getState, eventStream, chatId) {
  let isFirstTime = true;

  eventStream.addEventListener('events', (e) => {
    const currentMessages = getState().chats[chatId].messages;
    let messages = JSON.parse(e.data)
      .filter(event => event.type === 'MESSAGE')
      .map(message => ({ ...message, timestamp: moment(message.timestamp) }));

    // The initial bunch of messages will collide with messages that are already is in the store
    // due to the fact that the stream replays some items when the client connects to it.
    // Need to filter these messages out
    if (isFirstTime) {
      messages = messages.filter(isNotDuplicate(currentMessages));
      isFirstTime = false;
    }

    dispatch({
      type: APPEND_MESSAGES,
      payload: {
        chatId,
        messages,
      },
    });

    const usernames = [...new Set(messages
      .filter(message => !message.own)
      .map(message => message.author))];

    if (usernames.length) {
      dispatch({
        type: REMOVE_USERS_TYPING,
        payload: { chatId, usernames },
      });
    }

    const ownMessages = messages.filter(message => message.own);
    if (ownMessages.length) {
      // Dirty timeout but does the job - without the timeout, the messages were measured
      // with default height, resulted in visual glitch when displaying new, multi-line messages
      dispatch({
        type: REMOVE_OUTGOING_MESSAGES,
        payload: {
          chatId,
          messagesToHide: ownMessages.map(message => message.data),
        },
      });
    }
  });
}

function setUpTypingIndicatorsHandler(dispatch, getState, eventStream, chatId) {
  eventStream.addEventListener('events', (e) => {
    const typingIndicators = JSON.parse(e.data).filter(event => event.type === 'TYPING_INDICATOR')
      .filter(event => event.author !== getState().loginSession.user.username)
      .map(event => ({ ...typingIndicator, username: event.author, timestamp: event.timestamp }));

    if (typingIndicators.length) {
      dispatch({
        type: ADD_SOMEONE_TYPING,
        payload: {
          chatId,
          typingIndicators,
        },
      });

      setTimeout(() => {
        dispatch({
          type: REMOVE_SOMEONE_TYPING,
          payload: {
            chatId,
            typingIndicators,
          },
        });
      }, TYPING_INDICATOR_DURATION);
    }
  });
}

export default function setUpChatStream(dispatch, getState, chatUrl, chatId) {
  const newChatStream = new EventSource(`${chatUrl}/`);

  setUpMessagesHandler(dispatch, getState, newChatStream, chatId);
  setUpTypingIndicatorsHandler(dispatch, getState, newChatStream, chatId);

  return newChatStream;
}
