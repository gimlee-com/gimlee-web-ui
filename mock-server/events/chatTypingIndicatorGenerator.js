const names = ['pwnerer', 'yourmom', 'randomerer', 'nobody666', 'someuser'];

module.exports = () => {
  const who = names[Math.floor(Math.random() * names.length)];
  return [{
    type: 'TYPING_INDICATOR',
    author: who,
  }];
};
