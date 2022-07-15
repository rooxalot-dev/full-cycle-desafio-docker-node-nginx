const path =  require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { saveUser, getAllUsers } = require('./services/usersService');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/'));
app.use('/css', express.static(path.resolve(__dirname, 'css/')));
app.use(bodyParser());

const { APP_PORT } = process.env;

app.get('/', async (request, response) => {
  const users = await getAllUsers();
  response.render('index', { initialMessage: 'Full cycle Rocks!', users });
});

app.post('/', async (request, response) => {
  const { username } = request.body;
  if (username) {
    await saveUser(username);
  }

  response.redirect('/');
});

app.listen(APP_PORT || 3333, () => {
    console.log(`Listening on port ${APP_PORT || 3333}`);
});