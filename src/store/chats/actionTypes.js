const INIT_CHAT = 'chat/init';
const TERMINATE_CHAT = 'chat/terminate';
const APPEND_MESSAGES = 'chat/append-messages';
const PREPEND_MESSAGES = 'chat/prepend-messages';
const ADD_OUTGOING_MESSAGE = 'chat/add-outgoing-message';
const REMOVE_OUTGOING_MESSAGES = 'chat/remove-outgoing-messages';
const ADD_SOMEONE_TYPING = 'chat/add-someone-typing';
const REMOVE_SOMEONE_TYPING = 'chat/remove-someone-typing';
const REMOVE_USERS_TYPING = 'chat/remove-users-typing';
const HISTORIC_MESSAGES_FETCH_START = 'chat/historic-messages-fetch-start';
const HISTORIC_MESSAGES_FETCH_COMPLETE = 'chat/historic-messages-fetch-done';

export {
  INIT_CHAT, TERMINATE_CHAT, APPEND_MESSAGES, PREPEND_MESSAGES, ADD_OUTGOING_MESSAGE,
  REMOVE_OUTGOING_MESSAGES, ADD_SOMEONE_TYPING, REMOVE_SOMEONE_TYPING, REMOVE_USERS_TYPING,
  HISTORIC_MESSAGES_FETCH_START, HISTORIC_MESSAGES_FETCH_COMPLETE,
};
