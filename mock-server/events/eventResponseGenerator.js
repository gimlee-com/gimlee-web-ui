const generateCommonEventProps = require('./commonEventPropsGenerator');

module.exports = () => {
  const eventsResponse = generateCommonEventProps();
  const event = eventsResponse[Math.floor(Math.random() * eventsResponse.length)];
  event.authorId = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];
  event.peopleIds = [1, 2, 3, 4, 5];

  return event;
};
