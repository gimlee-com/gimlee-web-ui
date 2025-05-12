const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sseEvents = require('sse-express');
const multer = require('multer');
const delay = require('express-delay');
const loginResponseGenerator = require('./auth/loginResponseGenerator');
const generateMediaUploadResponse = require('./media/mediaUploadResponseGenerator');
const generateEventsResponse = require('./events/eventsResponseGenerator');
const generateEventResponse = require('./events/eventResponseGenerator');
const generateUsersResponse = require('./users/usersResponseGenerator');
const generateChatMessage = require('./events/chatMessageGenerator');
const chatStream = require('./events/chatStream');
const statusResponses = require('./common/statusResponses');

const mockApi = express();

mockApi.use(bodyParser.json());
mockApi.use(cookieParser());
mockApi.use(delay(100, 500));
mockApi.use(express.static(`${__dirname}/assets`));

const upload = multer();

mockApi.post(/^\/api\/auth\/login$/, (req, res) => {
  const responseBody = loginResponseGenerator.login(req);
  res.cookie('JWT', responseBody.accessToken);
  res.cookie('XSRF-TOKEN', responseBody.csrfToken);
  res.send(responseBody);
});

mockApi.get(/^\/api\/auth\/extend(\?.*)?$/, (req, res) => {
  const responseBody = loginResponseGenerator.extend(req);
  res.cookie('JWT', responseBody.accessToken);
  res.send(responseBody);
});

mockApi.get(/^\/api\/users\/$/, (req, res) => {
  res.send(generateUsersResponse());
});

mockApi.post(/^\/api\/auth\/register$/, (req, res) => {
  res.send(statusResponses.successful);
});

mockApi.post(/^\/api\/auth\/register\/usernameAvailable$/, (req, res) => {
  res.send({ available: true });
});

mockApi.post(/^\/api\/auth\/register\/emailAvailable$/, (req, res) => {
  res.send({ available: true });
});

mockApi.post(/^\/api\/media\/upload$/, upload.array('files[]'), (req, res) => {
  res.send(generateMediaUploadResponse());
});

mockApi.get(/^\/api\/chat\/.{36}\/$/, sseEvents,
  (req, res) => {
    chatStream.eventStream(req, res);
  });

mockApi.get(/^\/api\/chat\/.{36}\/archive\/.*$/, (req, res) => {
  const messages = [];
  for (let i = 0; i < 50; i += 1) {
    messages.push(generateChatMessage()[0]);
  }
  res.send({
    messages,
    hasMoreItems: true,
  });
});

mockApi.post(/^\/api\/chat\/.{36}\/sendMessage/, (req, res) => {
  chatStream.addChatMessage(req.body);
  res.send(statusResponses.successful);
});

mockApi.post(/^\/api\/chat\/.{36}\/indicateTyping/, (req, res) => {
  res.send(statusResponses.successful);
});

mockApi.listen(8282);
