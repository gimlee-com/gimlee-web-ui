const messages = [
  'Look, you\'re wasting your time. And, believe me, you don\'t have a whole lot left to waste',
  'The Enrichment Center is required to remind you that the Weighted Companion Cube cannot talk. In the event that it does talk The Enrichment Centre asks you to ignore its advice.',
  'That thing you burned up isn\'t important to me; it\'s the fluid catalytic cracking unit. It makes shoes for orphans... nice job breaking it, hero.',
  'Hey, look at that thing. No, that other thing!',
  'Faster delivery of pizzas. :D',
  'My coma was more entertaining.',
  'As long as I get to keep my slaves.',
  'Cross my heart, slap me dead, stick a lobster on my head',
  '2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists\n'
  + 'look like:\n'
  + '\n'
  + '  * this one\n'
  + '  * that one\n'
  + '  * the other one',
  'Dump everything in the pot and follow this algorithm:\n'
  + '```\n'
  + 'find wooden spoon\n'
  + 'uncover pot\n'
  + 'stir\n'
  + 'cover pot\n'
  + 'balance wooden spoon precariously on pot handle\n'
  + 'wait 10 minutes\n'
  + 'goto first step (or shut off burner when done)'
  + '```\n',
];

let currentMessageId = 5;


module.exports = () => {
  currentMessageId += 1;
  return [{
    id: currentMessageId.toString(),
    author: 'pwnerer',
    data: messages[Math.floor(Math.random() * messages.length)],
    own: false,
    type: 'MESSAGE',
    timestamp: Date.now(),
  }];
};
