const users = {
  admin: {
    roles: ['ADMIN', 'USER'],
  },
  user: {
    roles: ['USER'],
  },
};

function createJWT(username) {
  return ({
    accessToken: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.${
      Buffer.from(JSON.stringify({
        sub: username,
        roles: users[username] ? users[username].roles : [],
        iss: 'q',
        exp: Math.floor((Date.now() / 1000)) + (60 * 30),
        iat: Math.floor((Date.now() / 1000)),
      })).toString('base64')
      }.bxxz6LKzQr7f9v5bMtn2idO4tgPaB76NcN5gAxtvLds`,
    csrfToken: 'cfbc68dd-706b-45f2-94e7-3e8f4df22609',
  });
}

module.exports.login = (req) => {
  const { username } = req.body;
  return createJWT(username);
};

module.exports.extend = (req) => {
  const jwt = JSON.parse(Buffer.from(req.cookies.JWT.split('.')[1], 'base64').toString());
  return createJWT(jwt.sub);
};
