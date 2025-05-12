const initialEventChatMessages = require('./initialEventChatMessages');
const generateChatMessage = require('./chatMessageGenerator');
const generateTypingIndicator = require('./chatTypingIndicatorGenerator');

const ownMessages = [];

module.exports.addChatMessage = function addChatMessage(message) {
  ownMessages.push(message);
};

module.exports.eventStream = (req, res) => {
  res.sse('events', initialEventChatMessages);

  (function sendRandomMessagesFromTimeToTime() {
    setTimeout(() => {
      res.sse('events', generateChatMessage());
      sendRandomMessagesFromTimeToTime();
    }, Math.floor(Math.random() * 10000));
  }());

  (function sendTypingIndicatorFromTimeToTime() {
    setTimeout(() => {
      res.sse('events', generateTypingIndicator());
      sendTypingIndicatorFromTimeToTime();
    }, Math.floor(Math.random() * 7000));
  }());

  (function sendOwnMessages() {
    setInterval(() => {
      if (ownMessages.length) {
        const message = generateChatMessage()[0];
        message.own = true;
        message.message = ownMessages[0].message;
        res.sse('events', [message]);
        ownMessages.splice(0, 1);
      }
    }, 2000);
  }());
};

