const ID_1 = 'a4975a1a-a2f4-11e8-98d0-529269fb1459';
const ID_2 = 'a4975de4-a2f4-11e8-98d0-529269fb1459';
const ID_3 = 'a4976078-a2f4-11e8-98d0-529269fb1459';
const ID_4 = 'a4976316-a2f4-11e8-98d0-529269fb1459';
const ID_5 = 'a4976596-a2f4-11e8-98d0-529269fb1459';

const AVATAR_1 = '/api/media/thumbs-xs/25a7c3a6-23e6-4dc5-bff1-29e8baac8f30.png';
const AVATAR_2 = '/api/media/thumbs-xs/60d129ab-665c-4da0-9e6c-e152a1d9737f.png';
const AVATAR_3 = '/api/media/thumbs-xs/84c2cdb6-7ecc-4f8c-b06d-559dd1cbc7ca.png';
const AVATAR_4 = '/api/media/thumbs-xs/bba66d78-dba1-40b4-9e90-a55516f7bc7e.png';
const AVATAR_5 = '/api/media/thumbs-xs/d0254b1d-7181-4949-8c82-825ad273de3d.png';

function generateDate() {
  return Date.now() - (Math.random() * 3600 * 1000 * 24 * 7);
}

module.exports = () => ([{
  id: ID_1,
  chatId: '11111111-adbe-11e8-98d0-529269fb1459',
  author: {
    displayName: 'Grzegorz Brzęczyszczykiewicz',
    nick: 'greg993',
    avatar: AVATAR_1,
  },
  title: 'Potrzeba 5 do gry w badmintona, tylko PRO',
  date: generateDate(),
  tags: ['piłka', 'piłka nożna', 'only pro'],
}, {
  id: ID_2,
  chatId: '22222222-adbe-11e8-98d0-529269fb1459',
  author: {
    displayName: 'darthvader',
    nick: 'darthvader',
    avatar: AVATAR_2,
  },
  title: 'Zgubiłam mopa',
  date: generateDate(),
  tags: ['lost-n-found', 'lublin'],
}, {
  id: ID_3,
  chatId: '33333333-adbe-11e8-98d0-529269fb1459',
  author: {
    displayName: 'Onomatopeja',
    nick: 'kasia111',
    avatar: AVATAR_3,
  },
  title: '3 osoby - siatkówka',
  date: generateDate(),
  tags: ['siatkowka', 'sunday-league'],
}, {
  id: ID_4,
  chatId: '44444444-adbe-11e8-98d0-529269fb1459',
  author: {
    displayName: 'Virtual Person',
    nick: 'vivivivi',
    avatar: AVATAR_4,
  },
  title: 'Kto idzie na fajkę?',
  date: generateDate(),
  tags: ['fajka'],
}, {
  id: ID_5,
  chatId: '55555555-adbe-11e8-98d0-529269fb1459',
  author: {
    displayName: 'god',
    nick: 'god',
    avatar: AVATAR_5,
  },
  title: 'Warsztaty z programowania UMCS',
  date: generateDate(),
  tags: ['programowanie', 'java', 'spotkanie', 'warsztaty'],
}]);