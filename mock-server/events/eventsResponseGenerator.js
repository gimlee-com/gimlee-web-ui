const generateCommonEventProps = require('./commonEventPropsGenerator');

function generatePeopleCount() {
  return Math.floor(Math.random() * 40);
}

module.exports = () => (
  generateCommonEventProps().map(event => ({
    ...event,
    peopleCount: generatePeopleCount(),
  })));
